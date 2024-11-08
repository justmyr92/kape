import { Link, useLocation } from "react-router-dom";
import navLogo from "../assets/logo/logo.png";
import { useState, useEffect } from "react";

interface NavLinks {
    id: number;
    path: string;
    name: string;
}

const Navbar = () => {
    const links: NavLinks[] = [
        {
            id: 1,
            path: "/home",
            name: "Home",
        },
        {
            id: 2,
            path: "/menu",
            name: "Menu",
        },
        {
            id: 3,
            path: "/promotions",
            name: "Promos",
        },
        {
            id: 4,
            path: "/store-locations",
            name: "Store Locations",
        },
    ];

    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation(); // Get current location

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Cleanup the event listener on unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav
            className={`fixed w-full z-20 transition-all duration-300 ${
                isScrolled ? "bg-white shadow-md" : "bg-transparent"
            }`}
        >
            <div className="container mx-auto flex justify-between px-1.5 py-4">
                <div className="logo__container">
                    <Link to={"/"}>
                        <img src={navLogo} alt="coffee_best_cage_logo.png" />
                    </Link>
                </div>
                <div className="nav__link__container">
                    <ul className="flex gap-2">
                        {links.map((link: NavLinks) => (
                            <li
                                key={link.id}
                                className={`nav__links px-3 py-2.5 relative ${
                                    location.pathname === link.path
                                        ? "text-amber-500"
                                        : "text-black"
                                }`}
                            >
                                <Link to={link.path}>{link.name}</Link>
                                {location.pathname === link.path && (
                                    <span className="absolute bottom-0 left-0 w-full h-1 bg-amber-500"></span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
