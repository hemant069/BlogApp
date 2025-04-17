

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
}

export interface ADD_COMMENT{
    content:string,
    user:string,
    blog:string,
    parentComment?:string
}

// Comment Parameter 
 export interface COMMENT {
    content: string;
  }
