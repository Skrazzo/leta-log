import { Trash2, UserCircle } from "lucide-react";
import ConfirmationModal from "./ConfirmationModal";
import { useState } from "react";
import { useForm } from "@inertiajs/react";

interface CommentProps {
    id: number;
    name: string;
    text: string;
    isOwnComment?: boolean;
    timestamp?: string;
    className?: string;
}

const Comment: React.FC<CommentProps> = ({ id, name, text, isOwnComment = false, timestamp, className = "" }) => {
    // Classes for styling
    const baseContainerClasses = "p-4 border-primary/15 rounded-md flex items-start gap-3 bg-background-light border ";
    const ownCommentClasses = `border border-l-6 border-l-accent `;
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const { delete: deleteComment } = useForm();

    const deleteCommentHandler = () => {
        deleteComment(`/comment/${id}`, {
            onError: (errors) => {
                console.log(errors);
                alert("Unknown error while deleting your comment");
            },
            onFinish: () => {
                setIsDeleteModalOpen(false);
                window.location.reload();
            },
        });
    };

    return (
        <div
            className={`
                ${baseContainerClasses}
                ${isOwnComment && ownCommentClasses}
                ${className}
            `}
        >
            {/* Danger Modal Example */}
            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={deleteCommentHandler}
                variant="danger"
                title="Delete comment?"
                confirmText="Yes, Delete"
                cancelText="Cancel"
                icon={<Trash2 size={24} />} // Pass Lucide icon instance
            >
                <p className="text-primary">Are you absolutely sure you want to delete this comment?</p>
                <p className="mt-1 text-xs text-secondary">This action cannot be undone.</p>
            </ConfirmationModal>

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
                    <Trash2
                        onClick={() => setIsDeleteModalOpen(true)}
                        className="text-secondary hover:text-danger cursor-pointer"
                        size={20}
                    />
                </div>
            )}
        </div>
    );
};

export default Comment;
