import NavbarButton from "./NavbarButton";

const navbar = [
    {
        id: 1,
        slug: "/page-manager",
        pageTitle: "Page Manager",
        navbarTitle: "Page Manager",
    },
];

export default function Navbar() {
    return (
        <div
            id="nav-bar"
            className="h-full bg-(--primary) border-r-4 border-(--outline) flex flex-col w-60"
        >
            {navbar.map((item) => {
                return (
                    <NavbarButton
                        slug={item.slug}
                        pageTitle={item.pageTitle}
                        navbarTitle={item.navbarTitle}
                        key={item.id}
                    />
                );
            })}
        </div>
    );
}
