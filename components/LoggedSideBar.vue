<script setup lang="ts">
const props = defineProps<{
  isMinimized? : boolean
}>();

const emit = defineEmits<{
  (e: 'toggle', condition: boolean): void
}>();

const route = useRoute();
const router = useRouter()
const user = userStore()

function logoff(){
  user.limparUserStore()
  router.push('/public')
}

const menuItems = [
  { icon: 'pi pi-th-large', label: 'Dashboard', to: '/main/dashboard' },
  { icon: 'pi pi-file', label: 'Todos os Editais', to: '/main/editais'},
  { icon: 'pi pi-briefcase', label: 'Minhas Licitações', to: '/main/minhas_licitacoes'},
  { icon: 'pi pi-calendar', label: 'Calendário', to: '/' },
];

const footerMenuItems = [
    { icon: 'pi pi-user', label: 'Meu Perfil', to: '/' },
    { icon: 'pi pi-sign-out', label: 'Sair', to: '/' },
];

</script>

<template>
  <div class="h-full flex flex-col bg-blue-900 text-white">
    <div class="p-4 flex items-center border-b border-blue-800" :class="[isMinimized ? 'justify-center' : 'justify-between']">
      <NuxtLink to="/pagina_inicial" v-if="!isMinimized" class="flex items-center gap-3">
        <img src="/assets/images/licit_logo_branco.png" alt="Logo" class="h-8 flex-shrink-0" />
        <span class="text-xl font-semibold whitespace-nowrap">Licit Match</span>
      </NuxtLink>

      <button
        @click="emit('toggle', !isMinimized)"
        class="p-2 rounded-full hover:bg-blue-800 focus:outline-none focus:ring-none focus:ring-blue-500"
        aria-label="Alternar menu"
      >
        <i class="pi pi-bars text-xl"></i>
      </button>
    </div>

    <nav class="flex-grow p-4">
      <ul class="space-y-2">
        <li v-for="item in menuItems" :key="item.label" >
          <NuxtLink
            @click="emit('toggle', true)"
            :to="item.to"
            class="flex items-center gap-3 p-3 rounded-md transition-colors duration-200 hover:bg-blue-800"
            :class="[isMinimized ? 'justify-center' : '']"
            active-class="bg-blue-500 font-bold"
          >
            <i :class="[item.icon, 'text-xl flex-shrink-0']"></i>
            <Transition name="fade">
              <span v-if="!isMinimized" class="whitespace-nowrap">{{ item.label }}</span>
            </Transition>
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <div class="p-4 mt-auto border-t border-blue-800">
      <ul class="space-y-2">
        <li v-for="item in footerMenuItems" :key="item.label" @click="item.label == 'Sair' ? logoff() : null">
          <NuxtLink
            @click="emit('toggle', true)"
            :to="item.to"
            class="flex items-center gap-3 p-3 rounded-md transition-colors duration-200 hover:bg-blue-800"
            :class="[isMinimized ? 'justify-center' : '']"
            active-class="bg-blue-800"
          >
            <i :class="[item.icon, 'text-xl flex-shrink-0']"></i>
             <Transition name="fade">
              <span v-if="!isMinimized" class="whitespace-nowrap">{{ item.label }}</span>
            </Transition>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>