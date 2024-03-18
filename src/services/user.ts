import { createHmac, randomBytes } from "node:crypto";
import JWT from "jsonwebtoken";
import { prismaClient } from "../lib/db";

const JWT_SECRET = "$uperM@n@123";

export interface CreateUserPayload {
  firstName: string;
  lastName?: string;
  address?: string;
  email: string;
  phoneNo?:string;
  password: string;
  confirmPassword:string
}

export interface GetUserTokenPayload {
  email: string;
  password: string;
}

class UserService {
  private static generateHash(salt: string, password: string) {
    const hashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    return hashedPassword;
  }

  public static getUserById(id?: string) {
    return prismaClient.user.findMany({ where: { id } });
  }

  public static registration(payload: CreateUserPayload) {
    const { firstName, lastName,address, email, phoneNo, password, confirmPassword } = payload;
    if (password !== confirmPassword){
      throw new Error("Both Passwords Should Match");
    }
    const salt = randomBytes(32).toString("hex");
    const hashedPassword = UserService.generateHash(salt, password);

    return prismaClient.user.create({
      data: {
        firstName,
        lastName,
        address,
        email,
        phoneNo,
        salt,
        password: hashedPassword,
      },
    });
  }

  private static getUserByEmail(email: string) {
    return prismaClient.user.findUnique({ where: { email } });
  }

  public static async login(payload: GetUserTokenPayload) {
    const { email, password } = payload;
    const user = await UserService.getUserByEmail(email);
    if (!user) throw new Error("user not found");

    const userSalt = user.salt;
    const usersHashPassword = UserService.generateHash(userSalt, password);

    if (usersHashPassword !== user.password)
      throw new Error("Incorrect Password");

    // Gen Token
    const token = JWT.sign({ id: user.id, email: user.email }, JWT_SECRET);
    return token;
  }

  public static decodeJWTToken(token: string) {
    return JWT.verify(token, JWT_SECRET);
  }
}

export default UserService;
