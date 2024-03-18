import { Product, User } from "@prisma/client";
import { prismaClient } from "../lib/db";



export interface CreatePurchasePayload {
  productId: string,
  buyerId: string,
  sellerId:string
}


class PurchaseService{

    public static async createPurchase (payload:CreatePurchasePayload){
        const {productId,sellerId,buyerId} = payload


        
        const purchase = await prismaClient.purchase.create({
            data:{
              productId,sellerId,buyerId
            }
        })
        
       
        return purchase
    }

   
    public static async getAllPurchase(id?: string) {
        const purchases =  await prismaClient.purchase.findMany(
          { where: { id },
          include: {
            product: {
              select: {
                id: true, 
                title: true,
                price:true 
                // Add other relevant fields you want to retrieve
              },
            },
            buyer: {
              select: {
                id: true, 
                firstName: true,
                lastName:true 
                // Add other relevant fields you want to retrieve
              },
            },
            seller: {
              select: {
                id: true, 
                firstName: true,
                lastName:true 
                // Add other relevant fields you want to retrieve
              },
            },
          } 
        }, 
          
          );
          console.log(purchases)
          return purchases
      }

}

export default PurchaseService