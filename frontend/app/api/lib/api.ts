import { CREATE_USER, LOGIN_USER } from "@/app/types/user";
import axios from "axios";
import Cookies from "js-cookie";


const baseUrl=`http://localhost:8000/api` || process.env.NEXT_PUBLIC_BACKEND;

const token=Cookies.get('token')
axios.defaults.headers.common["Authorization"]=`Bearer ${token}`;


export const signupFn=async(data:CREATE_USER)=>{
    try {
        
        const res=await axios.post(`${baseUrl}/signup`,data);

        if(!res.ok){
            console.log("something went wrong with signup");
        }

        return res;


    } catch (error) {
        
    }
}


export const loginFn=async(data:LOGIN_USER)=>{

    try {
        
        const res= await axios.post(`${baseUrl}/login`,data);

        if(!res.ok){
        console.log("something went wrong")
        }
        return res;

    } catch (error) {

        return error;
        
    }
}


// All Blogs related api start from Here
export const getallBlogs=async()=>{

    try {
        
        const res= await axios.get(`${baseUrl}/blog`)
        if(!res.ok){
            console.log("something wrong with getallblogs")
        }
        return res.data;

    } catch (error) {

        console.log(error.message)
        
    }
}


export const getsingleBlog=async(id:string)=>{
    try {
        
        const res= await axios.get(`${baseUrl}/blog/${id}`);

        if(!res.ok){
            console.log("something wrong with get single blog");
        }

        return res.data;


    } catch (error) {

        console.log(error.message);
        
    }
}





