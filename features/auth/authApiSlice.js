import { apiSlice } from "@/api/apiSlice";
import { setCredentials, setIsNewUser } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "/register",
        method: "POST",
        body: { ...credentials },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(setIsNewUser(true));
          dispatch(setCredentials(data));
        } catch (err) {
          console.error(err);
        }
      },
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (!data.user?.verified) {
            dispatch(setIsNewUser(true));
          }

          dispatch(setCredentials(data));
        } catch (err) {
          console.error(err);
        }
      },
    }),
    verifyAuth: builder.mutation({
      query: () => ({
        url: "/auth/verify",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          console.log(data);

          if (!data.user?.verified) {
            dispatch(setIsNewUser(true));
          }

          dispatch(setCredentials(data));
        } catch (err) {
          if (err.error.originalStatus !== 401) {
            console.error(err);
          }
        }
      },
    }),
    logOut: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyAuthMutation,
  useLogOutMutation,
} = authApiSlice;
