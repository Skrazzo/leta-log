import { ChangeEvent } from "react";

interface Props {
    name: string;
    type?: HTMLInputElement["type"];
    className?: string;
    onChange?: (field: string, value: string) => void;
    placeholder?: string;
    errors: Record<string, string>;
    value?: string;
    containerClass?: string;
    maxLength?: number;
}

export default function FormInput({
    name,
    onChange,
    type = "text",
    className = "",
    placeholder,
    errors,
    value,
    containerClass,
    maxLength,
}: Props) {
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
        <div className={containerClass || ""}>
            <input
                className={`h-9 w-full px-3 py-1 focus:outline-none border border-primary/15 focus:border-accent bg-background-light rounded ${className} ${errors[name] ? "border-danger" : ""}`}
                value={value}
                type={type}
                name={name}
                onChange={changeHandler}
                placeholder={placeholder || nameToPlaceHolder(name)}
                maxLength={maxLength || 255}
            />
            {errors[name] && <p className="text-danger text-xs mt-1">{errors[name]}</p>}
        </div>
    );
}
