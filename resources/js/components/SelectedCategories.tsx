import { Category } from "@/types/Data";
import Pill from "./Pill";

interface Props {
    selected: number[];
    categories: Category[];
    onChange: (data: number[]) => void;
}

export default function SelectedCategories(props: Props) {
    const display = props.categories.filter((c) => props.selected.includes(c.id));

    const onRemoveHandler = (id: number) => {
        const updatedArr = props.selected.filter((cId) => cId !== id);
        props.onChange(updatedArr);
    };

    return (
        <div className="flex flex-wrap gap-1 items-center">
            {display.map((c, i) => (
                <Pill key={i} onClose={() => onRemoveHandler(c.id)}>
                    {c.name}
                </Pill>
            ))}
        </div>
    );
}
