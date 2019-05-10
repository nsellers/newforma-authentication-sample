"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws4 = require("aws4");
const https = require("https");
class awsRequest {
    constructor(awsRegion) {
        this.awsRegion = awsRegion;
    }
    setCommonOptions(options) {
        options.service = options.service || "execute-api";
        options.region = options.region || this.awsRegion;
    }
    request(options, tokens) {
        this.setCommonOptions(options);
        const signedOptions = aws4.sign(options, {
          secretAccessKey: tokens.secretAccessKey,
          accessKeyId: tokens.accessKeyId,
          sessionToken: tokens.sessionToken
        });
        return this.makeRequest(signedOptions);
    }
    makeRequest(options) {
        const promise = new Promise((resolve, reject) => {
            const request = https.request(options, (response) => {
                const body = [];
                response.on('data', (chunk) => {
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
            request.on('error', (err) => {
                reject(err);
            });
            request.end();
        });
        return promise;
    }
}
exports.awsRequest = awsRequest;
//# sourceMappingURL=awsRequest.js.map
