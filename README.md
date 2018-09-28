# @newforma/common-lambda-js
Sample of NodeJS application to access NPCS My Projects 

Contents
  1. [Installation](#installation)
  1. [Configuration ](#config)


## <a name="installation"></a>


1. Download or clone the Authentication Example code git repository.
With your favorite git client or code editor clone the Authenitcation repository. If you prefer you can download it directly, Zip Direct Download. If you download directly unzip to an easy to find location.

2. Setup your Node Packages.
Open a command prompt (Windows) or terminal (Mac) and browse to the folder containing the sample code. Run npm install, this will download all appropriate Node packages needed to run this app.

3. Setup your parameters.
Open the index.ts file found in "src" folder. Here you will need to replace the values for login,password, oauthClientId. To get the value for oauthClientId please use this tool, Client ID Request. Enter your email address and click the "Get Azure Client Id" button this will provide your with the necessary ClientId. Copy the value and paste it into the oauthClientId value inindex.ts.

4. Setup your build.
Open a command prompt (Windows) or terminal (Mac) and browse to the folder containing the sample code. Run npm run build, this will build the app into a directory named buildOutput under your main directory.

5. Run your build.
Open a command prompt (Windows) or terminal (Mac) and browse to the folder \buildOutput. Run node index.js, this will run the app with your previously specified parameters. If this is successful you will see: 

{"projects":[{"id":"5ef3db2d-a7da-3a5f-4de3-6748ed35e608","name":"Building Project","number":"1234.01","npcServer":"NPCS_ServerName"},{"id"...

at the bottom of your console.


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
const awsNewformaLinkGatewayUrl = "api.newforma.cloud";

const azureConfig={
    login:"user@domain.com",
    password:"password",
    oauthClientId:"556688bb-aaaa-bbbb-aaaa-123456789012",
    oauthRedirectUrl:"https://newforma.cloud/redirect",
    awsRegion:awsRegion,
    loginServiceUrl:"api.newforma.cloud"
}
~~~

