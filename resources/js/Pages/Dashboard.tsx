import { AuthLayout } from "@/Layouts/AuthLayout";
import { AuthInfo } from "@/types/Auth";
import { Link } from "@inertiajs/inertia-react";

interface DashboardProps {
    auth: AuthInfo;
}

export default function Dashboard({ auth }: DashboardProps) {
    return (
        <AuthLayout auth={auth}>
            <div>
                Welcome back <strong>{auth.user.name}</strong> you are logged in!
            </div>
            <Link href={"/logout"}>Logout</Link>
        </AuthLayout>
    );
}
