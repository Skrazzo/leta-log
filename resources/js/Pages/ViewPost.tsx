import Button from "@/components/Button";
import Comment from "@/components/Comment";
import ContentLabel from "@/components/ContentLabel";
import FormInput from "@/components/FormInput";
import Pill from "@/components/Pill";
import { AuthLayout } from "@/Layouts/AuthLayout";
import { AuthInfo, Post } from "@/types/Data";
import { useForm } from "@inertiajs/inertia-react";
import { CalendarDays, User } from "lucide-react";

interface Props {
    auth: AuthInfo;
    post: Post;
}

export default function ViewPost({ auth, post }: Props) {
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

    return (
        <AuthLayout className="container max-w-4xl  mx-auto py-8" auth={auth}>
            <h1 className="max-sm:text-center mb-8 text-5xl font-bold text-accent">{post.title}</h1>
            <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
                <div className="flex flex-wrap gap-2 sm:gap-4 items-center justify-center">
                    {/* Info about post/author */}
                    <span className="text-secondary flex gap-1 items-center">
                        <User size={16} />
                        by{" "}
                        <strong className="text-primary">
                            {post.user.name} {post.user.surname}
                        </strong>
                    </span>

                    <span className="text-secondary flex gap-1 items-center">
                        <CalendarDays size={16} />
                        {creationDate}
                    </span>
                </div>

                <div className="flex gap-1 items-center">
                    {/* Categories */}
                    {post.categories.map((c) => (
                        <Pill key={c.id} className="text-xs font-medium whitespace-nowrap">
                            {c.name}
                        </Pill>
                    ))}
                </div>
            </div>

            <div className="mt-6 border-b border-primary/15" />

            <div
                className="pt-8 prose prose-headings:text-primary prose-hr:!my-8 prose-hr:border-primary/15 prose-p:my-4 prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none !max-w-full w-full"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <h2 className="mt-8 text-accent text-3xl font-semibold">Comments</h2>
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
