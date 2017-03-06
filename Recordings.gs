/**
@module resources/Recordings
The Twilio "Recordings" Resource.
*/

var Recordings_ = function (client, accountSid) {
    var baseResourceUrl = '/Accounts/' + accountSid + '/Recordings';

    //Instance requests
    function Recordings(sid) {
        var resourceApi = {};

        //Add standard instance resource functions
        generate_.restFunctions(resourceApi,client,['GET', 'POST', 'DELETE', {update:'POST'}], baseResourceUrl + '/' + sid);

        return resourceApi;
    }

    //List requests
    generate_.restFunctions(Recordings, client, ['GET', 'POST', {create:'POST'}], baseResourceUrl);


    return Recordings;
};
