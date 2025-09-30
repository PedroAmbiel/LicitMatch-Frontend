import { userStore } from "#imports"

export const useUseEmpresa = () => {
  const userStoreImport = userStore()
  const router = useRouter()
  const toast = useToast()

  const checkEmpresaStatus = () => {
    if (!userStoreImport.hasEmpresa && userStoreImport.isUserAuthenticated) {
      return false
    }
    return true
  }

  const goToCadastroEmpresa = () => {
    router.push('/main/cadastro-empresa')
  }

  const vincularEmpresa = async (codigo : number, senha : string) => {
    try {
      const result = await userStoreImport.vincularEmpresa(codigo, senha)
      
      if (result.success) {
        toast.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: 'Você foi vinculado à empresa com sucesso',
          life: 3000
        })
        return true
      } else {
        toast.add({
          severity: 'error',
          summary: 'Erro',
          detail: result.message || 'Código ou senha inválidos',
          life: 3000
        })
        return false
      }
    } catch (error) {
      toast.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Erro ao vincular empresa',
        life: 3000
      })
      return false
    }
  }

  return {
    checkEmpresaStatus,
    goToCadastroEmpresa,
    vincularEmpresa,
    hasEmpresa: computed(() => userStoreImport.hasEmpresa),
    nomeEmpresa: computed(() => userStoreImport.nomeEmpresa)
  }
}

