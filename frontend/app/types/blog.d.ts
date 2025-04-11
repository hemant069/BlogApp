

export interface blogs{
    title: string;
    content: string;
    coverImgUrl: string;
    _id: string;
    createdBy: author;
    user: string;
  }

export interface author{
_id:string,
    email:string,
    profileImg:string,
    username:string,
}