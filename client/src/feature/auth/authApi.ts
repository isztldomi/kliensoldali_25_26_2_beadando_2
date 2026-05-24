import { baseApi } from "@/feature/base/baseApi";
import { authRoutes } from "@/feature/auth/authEndpoints";
import type {
  LoginRequestDto,
  LoginResponseDto,
  MeResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
} from "@/feature/auth/authTypes";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponseDto, RegisterRequestDto>({
      query: (body) => ({
        url: authRoutes.register,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    login: builder.mutation<LoginResponseDto, LoginRequestDto>({
      query: (body) => ({
        url: authRoutes.login,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: authRoutes.logout,
        method: "POST",
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    me: builder.query<MeResponseDto, void>({
      query: () => authRoutes.me,
      providesTags: ["Auth", "User"],
      transformErrorResponse: (response) => {
        // 401 NEM ERROR STATE legyen UI szinten
        return response;
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
} = authApi;
