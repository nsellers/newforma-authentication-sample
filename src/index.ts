import { selenium } from './azureSeleniumAuthenticationProvider';
import { awsRequest } from './awsRequest';
console.log("START");
const awsRegion = "us-east-1";

const awsNewformaLinkGatewayUrl = "api.newforma.cloud";
const azureConfig={
    login:"user@domain.com",
    password:"password",
    oauthClientId:"556688bb-aaaa-bbbb-aaaa-123456789012",
    oauthRedirectUrl:"https://newforma.cloud/redirect",
    awsRegion:awsRegion,
    loginServiceUrl:"api.newforma.cloud"
}


const authProvider = new selenium();
const authHttps = new awsRequest(awsRegion);
const projectPath = `/v1/projects`;
const options = {
    hostname: awsNewformaLinkGatewayUrl,
    protocol: 'https:',
    path: projectPath,
    method: "GET"
};

authProvider.login(azureConfig).then((tokens:any)=>{
    authHttps.request(options, tokens).then(myProjects => {
        console.log(JSON.stringify(myProjects));
    });
});
