import Pagination from "@/components/Pagination";
import PostCard from "@/components/PostCard";
import Skeleton from "@/components/Skeleton";
import { AuthLayout } from "@/Layouts/AuthLayout";
import { AuthInfo, LaravelPagination, Pagination as PaginationType, PostList, User } from "@/types/Data";
import { UrlManager } from "@/utils/UrlManager";
import axios from "axios";
import { Frown } from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

interface Props {
    auth: AuthInfo;
    user: User;
}

export default function UserProfile({ auth, user }: Props) {
    const [posts, setPosts] = useState<null | PostList[]>(null);
    const urlManager = new UrlManager();
    const [pagination, setPagination] = useState<PaginationType>({
        currentPage: parseInt(urlManager.get("p") || "1"),
        totalPages: 1,
    });

    const fetchPosts = () => {
        setPosts(null);
        axios
            .get<LaravelPagination<PostList[]>>("/posts", {
                params: {
                    page: pagination.currentPage,
                    author: user.id,
                },
            })
            .then((data) => {
                setPosts(data.data.data);
                setPagination({ currentPage: data.data.current_page, totalPages: data.data.last_page });
            })
            .catch((err) => {
                console.log(err);
                alert("Error fetching posts, more info in the console.");
            });
    };

    const switchPageHandler = (page: number) => {
        setPagination({ ...pagination, currentPage: page });
    };

    useEffect(() => {
        urlManager.set("p", pagination.currentPage.toString());
        fetchPosts();
    }, [pagination.currentPage]);

    return (
        <AuthLayout className="container mx-auto py-8" auth={auth}>
            <Helmet>
                <title>
                    {user.name} {user.surname} | LETA-log
                </title>
            </Helmet>

            <h1 className="mb-8 text-3xl font-bold text-accent">
                Blog posts by {user.name} {user.surname}
            </h1>

            {/* Show posts */}
            {posts && posts.length > 0 && (
                <section className="mt-8">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {posts.map((post) => (
                            <PostCard
                                key={post.id}
                                postUrl={`/post/${post.id}`}
                                title={post.title}
                                preview={post.text}
                                categories={post.categories}
                                author={post.user}
                                commentCount={post.comments_count}
                                createdAt={post.created_at}
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* Loading state  */}
            {posts === null && (
                <div className="my-4 gap-4 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {new Array(12).fill(null).map((_, i) => (
                        <Skeleton key={i} className="w-full h-[250px] rounded-full" />
                    ))}
                </div>
            )}

            {/* No posts found */}
            {posts && posts.length === 0 && (
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <Frown className="mt-20 text-accent" size={100} />
                    <strong className="text-3xl font-bold text-accent ">No posts</strong>
                    <p className="text-secondary max-w-[275px]">
                        {user.name} {user.surname} hasn't posted any blog posts yet.
                    </p>
                </div>
            )}

            <Pagination className="mt-8" {...pagination} onPageChange={switchPageHandler} />
        </AuthLayout>
    );
}
