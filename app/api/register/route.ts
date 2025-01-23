import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createUser } from "@/queries/user";
import { dbConnect } from "@/lib/mongoDb";
import User from "@/model/user-model";


export const POST = async (request: Request): Promise<NextResponse> => {
  const { username, email, password }: UserRequest = await request.json();

  // Create a DB Connection
  await dbConnect();

  // Encrypt the password
  const hashedPassword: string = await bcrypt.hash(password, 5);

  // Form a DB payload
  const newUser: UserRequest = {
    username,
    password: hashedPassword,
    email,
  };

  // Update the DB
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser !== null) {
      await createUser(newUser);
      return new NextResponse("User has been created", {
        status: 201,
      });
    }
    return new NextResponse("Email is already registered", {
      status: 202,
    });
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
