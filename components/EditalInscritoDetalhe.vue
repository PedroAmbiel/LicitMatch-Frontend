<template>
  <div v-if="loading" class="p-4">
    <Skeleton height="2rem" class="mb-2"></Skeleton>
    <Skeleton height="10rem"></Skeleton>
  </div>
  
  <div v-else-if="edital" class="h-full flex flex-col text-gray-700 relative">
      <div class="flex justify-between items-center px-4 py-3 border-b border-gray-200">
        <h2 class="font-bold text-xl text-gray-800">Detalhes do Edital</h2>
        <Button icon="pi pi-times" text rounded severity="secondary" @click="$emit('close')" />
      </div>

      <div class="flex-grow flex gap-4 p-4 overflow-hidden">
        
        <div class="w-2/5 flex flex-col gap-4 overflow-y-auto pr-2">
          
          <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div class="flex items-center gap-3 mb-3">
              <i class="pi pi-file-edit text-blue-600 text-2xl"></i>
              <div>
                <h3 class="font-bold text-base text-gray-800">{{ edital.nomeUnidade }}</h3>
                <p class="text-xs text-gray-500">Edital Nº: {{ edital.pncpIdentificador }}</p>
              </div>
            </div>

            <div class="space-y-2 text-sm">
              <div class="flex items-center justify-between">
                <span class="text-gray-600">Situação:</span>
                <Tag :value="edital.situacaoPncp" :severity="getStatusSeverity(edital.situacaoPncp)" />
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Modalidade:</span>
                <span class="font-semibold">{{ edital.modalidade }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Modo de disputa:</span>
                <span class="font-semibold">{{ edital.modoDisputa }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Local:</span>
                <span class="font-semibold">{{ edital.municipioNome }} - {{ edital.ufSigla }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Registro de Preço:</span>
                <span class="font-semibold">{{ edital.isRegistroPreco ? 'Sim' : 'Não' }}</span>
              </div>
            </div>
          </div>

          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-sm">
            <h3 class="font-bold text-sm mb-3 text-blue-900">Prazos</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-700">Início Propostas:</span>
                <span class="font-bold text-gray-900">
                  {{ edital.inicioPropostas ? new Date(edital.inicioPropostas).toLocaleDateString('pt-BR') : 'Sem Informação' }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-700">Fim Propostas:</span>
                <span class="font-bold text-gray-900">
                  {{ edital.fimPropostas ? new Date(edital.fimPropostas).toLocaleDateString('pt-BR') : 'Sem Informação' }}
                </span>
              </div>
            </div>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h3 class="font-bold text-sm mb-2 text-gray-800">Objeto da Contratação</h3>
            <p class="text-xs text-gray-600 leading-relaxed text-justify">{{ edital.descricaoContratacao }}</p>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div class="flex items-center gap-2 mb-2">
              <i class="pi pi-book text-lg text-blue-600"></i>
              <h3 class="font-bold text-sm">Acessar Edital</h3>
            </div>
            <a :href="edital.linkEdital" target="_blank" class="text-blue-500 hover:underline text-xs break-all">
              {{ edital.linkEdital }}
            </a>
          </div>

          <Button 
            label="Cancelar Inscrição" 
            severity="danger"
            class="w-full mt-auto" 
            @click="$emit('desinscricao', edital.pncpIdentificador)" 
          />
        </div>

        <div class="w-3/5 flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          
          <div class="p-4 border-b border-gray-200 bg-gray-50">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2">
                <i class="pi pi-list-check text-xl text-blue-600"></i>
                <div class="!flex flex-col">
                    <h3 class="font-bold text-base">Requisitos para Participar</h3>
                    <small class="italic text-[.7rem]">Anexe o edital em PDF para gerar requisitos automaticamente.</small>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <FileUpload
                  ref="fileUploadRef"
                  mode="basic"
                  accept="application/pdf"
                  name="arquivos[]"
                  :auto="true"              
                  :custom-upload="true"
                  @select="confirmarUpload"
                  chooseLabel="Enviar Edital (PDF)"
                  chooseIcon="pi pi-upload"
                  severity="info"
                  class="p-button-sm"
                  :multiple="false"
                />
                <Button
                  label="Adicionar Requisito"
                  icon="pi pi-plus"
                  size="small"
                  severity="info"
                  @click="abrirDialog"
                />
              </div>
            </div>
            
            <div class="text-center py-2 rounded" 
                :class="totalRequisitosCompletos == edital.requisitos.length && edital.requisitos.length != 0 ? 'bg-green-200' : 'bg-gray-100'" 
                v-if="edital.requisitos.length != 0">
              <small class="font-bold">Total Completo: {{ totalRequisitosCompletos }} / {{ edital.requisitos.length }}</small>
            </div>
          </div>

          <div class="flex-grow overflow-y-auto p-4">
            <div v-if="edital.requisitos && edital.requisitos.length > 0">
              <DataTable 
                :value="edital.requisitos" 
                stripedRows 
                size="small" 
                class="p-datatable-sm"
                :rowClass="rowClass">
                <Column header="Concluído?" headerStyle="width: 3rem" bodyClass="text-center">
                  <template #body="slotProps">
                    <div class="flex justify-center items-center">
                      <Checkbox 
                        v-model="slotProps.data.isCompleto" 
                        :binary="true"
                        @value-change="onRequisitoChange(slotProps.data)"
                      />
                    </div>
                  </template>
                </Column>

                <Column headerStyle="width: 4rem" bodyClass="text-center">
                  <template #body="slotProps">
                    <div v-if="slotProps.data.nomeCadastrou === 'SISTEMA'">
                      <i 
                        class="pi pi-sparkles text-blue-600" 
                        v-tooltip.top="'Gerado por IA. Esse requisito foi possivelmente constatado no documento'"
                      />
                    </div>
                  </template>
                </Column>

                <Column header="Descrição">
                  <template #body="slotProps">
                    <div>
                      <span>{{ slotProps.data.descricaoRequisito }}</span>
                      
                      <div v-if="slotProps.data.nomeCadastrou === 'SISTEMA'">
                        <small class="text-[.5rem] text-gray-500 italic">
                          *Esse requisitos é apenas uma sugestões geradas a partir de uma análise superficial do documento.
                        </small>
                      </div>
                    </div>
                  </template>
                </Column>

                <Column header="Ações" bodyClass="text-center" headerStyle="width: 5rem">
                  <template #body="slotProps">
                    <div class="flex justify-center gap-2">
                      <Button
                        icon="pi pi-exclamation-circle"
                        severity="info"
                        size="small"
                        title="Informações"
                        text
                        @click="verDetalhes(slotProps.data)"
                      />
                      <Button
                        icon="pi pi-trash"
                        severity="danger"
                        size="small"
                        text
                        title="Excluir"
                        @click="confirmarRemocao(slotProps.data)"
                      />
                    </div>
                  </template>
                </Column>
              </DataTable>
            </div>
            <div v-else class="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
              <i class="pi pi-info-circle text-gray-400 text-3xl mb-2"></i>
              <p class="text-sm text-gray-600">
                Nenhum requisito específico foi cadastrado para este edital.
              </p>
            </div>
          </div>
        </div>
      </div>
  </div>

  <Dialog v-model:visible="dialogVisivel" modal header="Adicionar Novo Requisito" :style="{ width: '40rem' }" :draggable="false">
    <div class="flex flex-col gap-4 p-4">
      <div class="flex flex-col gap-2">
        <label for="descricao">Descrição do Requisito</label>
        <Textarea id="descricao" v-model="novoRequisito.descricao" rows="4" autoResize placeholder="Ex: Apresentar certidão negativa de débitos."/>
      </div>
      <div class="flex items-center gap-2 mt-2">
        <Checkbox v-model="novoRequisito.concluido" inputId="concluido" :binary="true" />
        <label for="concluido">Marcar como concluído</label>
      </div>
    </div>
    <template #footer>
      <Button label="Cancelar" icon="pi pi-times" @click="fecharDialog" severity="danger" text />
      <Button label="Salvar" icon="pi pi-check" @click="salvarRequisito" severity="success" />
    </template>
  </Dialog>

  <Dialog v-model:visible="dialogRequisitoDados" header="Detalhes do Registro" modal class="w-[22rem]">
    <div v-if="requisitoSelecionado" class="text-sm space-y-2">
      <p><strong>Data de Inclusão:</strong> {{ new Date(requisitoSelecionado.dataInclusao).toLocaleDateString('pt-BR') }}</p>
      <p>
        <strong>Cadastrado por: </strong>
        <span>
          {{ requisitoSelecionado.nomeCadastrou === 'SISTEMA' ? 'Gerado automaticamente' : requisitoSelecionado.nomeCadastrou }}
        </span>
      </p>
    </div>
  </Dialog>

  <ConfirmDialog></ConfirmDialog>
</template>

<script setup lang="ts">
const user = userStore();
const toast = useToast();
const loadingStore = useLoadingStore();
const confirm = useConfirm();

const dialogRequisitoDados = ref(false)
const requisitoSelecionado = ref<Requisito>()

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

const props = defineProps({
  edital: {
    type: Object as () => EditalDetalhado | null,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits<{
  (e: 'desinscricao', id: string): void
  (e: 'close'): void
  (e: 'consultar_novamente', id: string) : void
}>();

const dialogVisivel = ref(false);
const novoRequisito = ref({
  descricao: '',
  concluido: false,
});
const fileUploadRef = ref();

const abrirDialog = () => {
  novoRequisito.value = { descricao: '', concluido: false };
  dialogVisivel.value = true;
};

const fecharDialog = () => {
  dialogVisivel.value = false;
};

const totalRequisitosCompletos = computed(() => {
  let requisitos = [...props.edital!.requisitos];

  return requisitos.filter((req) => req.isCompleto == true).length;
});

const rowClass = (data: Requisito) => {
  if (data.nomeCadastrou === 'SISTEMA') {
    return '!bg-blue-100 italic';
  }
  return '';
};

function verDetalhes(requisito : Requisito) {
  requisitoSelecionado.value = requisito
  dialogRequisitoDados.value = true
}

const confirmarRemocao = (requisito : Requisito) => {
  confirm.require({
    message: `Tem certeza que deseja remover "${requisito.descricaoRequisito.toUpperCase()}"?`,
    header: 'Confirmar Remoção',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Sim',
    rejectLabel: 'Cancelar',
    acceptClass: 'bg-red-500 hover:!bg-red-600 !border-none hover:!border-none hover:!scale-105 transition-all',
    rejectClass: 'bg-gray-300 text-gray-800 !border-none hover:!bg-gray-400 hover:!border-none hover:!scale-105 transition-all',
    accept: () => {
      removerRequisito(Number(requisito.idRequisito))
      toast.add({ severity: 'success', summary: 'Removido', detail: 'Requisito removido com sucesso', life: 2000 })
    }
  })
}

const onRequisitoChange = async (requisito: Requisito) => {
  try {

    const response = await $fetch<any>('/api/licitmatch/alterar-estado-completo-requisito', {
      method: 'PUT',
      body: {
        'idEmpresaContratoRequisito' : requisito.idRequisito,
        'isCompleto' : requisito.isCompleto,
      },
    });

    console.log(response);

  } catch (error) {
    requisito.isCompleto = !requisito.isCompleto;

    console.error("Erro ao buscar editais:", error);
    toast.add({
        severity: 'error',
        summary: 'Serviço indisponível',
        detail: 'Erro ao atualizar o requisito',
        life: 15000
    });
  }
  
  console.log('Requisito atualizado:', requisito);
};

const removerRequisito = async (idRequisito : number) =>{
   try {

    const response = await $fetch<any>('/api/licitmatch/remover-requisito', {
      method: 'DELETE',
      query: {
        'idRequisito' : idRequisito,
      },
    });

    emit('consultar_novamente', props.edital!.pncpIdentificador);

  } catch (error) {

    console.error("Erro ao remover requisito:", error);
    toast.add({
        severity: 'error',
        summary: 'Serviço indisponível',
        detail: 'Erro ao remover requisito',
        life: 15000
    });
  }

}

const confirmarUpload = (event: any) => {
  confirm.require({
    message: 'Ao submeter um arquivo, serão gerados automaticamente os requisitos do edital informado! Essa ação deixará o sistema em estado de espera!',
    header: 'Confirmação de Upload',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Sim',
    rejectLabel: 'Cancelar',
    acceptClass: 'bg-red-500 hover:bg-red-600 !border-none hover:!border-none hover:!scale-105 transition-all',
    rejectClass: 'bg-gray-300 text-gray-800 !border-none hover:!bg-gray-400 hover:!border-none hover:!scale-105 transition-all',
    accept: () => {
      handleFileUpload(event);
    },
    reject: () => {
      if (fileUploadRef.value) {
        fileUploadRef.value.clear();
      }
    }
  });
};

const salvarRequisito = async () => {
  if (!props.edital || !novoRequisito.value.descricao.trim()) {
    toast.add({
      severity: 'warn',
      summary: 'Atenção',
      detail: 'A descrição é obrigatória.',
      life: 3000
    });
    return;
  }

  const requisitoParaAdicionar: Requisito = {
    idRequisito : '',
    descricaoRequisito: novoRequisito.value.descricao,
    isCompleto: novoRequisito.value.concluido,
    dataInclusao: new Date().toISOString(),
    nomeCadastrou: user.nomePessoa!.toString(),
  };

  try {

    const response = await $fetch<any>('/api/licitmatch/adicionar-novo-requisito', {
      method: 'POST',
      body: {
        'idEmpresaContrato' : props.edital!.idEmpresaContrato,
        'descricaoRequisito' : requisitoParaAdicionar.descricaoRequisito,
        'isCompleto' : requisitoParaAdicionar.isCompleto,
        'idUsuarioCadastro' : user.idUsuario,
      },
    });

    console.log(response);

    emit('consultar_novamente', props.edital!.pncpIdentificador);

  } catch (error) {
    console.error("Erro ao cadastrar novo requisito:", error);
    toast.add({
        severity: 'error',
        summary: 'Serviço indisponível',
        detail: 'Erro ao atualizar o requisito',
        life: 15000
    });
  }
  
  toast.add({
    severity: 'success',
    summary: 'Sucesso',
    detail: 'Requisito adicionado com sucesso!',
    life: 3000
  });
  
  fecharDialog();
};

const handleFileUpload = async (event : any) => {
  const file = event.files[0];

  console.log("Arquivo selecionado para upload:", file);
  const formData = new FormData();
  formData.append('file', file);
  formData.append('idEmpresaContrato', props.edital!.idEmpresaContrato.toString());

  try {
    loadingStore.isLoading = true;

    const response = await fetch(`http://localhost:8080/LicitMatch/api/v1/contratos/gerarrequisitosarquivo`, {
      method: 'POST',
      body: formData,
    });

    if(response.ok){
      emit('consultar_novamente', props.edital!.pncpIdentificador);
      toast.add({
        severity: 'success',
        summary: 'Upload Concluído',
        detail: 'Arquivo processado com sucesso!',
        life: 3000
      });
    } else {
      toast.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Erro ao processar o arquivo.',
        life: 5000
      });
    }

  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Erro no Upload',
      detail: 'Ocorreu um erro ao enviar o arquivo. Tente novamente.',
      life: 5000
    });
  } finally {
    loadingStore.isLoading = false;
    if (fileUploadRef.value) {
      fileUploadRef.value.clear();
    }
  }
};

function getStatusSeverity(status: string) {
  if (status?.toLowerCase().includes('aberto')) return 'success';
  if (status?.toLowerCase().includes('encerrado')) return 'danger';
  return 'info';
}
</script>

<style scoped>
  .p-confirmdialog {
    max-width: 300px !important;
  }
</style>
