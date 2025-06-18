import { baseApi } from "src/redux/createdApi/baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        user:builder.mutation({
            query:(data)=>{
                return {
                    url:"/contact",
                    method:"POST",
                    body:data
                }
            }
        })
    })
})

export const {useUserMutation}=userApi