import { ADD_COMMENT, ADD_REACTION, REMOVE_SAVED_BLOG, SAVE_BLOG } from "@/app/types/blog";
import { CREATE_USER, FOLLOW_AUTHORS, LOGIN_USER, UPDATE_PROFILE_INFO } from "@/app/types/user";
import { setupAxiosAuth } from "@/app/utils";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { getSession } from 'next-auth/react'

// const baseUrl: string | null = process.env.NEXT_PUBLIC_BACKEND || "http://localhost:8000/api";
const baseUrl: string | null = "http://localhost:8000/api";

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
        await setupAxiosAuth()
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
        await setupAxiosAuth()
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
        await setupAxiosAuth()
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
        await setupAxiosAuth()
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
        await setupAxiosAuth()
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
        await setupAxiosAuth()
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
        await setupAxiosAuth()
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
        await setupAxiosAuth()
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
        await setupAxiosAuth()
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
        await setupAxiosAuth()
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
        await setupAxiosAuth()
        const res = await axios.post(`${baseUrl}/follow`, data)
        return res.data;

    } catch (error) {

        if (error instanceof Error) {
            console.log(error.message)
        }

    }
}


// Profile Api's 


export const handleProfile = async (data: UPDATE_PROFILE_INFO) => {
    try {
        await setupAxiosAuth()
        const res = await axios.post(`${baseUrl}/profile`, data)
        return res.data;


    } catch (error) {

        console.log(error)

    }
}

export const handlegetProfile = async (id: string) => {
    try {
        await setupAxiosAuth()
        const res = await axios.get(`${baseUrl}/profile/${id}`);
        return res.data;


    } catch (error) {

        console.log(error)

    }
}