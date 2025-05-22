import FormInput from "@/components/FormInput";
import { useForm } from "@inertiajs/inertia-react";
import { ChangeEvent, FormEvent, FormEventHandler, InputEvent, useEffect } from "react";

export default function Register() {
    function submitHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post("/register");
    }

    const {
        data,
        setData,
        post,
        // delete: destroy, // way of setting these function with different names
        processing,
        reset,
        errors,
    } = useForm({
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
        <form onSubmit={submitHandler} className="flex flex-col grow gap-2 bg-gray-100">
            <div className="flex items-center gap-2">
                <FormInput name={"name"} onChange={inputChange} errors={errors} />
                <FormInput name={"surname"} onChange={inputChange} errors={errors} />
            </div>

            <FormInput name={"email"} onChange={inputChange} errors={errors} />
            <FormInput name={"password"} type="password" onChange={inputChange} errors={errors} />
            <FormInput name={"password_confirmation"} type="password" onChange={inputChange} errors={errors} />

            <button>Register</button>
        </form>
    );
}
