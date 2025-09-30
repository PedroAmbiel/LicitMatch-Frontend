import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    isEmpresaRequeridaDialogVisible: false
  }),

  actions: {
    abrirDialogEmpresaRequerida() {
      this.isEmpresaRequeridaDialogVisible = true
    },
    fecharDialogEmpresaRequerida() {
      this.isEmpresaRequeridaDialogVisible = false
    }
  },
  persist:{
    storage: piniaPluginPersistedstate.localStorage(),
  }
})
