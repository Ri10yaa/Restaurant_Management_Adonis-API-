import { useAuthStore } from "@/stores/auth";

export const auth = async (to: any, from: any, next: any) => {
    const auth = useAuthStore()
    if (!auth.user && localStorage.getItem('token')) {
        try {
            await auth.me()
        } catch (e) {
            await auth.logout()
        }
    }

    if (to.meta.requiresAuth && !auth.user) {
        return next('/login')
    }

    return next()
}