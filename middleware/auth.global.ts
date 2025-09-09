export default defineNuxtRouteMiddleware((to, from) => {

    if(to.path != '/' && !userStore().isAutenticado()){
        return navigateTo('/')
    }

})
