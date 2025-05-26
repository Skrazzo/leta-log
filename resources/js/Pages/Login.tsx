import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { useForm } from "@inertiajs/inertia-react";
import { FormEvent } from "react";
import { Helmet } from "react-helmet";

export default function Login() {
    function submitHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post("/login");
    }

    const { setData, post, errors } = useForm({
        email: "",
        password: "",
    });

    const changeHandler = (field: string, value: string) => {
        setData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <GuestLayout title="Login">
            <Helmet>
                <title>Login | LETA-log</title>
            </Helmet>

            <form onSubmit={submitHandler} className="flex flex-col gap-2 p-4">
                <FormInput errors={errors} name={"email"} onChange={changeHandler} />
                <FormInput errors={errors} name={"password"} type="password" onChange={changeHandler} />

                <Button>Login</Button>
                <a href="/register" className="underline text-secondary cursor-pointer hover:text-accent text-center">
                    Don't have an account?
                </a>
            </form>
        </GuestLayout>
    );
}
