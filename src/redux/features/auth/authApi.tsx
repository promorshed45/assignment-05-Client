import { baseApi } from "../../api/baseApi";


const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create User
    registerUser: builder.mutation({
      query: (User) => ({
        url: "/auth/signup",
        method: "POST",
        body: User,
      }),
      invalidatesTags: ["user"],
    }),
    loginUser: builder.mutation({
        query: (User) => ({
          url: "/auth/login",
          method: "POST",
          body: User,
        }),
        invalidatesTags: ["user"],
      }),
 
    
  }),
});
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
} = userApi;