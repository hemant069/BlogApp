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
  Share2,
  Clock,
  Calendar,
  User,
  Eye,
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
    }
    catch (error) {
      console.log(error);
    }
  };

  // Calculate reading time
  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const text = content.replace(/<[^>]*>/g, '');
    const wordCount = text.split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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

  if (!blog) {
    return (
      <div className="min-h-screen font-mono bg-gradient-to-br from-slate-50 to-gray-100 flex justify-center items-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto"></div>
          <h1 className="text-2xl font-semibold text-gray-700">Loading amazing content...</h1>
          <p className="text-gray-500">Please wait while we fetch the blog for you</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-mono bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Header with gradient overlay */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent z-10"></div>

        {/* Hero Image */}
        <div className="relative h-[60vh] overflow-hidden">
          <Image
            src={blog?.coverImgUrl || "/blog.png"}
            width={1200}
            height={600}
            alt={blog?.title || "blog image"}
            priority={true}
            className="w-full h-full object-cover"
          />

          {/* Floating content card */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-4xl px-6">
            <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="text-center space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  {blog?.title}
                </h1>

                {/* Reading metadata */}
                <div className="flex flex-wrap justify-center items-center gap-6 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">{calculateReadingTime(blog?.content || "")} min read</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-green-500" />
                    {/* <span className="font-medium">{formatDate(blog?.createdAt || "")}</span> */}
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-purple-500" />
                    <span className="font-medium">2.1k views</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Enhanced Author Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-12 hover:shadow-xl transition-all duration-300">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-0.5">
                  <Image
                    src="https://res.cloudinary.com/dx9q2yrz0/image/upload/v1742384485/kfrurcoihzurmai9zwpg.png"
                    width={60}
                    height={60}
                    alt="Author avatar"
                    className="rounded-full w-full h-full object-cover bg-white"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-gray-900">{blog.createdBy.username}</h2>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                    Author
                  </span>
                </div>
                <div className="flex items-center gap-4 text-gray-600">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    Content Creator
                  </span>
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  <span>127 followers</span>
                </div>
              </div>
            </div>

            <Button
              variant={follow ? "secondary" : "default"}
              onClick={() => handleFollowAuthors(blog.createdBy._id)}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-200 ${follow
                ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
                }`}
            >
              {follow ? "Following" : "Follow"}
            </Button>
          </div>
        </div>

        {/* Blog Content */}
        <article className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-12">
          <div className="p-12">
            {/* Rich Content from BlockNote */}
            <div
              className="prose prose-xl max-w-none
                prose-headings:font-bold prose-headings:text-gray-900
                prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-12 prose-h1:leading-tight
                prose-h2:text-3xl prose-h2:mb-5 prose-h2:mt-10 prose-h2:leading-tight
                prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8 prose-h3:leading-tight
                prose-p:text-gray-700 prose-p:mb-6 prose-p:leading-relaxed prose-p:text-lg
                prose-ul:list-disc prose-ul:ml-8 prose-ul:mb-6 prose-ul:space-y-2
                prose-ol:list-decimal prose-ol:ml-8 prose-ol:mb-6 prose-ol:space-y-2
                prose-li:text-gray-700 prose-li:leading-relaxed
                prose-blockquote:border-l-4 prose-blockquote:border-blue-500
                prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600
                prose-blockquote:bg-blue-50 prose-blockquote:py-4 prose-blockquote:rounded-r-lg
                prose-code:bg-gray-100 prose-code:px-3 prose-code:py-1 
                prose-code:rounded-md prose-code:text-sm prose-code:font-mono
                prose-pre:bg-gray-900 prose-pre:text-white prose-pre:p-6 
                prose-pre:rounded-xl prose-pre:overflow-x-auto prose-pre:shadow-lg
                prose-a:text-blue-600 prose-a:hover:text-blue-800 prose-a:font-medium
                prose-a:underline-offset-4 prose-a:decoration-2
                prose-strong:font-bold prose-strong:text-gray-900
                prose-em:italic prose-em:text-gray-700
                prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8"
              dangerouslySetInnerHTML={{ __html: blog?.content }}
            />

            {/* Enhanced Tags */}
            {blog.tag && blog.tag.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Topics covered</h3>
                <div className="flex flex-wrap gap-3">
                  {blog.tag.map((item, ind) => (
                    <span
                      key={ind}
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 
                               text-blue-700 rounded-full text-sm font-medium border border-blue-100
                               hover:from-blue-100 hover:to-indigo-100 hover:border-blue-200
                               transition-all duration-200 cursor-pointer group"
                    >
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 group-hover:scale-110 transition-transform"></span>
                      #{item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Action Bar */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-12 py-8 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                {/* Like Button */}
                <div className="group flex cursor-pointer items-center gap-3 hover:text-blue-600 transition-all duration-200">
                  <div className="p-3 rounded-full bg-white group-hover:bg-blue-50 shadow-md group-hover:shadow-lg transition-all duration-200">
                    <ThumbsUp
                      onClick={() => handleLike(null)}
                      className="w-6 h-6"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">{reaction?.like || 0}</div>
                    <div className="text-sm text-gray-600">Likes</div>
                  </div>
                </div>

                {/* Dislike Button */}
                <div className="group flex cursor-pointer items-center gap-3 hover:text-red-600 transition-all duration-200">
                  <div className="p-3 rounded-full bg-white group-hover:bg-red-50 shadow-md group-hover:shadow-lg transition-all duration-200">
                    <ThumbsDown
                      onClick={() => handleDislike(null)}
                      className="w-6 h-6"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">{reaction?.dislike || 0}</div>
                    <div className="text-sm text-gray-600">Dislikes</div>
                  </div>
                </div>

                {/* Comments */}
                <Drawer direction="left">
                  <DrawerTrigger className="group flex items-center gap-3 hover:text-blue-600 transition-all duration-200">
                    <div className="p-3 rounded-full bg-white group-hover:bg-blue-50 shadow-md group-hover:shadow-lg transition-all duration-200">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold">{comments.length}</div>
                      <div className="text-sm text-gray-600">Comments</div>
                    </div>
                  </DrawerTrigger>

                  <DrawerContent className="h-screen w-1/3 max-w-md bg-white">
                    <DrawerHeader className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                      <DrawerTitle className="text-2xl font-bold text-gray-900">Comments</DrawerTitle>
                      <DrawerDescription className="text-gray-600">
                        Share your thoughts and engage with other readers below.
                      </DrawerDescription>

                      {/* Comment Form */}
                      <div className="flex gap-3 items-end flex-col w-full mt-6">
                        <Textarea
                          className="h-[8rem] resize-none border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                          placeholder="Share your thoughts on this article..."
                          {...register("content")}
                        />
                        <Button
                          onClick={handleSubmit(addComment)}
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                                   text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                          Post Comment
                        </Button>
                      </div>
                    </DrawerHeader>

                    <DrawerFooter className="overflow-y-auto p-6 space-y-6">
                      {comments.map((el) => (
                        <div key={el._id} className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors duration-200">
                          <div className="flex gap-4">
                            <div className="flex-shrink-0">
                              <Image
                                alt="User avatar"
                                width={40}
                                height={40}
                                src="https://res.cloudinary.com/dx9q2yrz0/image/upload/v1742384485/kfrurcoihzurmai9zwpg.png"
                                className="rounded-full ring-2 ring-white shadow-md"
                              />
                            </div>

                            <div className="flex-1 space-y-3">
                              <div className="flex items-center gap-3">
                                <p className="font-bold text-gray-900">{el.user.username}</p>
                                <span className="text-sm text-gray-500">2 hours ago</span>
                              </div>

                              <p className="text-gray-700 leading-relaxed">{el.content}</p>

                              <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition-colors group">
                                  <ThumbsUp
                                    size={18}
                                    onClick={() => handleLike(el._id)}
                                    className="group-hover:scale-110 transition-transform"
                                  />
                                  <span className="text-sm font-medium">{el.reactions.like}</span>
                                </div>

                                <div className="flex items-center gap-2 cursor-pointer hover:text-red-500 transition-colors group">
                                  <ThumbsDown
                                    size={18}
                                    onClick={() => handleDislike(el._id)}
                                    className="group-hover:scale-110 transition-transform"
                                  />
                                  <span className="text-sm font-medium">{el.reactions.dislike}</span>
                                </div>

                                <button
                                  className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                                  onClick={() => handleReply(el._id)}
                                >
                                  Reply
                                </button>
                              </div>

                              {el._id === replyId && (
                                <div className="flex gap-2 mt-4">
                                  <Input
                                    placeholder="Write a thoughtful reply..."
                                    {...register("replyContent")}
                                    className="flex-1 rounded-xl border-gray-200 focus:border-blue-500"
                                  />
                                  <Button
                                    onClick={handleSubmit(addComment)}
                                    variant="secondary"
                                    className="px-6 rounded-xl"
                                  >
                                    Reply
                                  </Button>
                                </div>
                              )}

                              {/* Replies Section */}
                              <div className="space-y-3">
                                {el.replies && el.replies.length > 0 && (
                                  <button
                                    onClick={() => handleReply(el._id)}
                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                                  >
                                    {el._id === replyId ? 'Hide' : 'Show'} {el.replies.length} {el.replies.length === 1 ? 'reply' : 'replies'}
                                  </button>
                                )}

                                {el._id === replyId && el.replies && (
                                  <div className="space-y-3 ml-6 border-l-2 border-blue-200 pl-6">
                                    {el.replies.map((reply, ind) => (
                                      <div key={ind} className="bg-white rounded-xl p-4 shadow-sm">
                                        <div className="flex items-center gap-3 mb-2">
                                          <Image
                                            alt="User avatar"
                                            width={28}
                                            height={28}
                                            src="https://res.cloudinary.com/dx9q2yrz0/image/upload/v1742384485/kfrurcoihzurmai9zwpg.png"
                                            className="rounded-full"
                                          />
                                          <p className="font-semibold text-sm text-gray-900">{reply.user.username}</p>
                                          <span className="text-xs text-gray-500">1 hour ago</span>
                                        </div>
                                        <p className="text-sm text-gray-700 leading-relaxed">{reply.content}</p>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </div>

              {/* Right side actions */}
              <div className="flex items-center gap-4">
                {/* Bookmark */}
                <div className="group cursor-pointer hover:text-yellow-600 transition-all duration-200">
                  <div className="p-3 rounded-full bg-white group-hover:bg-yellow-50 shadow-md group-hover:shadow-lg transition-all duration-200">
                    {isSavedBlog ? (
                      <BookmarkCheck onClick={handleRemoveSaveBlog} className="w-6 h-6 text-yellow-600" />
                    ) : (
                      <Bookmark onClick={handleSaveBlog} className="w-6 h-6" />
                    )}
                  </div>
                </div>

                {/* Share */}
                <div className="group cursor-pointer hover:text-green-600 transition-all duration-200">
                  <div className="p-3 rounded-full bg-white group-hover:bg-green-50 shadow-md group-hover:shadow-lg transition-all duration-200">
                    <Share2 className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Page;