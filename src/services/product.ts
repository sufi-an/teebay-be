import { prismaClient } from "../lib/db";



export interface CreateProductPayload {
    title: string,
    category:[string],
    description: string,
    price: number,
    rentPrice?:number,
    rentType?: string,
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
        const {title,category,description,price,rentPrice,rentType} = payload
        console.log(category)

        
        const product = await prismaClient.product.create({
            data:{
                title,
                description,
                price,
                rentPrice,
                rentType
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
    
    public static deleteProduct(id:string){
        return prismaClient.product.delete({ where: { id } });
    }
    
    public static getProductByUser(id?: string) {
        return prismaClient.product.findMany(
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