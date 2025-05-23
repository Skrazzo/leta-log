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
            <Header name={user.name} surname={user.surname} />
            <main className={className}>{children}</main>
        </>
    );
};
