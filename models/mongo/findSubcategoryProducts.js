const ProductModel = require('../product');

async function findSubcategoryProducts(id, page){
    
    try{
        const limit = 6;
        let skip = (page - 1) * limit;
        const products = await ProductModel.find({primary_category_id: id}).skip(skip).limit(limit);
        const length = (await ProductModel.find({primary_category_id: id})).length;
        
        if(!products || products.length == 0 ){
            const error = new Error('Oops, This Page Not Found!');
            error.status = 404;
            throw error;
        }else{
            return  { length, products};
        }
    }catch(error){
        throw error;
    }
}

module.exports = {
    findSubcategoryProducts
};