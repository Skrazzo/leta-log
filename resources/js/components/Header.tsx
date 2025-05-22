import { AuthInfo } from "@/types/Auth";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { LogOut } from "lucide-react";
import NavLink from "./NavLink";
import { Link } from "@inertiajs/inertia-react";

interface HeaderProps {
    name: AuthInfo["user"]["name"];
    surname: AuthInfo["user"]["surname"];
}

export const Header = ({ name, surname }: HeaderProps) => {
    return (
        <header className="text-lg bg-gray-100 shadow">
            <div className="container mx-auto flex items-center gap-6">
                <Link href="/">
                    <span className="text-accent text-2xl font-bold">Leta-log</span>
                </Link>

                <nav>
                    <ul className="flex gap-4 h-16">
                        <NavLink href="/">Posts</NavLink>
                        <NavLink href="/new">New</NavLink>
                    </ul>
                </nav>

                <div className="flex flex-1 items-center justify-end gap-6">
                    <a href="/profile" className="text-primary hover:underline hover:text-accent cursor-pointer">
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
