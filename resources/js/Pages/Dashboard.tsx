import ContentLabel from "@/components/ContentLabel";
import FormInput from "@/components/FormInput";
import Pagination from "@/components/Pagination";
import PostCard from "@/components/PostCard";
import Skeleton from "@/components/Skeleton";
import { AuthLayout } from "@/Layouts/AuthLayout";
import { Pagination as PaginationType, AuthInfo, Category, LaravelPagination, PostList } from "@/types/Data";
import { UrlManager } from "@/utils/UrlManager";
import axios from "axios";
import { Frown } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";

interface DashboardProps {
    auth: AuthInfo;
    categories: Category[];
}

interface SearchQuery {
    query: string;
    category: number;
    page: number;
}

export default function Dashboard({ auth, categories }: DashboardProps) {
    const initRender = useRef(true);
    const [searchQuery, setSQ] = useState<SearchQuery>({ query: "", category: 0, page: 1 });
    const urlManager = new UrlManager();
    const [posts, setPosts] = useState<null | PostList[]>(null);
    const [pagination, setPagination] = useState<PaginationType>({ currentPage: 1, totalPages: 1 });

    const fetchPosts = async (searchQuery: SearchQuery): Promise<void> => {
        setPosts(null);

        await axios
            .get<LaravelPagination<PostList[]>>("/posts", { params: searchQuery })
            .then((data) => {
                setPosts(data.data.data);
                setPagination({ currentPage: data.data.current_page, totalPages: data.data.last_page });

                // Sync back page to url parameters
                urlManager.set("p", data.data.current_page.toString());
            })
            .catch((err) => {
                console.log(err);
                alert("Error fetching posts, more info in the console.");
            });

        // After first request, we can safely say that first render is done
        if (initRender.current) {
            initRender.current = false;
        }
    };

    const categoryHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        // Set new category, and reset page to first
        setSQ({ ...searchQuery, category: parseInt(e.target.value), page: 1 });
    };

    const queryHandler = (query: string) => {
        setSQ({ ...searchQuery, query: query.trim() });
    };

    const switchPageHandler = (page: number) => {
        setSQ({ ...searchQuery, page });
    };

    // UseEffect for first page load, load url params, and do instant search
    useEffect(() => {
        const params = urlManager.getAllAsObject();
        const newSQ: SearchQuery = {
            query: params.s ? params.s.toString() : "",
            category: params.c ? parseInt(params.c.toString()) : 0, // 0 means all categories
            page: params.p ? parseInt(params.p.toString()) : 1,
        };

        setSQ(newSQ);
        fetchPosts(newSQ);
    }, []);

    // UseEffect for when search query, wait for user to stop typing
    useEffect(() => {
        if (initRender.current) {
            // Prevent effect call on first render
            return;
        }

        // Update url parametrs based on SQ
        urlManager.set("s", searchQuery.query);

        // Do delayed search after 750 mili seconds of search changing
        const timeout = setTimeout(() => {
            // When doing new search, reset page to first
            fetchPosts({ ...searchQuery, page: 1 });
        }, 750);

        return () => clearTimeout(timeout);
    }, [searchQuery.query]);

    // Instant search when page/category changes
    useEffect(() => {
        if (initRender.current) {
            // Prevent effect call on first render
            return;
        }

        urlManager.setMultiple({
            p: searchQuery.page.toString(),
            c: searchQuery.category ? searchQuery.category.toString() : "0",
        });

        fetchPosts(searchQuery);
    }, [searchQuery.page, searchQuery.category]);

    return (
        <AuthLayout className="container mx-auto py-8" auth={auth}>
            <Helmet>
                <title>All blog posts | LETA-log</title>
            </Helmet>

            <h1 className="mb-8 text-3xl font-bold text-accent">Blog posts</h1>

            <ContentLabel label="Search and filter">
                <section className="flex gap-2">
                    <FormInput
                        containerClass="flex-1"
                        className="bg-background-light"
                        value={searchQuery.query}
                        placeholder="Search by keywords"
                        name=""
                        errors={{}}
                        onChange={(_, query) => queryHandler(query)}
                    />
                    <select
                        className="outline-none outline-1 focus:outline-solid outline-accent text-secondary px-2 bg-background-light border border-primary/15 rounded"
                        value={searchQuery.category || 0}
                        onChange={categoryHandler}
                    >
                        <option value="0">Select category</option>
                        {categories.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </section>
            </ContentLabel>

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
                    <strong className="text-3xl font-bold text-accent ">No posts found</strong>
                    <p className="text-secondary max-w-[275px]">
                        Try to change your search query or select a different category to see posts.
                    </p>
                </div>
            )}

            <Pagination className="mt-8" {...pagination} onPageChange={switchPageHandler} />
        </AuthLayout>
    );
}
