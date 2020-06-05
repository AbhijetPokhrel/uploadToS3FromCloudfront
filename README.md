# uploadToS3FromCloudfront
Upload files to s3 from cloudfrontlo

## Use case
- When you want fast upload of files using AWS edge location
- Facilate low bandwidth users for faster uploads
- Upload using presigned url

## Getting started
- Create ```env.js``` taking ```envExample.js``` as reference and set the respective values
- Start the server using ```npm start```
- open ```localhost:3000``` in your browser
- Check uploads both using and not using cloudfront and see the difference