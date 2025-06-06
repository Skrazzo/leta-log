import { AuthInfo } from "@/types/Data";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { LogOut } from "lucide-react";
import NavLink from "./NavLink";
import { Link } from "@inertiajs/inertia-react";

interface HeaderProps {
    id: AuthInfo["user"]["id"];
    name: AuthInfo["user"]["name"];
    surname: AuthInfo["user"]["surname"];
}

export const Header = ({ id, name, surname }: HeaderProps) => {
    return (
        <header className="z-800 fixed px-4 w-full text-lg bg-gray-100 shadow">
            <div className="container mx-auto flex items-center gap-6">
                <Link href="/" className="max-sm:hidden">
                    <span className="text-accent text-2xl font-bold">LETA-log</span>
                </Link>

                <nav>
                    <ul className="flex gap-4 h-16">
                        <NavLink href="/">Posts</NavLink>
                        <NavLink href="/new">New</NavLink>
                    </ul>
                </nav>

                <div className="flex flex-1 items-center justify-end gap-6">
                    <a href={`/user/${id}`} className="text-primary hover:underline hover:text-accent cursor-pointer">
                        {capitalizeFirstLetter(name)} {surname.charAt(0).toUpperCase()}.
                    </a>
                    <a href="/logout" className="text-primary hover:text-accent cursor-pointer">
                        <LogOut size={24} />
                    </a>
                </div>
            </div>
        </header>
    );
};
