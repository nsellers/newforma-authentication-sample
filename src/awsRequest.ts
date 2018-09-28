const aws4 = require("aws4");
const https = require("https"); 

export class awsRequest {
    private awsRegion:string;
    constructor(awsRegion:string) {
        this.awsRegion = awsRegion;
    }

    private setCommonOptions(options:any) {
        options.service = options.service || "execute-api";
        options.region = options.region || this.awsRegion;
    }

    request(options:any, tokens:any):Promise<any> {
        this.setCommonOptions(options);

        const signedOptions = aws4.sign(options, {
            secretAccessKey: tokens.secretAccessKey,
            accessKeyId: tokens.accessKeyId,
            sessionToken: tokens.sessionToken
        });
        return this.makeRequest(signedOptions);
    }
    
    private makeRequest(options:any) {
        const promise = new Promise((resolve, reject) => {
            const request = https.request(options, (response:any) => {
                const body:any = [];
    
                response.on('data', (chunk:any) => {
                    body.push(chunk);
                });
    
                response.on('end', () => {
                    response.body = body.join('');
                      resolve(JSON.parse(response.body));
                    
                });
            });
    
            if (options.body) {
                request.write(options.body);
            }
    
            request.on('error', (err:any) => {
                reject(err);
            });
    
            request.end();
        });
        return promise;        
    }
}


