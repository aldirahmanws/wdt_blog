const db = require("../config/database");

exports.getCategory = async (dataQuery) => {
    try {
        const currentPage = dataQuery.page ? parseInt(dataQuery.page) : 1;
        const limit = dataQuery.limit ? parseInt(dataQuery.limit) : 10;
        const offset = currentPage ? (currentPage - 1) * limit : 0;
        const name = dataQuery.name ? dataQuery.name : "";

        const allCategory = await db.query(
            `SELECT count(*) FROM public."category" category WHERE category."name" LIKE '%${name}%' `
        );
        const totalAllCategory = parseInt(allCategory.rows[0].count);
        const maxPage = Math.ceil(totalAllCategory / limit);

        const category = await db.query(
            `SELECT *  FROM public."category" category WHERE category."name" LIKE '%${name}%' LIMIT ${limit} OFFSET ${offset} `
        );

        const listData = [];
        for (const itemCategory of category.rows) {
            listData.push({
                category_id: itemCategory.category_id,
                name: itemCategory.name
            });
        }
        const response = {
            List_Data: listData,
            Pagination_Data: {
                Current_Page: currentPage,
                Max_Data_Per_Page: limit,
                Max_Page: maxPage > 0 ? maxPage : 1,
                Total_All_Data: totalAllCategory,
            },
        };

        return response;
    } catch (error) {
        throw {
            status_code: 500,
            message: error.message
        };
    }
};

exports.addCategory = async (newCategory) => {
    try {
        const isAlreadyAdded = await db.query(
            `SELECT COUNT(*) FROM public."category" where "name" = '${newCategory.name}'`
        );

        if (parseInt(isAlreadyAdded.rows[0].count) > 0) {
            throw {
                status_code: 400,
                message: "Category Duplicate",
            };
        }
        
        let insertQuery = `INSERT INTO public."category"(
	        "name")
	        VALUES ('${newCategory.name}');`;

        const result = await db.query(insertQuery);
        if (!result) {
            throw {
                status_code: 500,                
                message: result.message
            };
        }

        return true;
    } catch (error) {
        throw {
            status_code: 500,
            message: error.message || "Failed",
        };
    }
};

exports.detailsCategory = async (category_id) => {
    try {
        const category = await db.query(
            `SELECT * FROM public."category" category where category."category_id" = '${category_id}'`
        );
        if (category.rowCount == 0) {
            throw {
                status_code: 400,
                message: "Category not found"
            };
        }
        const response = {
            category_id: category.rows[0].category_id,
            name: category.rows[0].name
        };

        return response;
    } catch (error) {
        throw {
            status_code: 500,
            message: error.message || "Failed",
        };
    }
};

exports.updateCategory = async (dataCategory, category_id) => {
    try {
        const resultUpdateCategory = await db.query(`UPDATE public."category" set "name" = '${dataCategory.name}' where "category_id" = '${category_id}'`)
        if (!resultUpdateCategory) {
            throw {
                status_code: 500,
                message: resultUpdateCategory.message
            };
        }        

        return true;
    } catch (error) {
        throw {
            status_code: 500,
            message: error.message || "Failed",
        };
    }
};

exports.deleteCategory = async (category_id) => {
    try {
        const checkBlog = await db.query(
            `SELECT COUNT(*) FROM public."blog" where "category_id" = '${category_id}'`
        );

        if (parseInt(checkBlog.rows[0].count) > 0) {
            throw {
                status_code: 400,
                message: "Category can't be deleted",
            };
        }
        const resultDeleteCategory = await db.query(`DELETE FROM public."category" where "category_id" = '${category_id}'`)
        if (!resultDeleteCategory) {
            throw {
                status_code: 500,
                message: resultDeleteCategory.message
            };
        }        

        return true;
    } catch (error) {
        throw {
            status_code: 500,
            message: error.message || "Failed",
        };
    }
};