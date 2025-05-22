import FormInput from "@/components/FormInput";
import { useForm } from "@inertiajs/inertia-react";
import { FormEvent } from "react";

export default function Login() {
    function submitHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post("/login");
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
        password: "",
    });

    const changeHandler = (field: string, value: string) => {
        setData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <>
            <h1 className="text-2xl my-4">Login</h1>
            <form onSubmit={submitHandler} className="flex flex-col gap-2 p-4 bg-gray-100">
                <FormInput errors={errors} name={"email"} onChange={changeHandler} />
                <FormInput errors={errors} name={"password"} type="password" onChange={changeHandler} />
                <button>Login</button>
            </form>
        </>
    );
}
