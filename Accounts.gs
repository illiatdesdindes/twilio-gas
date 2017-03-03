

var Accounts_ = function (client) {

    //Define subresources on the accounts resource, with the given account SID
    function mixinResources(obj, sid) {
        //All other REST resources are based on account - some can simply be generated, others need additonal URL params
        //TODO: This can probably be smarter. Should eventually refactor generator to do subresources too. Shouldn't need to be custom
        //Probably should generate the whole f***ing thing from an object literal describing the resource structure. But this does work.
        var subresources = {
            availablePhoneNumbers : AvailablePhoneNumbers_(client, sid),
            outgoingCallerIds : ListInstanceResource_(client, sid, 'OutgoingCallerIds',
                ['GET', 'POST', 'PUT', 'DELETE', { update:'PUT' }],
                ['GET', 'POST', { create:'POST' }]
            ),
            incomingPhoneNumbers : IncomingPhoneNumbers_(client, sid),
            messages: ListInstanceResource_(client, sid, 'Messages',
              ['GET'],
              ['GET', 'POST', {create:'POST'}]
            ),            
            sms:{
                messages: ListInstanceResource_(client, sid, 'SMS/Messages',
                    ['GET'],
                    ['GET', 'POST', {create:'POST'}]
                ),
                shortCodes: ListInstanceResource_(client, sid, 'SMS/ShortCodes',
                    ['GET', 'POST', {update:'POST'}],
                    ['GET']
                )
            },
            applications: ListInstanceResource_(client, sid, 'Applications',
                ['GET', 'POST', 'DELETE', {update:'POST'}],
                ['GET', 'POST', {create:'POST'}]
            ),
            connectApps: ListInstanceResource_(client, sid, 'ConnectApps',
                ['GET', 'POST', {update:'POST'}],
                ['GET']
            ),
            authorizedConnectApps: ListInstanceResource_(client, sid, 'AuthorizedConnectApps',
                ['GET'],
                ['GET']
            ),
            calls: Calls_(client, sid),
            conferences: Conferences_(client, sid),
            queues: Queues_(client, sid),
            recordings:  Recordings_(client, sid),
            transcriptions: ListInstanceResource_(client, sid, 'Transcriptions',
                ['GET'],
                ['GET']
            ),
            notifications: ListInstanceResource_(client, sid, 'Notifications',
                ['GET', 'DELETE'],
                ['GET']
            ),
            usage:{
                records: UsageRecords_(client, sid),
                triggers: ListInstanceResource_(client,sid,'Usage/Triggers',
                    ['GET','POST','DELETE',{update:'POST'}],
                    ['GET','POST',{create:'POST'}]
                )
            }
        };

        //Add resources to Accounts.* or Accounts(sid).*
        _.extend(obj, subresources);
    }

    /**
The Twilio Accounts Resource
@constructor
@param {string} accountSid - The specific account for which to scope requests
*/
    function Accounts(accountSid) {
        //This is the resource for accounts aside from the default master account
        var resourceApi = {};

        //generate REST function calls for the appropriate resource
        generate_.restFunctions(resourceApi, client, ['GET', 'PUT', 'POST'], '/Accounts/' + accountSid);
        resourceApi.update = resourceApi.post;
        resourceApi.list = resourceApi.get;

        //Mix in sub resources
        mixinResources(resourceApi, accountSid);

        //Return resource API, plus sub-resources
        return resourceApi;
    }

    //Create REST functions with the default account
    generate_.restFunctions(Accounts, client, ['GET', 'POST'], '/Accounts');
    Accounts.create = Accounts.post;
    Accounts.list = Accounts.get;

    //Define other sub-resources of Accounts for master account
    mixinResources(Accounts, client.accountSid);

    return Accounts;
};
