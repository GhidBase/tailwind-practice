import { usePage } from "../contexts/PageProvider";
import ldgLogo from "../assets/LDG_Title.webp";
import { useRouteLoaderData } from "react-router";

export default function Title() {
    const { pageData } = useRouteLoaderData("main");
    const title = pageData.page.title;

    return (
        <div
            id="page-builder-title"
            className="title flex items-center justify-center text-4xl sm:text-7xl"
        >
            {title == "LD Homepage" ? (
                <img
                    src={ldgLogo}
                    className=" object-cover md:h-30 lg:h-35"
                    alt=""
                />
            ) : (
                title
            )}
        </div>
    );
}
