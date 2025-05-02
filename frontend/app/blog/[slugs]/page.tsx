"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  addCommentOnPost,
  getCommentOnPost,
  getsingleBlog,
} from "@/app/api/lib/api";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { COMMENT, GET_COMMENT } from "@/app/types/blog";
import { useAuth } from "@/app/Context/AuthContext";
import { User } from "@/app/types/user";
import { MessageCircle, ThumbsDown, ThumbsUp } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";

interface BlogType {
  title: string;
  content: string;
  coverImgUrl: string;
}
const Page = () => {
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  const { user } = useAuth();
  const { handleSubmit, register, setValue } = useForm<COMMENT>();

  const [blog, setBlog] = useState<BlogType | null>();
  const [comments, setComments] = useState<GET_COMMENT[]>([]);
  const [replyId, setreplyId] = useState<string>("");

  const handleBlog = async () => {
    try {
      const res = await getsingleBlog(id);
      const data = res.data;
      setBlog(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlegetComment = async () => {
    try {
      const res = await getCommentOnPost(id);

      setComments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

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

  // Reply in Comments

  const handleReply = (id: string) => {
    // My Parent comment Id
    console.log(id);
    setreplyId(id);
  };

  useEffect(() => {
    handleBlog();
    handlegetComment();
  }, [pathname]);

  // console.log(blog);

  if (!blog) return <h1>Loading</h1>;

  return (
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

        <div className="flex gap-10">
          {/* Like Comment And Share is start from here  */}

          <div>
            <ThumbsUp />
          </div>
          <div>
            <ThumbsDown />
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
                      <Textarea className="h-[8rem]" {...register("content")} />
                      <Button onClick={handleSubmit(addComment)}>Submit</Button>
                    </div>
                  </DrawerHeader>
                  <DrawerFooter className=" overflow-y-scroll">
                    {comments.map((el, ind) => (
                      <div key={el._id} className="flex gap-2  ">
                        <div className="">
                          <div>{el.user.username}</div>
                          <div>{el.content}</div>
                          <div className="flex justify-between items-center w-10 gap-3">
                            <div>
                              <ThumbsUp />
                            </div>
                            <div>
                              <ThumbsDown />
                            </div>
                            <div onClick={() => handleReply(el._id)}>reply</div>
                          </div>
                          {el._id === replyId && (
                            <div className="flex  gap-2">
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
                    ))}
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
