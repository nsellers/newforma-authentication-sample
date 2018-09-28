const got = require('got');
import webdriver = require('selenium-webdriver');
const phantomjs = require('phantomjs');
const url = require('url');

const stepTimeout = 30000;

export interface LoginTokens {
    email: string;
    code: string;
    idToken: string;
}
export interface AuthenticationParameters {
    clientId: string;
    redirectUri: string;
    protocol: string;
    signInTitle: string;
    passwordInputId: string;
    signInButtonId: string;
    staySignedInButtonId: string;
}
export class selenium {
    constructor() {
    }

    getIdTokenAndCode(email: string, password: string, authenticationParams: AuthenticationParameters): Promise<LoginTokens> {

        const driver = new webdriver.Builder()
            .withCapabilities({
                'phantomjs.binary.path': phantomjs.path,
                'phantomjs.page.customHeaders.Accept-Language': 'en-US'
            })
            .forBrowser(webdriver.Browser.PHANTOM_JS)
            .build();

        const authorizeUrl = (authenticationParams.protocol === 'v1.0')
            ? `https://login.microsoftonline.com/common/oauth2/authorize?tenant=common&nonce=nonce01234&response_mode=query&redirect_uri=${authenticationParams.redirectUri}&response_type=id_token%20code&access_type=offline&client_id=${authenticationParams.clientId}&login_hint=${email}`
            : `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${authenticationParams.clientId}&response_type=id_token%20code&redirect_uri=${authenticationParams.redirectUri}&response_mode=fragment&scope=openid%20offline_access%20profile%20profile%20https%3A%2F%2Fgraph.microsoft.com%2Fmail.read%20https%3A%2F%2Fgraph.microsoft.com%2Fuser.read&nonce=nonce01234&login_hint=${email}`;

            console.log(`Authentication Url: ${authorizeUrl}`);

        let r= driver.get(authorizeUrl)
            .then(() => {
                console.log('waiting for sign in');
                return driver.wait(webdriver.until.titleIs(authenticationParams.signInTitle), stepTimeout);
            }).then(() => {
                console.log('writing password');
                return driver.findElement(webdriver.By.id(authenticationParams.passwordInputId)).sendKeys(password);
            }).then(() => {
                console.log('submitting query');
                return driver.findElement(webdriver.By.id(authenticationParams.signInButtonId)).click();
            }).then(() => {
                console.log('waiting to get code');
                return this.getIdTokenAndCodeViaRedirectUrl(driver, email, authenticationParams);
            }).then((data: any) => {
                driver.quit();
                return data;
            }).catch((e: any) => {
                driver.quit();
                throw e;
            });
            return r as Promise<LoginTokens>;
    }

    private getIdTokenAndCodeViaRedirectUrl(driver: any, email: string, authenticationParams: AuthenticationParameters): Promise<LoginTokens> {
        let callbackRedirectTo: string;
        return driver
            .findElement(webdriver.By.id(authenticationParams.staySignedInButtonId))
            .click()
            .catch(() => {
                return;
            })
            .then(() => {
                return driver.wait(new webdriver.Condition('locate callback Url', (driver: any) => {
                    return driver.getCurrentUrl().then((t: any) => {
                        const result = t.indexOf(authenticationParams.redirectUri) >= 0;
                        if (result) {
                            callbackRedirectTo = t;
                        }
                        return result;
                    });
                }), stepTimeout);
            })
            .then(() => {
                const parsedData = url.parse(callbackRedirectTo.replace('#', '?'), true);
                if (!parsedData.query || !parsedData.query.id_token || !parsedData.query.code) {
                    throw new Error('Invalid redirectUri:' + callbackRedirectTo);
                }

                return <LoginTokens>{
                    email: email,
                    code: parsedData.query.code,
                    idToken: parsedData.query.id_token
                };
            });
    }

    getAuthenticationParameters(azureSettings:any){
        const response: AuthenticationParameters = <AuthenticationParameters>{
            clientId: azureSettings.oauthClientId,
            redirectUri: azureSettings.oauthRedirectUrl,
            protocol: 'v1.0',
            signInTitle: 'Sign In',
            passwordInputId: 'passwordInput',
            signInButtonId: 'submitButton',
            staySignedInButtonId: 'idSIButton9'
        };
        return response;
    }

    login(azureSettings:any) {        
        return this.getIdTokenAndCode(azureSettings.login, azureSettings.password, this.getAuthenticationParameters(azureSettings)).then((data:any) => {
            let idToken = data.idToken;
            let code = data.code;
            const body = {
                idToken:  idToken,
                code:code
            };
            const options = {
                hostname: azureSettings.loginServiceUrl,
                path: `/v1/login`,
                protocol: 'https:',
                method: 'POST',
                json: true,
                header: {'accept': 'application/json'},
                body: body,
                hash:''
            };

            return got
                .post(options)
                .catch((error:any) => {
                    const errorMessage = error.response.statusCode === 400
                        ? 'Failed to log into Epoxy. Microsoft ID token might have expired.'
                        : 'Failed to log into Epoxy.';

                    logErrorResponse(errorMessage, error);
                    throw error;
                });
        }).then(data => {   
            let token={
                accessKeyId : data.body.accessKeyId,
                secretAccessKey : data.body.secretAccessKey,
                sessionToken : data.body.sessionToken
            };
            return Promise.resolve(token);
        });
    }
}

function logErrorResponse(message:any, error:any) {
    this.logger.error(message, {
        response: {
            statusCode: error.response.statusCode,
            headers: error.response.headers,
            body: error.response.body
        }
    });
}
