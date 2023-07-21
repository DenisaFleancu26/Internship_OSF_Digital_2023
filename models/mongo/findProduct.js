const ProductModel = require('../product');
let title = '';

async function findProduct(id){
    
    try{
        const product = await ProductModel.findOne({id: id});

        if(!product){
  
            const error = new Error('Oops, This Page Not Found!');
            error.status = 404;
            throw error;
        
        }else{
        
            return product;
        }
        
    }catch(error){

        throw error;
    }
}

async function longDescriptionProduct(product){

    try{

        if(product.short_description === product.long_description){
            return false;
        }else{
            return true;
        }

    }catch(error){

        throw error;
    }
   
}

module.exports = {
    findProduct,
    longDescriptionProduct
};