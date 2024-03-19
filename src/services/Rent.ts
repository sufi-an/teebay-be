import { Product, User } from "@prisma/client";
import { prismaClient } from "../lib/db";



export interface CreateRentPayload {
  productId: string,
  borrowerId: string,
  lenderId:string,
  // fromDate:Date,
  // toDate:Date
}


class RentService{

    public static async createRent (payload:CreateRentPayload){
        const {productId,borrowerId,lenderId} = payload


        
        const purchase = await prismaClient.rent.create({
            data:{
              productId,borrowerId,lenderId
            }
        })
        
       
        return purchase
    }

   
    public static async getAllRentByUser(id?: string) {
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

export default RentService