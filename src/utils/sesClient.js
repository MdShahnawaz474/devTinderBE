const { SESClient } = require("@aws-sdk/client-ses");

const Region = "ap-south-1";

const sesClient = new SESClient({
  region: Region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
});

module.exports = { sesClient };
