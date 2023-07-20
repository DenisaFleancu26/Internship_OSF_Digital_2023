const soap = require('soap');

const url = 'http://infovalutar.ro/curs.asmx?wsdl';

async function LastDateInsertedCurrency(){

    return new Promise((resolve, reject) => {

        soap.createClient(url, function(err, client){
            if(err){
                reject(err);
                return;
            }
            client.lastdateinserted(function(err, result){
                if(err){
                    reject(err);
                    return;
                }

                const date = result.lastdateinsertedResult;
                resolve(date);
            });
        });
    });
}

module.exports = {LastDateInsertedCurrency};