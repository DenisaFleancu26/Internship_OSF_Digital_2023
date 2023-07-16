const soap = require('soap');

const url = 'http://infovalutar.ro/curs.asmx?wsdl';

async function GetLatestValueCurrency(currency){

    const args = {
        Moneda: currency,
    };

    return new Promise((resolve, reject) => {

        soap.createClient(url, function(err, client){
            if (err){
                reject(err);
                return;
            }
            client.getlatestvalue(args, (err, result) => {
                if(err){
                    reject(err);
                    return;
                }

                const value = result.getlatestvalueResult;
                resolve(value);
            });
            
        }); 
    });
}

module.exports = {GetLatestValueCurrency};