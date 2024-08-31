import { baseApi } from "./baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (token) => ({
        url: "/users",
        methods: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["user"],
    }),
    updateUserRole: builder.mutation({
      query: ({ userId, role, token }) => ({
        url: `/users/${userId}`,
        method: "PATCH",
        body: { role },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useGetAllUsersQuery, useUpdateUserRoleMutation } = usersApi;
