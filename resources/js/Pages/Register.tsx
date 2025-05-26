import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { useForm } from "@inertiajs/inertia-react";
import { FormEvent } from "react";
import { Helmet } from "react-helmet";

export default function Register() {
    function submitHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post("/register");
    }

    const { setData, post, errors } = useForm({
        email: "",
        name: "",
        surname: "",
        password: "",
    });

    // Set form data
    const inputChange = (fieldName: string, value: string) => {
        setData((prev) => ({ ...prev, [fieldName]: value }));
    };

    return (
        <GuestLayout title="Register">
            <Helmet>
                <title>Register | LETA-log</title>
            </Helmet>

            <form onSubmit={submitHandler} className="flex flex-col gap-2 p-4">
                <div className="flex items-center gap-2">
                    <FormInput containerClass="flex-1" name={"name"} onChange={inputChange} errors={errors} />
                    <FormInput containerClass="flex-1" name={"surname"} onChange={inputChange} errors={errors} />
                </div>

                <FormInput name={"email"} onChange={inputChange} errors={errors} />
                <FormInput name={"password"} type="password" onChange={inputChange} errors={errors} />
                <FormInput name={"password_confirmation"} type="password" onChange={inputChange} errors={errors} />

                <Button>Register</Button>
                <a href="/login" className="underline text-secondary cursor-pointer hover:text-accent text-center">
                    Want to login instead?
                </a>
            </form>
        </GuestLayout>
    );
}
