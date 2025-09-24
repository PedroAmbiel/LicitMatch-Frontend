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
            <p class="text-sm text-gray-500">Edital Nº: {{ edital.edital }}</p>
          </div>
        </div>
        <div class="flex items-center">
          <Button 
            :icon="edital.isFavorito ? 'pi pi-star-fill' : 'pi pi-star'" 
            text 
            rounded
            aria-label="Favoritar"
            class="text-[#4081e9] hover:!text-[#4081e9] hover:!bg-[#93b9f527]"
            @click="$emit('toggle-favorito', edital.pncpIdentificador); edital.isFavorito = !edital.isFavorito"
          />
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
      
      <div class="flex items-center gap-3">
        <i class="pi pi-book text-xl text-blue-600"></i>
        <div>
          <h3 class="font-bold">Acessar Edital</h3>
          <a :href="edital.linkEdital" target="_blank" class="text-blue-500 hover:underline text-sm break-all">
            {{ edital.linkEdital }}
          </a>
        </div>
      </div>
    </div>

    <footer class="p-4 mt-auto border-t border-gray-200">
      <Button label="Efetuar Inscrição" class="w-full !bg-blue-700 !hover:bg-blue-800 !border-none" />
    </footer>

  </div>
</template>

<script setup lang="ts">
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

  function getStatusSeverity(status: string) {
    if (status?.toLowerCase().includes('aberto')) return 'success';
    if (status?.toLowerCase().includes('encerrado')) return 'danger';
    return 'info';
  }

  interface EditalDetalhado {
    id: string;
    pncpIdentificador: string;
    nomeUnidade: string;
    status: string;
    modalidade: string;
    dataInclusao: string;
    edital: string;
    ufSigla: string;
    municipioNome: string;
    descricaoContratacao: string;
    inicioPropostas: string;
    fimPropostas: string;
    modoDisputa: string;
    situacaoPncp: string;
    isRegistroPreco: boolean;
    linkEdital: string;
    isFavorito: boolean;
    isDestaque: boolean;
  }
</script>