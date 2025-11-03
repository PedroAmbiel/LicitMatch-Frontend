<template>
  <div class="flex items-center justify-center">
    
    <Card class="w-full max-w-xl shadow-2xl rounded-lg">
      
      <template #header>
        <div class="bg-blue-600 text-white p-5 flex justify-between items-center rounded-t-lg">
          <span class="text-2xl font-bold">Perfil do Usuário</span>
          <i class="pi pi-user text-3xl"></i>
        </div>
      </template>

      <template #content>
        <div class="text-center p-6">
          
          <i class="pi pi-cog text-8xl text-blue-500 animate-[spin_3s_linear_infinite]"></i>

          <h1 class="text-4xl font-bold text-blue-900 mt-6 mb-2">
            Em Desenvolvimento
          </h1>

          <p class="text-lg text-blue-700">
            Esta funcionalidade ainda está em desenvolvimento.
          </p>

        </div>
      </template>

    </Card>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Perfil em Desenvolvimento'
})

definePageMeta({
  middleware: 'empresa-check',
  layout: 'logged'
})
</script>

<style scoped>

</style>