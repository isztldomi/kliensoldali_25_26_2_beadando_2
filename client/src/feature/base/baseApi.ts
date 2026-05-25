import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_PREFIX = "api/v1/";
const BASE_URL_HOST = "http://localhost:3000/";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL_HOST}${API_PREFIX}`,
    credentials: "include", // ha van cookie-s auth
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Auth", "User", "Tables", "Timeslot"],
  endpoints: () => ({}),
});
