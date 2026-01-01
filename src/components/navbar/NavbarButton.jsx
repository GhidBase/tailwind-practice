import { Link } from "react-router";
import { usePage } from "../../contexts/PageProvider.jsx";

export default function NavbarButton({ slug, pageTitle, navbarTitle }) {

    return (
        <Link
            className={`w-full h-20 flex items-center justify-center`}
            to={slug}
        >
            {navbarTitle}
        </Link>
    );
}
