import { Link } from "react-router";

export default function NavbarButton({ slug, title }) {
    return (
        <Link className={`w-full h-20 flex items-center justify-center`} to={slug}>
            {title}
        </Link>
    );
}
