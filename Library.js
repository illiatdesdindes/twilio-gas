var _ = Underscore.load();

/*
function initializer(sid, tkn, options) {
    return new RestClient(sid, tkn, options);
}

//Main functional components of the Twilio module
initializer.RestClient = RestClient;
initializer.Capability = require('./Capability');
initializer.TwimlResponse = require('./TwimlResponse');
*/

/**
Utility function to validate an incoming request is indeed from Twilio

@param {string} authToken - The auth token, as seen in the Twilio portal
@param {string} twilioHeader - The value of the X-Twilio-Signature header from the request
@param {string} url - The full URL (with query string) you configured to handle this request
@param {object} params - the parameters sent with this request
*/
function validateRequest(authToken, twilioHeader, url, params) {
    Object.keys(params).sort().forEach(function(key, i) {
        url = url + key + params[key];
    });
    return twilioHeader === crypto.createHmac('sha1', authToken).update(url).digest('Base64');
};

var request =  function(client, options, callback){
  var err, response, body,
      url = options.url ;
  delete options.url;
  
  options.headers = {
    "Authorization" : "Basic " + Utilities.base64Encode(client.accountSid + ':' + client.authToken)
  };
  
  if( options.form){
    options.payload = options.form;
    delete options.form;
  }
  if( options.qs){ //pending, must append queryString parameters to the url
    url = url + '?' + querystringgas.stringify(options.qs);
    delete options.qs;
  }
  
  
  try{
    var fetchResponse = UrlFetchApp.fetch(url, options);
  }catch(e){
    err = e
  }
  if(fetchResponse){
    response = { statusCode : fetchResponse.getResponseCode() };
    body = fetchResponse.getContentText();
  }
  
  callback.call(client, err, response, body);
}
