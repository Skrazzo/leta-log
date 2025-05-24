import { Trash, UserCircle } from "lucide-react";

interface CommentProps {
    name: string;
    text: string;
    isOwnComment?: boolean;
    timestamp?: string;
    className?: string;
}

const Comment: React.FC<CommentProps> = ({ name, text, isOwnComment = false, timestamp, className = "" }) => {
    // Classes for styling
    const baseContainerClasses = "p-4 border-primary/15 rounded-md flex items-start gap-3 bg-background-light border ";
    const ownCommentClasses = `border border-l-6 border-l-accent `;

    return (
        <div
            className={`
                ${baseContainerClasses}
                ${isOwnComment && ownCommentClasses}
                ${className}
            `}
        >
            {/* Avatar Section */}
            <div className="flex-shrink-0 mt-0.5">
                <UserCircle
                    strokeWidth={1.5}
                    size={40}
                    className="text-[var(--color-secondary)] opacity-70" // Placeholder icon
                />
            </div>

            {/* Content Section */}
            <div className="flex-1">
                <div className="flex items-baseline space-x-2">
                    <p className="text-md font-semibold text-primary">{name}</p>
                    {timestamp && <p className="text-xs text-secondary">{timestamp}</p>}
                </div>
                <p className="mt-1 text-md text-secondary leading-relaxed whitespace-pre-wrap">{text}</p>
            </div>

            {isOwnComment && (
                <div>
                    <Trash className="text-secondary hover:text-danger cursor-pointer" size={20} />
                </div>
            )}
        </div>
    );
};

export default Comment;
