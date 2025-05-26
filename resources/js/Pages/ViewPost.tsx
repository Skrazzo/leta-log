import Button from "@/components/Button";
import Comment from "@/components/Comment";
import ConfirmationModal from "@/components/ConfirmationModal";
import ContentLabel from "@/components/ContentLabel";
import FormInput from "@/components/FormInput";
import Pill from "@/components/Pill";
import { AuthLayout } from "@/Layouts/AuthLayout";
import { AuthInfo, Post } from "@/types/Data";
import { useForm } from "@inertiajs/inertia-react";
import { CalendarDays, Edit, Trash2, User } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet";

interface Props {
    auth: AuthInfo;
    post: Post;
}

export default function ViewPost({ auth, post }: Props) {
    const postOwner = post.user_id === auth.user.id;
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const creationDate = new Date(post.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const commentPostHandler = () => {
        postComment(`/comment/${post.id}`);
        reset();
    };

    const {
        data,
        setData,
        reset,
        post: postComment,
        processing,
        errors,
    } = useForm({
        comment: "",
    });

    const deletePostHandler = () => {
        deletePost(`/post/${post.id}`, {
            onError: (errors) => {
                console.log(errors);
                alert("Unknown error while deleting your post");
            },
        });
    };

    const { delete: deletePost } = useForm();

    const EditDeleteButtons = ({ className }: { className?: string }) => {
        const sharedClass = "cursor-pointer text-primary transition duration-150 ";
        return (
            <div className={`flex w-min gap-3 items-center transition duration-150 ${className || ""}`}>
                {/* Edit and delete buttons */}
                <Edit
                    className={`${sharedClass} hover:text-accent`}
                    onClick={() => (window.location.href = `/post/edit/${post.id}`)}
                />
                <Trash2 className={`${sharedClass} hover:text-danger`} onClick={() => setDeleteConfirmOpen(true)} />
            </div>
        );
    };

    return (
        <AuthLayout className="container max-w-4xl  mx-auto py-8" auth={auth}>
            <Helmet>
                <title>{post.title} | LETA-log</title>
            </Helmet>
            <ConfirmationModal
                isOpen={deleteConfirmOpen}
                onClose={() => setDeleteConfirmOpen(false)}
                onConfirm={deletePostHandler}
                variant="danger"
                title="Post deletion"
                confirmText="Yes, delete"
                icon={<Trash2 size={24} />}
            >
                <p className="text-primary">Are you absolutely sure you want to delete this post?</p>
                <p className="mt-1 text-xs text-secondary">This action cannot be undone.</p>
            </ConfirmationModal>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center mb-4 sm:mb-8">
                <h1 className="max-sm:text-center text-3xl sm:text-5xl font-bold text-accent">{post.title}</h1>
                {postOwner && <EditDeleteButtons className="max-sm:hidden" />}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="flex flex-wrap gap-2 sm:gap-4 items-center justify-center">
                    {/* Info about post/author */}
                    <span className="text-secondary flex gap-1 items-center ">
                        <User size={16} />
                        by{" "}
                        <a
                            href={`/user/${post.user.id}`}
                            className="text-primary font-bold hover:underline hover:text-accent"
                        >
                            {post.user.name} {post.user.surname}
                        </a>
                    </span>

                    <span className="text-secondary flex gap-1 items-center">
                        <CalendarDays size={16} />
                        {creationDate}
                    </span>
                </div>

                <div className="sm:ml-auto flex gap-1 items-center">
                    {/* Categories */}
                    {post.categories.map((c) => (
                        <a className="cursor-pointer" href={`/?p=1&c=${c.id}`}>
                            <Pill key={c.id} className="text-xs font-medium whitespace-nowrap">
                                {c.name}
                            </Pill>
                        </a>
                    ))}
                </div>

                {postOwner && <EditDeleteButtons className="sm:hidden" />}
            </div>

            <div className="mt-6 border-b border-primary/15" />

            <div
                className="pt-8 prose-headings:text-primary prose-hr:!my-8 prose-hr:border-primary/15 prose-p:my-4 prose lg:prose-lg xl:prose-xl focus:outline-none !max-w-full w-full"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <h2 className="mt-8 text-accent text-2xl sm:text-3xl font-semibold">Comments</h2>
            <ContentLabel label="Share your thoughts about this post" labelClass="text-secondary mt-2 text-md">
                <div className="flex gap-1">
                    <FormInput
                        containerClass="flex-1"
                        className="w-full h-10 bg-background-light"
                        onChange={(_, val) => setData("comment", val)}
                        value={data.comment}
                        name="comment"
                        errors={errors}
                    />
                    <div>
                        <Button disabled={processing} onClick={commentPostHandler}>
                            Post
                        </Button>
                    </div>
                </div>
            </ContentLabel>

            {post.comments && post.comments.length > 0 && (
                <div className="mt-4 flex flex-col gap-4">
                    {post.comments.map((c) => (
                        <Comment
                            key={c.id}
                            id={c.id}
                            name={c.user.name}
                            text={c.comment}
                            timestamp={c.created_at_diff}
                            isOwnComment={c.user.id === auth.user.id}
                        />
                    ))}
                </div>
            )}

            {post.comments.length === 0 && <div className="mt-6 text-secondary text-center">No comments yet</div>}
        </AuthLayout>
    );
}
