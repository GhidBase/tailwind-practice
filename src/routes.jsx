import Checklist from "./components/Checklist";
import Main from "./components/Main";
import PageManager from "./components/PageManager";
import PageBuilder from "./components/PageBuilder";
import EditorExample from "./components/TextEditor";
import oldRoutes from "./js/oldRoutes.jsx";
import NotFound from "./components/NotFound.jsx";
import GuardianCosts from "./components/mini-apps/GuardianCosts.jsx";

const routes = [
    ...oldRoutes,
    {
        path: "*",
        element: <Main />,
        children: [
            { path: ":pageTitle", element: <PageBuilder /> },
            { path: "flea-guide/", element: <Checklist checklistId={1} /> },
            { path: "page-manager/:pageId", element: <PageBuilder /> },
            { path: "page-manager/", element: <PageManager isAdmin={true} /> },
            { path: "editor-test/", element: <EditorExample /> },
            { path: "guardian-upgrade-costs", element: <GuardianCosts /> },
            { path: "404/", element: <NotFound /> },
            { path: "*", element: <PageBuilder /> },
        ],
    },
];

export default routes;
