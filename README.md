twilio-gas
==========
**A Google Apps Script Twilio helper library.** Based on the [twilio-node](https://github.com/twilio/twilio-node) library.


Currently only *RestClient* and *TwimlRepsonse* modules have been adapted. Further work is needed to adpat the *Capability* module, as it depends on [node-jwt-simple](https://github.com/hokaccha/node-jwt-simple) which also needs to be adapted to Apps Script.

Contributions are welcomed !

***! Caution Alpha Work !***

####Dependencies
* [Underscore](https://script.google.com/d/1I21uLOwDKdyF3_W_hvh6WXiIKWJWno8yG9lB8lf1VBnZFQ6jAAhyNTRG/edit) for GAS
* [querystring-gas](https://github.com/illiatdesdindes/querystring-gas)

Install
-------

fork the repo or use directly this copy of the twilio-gas library in your own project. 
Use the project key:

```
MJluEaWRLspBmhL09uKHPtNf9UcAuUuPd
```

Here's [how to use](https://developers.google.com/apps-script/guide_libraries) a library in Google Apps Script.

Getting Started
---------------

```javascript
var account_sid = 'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
var auth_token = 'yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy';

var client = new twiliogas.RestClient(account_sid, auth_token);

// DO STUFF...
```

###Getting Started With REST

####Send An SMS

```javascript
client.sendSms({
    to:'+16515556677', // Any number Twilio can deliver to
    from: '+14506667788', // A number you bought from Twilio and can use for outbound communication
    body: 'word to your mother.' // body of the SMS message
});
```

####Make a Phone Call

```javascript
client.makeCall({

    to:'+16515556677',
    from: '+14506667788',
    url: 'http://www.example.com/twiml.php' // A URL that produces an XML document (TwiML) which contains instructions for the call

}, function(err, responseData) {

    //executed when the call has been initiated.
    Logger.log(responseData.from); // outputs "+14506667788"

});
```
###Getting Started With TwiML

```javascript
var resp = new twiliogas.TwimlResponse();

resp.say('Welcome to Acme Customer Service!')
    .gather({
        action:'http://www.example.com/callFinished.php',
        finishOnKey:'*'
    }, function() {
        this.say('Press 1 for customer service')
            .say('Press 2 for British customer service', { language:'en-gb' });
    });

Logger.log(resp.toString());
```

Will output :

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say>Welcome to Acme Customer Service!</Say>
    <Gather action="http://www.example.com/callFinished.php" finishOnKey="*">
        <Say>Press 1 for customer service.</Say>
        <Say language="en-gb">Press 2 for British customer service.</Say>
    </Gather>
</Response>
```
Or through ContentService deploying your script as a webapp :
```javascript
function doGet() {
  var resp = new twiliogas.TwimlResponse();

  resp.say('Welcome to Twilio!');
  resp.say('Please let us know if we can help during your development.', {
    voice:'woman',
    language:'en-gb'
  });

  return ContentService.createTextOutput(resp.toString()).setMimeType(ContentService.MimeType.XML)
}
```
###Complete Working Example
In your Google Apps Script editor :
```javascript
var twilioNumber = 'TWILIO_NUMBER';
var myPhoneNumber = 'YOUR_PHONE';
var myFriendNumber = 'FRIEND_PHONE';

function startCall() {
  var client = new twiliogas.RestClient('TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN');
  
  client.makeCall({
    from: twilioNumber,
    to: myPhoneNumber,
    url: ScriptApp.getService().getUrl()
  });
}

function doPost() {
  var resp = new twiliogas.TwimlResponse();

  resp.say('Google Apps Script will now connect you to your friend.');
  resp.dial(myFriendNumber);
  return ContentService.createTextOutput(resp.toString()).setMimeType(ContentService.MimeType.XML)
}
```
Next, [deploy](https://developers.google.com/apps-script/execution_web_apps) your script as a webapp. Set :

* "Execute the app as" **to** "me (xxxx@gmail.com)" 
* "Who can acces to the app" **to** "Anyone, even anonymous"

Then execute "startCall" function.

Don't forget to deploy the latest version of your work evry time you want to test against Twilio's api.

More Information
----------------
For more detailed examples you have the twilio-node [documentation](http://twilio.github.io/twilio-node/).

TO DO
-----
* testing
* adapt validateRequest() function
* adapt node-jwt-simple
* adapt Capability Token Generator

