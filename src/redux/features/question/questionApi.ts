import { baseApi } from "src/redux/createdApi/baseApi";

const questionAPI=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        sendQuestionToApi:builder.mutation({
            query:(data)=>{
                return {
                url:"/feq",
                method:"POST",
                body:data
                }
            }

        }),

        getQuestionData:builder.query({
            query:(feqId)=>{
                return {
                    url:`/feq/${feqId}`,
                    method:"GET"
                }
            }
        }),

        sendEmail:builder.mutation({
            query:(ids)=>{
                return{
                    url:"/feq/send-mail",
                    method:"POST",
                    body:ids
                }
            }
        })
    })
})

export const {useSendQuestionToApiMutation,useGetQuestionDataQuery,useSendEmailMutation}=questionAPI