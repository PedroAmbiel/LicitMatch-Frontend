export default defineNuxtRouteMiddleware((to, from) => {

    if(to.path.startsWith('/main') && !userStore().isAuthenticated){
        return navigateTo('/public')
    }

    if(to.path == '/public/auth/login' && userStore().isAuthenticated){
        return navigateTo('/main/dashboard')
    }

})
