import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mapApi = createApi({
  reducerPath: "mapApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://coinmap.org/api/v1/venues/?limit=28400",
  }),
  endpoints: (builde) => ({
    getAllMap: builde.query({ query: () => "map" }),
  }),
});
export const { useGetAllMapQuery } = mapApi;
