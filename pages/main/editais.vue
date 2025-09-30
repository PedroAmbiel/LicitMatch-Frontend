<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useLoadingStore } from '@/stores/loadingStore';
import type { PageState } from 'primevue';

definePageMeta({
  layout: 'logged',
  middleware: 'empresa-check',
});


interface Edital {
  id: string;
  orgao: string;
  status: string;
  modalidade: string;
  data: string;
  edital: string;
  uf: string;
  local: string;
  objeto: string;
  isFavorito: boolean;
  isDestaque: boolean;
}

interface EditalDetalhado {
  id : string
  pncpIdentificador: string;
  nomeUnidade: string;
  status: string;
  modalidade: string;
  dataInclusao: string;
  edital: string;
  ufSigla: string;
  municipioNome: string;
  descricaoContratacao: string;
  inicioPropostas : string;
  fimPropostas : string;
  modoDisputa : string;
  situacaoPncp : string;
  isRegistroPreco : boolean;
  linkEdital : string;
  isFavorito: boolean;
  isDestaque: boolean;
}

const toast = useToast();

const loadingStore = useLoadingStore();
const pagina = ref(0);
const qtdRegistros = ref(10);

const allEditais = ref<Edital[]>([]);
const totalEditaisEncontrados = ref(0)

async function fetchEditais() {
  try {
    loadingStore.show();

    const response = await $fetch<any>('/api/licitmatch/listar-contratos-minimo', {
       query: {
        'paginacao': pagina.value,
        'qtdRegistros': qtdRegistros.value
      },
    });
    
    const editaisMapeados = response.data.map((contrato): Edital => {
      return {
        id: contrato.pncpIdentificador,
        orgao: contrato.nomeUnidade,
        status: 'Não informado',
        modalidade: contrato.modalidade,
        data: new Date(contrato.dataInclusao).toLocaleDateString('pt-BR'),
        edital: '',
        uf: contrato.ufSigla,
        local: contrato.municipioNome,
        objeto: contrato.descricaoContratacao,
        isFavorito: false,
        isDestaque: false,
      };
    });

    totalEditaisEncontrados.value = response.totalRegistros;
    allEditais.value = editaisMapeados;
 
  } catch (error) {
    toast.add({
        severity: 'error',
        summary: 'Serviço indisponível',
        detail: 'Não foi possível consultar os editais disponíveis',
        life: 15000
    });
  } finally {
    loadingStore.hide();
  }
}

onMounted(() => {
  fetchEditais();
});


const activeTab = ref('todos');

const editaisDestaque = computed(() => allEditais.value.filter((e: Edital) => e.isDestaque));
const editaisFavoritos = computed(() => allEditais.value.filter((e: Edital) => e.isFavorito));

const isDetailSidebarVisible = ref(false);
const selectedEdital = ref<EditalDetalhado | null>(null);

function toggleFavorito(id: string) {
  const edital = allEditais.value.find((e: Edital) => e.id === id);
  if (edital) {
    edital.isFavorito = !edital.isFavorito;
  }
}

async function showEditalDetails(edital: Edital, isFavorito : boolean) {
  isDetailSidebarVisible.value = true;
  selectedEdital.value = null;

  try {
    loadingStore.isLoading = true;
    
    const editalDetalhado = await buscarEditalDetalhado(edital.id);

    editalDetalhado.isFavorito = isFavorito;

    selectedEdital.value = editalDetalhado;

  } catch (error) {
    console.error("Falha ao buscar detalhes do edital:", error);
    isDetailSidebarVisible.value = false; 
  } finally {
    loadingStore.isLoading = false;
  }
}

async function buscarEditalDetalhado(idEdital: string): Promise<EditalDetalhado> {
  const response = await $fetch<EditalDetalhado>('/api/licitmatch/listar-detalhes-contrato', {
    method: 'GET',
    query: {
      'idPncp': idEdital,
    },
  });

  return response;
}

function trocarPagina(event: PageState): void {
  pagina.value = event.page;
  qtdRegistros.value = event.rows;
  fetchEditais();
}
</script>

<template>

  <Toast position="top-right" />
    
    <Sidebar
      v-model:visible="isDetailSidebarVisible"
      position="right"
      class="!w-2/4"
      :pt="{
        mask: { class: 'bg-black/10 backdrop-blur-sm' },
        header: { class: 'hidden' },
        content: { class: 'p-0' }
      }">
      <EditalDetalhe 
        :edital="selectedEdital"
        @close="isDetailSidebarVisible = false"
        @toggle-favorito="toggleFavorito"
      />
    </Sidebar>

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
          <EditaisList :editais="allEditais" @toggle-favorito="toggleFavorito" :num-total-por-pagina="qtdRegistros" 
            @trocar-pagina="trocarPagina" :num-total-editais="totalEditaisEncontrados" @edital-selected="showEditalDetails" />
        </TabPanel>
        <TabPanel value="destaques">
          <EditaisList :editais="editaisDestaque" @toggle-favorito="toggleFavorito" :num-total-por-pagina="qtdRegistros" :num-total-editais="editaisDestaque.length" @edital-selected="showEditalDetails"  />
        </TabPanel>
        <TabPanel value="favoritos">
          <EditaisList :editais="editaisFavoritos" @toggle-favorito="toggleFavorito" :num-total-por-pagina="qtdRegistros" :num-total-editais="editaisFavoritos.length" @edital-selected="showEditalDetails" />
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