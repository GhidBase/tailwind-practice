import Checklist from "./components/Checklist";
import Main from "./components/Main";
import PageManager from "./components/PageManager";
import PageBuilder from "./components/PageBuilder";
import EditorExample from "./components/TextEditor";

const routes = [
    {
        path: "/",
        element: <Main />,
        children: [
            { path: ":pageTitle", element: <PageBuilder /> },
            { path: "flea-guide/", element: <Checklist checklistId={1} /> },
            { path: "page-manager/:pageId", element: <PageBuilder /> },
            { path: "page-manager/", element: <PageManager isAdmin={true} /> },
            { path: "editor-test/", element: <EditorExample /> },
        ],
    },
];

export default routes;
