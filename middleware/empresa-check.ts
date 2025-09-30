import { userStore } from "#imports"

export default defineNuxtRouteMiddleware((to, from) => {
const userStoreImport = userStore()
const uiStore = useUiStore()
  
  console.log('rodei')
  if (to.path.startsWith('/main')  && userStoreImport.isAutenticado()) {
    if (to.path === '/main/cadastro_empresa') {
      return
    }

    if (!userStoreImport.verificarSeEstaVinculadoAEmpresa()) {
      if (from.path !== to.path) {
        setTimeout(() => {
          
          uiStore.abrirDialogEmpresaRequerida()
        }, 100)
        
        return abortNavigation()
      }
    }
  }
})
