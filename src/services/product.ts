import { prismaClient } from "../lib/db";

export interface CreateProductPayload {
    title: string,
    category: string,
    description: string,
    price: number,
    rentPrice?:number,
    rentType?: string,
}


export interface UpdateProdductPayload{
    id:string,
    title?: string,
    category?: string,
    description?: string,
    price?: number,
    rentPrice?:number,
    rentType?: string,
}


class ProductService{

    public static createProduct(payload:CreateProductPayload){
        const {title,category,description,price,rentPrice,rentType} = payload
        
        return prismaClient.product.create({
            data:{
                title,
                category,
                description,
                price,
                rentPrice,
                rentType
            }
        })
    }

    public static updateProduct = async ( payload:UpdateProdductPayload ) => {
        try {
            const {id,title,category,description,price,rentPrice,rentType} = payload
            const input = {
                title,
                category,
                description,
                price,
                rentPrice,
                rentType
            }
          const updatedProduct = await prismaClient.product.update({
            where: { id },
            data: input,
          });
          return updatedProduct;
        } catch (error:any) {
          throw new Error(`Error updating product: ${error.message}`);
        }
      };
    
    public static deleteProduct(id:string){
        return prismaClient.product.delete({ where: { id } });
    }
    
    public static getProductByUser(id?: string) {
        return prismaClient.product.findMany({ where: { id } });
      }

}

export default ProductService