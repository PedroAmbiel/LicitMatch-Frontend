<script setup lang="ts">
import { useLoadingStore } from '~/stores/loadingStore';

const loadingStore = useLoadingStore();

const mobileSidebarVisible = ref(false);
const isSidebarMinimized = ref(true);

function toggleDesktopSidebar() {
  isSidebarMinimized.value = !isSidebarMinimized.value;
}
</script>

<template>
  <div>
    <GlobalLoading v-if="loadingStore.isLoading" />
    
    <div class="flex min-h-screen bg-gray-100 text-gray-800">
      <aside
        class="hidden md:flex flex-col transition-all duration-300 ease-in-out"
        :class="[isSidebarMinimized ? 'w-20' : 'w-72']"
      >
        <LoggedSideBar 
          :is-minimized="isSidebarMinimized"
          @toggle="toggleDesktopSidebar" 
        />
      </aside>

      <main 
        class="flex-1 transition-all duration-300 ease-in-out"
      >
        <div class="p-4 md:p-6 lg:p-8">
          <header class="flex items-center gap-4 mb-4">
            <Button
              icon="pi pi-bars"
              text
              rounded
              aria-label="Abrir menu"
              class="text-gray-700 text-2xl md:hidden"
              @click="mobileSidebarVisible = true"
            />
          </header>
          <div>
            <slot />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>