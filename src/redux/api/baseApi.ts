import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://car-service-server-three.vercel.app/api' }),
    tagTypes: ["user", "Service", "Slot", "Review"],
    endpoints: () => ({}),
})

