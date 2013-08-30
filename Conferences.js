/**
@module resources/Conferences
The Twilio "Conferences" Resource.
*/
//var generate = require('./generate');

var Conferences_ = function (client, accountSid) {
    var baseResourceUrl = '/Accounts/' + accountSid + '/Conferences';

    //Instance requests
    function Conferences(sid) {
        var resourceApi = {
            get:generate_(client, 'GET', baseResourceUrl + '/' + sid)
        };

        //Add in subresources
        resourceApi.participants = function(participantSid) {
            var participantResourceApi = {
                get:generate_(client, 'GET', baseResourceUrl + '/' + sid + '/Participants/' + participantSid),
                post:generate_(client, 'POST', baseResourceUrl + '/' + sid + '/Participants/' + participantSid),
                'delete':generate_(client, 'DELETE', baseResourceUrl + '/' + sid + '/Participants/' + participantSid)
            };

            //Aliases
            participantResourceApi.update = participantResourceApi.post;
            participantResourceApi.kick = participantResourceApi['delete'];

            return participantResourceApi;
        };

        resourceApi.participants.get = generate_(client, 'GET', baseResourceUrl + '/' + sid + '/Participants');

        //Aliases
        resourceApi.participants.list = resourceApi.participants.get;

        return resourceApi;
    }

    //List requests
    Conferences.get = generate_(client, 'GET', baseResourceUrl);
    Conferences.list = Conferences.get;

    return Conferences;
};
