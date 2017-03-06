/**
@module resources/AvailablePhoneNumbers
The Twilio "AvailablePhoneNumbers" Resource.
*/
//var generate = require('./generate'),
//    ListInstanceResource = require('./ListInstanceResource');

var IncomingPhoneNumbers_ = function (client, accountSid) {
    var IncomingPhoneNumbers = ListInstanceResource_(client, accountSid, 'IncomingPhoneNumbers',
        ['GET', 'POST', 'PUT', 'DELETE', { update:'PUT' }],
        ['GET', 'POST', { create:'POST' }]
    );

    //Add local and toll-free subresources
    IncomingPhoneNumbers.local = {};
    generate_.restFunctions(IncomingPhoneNumbers.local, client, ['GET', 'POST'], IncomingPhoneNumbers.baseResourceUrl+'/Local');
    IncomingPhoneNumbers.local.create = IncomingPhoneNumbers.local.post;

    IncomingPhoneNumbers.tollFree = {};
    generate_.restFunctions(IncomingPhoneNumbers.tollFree, client, ['GET', 'POST'], IncomingPhoneNumbers.baseResourceUrl+'/TollFree');
    IncomingPhoneNumbers.tollFree.create = IncomingPhoneNumbers.tollFree.post;

    return IncomingPhoneNumbers;
};
