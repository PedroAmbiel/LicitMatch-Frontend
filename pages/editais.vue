<script setup lang="ts">

definePageMeta({
  layout: 'logged',
})



const allEditais = ref([
  { id: 1, orgao: 'Prefeitura de Santa Bárbara do Sul', status: 'Recebendo Proposta', modalidade: 'Concorrência Eletrônica', data: '05/09/2025', edital: '006/2025', uf: 'RS', local: 'Santa Bárbara do Sul', objeto: 'Contratação de Empresa Especializada...', isFavorito: true, isDestaque: true, },
  { id: 2, orgao: 'Prefeitura de Caxias do Sul', status: 'Aberto', modalidade: 'Pregão Eletrônico', data: '12/10/2025', edital: '102/2025', uf: 'RS', local: 'Caxias do Sul', objeto: 'Aquisição de equipamentos de informática...', isFavorito: false, isDestaque: true, },
  { id: 3, orgao: 'Secretaria de Educação de Porto Alegre', status: 'Em Andamento', modalidade: 'Tomada de Preços', data: '20/09/2025', edital: '034/2025', uf: 'RS', local: 'Porto Alegre', objeto: 'Reforma e ampliação da Escola Municipal...', isFavorito: true, isDestaque: false, },
  { id: 4, orgao: 'Prefeitura de Gramado', status: 'Finalizado', modalidade: 'Convite', data: '01/08/2025', edital: '055/2025', uf: 'RS', local: 'Gramado', objeto: 'Contratação de serviços de decoração natalina...', isFavorito: false, isDestaque: false, },
]);


const activeTab = ref('todos');

const editaisDestaque = computed(() => allEditais.value.filter(e => e.isDestaque));
const editaisFavoritos = computed(() => allEditais.value.filter(e => e.isFavorito));

function toggleFavorito(id: number) {
  const edital = allEditais.value.find(e => e.id === id);
  if (edital) {
    edital.isFavorito = !edital.isFavorito;
  }
}
</script>

<template>

  <h1 class="text-3xl mx-6">Visualizar Editais</h1>
  <div class="bg-inherit p-4 sm:p-6 ">
    <Tabs v-model:value="activeTab"  >
      <div class="flex flex-col sm:flex-row justify-between items-start gap-10">
        <TabList class="w-full sm:w-full">
          <Tab value="todos">
            <i class="pi pi-list mr-2"></i>
            <span>Todos</span>
          </Tab>
          <Tab value="destaques">
            <i class="pi pi-bolt mr-2"></i>
            <span>Em destaque</span>
          </Tab>
          <Tab value="favoritos">
            <i class="pi pi-star mr-2"></i>
            <span>Favoritos</span>
          </Tab>
        </TabList>
        <div class="flex items-center gap-2 self-end sm:self-center">
          <Button label="Filtrar" icon="pi pi-filter" severity="secondary" text />
          <Button label="Ordenar" icon="pi pi-sort" severity="secondary" text />
        </div>
      </div>

      <TabPanels class="rounded-tr-2xl rounded-br-2xl rounded-bl-2xl">
        <TabPanel value="todos">
          <EditaisList :editais="allEditais" @toggle-favorito="toggleFavorito" />
        </TabPanel>
        <TabPanel value="destaques">
          <EditaisList :editais="editaisDestaque" @toggle-favorito="toggleFavorito" />
        </TabPanel>
        <TabPanel value="favoritos">
          <EditaisList :editais="editaisFavoritos" @toggle-favorito="toggleFavorito" />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<style>
  .p-tablist-tab-list{ background: transparent !important; gap: 20px;}
  .p-tabs-list { border: 1px solid #e5e7eb; border-radius: 6px; background: white !important; display: inline-flex;}
  .p-tab { border: none !important; background: white !important; color: #78a9f8 !important; margin: 0 !important; border-top-left-radius: 24px; border-top-right-radius: 24px;}
  .p-tab:hover { background: #c0d7fc !important; }
  .p-tab[data-p-active="true"] { font-weight: bold !important; color: #4081e9 !important; }
  .p-tab:focus-visible { outline: none !important; box-shadow: none !important; }
  .p-datatable-wrapper { border: 1px solid #e5e7eb; border-radius: 6px; }
  .p-datatable .p-datatable-tbody > tr > td { padding: 0; }
  .p-tablist-active-bar{ background: #075ae0 !important; height: .2rem;}
</style>