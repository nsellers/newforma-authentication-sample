"use strict";

const fetch = require("node-fetch");
class authentication{
  constructor(){}


login(url){
return fetch(url, {
    method : "POST",
    headers: {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify({
        accessKey : 'KEY',
        secret : 'SECRET'
    })
}).then(response => {
if(response.status == 200){
  return response.json();
}else {
  return Promise.reject(new Error("Failed to Login. Receieved HTTP status " + response.status));
}
});

}

}

exports.authentication = authentication;
