# Project Documentation

## Overview

This project is a technical test for a React Developer role, utilizing Next.js, TypeScript, and Tailwind CSS. The application includes authentication, component development, dashboard generation, large data set handling, performance optimization, and testing.

## File Structure

The project follows a structured file organization to maintain clarity and separation of concerns:

```
/c:/Users/USER/Documents/CodeBase/Personal/a-safe-digital/
├── public/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   ├── utils/
│   └── index.tsx
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
```

## Task 1: Authentication with Next.js

- Secure routes using NextAuth.js for authentication.
- Implement email/password-based authentication.
- Do not use third-party authentication providers (Google, GitHub, Facebook, etc.).

## Task 2: Component Development

### UI Components

- Create a UI Kit for the project.
- Pay special attention to the components' style, ensuring the application has a nice look and feel.
- Implement a theme system with multiple theme options.

### Custom Hook

- Create a custom hook for handling complex logic to be reused across the application.

## Task 3: Dashboard Generation

- Develop a dashboard to show a summary of information.
- This dashboard should include a graph, using libraries such as D3.js, Chart.js, etc.

## Task 4: Large Data Set Handling

- Using a set of at least 1000 records, create a view that allows efficient querying and data retrieval.
- Implement an optimal way of displaying information to the user (e.g., using pagination).

## Task 5: Performance Optimisation

- Make the most of the Next.js 14 features by using server-side rendering, server components, and the streaming technique.
- Optimize the application for mobile performance using Google Lighthouse metrics.

## Task 6: Testing

- Perform unit testing of the application with Jest and/or React Testing Library.
- Perform E2E testing of the application with Cypress.

## Task 7: Documentation

- Provide a detailed README with instructions, architecture overview, and any additional information.

## Submission Guidelines

- Share the link to the Git repository containing your code.
- Ensure that your application is deployed, and share the deployment link (e.g., Netlify, Vercel).

## Running the Application

To run the application, follow these steps:

1. **Install dependencies**:
  ```bash
  npm install
  ```

2. **Start the development server**:
  ```bash
  npm run dev
  ```

## Using Cypress

To perform E2E testing with Cypress, follow these steps:

1. **Install Cypress**:
  ```bash
  npm install cypress --save-dev
  ```

2. **Open Cypress**:
  ```bash
  npx cypress open
  ```

3. **Write Tests**:
  Create test files in the `cypress/integration` directory. Example:
  ```javascript
  describe('My First Test', () => {
    it('Visits the app', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Welcome');
    });
  });
  ```

4. **Run Tests**:
  ```bash
  npx cypress run
  ```

Refer to the [Cypress documentation](https://docs.cypress.io) for more details on writing and running tests.