import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Checklist from "./components/Checklist.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import routes from "./routes.jsx";
import { PageProvider } from "./contexts/PageProvider.jsx";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <PageProvider>
            <RouterProvider router={router}></RouterProvider>
        </PageProvider>
    </StrictMode>,
);
