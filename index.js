const express = require('express')
const app = express()
const port = 3000
const env = require("./env")
const AWS = require("aws-sdk");
const URL = require('url');

const s3 = new AWS.S3()
AWS.config.update({ accessKeyId: env.ACCESS_ID, secretAccessKey: env.SECRET_ACCESS_KEY })

app.use(express.static('public'))

app.get('/getPresignedURL', getPresignedURL)

app.listen(port, () => console.log(`app listening at http://localhost:${port}`))

function getPresignedURL(req, res) {

    if (!req.query) {
        res.status(500), send({ err: "Invalid params" })
        return
    }
    let file = {
        name: req.query.name,
        type: req.query.type
    }
    if (!file.name || !file.type) {
        res.status(500), send({ err: "Invalid params" })
        return
    }

    let params = getUploadParams(file)
    s3.getSignedUrl('putObject', params, (err, url) => {
        if (err) {
            res.status(200).json(err)
            return
        }
        const { path } = URL.parse(url);
        cfurl = `${env.CLOUDFRONT_URL}${path}`
        res.status(200).json({ err, cfurl, url })
    })

}

function getUploadParams(file) {
    let key = "up-test-" + new Date().getTime() + file.name
    const params = {
        Bucket: env.BUCKET_NAME,
        Key: key,
        Expires: 60 * 60,
        ContentType: file.type,
        Metadata: { userInfo: "test123" }

    };
    return params
}
