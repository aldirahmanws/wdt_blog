const db = require("../config/database");

exports.getBlog = async (dataQuery) => {
    try {
        const currentPage = dataQuery.page ? parseInt(dataQuery.page) : 1;
        const limit = dataQuery.limit ? parseInt(dataQuery.limit) : 10;
        const offset = currentPage ? (currentPage - 1) * limit : 0;
        const title = dataQuery.title ? dataQuery.title : "";

        const allBlog = await db.query(
            `SELECT count(*) FROM public."blog" blog INNER JOIN public."user" users ON users."user_id" = blog."user_id" INNER JOIN public."category" category ON category."category_id" = blog."category_id" WHERE blog."title" LIKE '%${title}%' `
        );
        const totalAllBlog = parseInt(allBlog.rows[0].count);
        const maxPage = Math.ceil(totalAllBlog / limit);

        const blog = await db.query(
            `SELECT blog.*, users.name as users_name, category.name as category_name  FROM public."blog" blog INNER JOIN public."user" users ON users."user_id" = blog."user_id" INNER JOIN public."category" category ON category."category_id" = blog."category_id" WHERE blog."title" LIKE '%${title}%' LIMIT ${limit} OFFSET ${offset} `
        );

        const listData = [];
        for (const itemBlog of blog.rows) {
            listData.push({
                blog_id: itemBlog.blog_id,
                title: itemBlog.title,
                description: itemBlog.description,
                user: itemBlog.users_name,
                category: itemBlog.category_name,
            });
        }
        const response = {
            List_Data: listData,
            Pagination_Data: {
                Current_Page: currentPage,
                Max_Data_Per_Page: limit,
                Max_Page: maxPage > 0 ? maxPage : 1,
                Total_All_Data: totalAllBlog,
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
exports.getMyBlog = async (dataQuery, user_id) => {
    try {
        const currentPage = dataQuery.page ? parseInt(dataQuery.page) : 1;
        const limit = dataQuery.limit ? parseInt(dataQuery.limit) : 10;
        const offset = currentPage ? (currentPage - 1) * limit : 0;
        const title = dataQuery.title ? dataQuery.title : "";

        const allBlog = await db.query(
            `SELECT count(*) FROM public."blog" blog INNER JOIN public."user" users ON users."user_id" = blog."user_id" INNER JOIN public."category" category ON category."category_id" = blog."category_id" WHERE users."user_id" = ${user_id} and blog."title" LIKE '%${title}%' `
        );
        const totalAllBlog = parseInt(allBlog.rows[0].count);
        const maxPage = Math.ceil(totalAllBlog / limit);

        const blog = await db.query(
            `SELECT blog.*, category.name as category_name  FROM public."blog" blog INNER JOIN public."user" users ON users."user_id" = blog."user_id" INNER JOIN public."category" category ON category."category_id" = blog."category_id" WHERE users."user_id" = ${user_id} and blog."title" LIKE '%${title}%' LIMIT ${limit} OFFSET ${offset} `
        );

        const listData = [];
        for (const itemBlog of blog.rows) {
            listData.push({
                blog_id: itemBlog.blog_id,
                title: itemBlog.title,
                description: itemBlog.description,
                category: itemBlog.category_name,
            });
        }
        const response = {
            List_Data: listData,
            Pagination_Data: {
                Current_Page: currentPage,
                Max_Data_Per_Page: limit,
                Max_Page: maxPage > 0 ? maxPage : 1,
                Total_All_Data: totalAllBlog,
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
exports.addBlog = async (newBlog) => {
    try {
        const checkCategory = await db.query(
            `SELECT COUNT(*) FROM public."category" where "category_id" = '${newBlog.category_id}'`
        );

        if (parseInt(checkCategory.rows[0].count) == 0) {
            throw {
                status_code: 400,
                message: "Category not found",
            };
        }
        
        let insertQuery = `INSERT INTO public."blog"(
	        "title", "description", "user_id", "category_id")
	        VALUES ('${newBlog.title}', '${newBlog.description}', ${newBlog.user.user_id}, ${newBlog.category_id});`;

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
exports.detailsBlog = async (blog_id) => {
    try {
        const blog = await db.query(
            `SELECT blog.*, users.name as users_name, category.name as category_name FROM public."blog" blog INNER JOIN public."user" users ON users."user_id" = blog."user_id" INNER JOIN public."category" category ON category."category_id" = blog."category_id" where blog."blog_id" = '${blog_id}'`
        );
        if (blog.rowCount == 0) {
            throw {
                status_code: 400,
                message: "Blog not found"
            };
        }
        const response = {
            blog_id: blog.rows[0].blog_id,
            title: blog.rows[0].title,
            description: blog.rows[0].description,
            user: blog.rows[0].users_name,
            category: blog.rows[0].category_name,
        };

        return response;
    } catch (error) {
        throw {
            status_code: 500,
            message: error.message || "Failed",
        };
    }
};
exports.updateBlog = async (dataBlog, blog_id) => {
    try {
        const checkCategory = await db.query(
            `SELECT COUNT(*) FROM public."category" where "category_id" = '${dataBlog.category_id}'`
        );

        if (parseInt(checkCategory.rows[0].count) == 0) {
            throw {
                status_code: 400,
                message: "Category not found",
            };
        }
        const resultUpdateCategory = await db.query(`UPDATE public."blog" set "title" = '${dataBlog.title}',"description" = '${dataBlog.description}',"category_id" = '${dataBlog.category_id}' where "blog_id" = '${blog_id}'`)
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
exports.deleteBlog = async (blog_id) => {
    try {
        const resultDeleteBlog = await db.query(`DELETE FROM public."blog" where "blog_id" = '${blog_id}'`)
        if (!resultDeleteBlog) {
            throw {
                status_code: 500,
                message: resultDeleteBlog.message
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