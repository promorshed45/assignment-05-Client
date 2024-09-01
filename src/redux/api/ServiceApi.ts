import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: ({ searchTerm, sort, filter }) => {
        let queryString = `/services?`;

        if (searchTerm) {
          queryString += `searchTerm=${searchTerm}&`;
        }
        if (sort) {
          queryString += `sort=${sort}&`;
        }
        if (filter) {
          queryString += `filter=${filter}&`;
        }

        queryString = queryString.slice(0, -1);

        return {
          url: queryString,
          method: "GET",
        };
      },
      providesTags: ["Service"],
    }),
    getServiceById: builder.query({
      query: (id: string) => ({
        url: `/services/${id}`,
        method: "GET",
      }),
    }),
    getSlotsByServiceId: builder.query({
      query: (id: string) => ({
        url: `/slots/availability/?${id}`,
        method: "GET",
      }),
    }),
  
    getSingleSlotsById: builder.query({
      query: (id: string | undefined) => {
        if (!id) {
          console.error("Service ID is undefined"); // Log an error if ID is undefined
          return { url: '', method: 'GET' }; // Return an empty request or handle it as needed
        }
    
        console.log("Service ID:", id); // Log the ID for debugging
        return {
          url: `/slots/availability/${id}`, // Correctly include the id in the URL
          method: "GET",
        };
      },
    }),
    
    

    createService: builder.mutation({
      query: ({ payload, token }) => {
        console.log(payload, "Token", token);
        return {
          url: "/services",
          method: "POST",
          body: payload,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["Service"],
    }),
    updateService: builder.mutation({
      query: ({ id, token, updatedService }) => {
        console.log('api teke', id, token, updatedService);
        return {
          url: `/services/${id}`,
          method: "PATCH",
          body: updatedService,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["Service"],
    }),
    deleteService: builder.mutation({
      query: ({ id, token }) => ({
        url: `/services/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Service"],
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetServiceByIdQuery,
  useGetSlotsByServiceIdQuery,
  useGetSingleSlotsByIdQuery,
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
} = authApi;
