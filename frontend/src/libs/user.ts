import axios, { AxiosError,AxiosPromise,AxiosResponse } from "axios"
type ApiResponse = {
    success: boolean,
    message: any,
}

export const getUser = async():Promise<any>=>{
    try{
        const response: AxiosResponse<ApiResponse> = await axios.get(process.env.NEXT_PUBLIC_API_URL+'/api/v1/user/getuserdetails',{
            withCredentials:true
        });
        return response.data.message;
    }catch(err){
        return null;
    }
}

export const followuser = async(id:string,check:boolean):Promise<{success:boolean,message:{follow:boolean}}>=>{
    try {
        const response: AxiosResponse<ApiResponse> = await axios.post(process.env.NEXT_PUBLIC_API_URL+`/api/v1/user/follow`,
            {
                id:id,
                check:check
            },
            {
                withCredentials:true
            }
        );
        return response.data
    } catch (err) {
        const error = err as AxiosError
        return (error.response?.data as {message:{follow:boolean}, success:boolean});
    }
}
export const logout = async ():Promise<{message:string, success:boolean}>=>{
    try{
        const response: AxiosResponse<ApiResponse> = await axios.get(process.env.NEXT_PUBLIC_API_URL+'/api/v1/user/logout',{
            withCredentials:true
        });
        return response.data;
    }
    catch(err){
        const error = err as AxiosError;
       return (error.response?.data as {message:string, success:boolean});
    }
}
export const addlocation = async (place:string):Promise<{message:string, success:boolean}> => {
    try {
        const response: AxiosResponse<ApiResponse> = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/v1/user/addlocation',{
            location:place
        },{
            withCredentials:true
        })
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        return (err.response?.data as {message:string, success:boolean});
    }
}
export const addJob = async (job:string):Promise<{message:string, success:boolean}> => {
    try {
        const response: AxiosResponse<ApiResponse> = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/v1/user/addjobtitle',{
            jobTitle:job
        },{
            withCredentials:true
        })
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        return (err.response?.data as {message:string, success:boolean});
    }
}
export const addDesc = async (desc:string):Promise<{message:string, success:boolean}> => {
    try {
        const response: AxiosResponse<ApiResponse> = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/v1/user/adddescription',{
            description:desc
        },{
            withCredentials:true
        })
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        return (err.response?.data as {message:string, success:boolean});
    }
}
export const addContact = async (contact:string):Promise<{message:string, success:boolean}> => {
    try {
        const response: AxiosResponse<ApiResponse> = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/v1/user/addcontactdetails',{
            details:contact
        },{
            withCredentials:true
        })
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        return (err.response?.data as {message:string, success:boolean});
    }
}
export const createBlog = async (title:string,content:any,tags:string[],coverpic:string):Promise<{message:string, success:boolean}>=>{
    try {
        const response: AxiosResponse<ApiResponse> = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/v1/blog/create',{
            title:title,
            para:content,
            tags:tags,
            coverpic:coverpic   
        },{
            withCredentials:true
        })
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        return {message:(err.response?.data as {message:string, success:boolean})?.message, success:false};
    }
}

export async function getBlog(id:string):Promise<{message:any, success:boolean}>{
    try {
        const response: AxiosResponse<ApiResponse> = await axios.get(process.env.NEXT_PUBLIC_API_URL+`/api/v1/blog/${id}`,{
            withCredentials:true
        })
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        return {message:(err.response?.data as {message:any, success:boolean})?.message, success:false};
    }
}

export async function like(id:string):Promise<any>{
    try {
        const response: AxiosResponse<ApiResponse> = await axios.get(process.env.NEXT_PUBLIC_API_URL+`/api/v1/blog/like/${id}`,{
            withCredentials:true
        })
        return response.data.success;
    } catch (error) {
        const err = error as AxiosError;
        return (err.response?.data as {message:string, success:boolean})?.success;
    }
}

export async function commentBlog(id:string, message:string){
    try {
        const response: AxiosResponse<ApiResponse> = await axios.post(process.env.NEXT_PUBLIC_API_URL+`/api/v1/blog/comment/${id}`,{
            comment:message
        },{
            withCredentials:true
        })
        return response.data.message;
    } catch (error) {
        const err = error as AxiosError;
        return (err.response?.data as {message:string, success:boolean})?.message;
    }
}

export async function deleteBlog(id:string):Promise<any>{
    try {
        const response: AxiosResponse<ApiResponse> = await axios.delete(process.env.NEXT_PUBLIC_API_URL+`/api/v1/blog/delete/${id}`,{
            withCredentials:true
        })
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        return (err.response?.data as {message:string, success:boolean});
    }
}

export async function getBlogs(tags:string[],pageno:number):Promise<any>{
    try {
        const response: AxiosResponse<ApiResponse> = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/v1/blog/tags',{
            tags:tags,
            pagesno:pageno
        },{
            withCredentials:true
        })
        return response.data;
    } catch (error) {
        const err = error as AxiosError
        return (err.response?.data as {message:{saved:boolean},success:boolean});
    }
}
export async function getCreatedBlogs():Promise<any>{
    try {
        const response: AxiosResponse<ApiResponse> = await axios.get(process.env.NEXT_PUBLIC_API_URL+'/api/v1/user/createdblogs',{
            withCredentials:true
        })
        return response.data.message;
    } catch (error) {
        return 'Error';
    }
}
export async function saveblog(id:string,save:boolean):Promise<any>{
    try {
        const response: AxiosResponse<ApiResponse> = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/v1/blog/save',{
            id:id,
            save:save
        },{
            withCredentials:true
        })
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        return (err.response?.data as {message:{saved:boolean},success:boolean});
    }
}
export async function getSavedBlogs():Promise<any>{
    try {
        const response: AxiosResponse<ApiResponse> = await axios.get(process.env.NEXT_PUBLIC_API_URL+'/api/v1/user/savedblogs',{
            withCredentials:true
        });
        return response.data.message;
    } catch (error) {
        return 'Error';
    }
}
export async function getProfile(name:string):Promise<any>{
    try{
        const response: AxiosResponse<ApiResponse> = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/v1/user/getuser',{
            username:name
        },{
            withCredentials:true
        });
        return response.data.message;
    }catch(err){
        return 'Error';
    }
}

export async function createDraft(title:string,content:string,tags:string[],coverpic:string): Promise<any>{
    try {
        const response: AxiosResponse<ApiResponse> = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/v1/user/createDraft',{
            title:title,
            para:content,
            tags:tags,
            coverpic:coverpic
        },{
            withCredentials:true
        })
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        return (err.response?.data as {message:string, success:boolean});
       
    }
}
export async function getDraftBlogs(): Promise<any>{
    try {
        const response: AxiosResponse<ApiResponse> = await axios.get(process.env.NEXT_PUBLIC_API_URL+'/api/v1/user/draftblogs',{
            withCredentials:true
        })
        return response.data.message;
    } catch (error) {
        return 'Error';
    }
}

export async function updateDraft(title:string,content:string,tags:string[],coverpic:string): Promise<any>{
    try {
        const response: AxiosResponse<ApiResponse> = await axios.put(process.env.NEXT_PUBLIC_API_URL+'/api/v1/user/updatedraft',{
            title:title,
            para:content,
            tags:tags,
            coverpic:coverpic
        },{
            withCredentials:true
        })
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        return (err.response?.data as {message:string, success:boolean});
    }
}
export async function getDraftbyTitle(title:string):Promise<any>{
    try {
        const response: AxiosResponse<ApiResponse> = await axios.post(process.env.NEXT_PUBLIC_API_URL+`/api/v1/user/getdraft`,{
            title:title
        },{
            withCredentials:true
        })
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        return (err.response?.data as {message:string, success:boolean});
    }
}
export async function deleteDraft(title:string): Promise<any> {
    try {
        const response: AxiosResponse<ApiResponse> = await axios.delete(process.env.NEXT_PUBLIC_API_URL+`/api/v1/user/deletedraft/${title}`,{
            withCredentials:true
        });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        return (err.response?.data as {message:string, success:boolean});
    }
}
export async function searchbyname(name:string):Promise<any>{
    try {
        const response: AxiosResponse<ApiResponse> = await axios.get(process.env.NEXT_PUBLIC_API_URL+`/api/v1/user/${name}`,{
            withCredentials: true
          })
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        return (err.response?.data as {message:string, success:boolean});
    }
}
export async function searchbytags(tags:string[]):Promise<any>{
    try {
        const response: AxiosResponse<ApiResponse> = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/v1/user/tags',{
            tags:tags
          },{
            withCredentials: true
          })
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        return (err.response?.data as {message:string, success:boolean});
    }
}
export async function getsample():Promise<any>{
    try {
        const response: AxiosResponse<ApiResponse> = await axios.get(process.env.NEXT_PUBLIC_API_URL+'/api/v1/blog/sampleblogs')
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        return (err.response?.data as {message:string, success:boolean});
    }
}
export async function getunauthBlog(id:string):Promise<any>{
    try {
        const response: AxiosResponse<ApiResponse> = await axios.get(process.env.NEXT_PUBLIC_API_URL+`/api/v1/blog/sample/${id}`,{
            withCredentials:true
        })
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        return {message:(err.response?.data as {message:any, success:boolean})?.message, success:false};
    }
}