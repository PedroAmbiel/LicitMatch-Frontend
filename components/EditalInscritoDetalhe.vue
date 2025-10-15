<template>

  <div v-if="loading" class="p-4">
    <Skeleton height="2rem" class="mb-2"></Skeleton>
    <Skeleton height="10rem"></Skeleton>
  </div>

  <div v-else-if="edital" class="h-full flex flex-col text-gray-700 p-2 relative">
    
    <header class="p-4 border-b border-gray-200">
      <div class="flex justify-between items-start">
        <div class="flex items-center gap-4">
          <i class="pi pi-file-edit text-blue-600 text-3xl"></i>
          <div>
            <h2 class="font-bold text-lg text-gray-800">{{ edital.nomeUnidade }}</h2>
            <p class="text-sm text-gray-500">Edital Nº: {{ edital.pncpIdentificador }}</p>
          </div>
        </div>
        <div class="flex items-center">
          <Button icon="pi pi-times" text rounded severity="secondary" @click="$emit('close')" />
        </div>
      </div>

      <div class="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <p>Situação: <Tag :value="edital.situacaoPncp" :severity="getStatusSeverity(edital.situacaoPncp)" /></p>
        <p>Modalidade: <span class="font-semibold">{{ edital.modalidade }}</span></p>
        <p>Modo de disputa: <span class="font-semibold">{{ edital.modoDisputa }}</span></p>
        <p>Local: <span class="font-semibold">{{ edital.municipioNome }} - {{ edital.ufSigla }}</span></p>
        <p>Registro de Preço: <span class="font-semibold">{{ edital.isRegistroPreco ? 'Sim' : 'Não' }}</span></p>
      </div>

      <div class="mt-4 flex justify-between text-sm bg-gray-50 p-3 rounded-md">
        <p>Início Propostas: <span class="font-bold">{{ edital.inicioPropostas ? new Date(edital.inicioPropostas).toLocaleDateString('pt-BR') : 'Sem Informação' }}</span></p>
        <p>Fim Propostas: <span class="font-bold">{{ edital.fimPropostas ? new Date(edital.fimPropostas).toLocaleDateString('pt-BR') : 'Sem Informação' }}</span></p>
      </div>
    </header>

    <div class="flex-grow p-4 overflow-y-auto">
      <div class="mb-6">
        <h3 class="font-bold text-lg mb-2">Objeto da Contratação</h3>
        <p class="text-sm text-gray-600 leading-relaxed text-justify">{{ edital.descricaoContratacao }}</p>
      </div>
      
      <div class="flex items-center gap-3 mb-6">
        <i class="pi pi-book text-xl text-blue-600"></i>
        <div>
          <h3 class="font-bold">Acessar Edital</h3>
          <a :href="edital.linkEdital" target="_blank" class="text-blue-500 hover:underline text-sm break-all">
            {{ edital.linkEdital }}
          </a>
        </div>
      </div>

      <div class="mt-6">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-3">
            <i class="pi pi-list-check text-xl text-blue-600"></i>
            <h3 class="font-bold text-lg">Requisitos para Participar</h3>
          </div>
          <div class="flex items-center gap-2">
            <FileUpload
              ref="fileUploadRef"
              mode="basic"
              accept="application/pdf"
              name="arquivos[]"
              :auto="false"
              :customUpload="true"
              @select="confirmarUpload"
              chooseLabel="Enviar Arquivos"
              chooseIcon="pi pi-upload"
              severity="info"
              class="p-button-sm"
              :multiple="false"
            >
              <template #empty>
                <span class="text-sm text-gray-500">Nenhum arquivo selecionado</span>
              </template>

            </FileUpload>
            <Button
              label="Adicionar Requisito"
              icon="pi pi-plus"
              size="small"
              severity="info"
              @click="abrirDialog"
            />
          </div>
        </div>
        
        <div v-if="edital.requisitos && edital.requisitos.length > 0">
          <DataTable :value="edital.requisitos" stripedRows size="small" class="p-datatable-sm">
            <Column header="Concluído?" headerStyle="width: 3rem" bodyClass="text-center">
              <template #body="slotProps">
                <div class="flex justify-center items-center">
                  <Checkbox 
                    v-model="slotProps.data.isCompleto" 
                    :binary="true"
                    @change="onRequisitoChange(slotProps.data)"
                  />
                </div>
              </template>
            </Column>
            <Column field="descricaoRequisito" header="Descrição"></Column>
            <Column header="Registro">
              <template #body="slotProps">
                <div class="text-xs text-gray-600">
                  <p>{{ new Date(slotProps.data.dataInclusao).toLocaleDateString('pt-BR') }}</p>
                  <p>por 
                    <small class="underline font-bold">{{ slotProps.data.nomeCadastrou == 'SISTEMA' ? 'Gerado Automaticamente' : slotProps.data.nomeCadastrou }}</small>
                  </p>
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
        <div v-else class="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p class="text-sm text-center text-gray-600">
            <i class="pi pi-info-circle mr-2"></i>
            Nenhum requisito específico foi cadastrado para este edital.
          </p>
        </div>
      </div>
    </div>

    <footer class="p-4 mt-auto border-t border-gray-200">
      <Button 
        label="Cancelar Inscrição" 
        severity="danger"
        class="w-full" 
        @click="$emit('desinscricao', edital.pncpIdentificador)" 
      />
    </footer>
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

  <ConfirmDialog></ConfirmDialog>
</template>

<script setup lang="ts">

const user = userStore();
const toast = useToast();
const loadingStore = useLoadingStore();
const confirm = useConfirm();

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

const onRequisitoChange = (requisito: Requisito) => {
  // Aqui você pode adicionar lógica adicional quando o checkbox mudar
  // Por exemplo, salvar no backend
  console.log('Requisito atualizado:', requisito);
};

const confirmarUpload = (event: any) => {
  confirm.require({
    message: 'Ao submeter um arquivo, serão gerados automaticamente os requisitos do edital informado! Essa ação deixará o sistema em estado de espera!',
    header: 'Confirmação de Upload',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Sim, Confirmar',
    rejectLabel: 'Cancelar',
    acceptClass: 'p-button-success',
    rejectClass: 'p-button-danger',
    accept: () => {
      handleFileUpload(event);
    },
    reject: () => {
      // Limpar o arquivo selecionado
      if (fileUploadRef.value) {
        fileUploadRef.value.clear();
      }
    }
  });
};

const salvarRequisito = () => {
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

  props.edital.requisitos.push(requisitoParaAdicionar);
  
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
    // Limpar o arquivo após o upload
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