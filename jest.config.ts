// filepath: /c:/Users/USER/Documents/CodeBase/Personal/a-safe-digital/jest.config.ts
import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig: Config = {
  preset: "ts-jest",
  resetModules: true,
  testEnvironment: "jsdom",
  moduleDirectories: ["node_modules", "<rootDir>/"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "@/lib/actions": "<rootDir>/__mocks__/actions.ts",
    "^@/(.*)$": "<rootDir>/$1",
    "@/auth": "<rootDir>/__mocks__/auth.ts",
    "next-auth/providers/credentials":
      "<rootDir>/__mocks__/next-auth-providers-credentials.ts",
    "next-auth": "<rootDir>/__mocks__/next-auth.ts",
    "@auth/mongodb-adapter": "<rootDir>/__mocks__/auth-mongodb-adapter.ts",
    "next/navigation": "<rootDir>/__mocks__/next/navigation/router.ts",
    "next/revalidate": "<rootDir>/__mocks__/next/revalidate.ts",
    'lucide-react': '<rootDir>/__mocks__/lucide-react.js',
  },
  verbose: true,
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  transformIgnorePatterns: [
  '/node_modules/(?!lucide-react)', 
  ],
};

export default createJestConfig(customJestConfig);
