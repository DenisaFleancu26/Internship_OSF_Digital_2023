const ProductModel = require('../product');

async function findSubcategoryProducts(id){
    
    try{
        const products = await ProductModel.find({primary_category_id: id});
        if(!products || products.length == 0 ){
            const error = new Error('Oops, This Page Not Found!');
            error.status = 404;
            throw error;
        }else{
            return products;
        }
    }catch(error){
        throw error;
    }
}

module.exports = {
    findSubcategoryProducts
};