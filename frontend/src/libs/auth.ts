import axios, { AxiosError, AxiosResponse } from 'axios'
interface ApiResponse{
    message:any,
    success:boolean
}
export async function register(password:string,email:string):Promise<string>{
    try{
        const response: AxiosResponse<ApiResponse> = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/v1/user/registerotp',{
            email:email,
            password:password
        })
        return response.data.message.otp
    }
    catch(error){
        return '';
    }
}
export async  function otpSubmit(otp:string):Promise<boolean>{
    try{
        const response: AxiosResponse<ApiResponse> = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/v1/user/registerverifyotp',{
            otp:otp
        })
        return response.data.success
    }catch(error){
        return false;
    }
}
export async function login(email:string,password:string): Promise<{message:any,success:boolean}>{
    try {
        const response: AxiosResponse<ApiResponse> = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/loginpassword`,{
            email:email,
            password:password,
        },{withCredentials:true});
        return {message:response.data.message as string,success:response.data.success} ;
    } catch (error) {
        const err = error as AxiosError
        return {message: (err.response?.data as {message:string})?.message as string, success:false};
    }
}
export async function profilesubmit(name: string, image: string, interest:Array<string>, email:string): Promise<any> {
    try{
        const response: AxiosResponse<ApiResponse> = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/v1/user/profile',{
            email:email,
            username:name,
            url:image,
            interests:interest
        })
        return response.data
    }catch(error){
        return false;
    }
}

export async function resendOtp(email: string): Promise<string> {
    try{
        const response: AxiosResponse<ApiResponse> = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/v1/user/resendotp',{
            email:email,
        })
        return response.data.message.otp
    }
    catch(error){
        return '';
    }
}
 
export async function forgetotp(email:string) : Promise<string> {
    try{
        const response: AxiosResponse<ApiResponse> = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/v1/user/loginotp',{
            email:email,
        })
        return response.data.message.otp
    }
    catch(error){
        return '';
    }
}

export async function forgetotpSubmit( otp: string) : Promise<{message:any,success:boolean}> {
    try{
        const response: AxiosResponse<ApiResponse> = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/v1/user/loginverifyotp',{
            otp:otp
        },{withCredentials:true})
        return response.data
    }catch(error){
        const err = error as AxiosError
        return {message: (err.response?.data as {message:string})?.message as any, success:false};
    }
}

export async function forgetpass( password: string) : Promise<boolean> {
    try{
        const response: AxiosResponse<ApiResponse> = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/v1/user/forgotpasswordchange',{
            password:password
        },{
            withCredentials:true
        })
        return response.data.success
    }catch(error){
        return false;
    }
}

