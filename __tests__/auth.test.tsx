

    import NextAuth from "next-auth";
    import CredentialsProvider from "next-auth/providers/credentials";
    import bcrypt from "bcryptjs";
    import User from "@/model/user-model";
    import jwt from "jsonwebtoken";
    import config from "@/lib/config";
    import { MongoDBAdapter } from "@auth/mongodb-adapter";
    import clientPromise, { dbConnect } from "@/lib/mongoDb";
    import { generateNewTokens } from "@/lib/utils";
    import { jwtDecode } from "jwt-decode";
    import { toast } from "sonner";

    jest.mock("next-auth");
    jest.mock("next-auth/providers/credentials");
    jest.mock("bcryptjs");
    jest.mock("@/model/user-model");
    jest.mock("jsonwebtoken");
    jest.mock("@auth/mongodb-adapter");
    jest.mock("@/lib/mongoDb");
    jest.mock("@/lib/utils");
    jest.mock("jwt-decode");
    jest.mock("sonner");

    describe("Authentication Tests", () => {
        beforeEach(async () => {
            await dbConnect();
        });

        // it("should authenticate user with valid credentials", async () => {
        //     const user = {
        //       email: "test@example.com",
        //       password: "password123",
        //       username: "testuser",
        //     };
        //     const hashedPassword = "hashedPassword123";
        //     (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
        //     (User.create as jest.Mock).mockResolvedValue(user);
        //     (User.findOne as jest.Mock).mockResolvedValue({
        //       ...user,
        //       password: hashedPassword,
        //     });
        //     (bcrypt.compare as jest.Mock).mockResolvedValue(true);
        
        //     const response = await NextAuth({
        //       providers: [
        //         CredentialsProvider({
        //           name: "Credentials",
        //           credentials: {
        //             email: { label: "Email", type: "text" },
        //             password: { label: "Password", type: "password" },
        //           },
        //           authorize: async (credentials) => {
        //             console.log("credentials", credentials);
        //             const user = await User.findOne({ email: credentials.email });
        //             if (user && (await bcrypt.compare(credentials?.password as string, user.password))) {
        //                 if (!config.AUTH_SECRET || !config.REFRESH_TOKEN_SECRET) {
        //                     toast.error("Service Unavailable");
        //                     return null;
        //                 }

        //                 const accessToken = jwt.sign(
        //                     { userId: user._id },
        //                     config.AUTH_SECRET,
        //                     {
        //                         expiresIn: "15m",
        //                     }
        //                 );
        //                 const refreshToken = jwt.sign(
        //                     { userId: user._id },
        //                     config.REFRESH_TOKEN_SECRET,
        //                     { expiresIn: "7d" }
        //                 );

        //                 return {
        //                     ...user.toObject(),
        //                     accessToken,
        //                     refreshToken,
        //                 };
        //             }
        //             return null;
        //           }
        //         })
        //       ],
        //       session: {
        //         strategy: "jwt",
        //         maxAge: 24 * 60 * 60,
        //       },
        //       adapter: MongoDBAdapter(clientPromise),
        //     });
        
        //     expect(response).toBeDefined();
        //     // expect(response.user.email).toBe(user.email);
        //   });

        it("should handle token expiration", async () => {
            const user = {
                email: "test@example.com",
                password: "password123",
                username: "testuser",
            };
            const hashedPassword = "hashedPassword123";
            (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
            (User.create as jest.Mock).mockResolvedValue(user);

            if (!config.AUTH_SECRET) {
                throw new Error("AUTH_SECRET is not defined");
            }
            const expiredToken = jwt.sign({ email: user.email }, config.AUTH_SECRET, {
                expiresIn: "1s",
            });
            await new Promise((resolve) => setTimeout(resolve, 2000)); // wait for token to expire

            try {
                if (config.AUTH_SECRET) {
                    jwt.verify(expiredToken, config.AUTH_SECRET);
                } else {
                    throw new Error("AUTH_SECRET is not defined");
                }
            } catch (error) {
                if (error instanceof Error) {
                    expect(error.name).toBe("TokenExpiredError");
                }
            }
        });

        it("should not authenticate user with invalid credentials", async () => {
            const user = {
                email: "test@example.com",
                password: "password123",
                username: "testuser",
            };
            const hashedPassword = "hashedPassword123";
            (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
            (User.create as jest.Mock).mockResolvedValue(user);
            (User.findOne as jest.Mock).mockResolvedValue({
                ...user,
                password: hashedPassword,
            });
            (bcrypt.compare as jest.Mock).mockResolvedValue(false);

            const response = await NextAuth({
                providers: [
                    CredentialsProvider({
                        name: "Credentials",
                        credentials: {
                            email: { label: "Email", type: "text" },
                            password: { label: "Password", type: "password" },
                        },
                        authorize: async (credentials) => {
                            const user = await User.findOne({ email: credentials.email });
                            if (
                                user &&
                                typeof credentials.password === "string" &&
                                typeof user.password === "string" &&
                                (await bcrypt.compare(credentials.password, user.password))
                            ) {
                                return user;
                            } else {
                                return null;
                            }
                        },
                    }),
                ],
                session: {
                    strategy: "jwt",
                    maxAge: 24 * 60 * 60,
                },
                adapter: MongoDBAdapter(clientPromise),
            });

            expect(response).toBeUndefined();
        });

        it("should refresh tokens", async () => {
            const user = {
                email: "test@example.com",
                password: "password123",
                username: "testuser",
            };
            const hashedPassword = "hashedPassword123";
            const newTokens = { accessToken: "newAccessToken", refreshToken: "newRefreshToken" };
            (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
            (User.create as jest.Mock).mockResolvedValue(user);
            (generateNewTokens as jest.Mock).mockResolvedValue(newTokens);

            const tokens = await generateNewTokens(user.email);
 
            expect(tokens).toEqual(newTokens);
        });
    });
