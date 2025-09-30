<script setup lang="ts">

definePageMeta({
  layout: 'logged',
  middleware: 'empresa-check',
})

const stats = ref([
  { value: '00', title: 'Editais com Potencial', colorClass: 'text-gray-800' },
  { value: '00', title: 'Licitações Inscritas', colorClass: 'text-gray-500' },
  { value: '00', title: 'Licitações em Andamento', colorClass: 'text-orange-500' },
  { value: '00', title: 'Licitações Perdidas', colorClass: 'text-green-500' },
  { value: '00', title: 'Licitações Vencidas', colorClass: 'text-red-500' },
]);
</script>

<template>
  <div class="p-4 sm:p-6 md:p-8">
    <h1 class="text-4xl font-bold text-blue-900 mb-8">
      Bem-vindo(a), {{userStore().nomePessoa}}!
    </h1>

    <div 
      class="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-3 
        xl:grid-cols-5 
        gap-6
      "
    >
      <CardsInformacaoGeral 
        v-for="(stat, index) in stats" 
        :key="index"
        :value="stat.value"
        :title="stat.title"
        :color-class="stat.colorClass"
      />
    </div>

    <div class="mt-12">
      </div>
  </div>
</template>