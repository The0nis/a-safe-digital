import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .email({
      message: "Invalid email address.",
    })
    .min(2, {
      message: "Email must be at least 2 characters.",
    }),

  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});
export const signUpformSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z
    .string()
    .email({
      message: "Invalid email address.",
    })
    .min(2, {
      message: "Email must be at least 2 characters.",
    }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});
