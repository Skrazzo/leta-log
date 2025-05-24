interface Props {
    label: string;
    children: React.ReactNode;
    containerClass?: string;
    labelClass?: string;
    required?: boolean;
}

export default function ContentLabel(props: Props) {
    return (
        <div className={`flex flex-col gap-2 ${props.containerClass}`}>
            <label
                className={`text-primary font-medium text-lg flex gap-1 ${props.labelClass}`}
                htmlFor={props.label.toLowerCase()}
            >
                {props.label}
                {props.required && <span className="text-danger">*</span>}
            </label>
            {props.children}
        </div>
    );
}
