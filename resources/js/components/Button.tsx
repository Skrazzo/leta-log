interface Props {
    children: React.ReactNode;
    disabled?: boolean;
    variant?: "primary";
    className?: string;
    onClick?: () => void;
}

export default function Button({ children, disabled = false, variant = "primary", className = "", onClick }: Props) {
    const clickHandler = () => {
        if (onClick) {
            onClick();
        }
    };

    // Shared style
    let style = "px-4 py-2 rounded-md cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed ";

    // Apply different styles based on variant
    switch (variant) {
        case "primary":
            style += "bg-accent text-background-light";
            break;
    }

    return (
        <button disabled={disabled} onClick={clickHandler} className={`${style} ${className}`}>
            {children}
        </button>
    );
}
