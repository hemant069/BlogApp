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
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { blogs, COMMENT, GET_COMMENT, GET_REACTION } from "@/app/types/blog";
import { useAuth } from "@/app/Context/AuthContext";
import { User } from "@/app/types/user";
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
  console.log("userbeta", user)

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
    //content, userId, blogId, parentcommentId
    // content:string,
    // user:string,
    // blog:string,
    // parentComment?:string
    const token = Cookies.get("token");

    if (token) {
      const userId: User = jwtDecode(token);
      let data;
      if (!replyId) {
        data = {
          content: comment.content,
          userId: userId.id,
          blogId: id,
        };
      }
      data = {
        content: comment.content,
        userId: userId.id,
        blogId: id,
        parentcommentId: replyId,
      };

      try {
        const res = await addCommentOnPost(data);
        console.log(res);
        handlegetComment();
        setValue("content", "");
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    }
  };

  // Reply in Comment function start from here

  const handleReply = (id: string) => {
    // My Parent comment Id
    console.log(id);
    setreplyId(id);
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
    }
    data = {
      type: "like",
      blogId: id,
      userId: user?.id,
      commentId,
    };

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
    }
    data = {
      type: "dislike",
      blogId: id,
      userId: user?.id,
      commentId,
    };

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

  // Get comment Reaction

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
    if (!targetUserId && user?.id) {
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

  // console.log(blog);

  if (!blog) return <h1>Loading</h1>;

  return (
    <>
      <div className="flex border border-slate-300  justify-between p-2 rounded-md">
        <div className="font-semibold">
          <p>{blog.createdBy.username}</p>
        </div>
        <p
          className="cursor-pointer"
          onClick={() => handleFollowAuthors(blog.createdBy._id)}
        >
          {follow ? "Following" : "Follow"}
        </p>
      </div>
      <div className="flex justify-center ">
        <div className="flex flex-col items-center justify-center mt-10 gap-3 max-w-[50rem] ">
          <div>
            <Image
              src={blog?.coverImgUrl || "/blog.png"}
              width={400}
              height={200}
              alt={blog?.coverImgUrl || "blog image"}
              priority={true}
            />
          </div>
          <div>
            <p className="text-5xl ">{blog?.title}</p>
          </div>
          <div>
            <p>{blog?.content}</p>
          </div>
          <div className="flex gap-2">
            {/* Tags for the blog sections start from here */}
            {blog.tag &&
              blog.tag?.map((item, ind) => (
                <div key={ind}>
                  <p className=" px-8 rounded-xl py-1 bg-slate-300">{item}</p>
                </div>
              ))}
          </div>
          <div className="flex gap-10">
            {/* Like Comment And Share is start from here  */}

            <div className="flex cursor-pointer items-center gap-2">
              <ThumbsUp onClick={() => handleLike(null)} />
              <div>{reaction?.like}</div>
            </div>
            <div className="flex cursor-pointer items-center gap-2">
              <ThumbsDown onClick={() => handleDislike(null)} />
              <div>{reaction?.dislike}</div>
            </div>

            <div className="">
              <div className="">
                <Drawer direction="left">
                  <DrawerTrigger>
                    <MessageCircle />
                  </DrawerTrigger>
                  <DrawerContent className="h-screen w-1/4">
                    <DrawerHeader>
                      <DrawerTitle>Add Your Throught On This</DrawerTitle>
                      <div className="flex gap-2 items-center flex-col w-full">
                        <Textarea
                          className="h-[8rem]"
                          {...register("content")}
                        />
                        <Button onClick={handleSubmit(addComment)}>
                          Submit
                        </Button>
                      </div>
                    </DrawerHeader>
                    <DrawerFooter className=" overflow-y-scroll">
                      {comments.map((el) => (
                        <div key={el._id}>
                          <div key={el._id} className="flex gap-2  ">
                            <div className="">
                              <div className="flex items-center gap-1">
                                <Image
                                  alt="iamge"
                                  width={30}
                                  height={30}
                                  src={
                                    "https://res.cloudinary.com/dx9q2yrz0/image/upload/v1742384485/kfrurcoihzurmai9zwpg.png"
                                  }
                                />
                                <p>{el.user.username}</p>
                              </div>
                              <p className="ml-5">{el.content}</p>
                              <div className="flex justify-between items-center w-10 gap-5 mt-2">
                                <div className="cursor-pointer">
                                  <ThumbsUp
                                    onClick={() => handleLike(el._id)}
                                  />
                                  <p>{el.reactions.like}</p>
                                </div>
                                <div className="cursor-pointer">
                                  <ThumbsDown
                                    onClick={() => handleDislike(el._id)}
                                  />
                                  <p>{el.reactions.dislike}</p>
                                </div>
                                <div
                                  className="cursor-pointer"
                                  onClick={() => handleReply(el._id)}
                                >
                                  reply
                                </div>
                              </div>
                              {el._id === replyId && (
                                <div className="flex  gap-2 mt-">
                                  <Input {...register("content")} />
                                  <Button
                                    onClick={handleSubmit(addComment)}
                                    variant={"secondary"}
                                  >
                                    Reply
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                          <div>
                            <p
                              onClick={() => handleReply(el._id)}
                              className="text-slate-400 cursor-pointer"
                            >
                              replies ({el?.replies?.length})
                            </p>
                            <div>
                              {el._id === replyId && (
                                <div key={el._id}>
                                  {el.replies.map((el, ind) => (
                                    <div key={ind} className="ml-5">
                                      <div className="flex items-center">
                                        {/* <Avatar>
                                      <AvatarImage
                                        className="rounded-full"
                                        width={25}
                                        height={225}
                                        src="https://github.com/shadcn.png"
                                      />
                                    </Avatar> */}
                                        <Image
                                          alt="iamge"
                                          width={30}
                                          height={30}
                                          src={
                                            "https://res.cloudinary.com/dx9q2yrz0/image/upload/v1742384485/kfrurcoihzurmai9zwpg.png"
                                          }
                                        />
                                        <p> {el.user.username}</p>
                                      </div>
                                      <p className="ml-5">{el.content}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </div>
            </div>
            {/* BookMark Post Or Save Post  */}
            <div>
              {isSavedBlog ? (
                <BookmarkCheck onClick={handleRemoveSaveBlog} />
              ) : (
                <Bookmark onClick={handleSaveBlog} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
