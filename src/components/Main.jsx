import "../tailwind.css";
import { Fragment } from "react";
import { Outlet } from "react-router";
import PageManager from "./PageManager";

export default function Main() {
    return (
        <div className="h-full box-border flex overflow-hidden items-center custom-background place-content-center">
            <Outlet />
        </div>
    );
}
