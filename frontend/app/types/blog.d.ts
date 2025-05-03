import { User } from "./user";


export interface blogs{
    title: string;
    content: string;
    coverImgUrl: string;
    _id: string;
    createdBy: author;
    user: string;
    tag?:string[]
  }

export interface author{
_id:string,
    email:string,
    profileImg:string,
    username:string,
}


export interface CREATE_BLOG{
    title:string,
    content:string,
    coverImgUrl:FileList
    tag:string[]
}

export interface ADD_COMMENT{
    content:string,
    userId:string,
    blogId:string,
    parentcommentId?:string|null
}

// Comment Parameter 
 export interface COMMENT {
    content: string;
  }

  export interface REPLIES{
    content:string,
    userId:string,
    blogId:string,
    user:User,
  }

  export interface GET_COMMENT{
    _id:string,
    content:string,
    userId:string,
    blogId:string,
    user:User,
    parentComment:string,
    replies:REPLIES[]
  }


  // Reactions Type 

  export interface ADD_REACTION{
    type:string,
    blogId:string,
    userId:string|null,
  }

  export interface GET_REACTION {
    like: number;
    dislike: number;
  }