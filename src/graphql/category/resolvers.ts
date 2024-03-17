import CategoryService, { CreateCategoryPayload, UpdateCategoryPayload } from "../../services/category";
// getUserToken
const queries = {
  getAllCategories: async (_: any, parameters: any, context: any) => {
    // console.log(parameters,context)
    const categories = await CategoryService.getAllCategories();
    console.log(categories)
      return categories;
    // throw new Error("I dont know who are you");
    // return 'Category list'
  },

};

const mutations = {
  createCategory: async (_: any, payload: CreateCategoryPayload) => {
    console.log(payload)
    const res = await CategoryService.createCategory(payload);
    return res.id;

  },
  updateCategory:async (_: any, payload: UpdateCategoryPayload) => {

    const res = await CategoryService.updateCategory(payload);
    return res;

  },
  deleteCategory:async (_: any, parameters: any) => {
    
    const res = await CategoryService.deleteCategory(parameters.categoryId);
    return res.id;
    
  },
};

export const resolvers = { queries, mutations };
