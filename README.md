# @newforma/common-lambda-js
Sample of NodeJS application to access NPCS My Projects 

Contents
  1. [Installation](#installation)
  1. [Usage](#usage)
  1. [Configuration ](#config)


## <a name="installation"></a>
Copy git project
run command 
~~~cmd
npm install
~~~

## <a name="usage"></a>Usage
and use by command:
~~~cmd
node .\buildOutput\index.js
~~~

## <a name="config"></a>config description
On the begining of  `index.ts` file there is configuration witch need to be filled by NPCS settings 
### `properties`
* `login` : "user email address"
* `password`: "password"
* `oauthClientId` : "Azure Active Directory Application Id"
* `oauthRedirectUrl` : "Newforma web app URL"
* `awsRegion"` : "AWS application region"
* `loginServiceUrl` : "Newforma AWS login gateway"

* `awsNewformaLinkGatewayUrl` : Newforma AWS API gateway 

### sample fonfiguration
~~~js
const awsNewformaLinkGatewayUrl = "z2dc1ud1zh.execute-api.us-east-1.amazonaws.com";

const azureConfig={
    login:"user@domain.com",
    password:"password",
    oauthClientId:"556688bb-aaaa-bbbb-aaaa-123456789012",
    oauthRedirectUrl:"https://newforma.cloud/redirect",
    awsRegion:awsRegion,
    loginServiceUrl:"d7q8br72dh.execute-api.us-east-1.amazonaws.com"
}
~~~

