import "../tailwind.css";
import { Fragment } from "react";
import { Outlet } from "react-router";
import PageManager from "./PageManager";

export default function Main() {
    const isAdmin = true;

    return (
        <div className="h-full flex flex-col overflow-hidden items-center custom-background place-content-center">
            <div id="readability-width-constraint" className="w-230">
                <PageManager isAdmin={isAdmin} />
            </div>
            <Outlet />
        </div>
    );
}
