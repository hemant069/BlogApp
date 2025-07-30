import { ADD_COMMENT, ADD_REACTION, REMOVE_SAVED_BLOG, SAVE_BLOG } from "@/app/types/blog";
import { CREATE_USER, FOLLOW_AUTHORS, FORGET, LOGIN_USER, SET_NEW_PASSWORD, UPDATE_PROFILE_INFO, VERIFY_OTP } from "@/app/types/user";
import { setupAxiosAuth } from "@/app/utils";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";


const baseUrl: string | null = process.env.NEXT_PUBLIC_BACKEND || "http://localhost:8000/api";
// const baseUrl: string = "http://localhost:8000/api";


const token = Cookies.get('token')
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
axios.defaults.withCredentials = true


export const signupFn = async (data: CREATE_USER) => {
    try {

        const res = await axios.post(`${baseUrl}/signup`, data);

        if (res.status !== 201) {
            console.log("something went wrong with signup");
        }

        return res;


    } catch (error: unknown) {
        console.log(error)

    }
}

interface LOGIN_RESPONSE {
    msg: string,
    token: string
}


export const loginFn = async (data: LOGIN_USER): Promise<AxiosResponse<LOGIN_RESPONSE> | undefined> => {

    try {

        const res: AxiosResponse<LOGIN_RESPONSE> = await axios.post(`${baseUrl}/login`, data);

        if (res.status !== 200) {
            console.log("something went wrong")
        }
        return res;

    } catch (error: unknown) {
        if (error instanceof Error)
            console.log(error)

    }
}


// All Blogs related api start from Here
export const getallBlogs = async () => {

    try {
        if (!token) {
            await setupAxiosAuth()
        }
        const res = await axios.get(`${baseUrl}/blog`)
        if (res.status !== 200) {
            console.log("something wrong with getallblogs")
        }
        console.log("res", res.data)
        return res.data;

    } catch (error: unknown) {

        if (error instanceof Error)

            console.log(error.message)

    }
}


export const getsingleBlog = async (id: string) => {
    try {
        if (!token) {
            await setupAxiosAuth()
        }
        const res = await axios.get(`${baseUrl}/blog/${id}`);

        if (res.status !== 200) {
            console.log("something wrong with get single blog");
        }

        return res.data;


    } catch (error: unknown) {

        if (error instanceof Error)

            console.log(error.message);

    }
}

export const createBlogPost = async (data: FormData) => {
    try {
        if (!token) {
            await setupAxiosAuth()
        }
        const res = await axios.post(`${baseUrl}/blog/create-post`, data)

        if (res.status !== 200) {
            return new Error("Something went wrong with createBlog");

        }
        return res.data;

    } catch (error: unknown) {

        if (error instanceof Error)
            console.log(error.message);

    }
}

// Add Commment on Post



export const addCommentOnPost = async (data: ADD_COMMENT) => {

    try {
        if (!token) {
            await setupAxiosAuth()
        }
        const res = await axios.post(`${baseUrl}/comment`, data)
        return res.data;
    } catch (error) {

        if (error instanceof Error) {

            console.log(error.message);
        }

    }
}

export interface COMMENT_ID {
    postId: string
}

export const getCommentOnPost = async (id: string) => {
    try {
        if (!token) {
            await setupAxiosAuth()
        }
        const res = await axios.get(`${baseUrl}/comment/${id}`,);

        return res.data;

    } catch (error) {

        if (error instanceof Error) {
            console.log(error.message)
        }

    }
}


// Add Reaction On Post


export const addReactionOnPost = async (data: ADD_REACTION) => {

    try {
        if (!token) {
            await setupAxiosAuth()
        }
        const res = await axios.post(`${baseUrl}/reaction`, data)

        return res.data;

    } catch (error) {

        if (error instanceof Error) {

            console.log(error.message)
        }

    }
}


export const getReactionOnPost = async (id: string) => {

    try {
        if (!token) {
            await setupAxiosAuth()
        }
        const res = await axios.get(`${baseUrl}/reaction/${id}`);
        return res.data;
    } catch (error) {

        if (error instanceof Error) {

            console.log(error.message)
        }

    }
}

// comment reaction 


// BookMark or Save blog post

export const SaveBlogPost = async (data: SAVE_BLOG) => {
    try {
        if (!token) {
            await setupAxiosAuth()
        }
        const res = await axios.post(`${baseUrl}/saveblogs`, data);

        return res.data;

    } catch (error) {

        if (error instanceof Error) {
            console.log(error.message)
        }
    }
}


export const RemoveSaveBlogPost = async (data: REMOVE_SAVED_BLOG) => {
    try {
        if (!token) {
            await setupAxiosAuth()
        }
        const res = await axios.post(`${baseUrl}/saveblogs`, data);

        return res.data;

    } catch (error) {

        if (error instanceof Error) {
            console.log(error.message)
        }
    }
}


export const getSaveBlogPost = async (id: string) => {
    try {
        if (!token) {
            await setupAxiosAuth()
        }
        const res = await axios.get(`${baseUrl}/saveblogs/${id}`);

        return res.data;

    } catch (error) {

        if (error instanceof Error) {
            console.log(error.message)
        }
    }
}



// Follow and Unfollow to authors


export const handleFollow = async (data: FOLLOW_AUTHORS) => {
    try {
        if (!token) {
            await setupAxiosAuth()
        }
        const res = await axios.post(`${baseUrl}/follow`, data)
        return res.data;

    } catch (error) {

        if (error instanceof Error) {
            console.log(error.message)
        }

    }
}


// Profile Api's 


export const handleProfile = async (data: FormData) => {
    try {
        if (!token) {
            await setupAxiosAuth()
        }
        const res = await axios.put(`${baseUrl}/profile`, data)
        return res.data;


    } catch (error) {

        console.log(error)

    }
}

export const handlegetProfile = async (id: string) => {
    try {
        if (!token) {
            await setupAxiosAuth()
        }
        const res = await axios.get(`${baseUrl}/profile/${id}`);
        return res.data;


    } catch (error) {

        console.log(error)

    }
}


// Forget password


export const handleForgetPassword = async (data:FORGET) => {
    try {

     
      
        const res = await axios.post(`${baseUrl}/forget-password`, data)
        return res.data;


    } catch (error) {

        if(axios.isAxiosError(error)){
            const message=error.response?.data;
            return message
            console.log(message)
        }
        console.log(error)

    }
}


// verify Otp


export const handleVerifyOtp = async (data:VERIFY_OTP) => {
    try {
        
        const res = await axios.post(`${baseUrl}/verify-otp`, data)
        return res.data;


    } catch (error) {

        console.log(error)

    }
}


// set new password


export const handleSetNewPassword = async (data:SET_NEW_PASSWORD) => {
    try {
        
        const res = await axios.post(`${baseUrl}/reset-password`, data)
        return res.data;


    } catch (error) {

        console.log(error)

    }
}