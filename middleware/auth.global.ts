export default defineNuxtRouteMiddleware((to, from) => {

    if(to.path.startsWith('/main') && !userStore().isAuthenticated){
        console.log("[USERSTORE]: ", !userStore().isAuthenticated);
        console.log("[PATH]: ", !userStore().isAutenticado());
        return navigateTo('/public')
    }

    if(to.path.startsWith('/public/auth/') && userStore().isAuthenticated){
        console.log("[USERSTORE]: ", userStore().isAuthenticated);
        return navigateTo('/main/dashboard')
    }

})
