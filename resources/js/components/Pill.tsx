import { X } from "lucide-react";

interface Props {
    className?: string;
    children: React.ReactNode;
    onClose?: () => void;
}

export default function Pill(props: Props) {
    const clickHandler = () => {
        if (props.onClose) {
            props.onClose();
        }
    };

    return (
        <div
            className={`flex items-center gap-1 rounded-full px-2 py-1 bg-accent/10 text-xs text-accent ${props.className || ""}`}
        >
            <span>{props.children}</span>
            {props.onClose && (
                <X size={14} className="hover:text-accent/75 cursor-pointer active:scale-90" onClick={clickHandler} />
            )}
        </div>
    );
}
