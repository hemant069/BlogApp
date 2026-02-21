import { Metadata } from "next";
import { getsingleBlog } from "@/app/api/lib/api";

type Props = {
    params: Promise<{ slugs: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slugs: id } = await params;

    try {
        // We call the same API but on the server side
        const res = await getsingleBlog(id);
        const blog = res.data;

        if (!blog) return { title: "Blog Post | MindVerse" };

        return {
            title: blog.title,
            description: blog.content?.substring(0, 160).replace(/<[^>]*>/g, '') + "...",
            openGraph: {
                title: blog.title,
                description: blog.content?.substring(0, 160).replace(/<[^>]*>/g, '') + "...",
                images: [blog.coverImgUrl || "/blog.png"],
                type: "article",
                authors: [blog.createdBy?.username],
            },
            twitter: {
                card: "summary_large_image",
                title: blog.title,
                description: blog.content?.substring(0, 160).replace(/<[^>]*>/g, '') + "...",
                images: [blog.coverImgUrl || "/blog.png"],
            },
        };
    } catch (error) {
        return {
            title: "Blog Post | MindVerse",
        };
    }
}

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
