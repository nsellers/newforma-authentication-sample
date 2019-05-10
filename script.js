const loginURL = "https://api.newforma.cloud/v1/login";
const awsRequest_1 = require("./awsRequest");
const authProvider_1 = require("./authProvider");
const options ={
  hostname: "enterprise.api.newforma.cloud",
  protocol: 'https:',
  path: '/v1/projects',
  method: "GET"
};

const awsRegion = "us-east-1";
const authHttps = new awsRequest_1.awsRequest(awsRegion);
const authProvider = new authProvider_1.authentication();

const searchAuthHttps = new awsRequest_1.awsRequest(awsRegion);
const searchAuthProvider = new authProvider_1.authentication();

authProvider.login(loginURL).then((result) => {
  let tokens ={
    accessKeyId: result.accessKeyId,
    secretAccessKey: result.secretAccessKey,
    sessionToken: result.sessionToken
  }
  console.log(tokens);
  return tokens;
}).then((generatedTokens) => {
  authHttps.request(options, generatedTokens).then((myProjects) =>{
    console.log(JSON.stringify(myProjects));
    return generatedTokens;
  })
})
