import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User  from "@/model/user-model";
import jwt from "jsonwebtoken";
import config from "@/lib/config";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise, { dbConnect } from "@/lib/mongoDb";
import { generateNewTokens } from "@/lib/utils";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";


export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 Day
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (credentials === null) return null;
        await dbConnect();
        try {
          const { email, password } = credentials;
          const user = await User.findOne({ email });

          if (user) {
            const isMatch = await bcrypt.compare(
              password as string,
              user.password
            );

            if (isMatch) {
              if (!config.AUTH_SECRET || !config.REFRESH_TOKEN_SECRET) {
                toast.error("Service Unavailable");
                return null;
              }
              // Cookies.set("user", JSON.stringify(user));

              const accessToken = jwt.sign(
                { userId: user._id },
                config.AUTH_SECRET,
                {
                  expiresIn: "15m",
                }
              );
              const refreshToken = jwt.sign(
                { userId: user._id },
                config.REFRESH_TOKEN_SECRET,
                { expiresIn: "7d" }
              );

              return {
                accessToken,
                refreshToken,
                email: user.email,
              };
            } else {
              toast.error("Invalid credentials");
              return null;
            }
          } else {
            toast.error("Invalid credentials");
            return null;
          }
        } catch (e) {
          console.error(e);
          toast.error("An error occurred");
          return null;
        }
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, account, user }) => {
      // user is only available the first time a user signs in authorized
      console.log(`In jwt callback - Token is ${JSON.stringify(token)}`);

      if (token.accessToken) {
        const decodedToken = jwtDecode(token.accessToken as string);
        token.accessTokenExpires =
          decodedToken.exp !== undefined ? decodedToken.exp * 1000 : 0;
      }

      if (account && user) {
        // console.log(`In jwt callback - User is ${JSON.stringify(user)}`);
        // console.log(`In jwt callback - account is ${JSON.stringify(account)}`);

        return {
          ...token,
          accessToken: (user as any).accessToken,
          refreshToken: (user as any).refreshToken,
          user,
        };
      }

      // Return previous token if the access token has not expired yet
      console.log(
        "**** Access token expires on *****",
        token.accessTokenExpires,
        new Date(token.accessTokenExpires as number)
      );
      if (Date.now() < (token.accessTokenExpires as number)) {
        // console.log("**** returning previous token ******");
        return token;
      }

      // Access token has expired, try to update it
      console.log("**** Update Refresh token ******");
      return generateNewTokens(token as any);
    },
    session: async ({ session, token }: { session: any; token: any }) => {
      // console.log(`In session callback - Token is ${JSON.stringify(token)}`);
      if (token) {
        session.accessToken = token.accessToken;
        session.user = token.user;
      }
      console.log(
        `In after session callback - Session is ${JSON.stringify(session)}`
      );

      return session;
    },
  },
});
