export interface AuthInfo {
    user: {
        id: number;
        email: string;
        name: string;
        surname: string;
        created_at: string;
        updated_at: string;
    };
}

export interface Category {
    id: number;
    name: string;
}

export interface Comment {
    id: number;
    user_id: number;
    user: User;
    post_id: number;
    comment: string;
    updated_at: string;
    created_at: string;
    created_at_diff: string;
}

export interface User {
    id: number;
    name: string;
    surname: string;
}

export interface LaravelPagination<T> {
    current_page: number;
    data: null | T;
    first_page_url: null | string;
    from: null | number;
    last_page: number;
    last_page_url: null | string;
    links: null | string[];
    next_page_url: null | string;
    path: string | null;
    per_page: number | null;
    prev_page_url: null | string;
    to: number | null;
    total: number | null;
}

// Used in dashboard
export interface PostList {
    categories: Category[];
    comments_count: number;
    content: string;
    created_at: string;
    id: number;
    text: string;
    title: string;
    updated_at: string;
    user: User;
    user_id: number;
}

// Single post view
export interface Post {
    id: number;
    categories: Category[];
    comments: Comment[];
    comments_count: number;
    content: string;
    text: string;
    title: string;
    updated_at: string;
    created_at: string;
    user: User;
    user_id: number;
}

export interface Pagination {
    currentPage: number;
    totalPages: number;
}
