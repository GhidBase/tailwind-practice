import "../tailwind.css";
import { Outlet } from "react-router";
import Navbar from "./navbar/Navbar.jsx";
import Title from "./Title.jsx";

export default function Main() {
    return (
        <div
            id="main-page-sections"
            className="h-full w-full flex flex-col grow box-border custom-background"
        >
            <Title></Title>
            <div
                id="side-bar-and-content"
                className="w-full box-border border-t-4 border-(--outline) flex flex-1"
            >
                <Navbar></Navbar>
                <div
                    id="page-builder"
                    className="bg-(--surface-background) gap-4 p-4 flex flex-col flex-1 items-center pr-60"
                >
                    <div
                        id="content-positioner"
                        className={`max-w-230 w-full mt-5 flex flex-col grow text-(--text-color)  ${true && "gap-2"}`}
                    >
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}
