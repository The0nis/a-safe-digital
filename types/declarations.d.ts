type ThemeType = {
  light: { name: string; color: string }[];
  dark: { name: string; color: string }[];
};

interface LogoParams {
  width?: string;
  height?: string;
}
interface UserCredentials {
  email: string;
  password: string;
}

interface Credentials {
  email: string;
  password: string;
}
interface User {
  id: string;
  email: string;
  password: string;
  accessToken?: string;
  refreshToken?: string;
}

interface UserRequest {
  username: string;
  email: string;
  password: string;
}

interface MiddlewareRequest {
  nextUrl: {
    pathname: string;
  };
}

interface Token {
  accessToken: string;
  refreshToken: string;
  error?: string;
  accessTokenExpires?: number;
  user?: any;
}

interface TokensResponse {
  accessToken: string;
  refreshToken?: string;
}

type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

type Data = {
  id: number;
  gender: string;
  first_name: string;
  last_name: string;
  username: string;
  title: string;
  email: string;
  ip_address: string;
  // Add other fields as necessary
};

interface FetchCustomerParams {
  perPage: number;
  currentPage: number;
  search: string;
}
