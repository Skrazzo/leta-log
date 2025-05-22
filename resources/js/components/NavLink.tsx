import { Link } from "@inertiajs/inertia-react";

interface Props {
    children: React.ReactNode;
    className?: string;
    href: string;
}

export default function ({ className, children, href }: Props) {
    const inActive = "text-secondary border-b-2 border-transparent";
    const active = "text-accent border-b-2";
    const isActive = href === window.location.pathname;

    return (
        <li className={`flex items-center px-2 ${isActive ? active : inActive}`}>
            <Link href={href} className={className}>
                {children}
            </Link>
        </li>
    );
}
