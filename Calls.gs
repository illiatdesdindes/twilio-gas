/**
@module resources/Calls
The Twilio "Calls" Resource.
*/
//var generate = require('./generate');

var Calls_ = function (client, accountSid) {
    var baseResourceUrl = '/Accounts/' + accountSid + '/Calls';

    //Instance requests
    function Calls(sid) {
        var resourceApi = {};

        //Add standard instance resource functions
        generate_.restFunctions(resourceApi,client,['GET','POST',{update:'POST'}], baseResourceUrl + '/' + sid);

        //Add in subresources
        resourceApi.recordings = {
            get: generate_(client, 'GET', baseResourceUrl + '/' + sid + '/Recordings')
        };
        resourceApi.notifications = {
            get: generate_(client, 'GET', baseResourceUrl + '/' + sid + '/Notifications')
        };

        resourceApi.recordings.list = resourceApi.recordings.get;
        resourceApi.notifications.list = resourceApi.notifications.get;

        return resourceApi;
    }

    //List requests
    generate_.restFunctions(Calls, client, ['GET','POST',{create:'POST'}], baseResourceUrl);


    return Calls;
};

