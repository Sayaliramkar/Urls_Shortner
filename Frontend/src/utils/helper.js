import { redirect } from "@tanstack/react-router";
import { login } from "../store/slices/authSlice.js";
import { getCurrentUser } from "../apis/user.api.js";

export const checkAuth = async ({ context }) => {
    try {
        const { queryClient, store } = context;
       const user = await queryClient.ensureQueryData({
  queryKey: ["currentUser"],
  queryFn: getCurrentUser,
});

        if (!user) {
            throw redirect({
                to: '/auth',
            });
        }
        store.dispatch(login(user));
        const { isAuthenticated } = store.getState().auth;
        if (!isAuthenticated) {
            throw redirect({
                to: '/auth',
            });
        }
        return true
    } catch (error) {
        console.log(error);
        throw redirect({
            to: '/auth',
        });
    }
}
