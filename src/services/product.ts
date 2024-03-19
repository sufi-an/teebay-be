import { prismaClient } from "../lib/db";



export interface CreateProductPayload {
    title: string,
    category:[string],
    description: string,
    price: number,
    rentPrice?:number,
    rentType?: string,
    userId: string
}


export interface UpdateProdductPayload{
    id:string,
    title?: string,
    category?: [string],
    description?: string,
    price?: number,
    rentPrice?:number,
    rentType?: string,
}


class ProductService{

    public static async createProduct (payload:CreateProductPayload){
        const {title,category,description,price,rentPrice,rentType,userId} = payload
        console.log(category)

        
        const product = await prismaClient.product.create({
            data:{
                title,
                description,
                price,
                rentPrice,
                rentType,
                userId
            }
        })
        const categories = category.map((categoryId) => ({ id: categoryId }))
        console.log(categories)
        if (category && category.length > 0) {
            await prismaClient.product.update({
              where: { id: product.id },
              data: {
                category: {
                  connect: category.map((categoryId) => ({ id: categoryId })),
                },
              },
            });
        }
        return product
    }

    public static updateProduct = async ( payload:UpdateProdductPayload ) => {
        try {
            const {id,title,category,description,price,rentPrice,rentType} = payload
            const input = {
                title,
                description,
                price,
                rentPrice,
                rentType
            }
          const updatedProduct = await prismaClient.product.update({
            where: { id },
            data: input,
          });
          
          if (category && category.length > 0) {
          
            await prismaClient.product.update({
              where: { id: updatedProduct.id },
              data: {
                category: {
                  connect: category.map((categoryId) => ({ id: categoryId })),
                },
              },
            });
        }
          return updatedProduct;
        } catch (error:any) {
          throw new Error(`Error updating product: ${error.message}`);
        }
        
      };
    
    public static deleteProduct(id:string){
        return prismaClient.product.delete({ where: { id } });
    }
    
    public static getProductByUser(userId?: string) {
      console.log(userId)
        return prismaClient.product.findMany(
            { 
                where: { userId },
                include: {
                    category: {
                      select: {
                        id: true, // Include the 'id' field
                        name: true,
                        slug:true // Include the 'name' field
                        // Add other relevant fields you want to retrieve
                      },
                    },
                    // user:{
                    //   select:{
                    //     id:true,
                    //     firstName:true,
                    //     email:true
                    //   }
                    // }
                  } 
         });
      }

      public static getProductById(id: string) {
        return prismaClient.product.findUnique(
            { 
                where: { id },
                include: {
                    category: {
                      select: {
                        id: true, // Include the 'id' field
                        name: true,
                        slug:true // Include the 'name' field
                        // Add other relevant fields you want to retrieve
                      },
                    },
                  } 
         });
      }

}

export default ProductService