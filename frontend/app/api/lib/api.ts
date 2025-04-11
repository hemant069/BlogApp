import axios from "axios";
import Cookies from "js-cookie";


const baseUrl=`http://localhost:8000/api` || process.env.NEXT_PUBLIC_BACKEND;

const token=Cookies.get('token')
axios.defaults.headers.common["Authorization"]=`Bearer ${token}`;


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




