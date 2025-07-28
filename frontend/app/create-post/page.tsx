"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ProtectedRoute from "../Context/ProtectedRoute";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { CREATE_BLOG } from "../types/blog";
import { createBlogPost } from "../api/lib/api";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import dynamic from "next/dynamic";

// Dynamically import BlockNote components with SSR disabled
const BlockNoteView = dynamic(
  () => import("@blocknote/mantine").then((mod) => ({ default: mod.BlockNoteView })),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[400px] border border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading editor...</p>
      </div>
    )
  }
);

const useCreateBlockNote = dynamic(
  () => import("@blocknote/react").then((mod) => ({ default: mod.useCreateBlockNote })),
  { ssr: false }
);

const Page = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<CREATE_BLOG>();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize BlockNote editor only on client side
  const [editor, setEditor] = useState<any>(null);

  React.useEffect(() => {
    setMounted(true);

    // Import and initialize editor on client side
    import("@blocknote/react").then(({ useCreateBlockNote }) => {
      const editorInstance = useCreateBlockNote({
        initialContent: [
          {
            type: "paragraph",
            content: "Start writing your blog post here...",
          },
        ],
      });
      setEditor(editorInstance);
    });
  }, []);

  const handleCreatePost: SubmitHandler<CREATE_BLOG> = async (data: CREATE_BLOG) => {
    if (!editor) {
      toast({
        title: "Error",
        description: "Editor not ready. Please wait a moment and try again.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Get content from BlockNote editor
      const blocks = await editor.blocksToMarkdownLossy();
      const htmlContent = await editor.blocksToHTMLLossy();

      console.log("Markdown content:", blocks);
      console.log("HTML content:", htmlContent);

      const formData = new FormData();
      formData.append("coverImgUrl", data.coverImgUrl[0]); // Extract first file
      formData.append("title", data.title);
      formData.append("content", htmlContent); // Use HTML content for rich formatting
      formData.append("tag", data.tag);

      console.log("Form data prepared:", {
        title: data.title,
        content: htmlContent,
        tag: data.tag,
        coverImage: data.coverImgUrl[0]?.name
      });

      const res = await createBlogPost(formData);
      toast({ title: res.data?.msg || "Blog post created successfully!" });
      router.push("/dashboard");

    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("Something went wrong:", error.message);
        toast({
          title: "Error",
          description: error.message || "Failed to create blog post",
          variant: "destructive"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col gap-6 justify-center p-20 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Create New Blog Post</h1>

        <form onSubmit={handleSubmit(handleCreatePost)} className="space-y-6">
          {/* Cover Image */}
          <div>
            <Label htmlFor="coverImage">Cover Image</Label>
            <Input
              id="coverImage"
              placeholder="Upload cover image"
              className="border border-gray-300 mt-2"
              type="file"
              {...register("coverImgUrl", { required: "Cover image is required" })}
              accept=".png,.jpg,.jpeg,.webp"
            />
            {errors.coverImgUrl && (
              <p className="text-red-500 text-sm mt-1">{errors.coverImgUrl.message}</p>
            )}
          </div>

          {/* Title */}
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter your post title"
              className="border border-gray-300 mt-2"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* BlockNote Editor */}
          <div>
            <Label>Content</Label>
            <div className="mt-2 border border-gray-300 rounded-lg overflow-hidden">
              {mounted && editor ? (
                <BlockNoteView
                  editor={editor}
                  theme="light"
                  className="min-h-[400px]"
                />
              ) : (
                <div className="min-h-[400px] border border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                  <p className="text-gray-500">Loading editor...</p>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Use the rich text editor above to write your blog content.
            </p>
          </div>

          {/* Tags */}
          <div>
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              placeholder="Lifestyle, Technology, Blogs (comma-separated)"
              type="text"
              className="border border-gray-300 mt-2"
              {...register("tag", { required: "At least one tag is required" })}
            />
            {errors.tag && (
              <p className="text-red-500 text-sm mt-1">{errors.tag.message}</p>
            )}
            <p className="text-sm text-gray-500 mt-1">
              Separate multiple tags with commas
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting || !editor}
              className="px-8 py-2"
            >
              {isSubmitting ? "Publishing..." : "Publish Post"}
            </Button>
          </div>
        </form>
      </div>
    </ProtectedRoute>
  );
};

export default Page;