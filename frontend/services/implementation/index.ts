import axios from "axios";
import Router from "next/router";
const backendUrl=process.env.NEXT_PUBLIC_BACKEND;


// Signup function 

interface SignupData{
    username:string,
    email:string,
    password:string
}

export const handleSignupFn=async(data:SignupData)=>{
     try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND}signup`,
            data
          );
          
          return Router.push('/login')
        } catch (error) {
          console.log("something went wrong with handleSignup");
        }
}


// Login function


interface LoginData{
    email:string,
    password:string
}



export const handleLoginFn=async(data:LoginData)=>{
    try {

        const res=await axios.post(`${backendUrl}login`,data);

        return res.data;
        
    } catch (error) {

        console.log("Something wrong with handleLoginFn",error)
        
    }
}
