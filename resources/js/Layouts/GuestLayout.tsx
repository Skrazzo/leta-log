interface Props {
    children: React.ReactNode;
    title: string;
}

export default function GuestLayout({ children, title }: Props) {
    return (
        <main className="h-screen bg-cover bg-center bg-[url(/public/blog-wallpaper.png)]">
            <aside className="p-4 w-full md:w-1/2 xl:w-1/3 h-screen bg-background shadow flex flex-col justify-center relative">
                <h1 className="text-3xl font-bold text-accent text-center mb-4">LETA Log - {title}</h1>
                {children}

                <footer className="absolute bottom-4 left-0 w-full">
                    <p className="text-secondary text-xs text-center ">
                        Made with love by <strong>Leons Aleksandrovs</strong>
                    </p>
                </footer>
            </aside>
        </main>
    );
}
