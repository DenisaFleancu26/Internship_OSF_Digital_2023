const CategoryModel = require('../category');
let title = '';

async function findCategory(id){
    
    try{
        const category = await CategoryModel.findOne({id: id});

        if(!category){
  
            const error = new Error('Oops, This Page Not Found!');
            error.status = 404;
            throw error;
        
        }else{
        
            return category;
        }
        
    }catch(error){

        throw error;
    }
}

async function findCategoryName(id_category, id_subcategory){
    try{
        const category = await CategoryModel.findOne({id: id_category});

        if(!category){
  
            const error = new Error('Oops, This Page Not Found!');
            error.status = 404;
            throw error;
        
        }else{

            category.categories.forEach(element => {
                element.categories.forEach(el => {
                    if (el.id === id_subcategory) {
                        title = el.page_title;
                    }
                });
            });
            return title;
        }
        
    }catch(error){

        throw error;
    }
}

module.exports = {
    findCategory,
    findCategoryName
};