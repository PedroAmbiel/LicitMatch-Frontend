<script setup lang="ts">

definePageMeta({
  layout: 'logged',
  middleware: 'empresa-check',
})

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
}

interface Requisito {
  idRequisito: string; 
  nomeCadastrou: string;
  dataInclusao: string;
  descricaoRequisito: string;
  isCompleto: boolean;
}

interface EditalDetalhado {
  idEmpresaContrato : number;
  pncpIdentificador: string;
  nomeUnidade: string;
  ufNome: string;
  ufSigla: string;
  municipioNome: string;
  modalidade: string;
  dataInclusao: string;
  descricaoContratacao: string;
  

  modoDisputa: string;
  situacaoPncp: string;
  isRegistroPreco: boolean;
  inicioPropostas: string; 
  fimPropostas: string;
  
  linkEdital: string;
  
  requisitos: Requisito[];
}


const editais = ref<Edital[]>([]);
const visualizacao = ref<'cards' | 'lista'>('cards');
const ordenacao = ref('data');
const loadingStore = useLoadingStore();
const toast = useToast();
const user = userStore();
const isDetailSidebarVisible = ref(false);
const selectedEdital = ref<EditalDetalhado | null>(null);

async function fetchEditais() {
  try {
    loadingStore.show();

    const response = await $fetch<any>('/api/licitmatch/listar-contratos-inscritos', {
        query: {
          'idEmpresa' : user.idEmpresa,
          'situacao' : 'PRE_SELECAO'
        },
    });

    console.log(response);

    const editaisMapeados = response.data.map((contrato): Edital => {
      return {
        id: contrato.pncpIdentificador,
        orgao: contrato.nomeUnidade,
        status: contrato.situacao,
        modalidade: contrato.modalidade,
        data: new Date(contrato.dataInscricao).toLocaleDateString('pt-BR'),
        edital: '',
        uf: contrato.ufSigla,
        local: contrato.municipioNome,
        objeto: contrato.descricaoContratacao,
      };
    });

    editais.value = editaisMapeados;

  } catch (error) {
    console.error("Erro ao buscar editais:", error);
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


const editaisFiltrados = computed(() => {
  let result = [...editais.value];
  
  if (ordenacao.value === 'data') {
    result.sort((a, b) => {
        const dateA = a.data.split('/').reverse().join('-');
        const dateB = b.data.split('/').reverse().join('-');
        return new Date(dateB).getTime() - new Date(dateA).getTime();
    });
  } else if (ordenacao.value === 'orgao') {
    result.sort((a, b) => a.orgao.localeCompare(b.orgao));
  } else if (ordenacao.value === 'modalidade') {
    result.sort((a, b) => a.modalidade.localeCompare(b.modalidade));
  }
  
  return result;
});

const estatisticas = computed(() => {
  const total = editais.value.length;
  return { total };
});

async function mostrarDetalhes(id: string) {
  selectedEdital.value = null;
  isDetailSidebarVisible.value = true;

  try {
    loadingStore.isLoading = true;

    const editalDetalhado = await buscarEditalDetalhado(id);

    selectedEdital.value = editalDetalhado;
    console.log("Requisitos" , selectedEdital.value.requisitos)
    
  } catch (error) {
    console.error("Falha ao buscar detalhes do edital:", error);
    isDetailSidebarVisible.value = false; 
  } finally {
    loadingStore.isLoading = false;
  }
}

async function buscarEditalDetalhado(idEdital: string): Promise<EditalDetalhado> {
  const response = await $fetch<EditalDetalhado>('/api/licitmatch/listar-detalhes-contrato-inscrito', {
    method: 'GET',
    query: {
      'idPncp': idEdital,
      'idEmpresa' : user.idEmpresa
    },
  });

  return response;
}

</script>

<template>

  <Toast />

  <Sidebar
    v-model:visible="isDetailSidebarVisible"
    position="right"
    class="!w-2/4"
    :pt="{
      mask: { class: 'bg-black/10 backdrop-blur-sm' },
      header: { class: 'hidden' },
      content: { class: 'p-0' }
    }">
    <EditalInscritoDetalhe 
      :edital="selectedEdital"
      @close="isDetailSidebarVisible = false"
      @consultar_novamente="mostrarDetalhes"
    />
  </Sidebar>

  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
    <div class="bg-white shadow-sm border-b sticky top-0 z-40">
      <div class="px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-2xl lg:text-3xl font-bold text-slate-900">
              Meus Editais de Interesse
            </h1>
            <p class="text-slate-600 mt-1">Gerencie todos os editais que você marcou como interesse</p>
          </div>
        </div>
      </div>
    </div>

    <div class="px-4 sm:px-6 lg:px-8 py-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card class="border-0 shadow-sm hover:shadow-md transition-shadow">
          <template #content>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-slate-500 text-sm">Total de Editais</p>
                <p class="text-2xl font-bold text-slate-900">{{ estatisticas.total }}</p>
              </div>
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <i class="pi pi-briefcase text-blue-600 text-xl"></i>
              </div>
            </div>
          </template>
        </Card>
      </div>

      <div class="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div /> <div class="flex gap-2">
          <Dropdown
            v-model="ordenacao"
            :options="[
              { label: 'Data de Inscrição', value: 'data' },
              { label: 'Órgão', value: 'orgao' },
              { label: 'Modalidade', value: 'modalidade' }
            ]"
            optionLabel="label"
            optionValue="value"
            placeholder="Ordenar por"
            class="w-48"
          />
          
          <ButtonGroup>
            <Button
              icon="pi pi-th-large"
              @click="visualizacao = 'cards'"
              :severity="visualizacao === 'cards' ? 'primary' : 'secondary'"
              :outlined="visualizacao !== 'cards'"
            />
            <Button
              icon="pi pi-bars"
              @click="visualizacao = 'lista'"
              :severity="visualizacao === 'lista' ? 'primary' : 'secondary'"
              :outlined="visualizacao !== 'lista'"
            />
          </ButtonGroup>
        </div>
      </div>

      <div class="text-center">
        <p v-if="editaisFiltrados.length === 0" class="text-slate-500 py-20">
          Nenhum edital encontrado nos seus interesses.
        <p v-if="editais.length === 0">
          Efetue a inscrição em editais na página de <NuxtLink to="/main/editais" class="font-semibold underline text-blue-700">visualização de editais</NuxtLink>.
        </p>
        </p>
      </div>

      <div v-if="visualizacao === 'cards'" class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card 
          v-for="edital in editaisFiltrados"
          :key="edital.id"
          class="border-0 shadow-sm hover:shadow-lg transition-all cursor-pointer group"
        >
          <template #header>
            <div class="px-6 pt-6 pb-2">
              <div class="flex justify-between items-start mb-3">
                <Tag 
                  :value="edital.modalidade"
                  severity="info"
                  class="font-medium"
                />
                 <Tag 
                  :value="edital.status.toUpperCase()"
                  severity="success"
                  class="text-xs"
                />
              </div>
              <h3 class="font-bold text-lg text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                {{ edital.orgao }}
              </h3>
              <p class="text-sm text-slate-600">{{ edital.local }} - {{ edital.uf }}</p>
            </div>
          </template>
          
          <template #content>
            <div class="space-y-4">
              <p class="text-sm text-slate-700 line-clamp-3">{{ edital.objeto }}</p>
              
              <div class="flex justify-between items-center text-sm pt-2 border-t">
                  <span class="text-slate-500">Data de Inscrição:</span>
                  <span class="font-medium text-slate-800">{{ edital.data }}</span>
              </div>
            </div>
          </template>
          
          <template #footer>
            <div class="flex gap-2">
              <Button 
                label="Ver Detalhes" 
                icon="pi pi-eye" 
                severity="secondary" 
                text 
                class="flex-1"
                @click="mostrarDetalhes(edital.id)"
              />
            </div>
          </template>
        </Card>
      </div>

      <DataTable 
        v-else
        :value="editaisFiltrados"
        class="shadow-sm"
        :rowHover="true"
        stripedRows
        paginator :rows="10"
        responsiveLayout="scroll"
      >

        <Column field="objeto" header="Órgão" sortable >
          <template #body="{ data }">
            <p class="text-sm p-3">{{ data.orgao }}</p>
          </template>
        </Column>

        <Column field="objeto" header="Objeto" class="max-w-md">
          <template #body="{ data }">
            <p class="text-sm">{{ data.objeto }}</p>
          </template>
        </Column>
        <Column field="modalidade" header="Modalidade" sortable />
        <Column field="local" header="Local" sortable>
          <template #body="{ data }">
            {{ data.local }} - {{ data.uf }}
          </template>
        </Column>
        <Column field="data" header="Data de Inscrição" sortable />
        <Column>
          <template #body="{ data }">
            <Button 
              icon="pi pi-eye" 
              severity="secondary" 
              text 
              rounded
              @click="mostrarDetalhes(data.id)"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp : 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp : 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>