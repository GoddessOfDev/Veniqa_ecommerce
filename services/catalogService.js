import Product from '../database/models/product';

export default {
    async searchCatalog(searchObj, pagingOptions) {
        // Preparing search filters
        let searchFilters = {}
        searchObj.store ? searchFilters.store = searchObj.store : '';
        searchObj.category ? searchFilters.category = searchObj.category : '';
        console.log("Search Filters", searchFilters)

        try {
            let products = await Product.paginate(searchFilters, {
                select: '_id name brand store price picture_urls category subcategory',
                page: pagingOptions.page,
                limit: pagingOptions.limit
            }).then(result => {
                return result;
            }).catch(err => {
                return err;
            })
            return products;
        }   
        catch(err) {
            console.log("[ERROR]: Catalog search failed => ", err)
            return err;
        }
    },

    async getProductDetails(productId) {
        let result = {};
        try {
            let product = await Product.findOne({_id: productId}).exec()
            if (product) {
                result = {status: "successful", responseData: product};
            } 
            else { 
                result = {status: "failed", errorDetails: "product not found"};
            }
            return result;  
        }
        catch(err) {
            result = {status: "failed", errorDetails: err};
            return result;
        }
    },

    async updateProduct(productObj) {
        try {
            // Store the id and delete it from the received object, to prevent any accidental replacement of id field
            let id = productObj._id;
            if (!id) {
                return "Missing product id";
            }
            delete productObj._id;
            
            // Make the update and return the updated document. Also run validators. Mongoose warns only limited validation takes place doing this in update
            let product = await Product.findOneAndUpdate({_id: id}, productObj, {runValidators: true, new: true}).exec();
            if (product) {
                return product;
            }
            return false;

        }
        catch(err) {
            console.log("[ERROR]: Product update failed => ", err)
            return err;
        }
    }
}