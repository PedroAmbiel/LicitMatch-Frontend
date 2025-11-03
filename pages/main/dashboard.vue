<script setup lang="ts">
definePageMeta({
  layout: 'logged',
  middleware: 'empresa-check',
})

interface IndicadoresDashboard {
  editaisComPotencial: number
  editaisInscritos: number
  editaisEmAndamento: number
  editaisVencidos: number
}

const stats = ref([
  { value: '00', title: 'Editais com Potencial', colorClass: 'text-gray-800', to: 'editais', full: false, key: 'editaisComPotencial' },
  { value: '00', title: 'Editais Inscritos', colorClass: 'text-green-500', to: 'minhas_licitacoes', full: false, key: 'editaisInscritos' },
  { value: '00', title: 'Editais em Andamento', colorClass: 'text-orange-500', to: 'minhas_licitacoes', full: false, key: 'editaisEmAndamento' },
  { value: '00', title: 'Editais Vencidos', colorClass: 'text-red-500', to: 'minhas_licitacoes', full: false, key: 'editaisVencidos' },
])

const carregarIndicadores = async () => {
  try {
    const response = await $fetch<IndicadoresDashboard>('/api/licitmatch/indicadores-dashboard', {
      query: {
        "idEmpresa": userStore().idEmpresa,
      },
    })
    
    stats.value = stats.value.map(stat => ({
      ...stat,
      value: String(response[stat.key as keyof IndicadoresDashboard] || 0).padStart(2, '0')
    }))
  } catch (error) {
    console.error('Erro ao carregar indicadores:', error)
  }
}

onMounted(() => {
  carregarIndicadores()
})
</script>

<template>
  <div class="p-4 sm:p-6 md:p-8">
    <h1 class="text-4xl font-bold text-blue-900 mb-8">
      Bem-vindo(a), {{ userStore().nomePessoa }}!
    </h1>

    <div 
      class="
        mt-14
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-2 
        xl:grid-cols-2 
        gap-10
      "
    >
      <CardsInformacaoGeral 
        v-for="(stat, index) in stats" 
        :key="index"
        :value="stat.value"
        :title="stat.title"
        :color-class="stat.colorClass"
        class="h-auto !p-10 cursor-pointer"
        :class="{ 'col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-2': stat.full }"
        @click="() => $router.push(stat.to)"
      />
    </div>
  </div>
</template>