Newforma uses Azure Active Directory to authenticate users in our Newforma Project Center and Cloud environment, for short Newforma Cloud. The first step is to use these credentials to log into our Cloud Web Portal:

1. If your company has setup +Cloud log into https://newforma.cloud.
2. The rop right you will find the name of the user you logged in as with a drop down arrow.
3. In that menu choose GENERATE SERVICE ACCESS KEY.
4. You will be brought to a page that displays your Access Key and Secret.
5. Store these somewhere reliable. Once you leave the page you will not be able to retrieve them again.
Newforma has provided an Authentication Sample App which can be used to demonstrate the process of accessing our /login endpoint and then it will display a list of projects from the /projects endpoint. The sample has been written in JavaScript using Node.js and the AWS JS SDK.

There are a few pre-requisites before you can run the example code. Please install Node.js and npm. Node.js is a JavaScript runtime built on Chrome's V8 JavaScript Engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. The node package manager (npm) is a command line interface program that manages node.js libraries. 
To install both of these tools you can visit npmjs.com. Click on the "Download Node.js and npm" button. After the installation is complete test your install with the commands node -v and npm -v.

1. Download or clone the Authentication Example code git repository.
With your favorite git client or code editor clone the Authenitcation repository. If you prefer you can download it directly, Zip Direct Download. If you download directly unzip to an easy to find location.

2. Setup your Node Packages.
Open a command prompt (Windows) or terminal (Mac) and browse to the folder containing the sample code. Run npm install, this will download all appropriate Node packages needed to run this app.

3. Setup your parameters.
Open the authProvider.js file found in "src" folder. Here you will need to replace the values for accesskeyand secret.

4. Run your build.
Open a command prompt (Windows) or terminal (Mac) and browse to the folder you unzipped to. Run node script.js, this will run the app with your previously specified parameters. If this is successful you will see: 

{"items":[{"id":"5ef3db2d-a7da-3a5f-4de3-6748ed35e608","name":"Building Project","number":"1234.01","npcServer":"NPCS_ServerName"},{"id"...

at the bottom of your console.
