
import User from "@/model/user-model";


export async function createUser(user: UserRequest): Promise<void> {
  try {
    await User.create(user);
  } catch (e: any) {
    throw new Error(e);
  }
}


