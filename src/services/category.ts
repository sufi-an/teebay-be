import { prismaClient } from "../lib/db";



export interface CreateCategoryPayload {
    name: string,
    slug: string,
    product:[string]
}


export interface UpdateCategoryPayload{
    id:string,
    name: string,
    slug: string,
    product:[string]
}


class CategoryService{

    public static async createCategory (payload:CreateCategoryPayload){
        const {name,slug,product} = payload


        
        const category = await prismaClient.category.create({
            data:{
              name,
              slug,
            }
        })
        
        if (product && product.length > 0) {
            await prismaClient.category.update({
              where: { id: category.id },
              data: {
                product: {
                  connect: product.map((productId) => ({ id: productId })),
                },
              },
            });
        }
        return category
    }

    public static updateCategory = async ( payload:UpdateCategoryPayload ) => {
        // try {
        //     const {id,title,category,description,price,rentPrice,rentType} = payload
        //     const input = {
        //         title,
        //         category,
        //         description,
        //         price,
        //         rentPrice,
        //         rentType
        //     }
        //   const updatedProduct = await prismaClient.product.update({
        //     where: { id },
        //     data: input,
        //   });
        //   return updatedProduct;
        // } catch (error:any) {
        //   throw new Error(`Error updating product: ${error.message}`);
        // }
        return 'test update'
      };
    
    public static deleteCategory(id:string){
        return prismaClient.product.delete({ where: { id } });
    }
    
    public static async getAllCategories(id?: string) {
        const categories =  await prismaClient.category.findMany(
          { where: { id },
          include: {
            product: {
              select: {
                id: true, // Include the 'id' field
                title: true,
                price:true // Include the 'name' field
                // Add other relevant fields you want to retrieve
              },
            },
          } 
        }, 
          
          );
          console.log(categories)
          return categories
      }

}

export default CategoryService