export default defineNuxtRouteMiddleware((to, from) => {

    if(to.path.startsWith('/main') && !userStore().isAutenticado()){
        return navigateTo('/public')
    }

    if(to.path.startsWith('/public/auth/') && userStore().isAutenticado()){
        return navigateTo('/main/pagina_inicial')
    }

})
