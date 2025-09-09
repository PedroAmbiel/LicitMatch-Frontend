import { defineStore } from 'pinia'

export const userStore = defineStore('userStore', {
  state: () => ({ 
    idUsuario: 10,
    nome: null,
    responsavel: null,
    perfil: null,
    email: null,
  }),
  persist:{
    storage: piniaPluginPersistedstate.localStorage(),
    afterHydrate: (ctx) =>{
      ctx.store.$state.lastRefreshedAt = new Date(ctx.store.$state.lastRefreshedAt);
      ctx.store.$state.lastLoginVerify = new Date(ctx.store.$state.lastLoginVerify);
      ctx.store.$state.accessExpireOn = new Date(ctx.store.$state.accessExpireOn);
      ctx.store.$state.refreshExpireOn = new Date(ctx.store.$state.refreshExpireOn);
    }
  },
  actions: {

  isAutenticado(){
    if(this.idUsuario){
      return true
    }else{
      return false
    }
  },

  limparUserStore(){
    this.$reset()
  },

}})
