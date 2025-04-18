import { ADD_COMMENT } from "@/app/types/blog";
import { CREATE_USER, LOGIN_USER } from "@/app/types/user";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";


//const baseUrl:string|null=process.env.NEXT_PUBLIC_BACKEND||"http://localhost:8000/api";
const baseUrl:string|null="http://localhost:8000/api";

const token=Cookies.get('token')
axios.defaults.headers.common["Authorization"]=`Bearer ${token}`;


export const signupFn=async(data:CREATE_USER)=>{
    try {
        
        const res=await axios.post(`${baseUrl}/signup`,data);

        if(res.status!==201){
            console.log("something went wrong with signup");
        }

        return res;


    } catch (error:unknown) {
        console.log(error)
        
    }
}

interface LOGIN_RESPONSE{
    msg:string,
    token:string
}


export const loginFn=async(data:LOGIN_USER): Promise<AxiosResponse<LOGIN_RESPONSE>|undefined>=>{

    try {
        
        const res:AxiosResponse<LOGIN_RESPONSE>= await axios.post(`${baseUrl}/login`,data);

        if(res.status!==200){
        console.log("something went wrong")
        }
        return res;

    } catch (error:unknown) {
if(error instanceof Error)
       console.log(error)
        
    }
}


// All Blogs related api start from Here
export const getallBlogs=async()=>{

    try {
        
        const res= await axios.get(`${baseUrl}/blog`)
        if(res.status!==200){
            console.log("something wrong with getallblogs")
        }
        return res.data;

    } catch (error:unknown) {

        if(error instanceof Error)

        console.log(error.message)
        
    }
}


export const getsingleBlog=async(id:string)=>{
    try {
        
        const res= await axios.get(`${baseUrl}/blog/${id}`);

        if(res.status!==200){
            console.log("something wrong with get single blog");
        }

        return res.data;


    } catch (error:unknown) {

        if(error instanceof Error)

        console.log(error.message);
        
    }
}

export const createBlogPost=async(data:FormData)=>{
    try {
        
        const res= await axios.post(`${baseUrl}/blog/create-post`,data)

        if(res.status!==200){
            return  new Error("Something went wrong with createBlog");
            
        }
        return res.data;

    } catch (error:unknown) {

        if(error instanceof Error)
        console.log(error.message);
        
    }
}

// Add Commment on Post



export const addCommentOnPost=async(data:ADD_COMMENT)=>{

    try {
        const res= await axios.post(`${baseUrl}/comment`,data)
        return res.data;
    } catch (error) {

        if(error instanceof Error){

            console.log(error.message);
        }
        
    }
}


// Add Reaction On Post


export const addReactionOnPost=async(data:string)=>{

    try {
        
        const res= await axios.post(`${baseUrl}/reaction`,data)
        
        return res.data;

    } catch (error) {

        if(error instanceof Error){

            console.log(error.message)
        }
        
    }
}


export const getReactionOnPost=async()=>{

  try {
    const res= await axios.get(`${baseUrl}/reaction`);
    return res.data;
  } catch (error) {

    if(error instanceof Error){

        console.log(error.message)
    }
    
  }
}





