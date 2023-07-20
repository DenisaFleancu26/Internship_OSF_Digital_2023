const soap = require('soap');

const url = 'http://infovalutar.ro/curs.asmx?wsdl';

async function GetValueAdvCurrency(date, currency){

    const args = {
        thedate: date,
        themoneda: currency,
    };
    
    return new Promise((resolve, reject) => {

        soap.createClient(url, function(err, client){
            if (err){
                reject(err);
                return;
            }
            client.getvalueadv(args, (err, result) => {
                if(err){
                    reject(err);
                    return;
                }

                const value = result.getvalueadvResult.value;
                const data = result.getvalueadvResult.date;
                const moneda = result.getvalueadvResult.moneda;
                resolve({value, data, moneda});
            });
            
        }); 
    });

}

module.exports = {GetValueAdvCurrency};