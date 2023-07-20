const soap = require('soap');

const url = 'http://infovalutar.ro/curs.asmx?wsdl';

async function GetValueCurrency(date, currency){

    const args = {
        TheDate: date,
        Moneda: currency,
    };
    
    return new Promise((resolve, reject) => {

        soap.createClient(url, function(err, client){
            if (err){
                reject(err);
                return;
            }
            client.getvalue(args, (err, result) => {
                if(err){
                    reject(err);
                    return;
                }

                const value = result.getvalueResult;
                resolve(value);
            });
            
        }); 
    });

}

module.exports = {GetValueCurrency};