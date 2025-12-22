import NavbarButton from "./NavbarButton";

const navbar = [
    { id: 1, slug: "/page-manager/46", title: "Stun Guide" },
    { id: 2, slug: "/page-manager/47", title: "Defense Reduction" },
    { id: 3, slug: "/page-manager/48", title: "Homepage" },
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
                        title={item.title}
                        key={item.id}
                    />
                );
            })}
        </div>
    );
}
