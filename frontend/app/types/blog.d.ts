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

  interface COMMENT_REACTION{
    like:string,
    dislike:string
  }

  export interface GET_COMMENT{
    _id:string,
    content:string,
    userId:string,
    blogId:string,
    user:User,
    parentComment:string,
    replies:REPLIES[],
    reactions:COMMENT_REACTION
  }


  // Reactions Type 

  export interface ADD_REACTION{
    type:string,
    blogId:string,
    userId:string|null,
    commentId?:string|null
  }

  export interface GET_REACTION {
    like: number;
    dislike: number;
  }


  export interface GET_COMMENT_REACTION{
    like:number,
    dislike:number
  }
  export interface GET_COMMENT_REACTION_TYPE{
    blogId:string,
    commentId:string
  }

  // Save blogs types


  export interface SAVE_BLOG{
    blogId:string,
    userId:string,
  }

  export interface REMOVE_SAVED_BLOG{
    blogId:string,
  }

