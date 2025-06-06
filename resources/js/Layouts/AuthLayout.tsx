import { Header } from "@/components/Header";
import { AuthInfo } from "@/types/Data";

export const AuthLayout = ({
    auth,
    children,
    className,
}: {
    auth: AuthInfo;
    children: React.ReactNode;
    className?: string;
}) => {
    const user = auth.user;

    return (
        <>
            <Header id={user.id} name={user.name} surname={user.surname} />
            <main className={`pt-24 px-4 ${className}`}>{children}</main>
        </>
    );
};
