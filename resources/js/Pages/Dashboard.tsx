import { AuthInfo } from "@/types/Auth";
import { Link } from "@inertiajs/inertia-react";

export default function Dashboard({ auth }: AuthInfo) {
    console.log(auth);

    return (
        <>
            <div>
                Welcome back <strong>{auth.user.username}</strong> you are logged in!
            </div>
            <Link href={"/logout"}>Logout</Link>
        </>
    );
}
