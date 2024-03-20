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


        
        const rent = await prismaClient.rent.create({
            data:{
              productId,borrowerId,lenderId
            }
        })
        
       
        return rent
    }

   
    public static async getAllRentByUser(lenderId: string) {
        const rents =  await prismaClient.rent.findMany(
          { where: { lenderId },
          include: {
            product: {
              select: {
                id: true, 
                title: true,
                price:true, 
                category:true,
                description:true,
                rentPrice:true,
                rentType:true
                // Add other relevant fields you want to retrieve
              },
            },
            lender: {
              select: {
                id: true, 
                firstName: true,
                email:true 
                // Add other relevant fields you want to retrieve
              },
            },
            borrower: {
              select: {
                id: true, 
                firstName: true,
                email:true 
                // Add other relevant fields you want to retrieve
              },
            },
          } 
        }, 
          
          );
          console.log(rents)
          return rents
      }
      public static async getAllBorrowByUser(borrowerId: string) {
        const borrows =  await prismaClient.rent.findMany(
          { where: { borrowerId },
          include: {
            product: {
              select: {
                id: true, 
                title: true,
                price:true, 
                category:true,
                description:true,
                rentPrice:true,
                rentType:true
                // Add other relevant fields you want to retrieve
              },
            },
            lender: {
              select: {
                id: true, 
                firstName: true,
                email:true 
                // Add other relevant fields you want to retrieve
              },
            },
            borrower: {
              select: {
                id: true, 
                firstName: true,
                email:true 
                // Add other relevant fields you want to retrieve
              },
            },
          } 
        }, 
          
          );
          console.log(borrows)
          return borrows
      }
}

export default RentService