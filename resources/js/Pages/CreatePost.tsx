import { AuthLayout } from "@/Layouts/AuthLayout";
import { AuthInfo } from "@/types/Auth";

export default function CreatePost({ auth }: { auth: AuthInfo }) {
    return (
        <AuthLayout auth={auth}>
            <h1>Create new blog post</h1>
        </AuthLayout>
    );
}
