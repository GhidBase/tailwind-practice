# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

I've also added:

-   React Router - To help create an SPA that still is crawlable by googles SEO tools
-   Vitest - For TDD
-   Jsdom - Simulates a browser environment within Node.js so React components can be rendered and tested without opening a real browser.
-   react testing library with:
    -   @testing-library/react - Gives access to testing tools like "render"
    -   @testing-library/jest-dom - Includes some handy matches like "toBeInTheDocument"
    -   @testing-library/user-event - Provides the user event API to simulate user interactions with the webpage
