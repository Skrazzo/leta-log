import { ChangeEvent } from "react";

interface Props {
    name: string;
    type?: HTMLInputElement["type"];
    className?: string;
    onChange?: (field: string, value: string) => void;
    placeholder?: string;
    errors: Record<string, string>;
}

export default function FormInput({ name, onChange, type = "text", className = "", placeholder, errors }: Props) {
    function changeHandler(e: ChangeEvent<HTMLInputElement>) {
        if (onChange) {
            onChange(name, e.target.value);
        }
    }

    // Converts name to placeholder password_confirmation -> Password Confirmation
    function nameToPlaceHolder(name: string) {
        // Replace _ and each word starts with uppercase
        return name.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    }

    return (
        <label htmlFor={name}>
            <input
                className={`h-9 w-full bg-transparent px-3 py-1 focus:outline-none border border-primary/15 focus:border-accent rounded ${className} ${errors[name] ? "border-red-500" : ""}`}
                type={type}
                name={name}
                onChange={changeHandler}
                placeholder={placeholder || nameToPlaceHolder(name)}
            />
            {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
        </label>
    );
}
