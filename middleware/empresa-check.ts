import { userStore } from "#imports"

export default defineNuxtRouteMiddleware((to, from) => {
const userStoreImport = userStore()
const uiStore = useUiStore()
  
  console.log('rodei')
  if (to.path.startsWith('/main') && userStoreImport.isAutenticado()) {
    if (to.path === '/main/cadastro_empresa') {
      return
    }

    if (!userStoreImport.verificarSeEstaVinculadoAEmpresa()) {
      if (from.path !== to.path) {
        
          
        uiStore.abrirDialogEmpresaRequerida()

        if(!from.path.startsWith("/public")){
          return abortNavigation()
        }

      }
    }
  }
})
