import { Header } from "@/components/Header";
import { AuthInfo } from "@/types/Auth";

export const AuthLayout = ({ auth, children }: { auth: AuthInfo; children: React.ReactNode }) => {
    const user = auth.user;

    return (
        <>
            <Header name={user.name} surname={user.surname} />
            <main>{children}</main>
        </>
    );
};
