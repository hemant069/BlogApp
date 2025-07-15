"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  addCommentOnPost,
  addReactionOnPost,
  getCommentOnPost,
  getReactionOnPost,
  getSaveBlogPost,
  getsingleBlog,
  handleFollow,
  RemoveSaveBlogPost,
  SaveBlogPost,
} from "@/app/api/lib/api";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { blogs, COMMENT, GET_COMMENT, GET_REACTION, } from "@/app/types/blog";
import { useAuth } from "@/app/Context/AuthContext";

import {
  Bookmark,
  BookmarkCheck,
  MessageCircle,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";

const Page = () => {
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  const { user } = useAuth();
  const { handleSubmit, register, setValue } = useForm<COMMENT>();

  const [blog, setBlog] = useState<blogs | null>();
  const [comments, setComments] = useState<GET_COMMENT[]>([]);
  const [replyId, setreplyId] = useState<string>("");
  const [reaction, setreaction] = useState<GET_REACTION>();
  const [isSavedBlog, setisSavedBlog] = useState<boolean>(false);
  const [follow, setfollow] = useState<boolean>(false);

  // Fetching the blog here
  const handleBlog = async () => {
    try {
      const res = await getsingleBlog(id);
      const data = res.data;

      console.log(data);
      setBlog(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Handling the GET comment here
  const handlegetComment = async () => {
    try {
      const res = await getCommentOnPost(id);

      setComments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Add Comment function start from here
  const addComment: SubmitHandler<COMMENT> = async (comment: COMMENT) => {
    console.log("comment", comment, replyId);

    const oauthuser = user?.id;

    if (oauthuser) {
      let data;
      if (!replyId) {
        data = {
          content: comment.content,
          userId: oauthuser,
          blogId: id,
        };
      } else {
        data = {
          content: comment.replyContent,
          userId: oauthuser,
          blogId: id,
          parentcommentId: replyId,
        };
      }

      try {
        const res = await addCommentOnPost(data);
        console.log(res);
        handlegetComment();
        setValue("content", "");
        setValue("replyContent", "");
        setreplyId(""); // Reset reply ID after submitting
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    }
  };

  // Reply in Comment function start from here
  const handleReply = (id: string) => {
    console.log(id);
    setreplyId(replyId === id ? "" : id); // Toggle reply form
  };

  // Reaction on post function start from here
  const handleLike = async (commentId: string | null) => {
    let data;
    if (!user?.id) {
      throw Error;
    }
    if (!commentId) {
      data = {
        type: "like",
        blogId: id,
        userId: user?.id,
      };
    } else {
      data = {
        type: "like",
        blogId: id,
        userId: user?.id,
        commentId,
      };
    }

    try {
      await addReactionOnPost(data);
      handleGetReaction();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  const handleDislike = async (commentId: string | null) => {
    console.log("commentId", commentId);
    let data;
    if (!user?.id) {
      throw Error;
    }
    if (!commentId) {
      data = {
        type: "dislike",
        blogId: id,
        userId: user?.id,
      };
    } else {
      data = {
        type: "dislike",
        blogId: id,
        userId: user?.id,
        commentId,
      };
    }

    try {
      await addReactionOnPost(data);
      handleGetReaction();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  const handleGetReaction = async () => {
    try {
      const res = await getReactionOnPost(id);
      setreaction(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Save blog function start from here
  const handleSaveBlog = async () => {
    if (!user?.id) {
      throw Error;
    }

    const data = {
      blogId: id,
      userId: user?.id,
    };
    try {
      await SaveBlogPost(data);
      setisSavedBlog(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveSaveBlog = async () => {
    if (!user?.id) {
      throw Error;
    }

    const data = {
      blogId: id,
    };
    try {
      const res = await RemoveSaveBlogPost(data);
      console.log(res.data);
      setisSavedBlog(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetSavedBlog = async () => {
    try {
      const res = await getSaveBlogPost(id);
      console.log(res);
      if (res.data.blogId === id) {
        setisSavedBlog(true);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  // Toggle Follow Start over here
  const handleFollowAuthors = async (targetUserId: string) => {
    console.log("targetuserId", targetUserId);
    if (!targetUserId || !user?.id) {
      throw Error;
    }
    const data = {
      targetuserId: targetUserId,
      userId: user?.id,
    };
    try {
      const res = await handleFollow(data);
      console.log(res);
      setfollow(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleBlog();
    handlegetComment();
    handleGetReaction();
    handleGetSavedBlog();
  }, [pathname]);

  useEffect(() => {
    if (blog && user) {
      handleFollowAuthors(blog.createdBy._id);
    }
  }, [blog, user]);

  if (!blog) return <div className="flex justify-center items-center h-screen"><h1 className="text-2xl">Loading...</h1></div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Author Section */}
      <div className="flex border border-slate-300 justify-between p-4 rounded-md mb-6">
        <div className="flex items-center gap-3">
          <Image
            src="https://res.cloudinary.com/dx9q2yrz0/image/upload/v1742384485/kfrurcoihzurmai9zwpg.png"
            width={40}
            height={40}
            alt="Author avatar"
            className="rounded-full"
          />
          <div>
            <p className="font-semibold">{blog.createdBy.username}</p>
            <p className="text-sm text-gray-500">
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <Button
          variant={follow ? "secondary" : "default"}
          onClick={() => handleFollowAuthors(blog.createdBy._id)}
        >
          {follow ? "Following" : "Follow"}
        </Button>
      </div>

      {/* Blog Content */}
      <article className="mb-8">
        {/* Cover Image */}
        <div className="mb-6">
          <Image
            src={blog?.coverImgUrl || "/blog.png"}
            width={800}
            height={400}
            alt={blog?.title || "blog image"}
            priority={true}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-6 text-gray-900">{blog?.title}</h1>

        {/* Rich Content from BlockNote */}
        <div
          className="prose prose-lg max-w-none mb-8
            prose-headings:font-bold 
            prose-h1:text-3xl prose-h1:mb-4 prose-h1:mt-8
            prose-h2:text-2xl prose-h2:mb-3 prose-h2:mt-6
            prose-h3:text-xl prose-h3:mb-2 prose-h3:mt-4
            prose-p:text-gray-700 prose-p:mb-4 prose-p:leading-relaxed
            prose-ul:list-disc prose-ul:ml-6 prose-ul:mb-4
            prose-ol:list-decimal prose-ol:ml-6 prose-ol:mb-4
            prose-li:mb-1
            prose-blockquote:border-l-4 prose-blockquote:border-blue-500
            prose-blockquote:pl-4 prose-blockquote:italic 
            prose-blockquote:bg-gray-50 prose-blockquote:py-2
            prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 
            prose-code:rounded prose-code:text-sm
            prose-pre:bg-gray-900 prose-pre:text-white prose-pre:p-4 
            prose-pre:rounded-lg prose-pre:overflow-x-auto
            prose-a:text-blue-600 prose-a:hover:text-blue-800
            prose-strong:font-semibold prose-strong:text-gray-900
            prose-em:italic
            prose-img:rounded-lg prose-img:shadow-md"
          dangerouslySetInnerHTML={{ __html: blog?.content }}
        />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {blog.tag &&
            blog.tag?.map((item, ind) => (
              <span
                key={ind}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
              >
                #{item}
              </span>
            ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-6 py-4 border-t border-gray-200">
          {/* Like Button */}
          <div className="flex cursor-pointer items-center gap-2 hover:text-blue-600 transition-colors">
            <ThumbsUp
              onClick={() => handleLike(null)}
              className="w-5 h-5"
            />
            <span className="text-sm font-medium">{reaction?.like || 0}</span>
          </div>

          {/* Dislike Button */}
          <div className="flex cursor-pointer items-center gap-2 hover:text-red-600 transition-colors">
            <ThumbsDown
              onClick={() => handleDislike(null)}
              className="w-5 h-5"
            />
            <span className="text-sm font-medium">{reaction?.dislike || 0}</span>
          </div>

          {/* Comments */}
          <div className="flex items-center gap-2">
            <Drawer direction="left">
              <DrawerTrigger className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm font-medium">{comments.length}</span>
              </DrawerTrigger>
              <DrawerContent className="h-screen w-1/3 max-w-md">
                <DrawerHeader>
                  <DrawerTitle>Comments</DrawerTitle>
                  <DrawerDescription>
                    Share your thoughts and engage with other comments below.
                  </DrawerDescription>
                  <div className="flex gap-2 items-center flex-col w-full">
                    <Textarea
                      className="h-[8rem] resize-none"
                      placeholder="Write your comment here..."
                      {...register("content")}
                    />
                    <Button
                      onClick={handleSubmit(addComment)}
                      className="w-full"
                    >
                      Submit Comment
                    </Button>
                  </div>
                </DrawerHeader>
                <DrawerFooter className="overflow-y-auto">
                  {comments.map((el) => (
                    <div key={el._id} className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex gap-2">
                        <div className="w-full">
                          <div className="flex items-center gap-2 mb-2">
                            <Image
                              alt="User avatar"
                              width={30}
                              height={30}
                              src="https://res.cloudinary.com/dx9q2yrz0/image/upload/v1742384485/kfrurcoihzurmai9zwpg.png"
                              className="rounded-full"
                            />
                            <p className="font-semibold">{el.user.username}</p>
                          </div>
                          <p className="ml-8 mb-2 text-gray-700">{el.content}</p>
                          <div className="flex items-center gap-4 ml-8">
                            <div className="flex items-center gap-1 cursor-pointer hover:text-blue-500 transition-colors">
                              <ThumbsUp
                                size={16}
                                onClick={() => handleLike(el._id)}
                              />
                              <span className="text-sm">{el.reactions.like}</span>
                            </div>
                            <div className="flex items-center gap-1 cursor-pointer hover:text-red-500 transition-colors">
                              <ThumbsDown
                                size={16}
                                onClick={() => handleDislike(el._id)}
                              />
                              <span className="text-sm">{el.reactions.dislike}</span>
                            </div>
                            <button
                              className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
                              onClick={() => handleReply(el._id)}
                            >
                              Reply
                            </button>
                          </div>
                          {el._id === replyId && (
                            <div className="flex gap-2 mt-3 ml-8">
                              <Input
                                placeholder="Write a reply..."
                                {...register("replyContent")}
                                className="flex-1"
                              />
                              <Button
                                onClick={handleSubmit(addComment)}
                                variant="secondary"
                                size="sm"
                              >
                                Reply
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="ml-8">
                        {el.replies && el.replies.length > 0 && (
                          <button
                            onClick={() => handleReply(el._id)}
                            className="text-slate-400 hover:text-slate-600 cursor-pointer text-sm mt-2"
                          >
                            {el._id === replyId ? 'Hide' : 'Show'} replies ({el.replies.length})
                          </button>
                        )}
                        {el._id === replyId && el.replies && (
                          <div className="mt-2 space-y-2">
                            {el.replies.map((reply, ind) => (
                              <div key={ind} className="ml-4 pl-4 border-l-2 border-gray-200 bg-white rounded p-2">
                                <div className="flex items-center gap-2 mb-1">
                                  <Image
                                    alt="User avatar"
                                    width={24}
                                    height={24}
                                    src="https://res.cloudinary.com/dx9q2yrz0/image/upload/v1742384485/kfrurcoihzurmai9zwpg.png"
                                    className="rounded-full"
                                  />
                                  <p className="font-medium text-sm">{reply.user.username}</p>
                                </div>
                                <p className="ml-7 text-sm text-gray-600">{reply.content}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>

          {/* Bookmark */}
          <div className="cursor-pointer hover:text-yellow-600 transition-colors">
            {isSavedBlog ? (
              <BookmarkCheck onClick={handleRemoveSaveBlog} className="w-5 h-5" />
            ) : (
              <Bookmark onClick={handleSaveBlog} className="w-5 h-5" />
            )}
          </div>
        </div>
      </article>
    </div>
  );
};

export default Page;