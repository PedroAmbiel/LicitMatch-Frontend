<script setup lang="ts">

definePageMeta({
  layout: 'logged',
  middleware: 'empresa-check',
})

const isSidebarMinimized = inject('isSidebarMinimized', ref(true));

const colunas = ref([
  {
    id: 'pre-selecionados',
    title: 'Pré-Selecionados',
    color: 'border-cyan-500',
    cards: [
      { id: 1, orgao: 'Prefeitura de Santa Bárbara do Sul', modalidade: 'Concorrência Eletrônica', status: 'Recebendo Proposta', data: '05/09/2025' },
      { id: 2, orgao: 'Prefeitura de Caxias do Sul', modalidade: 'Pregão Eletrônico', status: 'Análise de Documentos', data: '12/10/2025' },
    ]
  },
  {
    id: 'apuracao',
    title: 'Apuração dos Documentos',
    color: 'border-purple-500',
    cards: [
      { id: 3, orgao: 'Secretaria de Educação de POA', modalidade: 'Tomada de Preços', status: 'Em Análise de Documentos', data: '15/09/2025' },
      { id: 4, orgao: 'Prefeitura de Gramado', modalidade: 'Convite', status: 'Aguardando Prazo', data: '20/11/2025' },
      { id: 5, orgao: 'Governo do Estado do RS', modalidade: 'Concorrência Pública', status: 'Documentação OK', data: '01/10/2025' },
    ]
  },
  {
    id: 'construcao',
    title: 'Construção da Proposta',
    color: 'border-amber-500',
    cards: [
      { id: 6, orgao: 'Prefeitura de Santa Bárbara do Sul', modalidade: 'Concorrência Eletrônica', status: 'Em Elaboração', data: '05/09/2025' },
    ]
  },
  {
    id: 'acompanhamento',
    title: 'Acompanhamento pós-envio',
    color: 'border-green-500',
    cards: [
      { id: 7, orgao: 'Prefeitura de Porto Alegre', modalidade: 'Tomada de Preços', status: 'Aguardando Resultado', data: '30/09/2025' },
    ]
  },
]);
</script>

<template>
  <div class="p-4 sm:p-6 md:p-8 h-full flex flex-col bg-slate-50">
    <header class="flex justify-between items-center mb-6 flex-shrink-0 flex-wrap gap-4">
      <h1 class="text-3xl lg:text-4xl font-bold text-blue-900">
        Minhas Licitações
      </h1>
      <div class="flex items-center gap-2">
        <Button label="Filtrar" icon="pi pi-filter" severity="secondary" text />
        <Button label="Ordenar" icon="pi pi-sort" severity="secondary" text />
        <Button icon="pi pi-th-large" severity="secondary" text aria-label="Visualização" />
      </div>
    </header>

    <div class="flex-grow flex gap-6 overflow-x-hidden pb-4 px-1">

      <div 
        v-for="coluna in colunas" 
        :key="coluna.id"
        class="flex-shrink-0 transition-all duration-75"
        :class="isSidebarMinimized ? `w-96` : `w-80`"
      >
        <div 
          :class="coluna.color"
          class="flex items-center justify-between p-4 bg-white rounded-t-lg border-t-4 shadow-sm"
        >
          <div class="flex items-center gap-3">
            <h3 class="font-bold text-gray-800">{{ coluna.title }}</h3>
            <span class="bg-slate-200 text-slate-600 text-xs font-semibold px-2 py-1 rounded-full">
              {{ coluna.cards.length }}
            </span>
          </div>
        </div>

        <div class="p-4 bg-white rounded-b-lg shadow-sm space-y-4">
           <CardAcompanhamentoLicitacao
            v-for="card in coluna.cards"
            :key="card.id"
            :licitacao="card"
          />
        </div>
      </div>
      </div>
  </div>
</template>