
import aws from "aws-sdk";


aws.config.update({
    region: process.env.NEXT_PUBLIC_REGION,
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY
});



const handleUpload = async (file, imageName) => {

    const myBucket = new aws.S3.ManagedUpload({
        params: {
            Bucket: process.env.NEXT_PUBLIC_S3_BUCKET,
            Key: imageName,
            Body: file
        }
       
    })
    
    var promise = myBucket.promise();

    promise.then(
      function(data) {
        console.log("Successfully uploaded photo.");
        
      },
      function(err) {
        console.log("There was an error uploading your photo: ", err.message);
      }
    );
}

export default handleUpload;