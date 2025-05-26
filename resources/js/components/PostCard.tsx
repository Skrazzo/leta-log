import { User, CalendarDays, MessageSquare } from "lucide-react";
import Pill from "./Pill";

interface Category {
    id: string | number;
    name: string;
}

interface Author {
    id: number;
    name: string;
    surname: string;
}

interface PostCardProps {
    postUrl: string;
    title: string;
    preview: string;
    categories: Category[];
    author: Author;
    commentCount: number;
    createdAt: string;
    className?: string;
}

const PostCard: React.FC<PostCardProps> = ({
    postUrl,
    title,
    preview,
    categories,
    author,
    commentCount,
    createdAt,
    className = "",
}) => {
    const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const getCategoryDisplay = () => {
        if (!categories || categories.length === 0) {
            return null;
        }
        if (categories.length === 1) {
            return categories[0].name;
        }
        return `${categories[0].name} +${categories.length - 1}`;
    };

    const categoryDisplay = getCategoryDisplay();

    return (
        <a
            href={postUrl}
            className={`flex flex-col justify-between bg-background-light rounded-lg shadow-xs border border-primary/15 hover:shadow-lg transition-shadow duration-200 ease-in-out overflow-hidden ${className}`}
            aria-label={`Read more about ${title}`}
        >
            <div className="p-5 md:p-6">
                <div className="flex justify-between items-center mb-3">
                    {/* Title limited to 2 lines */}
                    <h3 className="text-xl font-semibold text-primary leading-tight line-clamp-2">{title}</h3>
                    {categoryDisplay && (
                        <div className="flex-shrink-0 ml-2 mt-0.5">
                            <Pill className="text-xs font-medium whitespace-nowrap">{categoryDisplay}</Pill>
                        </div>
                    )}
                </div>

                <p className="text-secondary text-sm mb-4 leading-relaxed line-clamp-3">{preview}</p>
            </div>

            <div className="border-t border-primary/15 px-5 md:px-6 py-4">
                <div className="grid grid-cols-2 justify-between items-center gap-y-2 gap-x-4 text-xs text-secondary">
                    <a
                        href={`/user/${author.id}`}
                        className="flex col-span-2 text-primary items-center hover:underline hover:text-accent"
                    >
                        <User size={14} className="mr-1.5 text-secondary" />
                        <span>
                            {author.name} {author.surname}
                        </span>
                    </a>
                    <div className="flex items-center">
                        <CalendarDays size={14} className="mr-1.5 text-secondary" />
                        <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center">
                        <MessageSquare size={14} className="mr-1.5 text-secondary" />
                        <span>
                            {commentCount} {commentCount === 1 ? "comment" : "comments"}
                        </span>
                    </div>
                </div>
            </div>
        </a>
    );
};

export default PostCard;
