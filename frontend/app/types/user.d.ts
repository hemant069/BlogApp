interface User {
    id: string;
    username: string;
    email: string;
    avatar?: string;
    mongoId?: string,
    postCount?: string,
    followers?: string,
    following?: string,
}

export interface CREATE_USER {
    email: string,
    password: string,
    username: string,
}


export interface LOGIN_USER {
    email: string,
    password: string,
    newpassword:string,
}

export interface FOLLOW_AUTHORS {

    userId: string | undefined,
    targetuserId: string


}

export interface PROFILE_INFO {
    username: string,
    email: string,
    profileImg: string,
    role: string,

}

export interface UPDATE_PROFILE_INFO {
    profileImg: FileList,
    username: string,
    userId:string,
}



export interface VERIFY_OTP{
    email:string,
    otp:string,
}


export interface SET_NEW_PASSWORD{
    userId:string,
    password:string,
}

export interface FORGET{
    email:string,
}