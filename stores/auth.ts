import { defineStore } from 'pinia'
import type { User } from '~/interfaces/UserInterface';

export const userStore = defineStore('userStore', {
  state: () => { 
    return{
      idUsuario: null as Number | null,
      nomePessoa: null as String | null,
      ativo : null as Boolean | null,
      nomeEmpresa: null as String | null,
      idEmpresa: null as Number | null,
      email: null as String | null,
      isAuthenticated: null as Boolean | null,
    }
  },
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

    logarUsuario(dadosUsuario : User){
      this.isAuthenticated = true
      this.idUsuario = dadosUsuario.idUsuario
      this.idEmpresa = dadosUsuario.idEmpresa || null
      this.nomeEmpresa = dadosUsuario.nomeEmpresa || null
      this.nomePessoa = dadosUsuario.nomePessoa
      this.ativo = dadosUsuario.ativo
      this.email = dadosUsuario.email
    },

    isAutenticado(){
      if(this.idUsuario != null){
        return true
      }else{
        return false
      }
    },

    verificarSeEstaVinculadoAEmpresa() : boolean{
      if(this.idEmpresa != null){
        return true
      }else{
        return false
      }
    },

    limparUserStore() : void{
      this.$reset()
    },

}})
