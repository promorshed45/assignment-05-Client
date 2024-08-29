import { baseApi } from "../../api/baseApi";


const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create User
    registerUser: builder.mutation({
      query: (post) => ({
        url: "/auth/signup",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["user"],
    }),
    loginUser: builder.mutation({
        query: (post: { email: string; password: string }) => ({
          url: "/auth/login",
          method: "POST",
          body: post,
        }),
        invalidatesTags: ["user"],
      }),
 
    
  }),
});
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
} = userApi;