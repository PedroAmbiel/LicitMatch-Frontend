<template>
  <Toast />
  <div class="min-h-screen bg-gray-50 py-8">
  <div class="container mx-auto px-4 max-w-7xl">
   <div class="bg-white rounded-t-2xl shadow-lg p-6 border-b-4" style="border-color: #4081e9;">
   <h1 class="text-3xl font-bold text-gray-800">Perfil da Empresa</h1>
   <p class="text-gray-600 mt-2">Visualize as informações cadastrais e de perfil da empresa</p>
   </div>

   <div v-if="loading" class="bg-white rounded-b-2xl shadow-lg p-20">
   <div class="flex justify-center items-center">
    <ProgressSpinner />
   </div>
   </div>

   <div v-else-if="error" class="bg-white rounded-b-2xl shadow-lg p-8">
   <Message severity="error" :closable="false">
    {{ error }}
   </Message>
   </div>

   <div v-else-if="perfil" class="bg-white rounded-b-2xl shadow-lg">
   <TabView class="custom-tabview">
    <TabPanel>
    <template #header>
     <div class="flex items-center gap-2 font-bold text-[#78a9f8]">
     <i class="pi pi-building"></i>
     <span>Dados da Empresa</span>
     </div>
    </template>
    
    <div class="p-6 md:p-8 space-y-8">
     <div>
     <h3 class="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2 mb-4">
      Informações Gerais
     </h3>
     
     <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
      <label class="text-sm font-semibold text-gray-600 block mb-1">Razão Social</label>
      <p class="text-gray-900 font-medium">{{ perfil.razaoSocial }}</p>
      </div>
      
      <div>
      <label class="text-sm font-semibold text-gray-600 block mb-1">CNPJ</label>
      <p class="text-gray-900 font-medium">{{ formatCNPJ(perfil.cnpj) }}</p>
      </div>
      
      <div>
      <label class="text-sm font-semibold text-gray-600 block mb-1">Data de Cadastro</label>
      <p class="text-gray-900">{{ formatDate(perfil.dataCadastro) }}</p>
      </div>
      
      <div>
      <label class="text-sm font-semibold text-gray-600 block mb-1">Situação Cadastral</label>
      <Tag :value="perfil.situacaoCadastral" :severity="getSituacaoSeverity(perfil.situacaoCadastral)" />
      </div>
      
      <div>
      <label class="text-sm font-semibold text-gray-600 block mb-1">Natureza Jurídica</label>
      <p class="text-gray-900">{{ getNaturezaJuridicaLabel(perfil.naturezaJuridica) || 'Não informado' }}</p>
      </div>
      
      <div>
      <label class="text-sm font-semibold text-gray-600 block mb-1">Porte</label>
      <p class="text-gray-900">{{ getPorteLabel(perfil.porte) || 'Não informado' }}</p>
      </div>
      
      <div class="md:col-span-2">
      <label class="text-sm font-semibold text-gray-600 block mb-1">Código de Convite</label>
      <div class="flex items-center gap-2">
       <p class="text-gray-900 font-mono text-lg" style="color: #4081e9;">{{ perfil.codigoConvite || 'Não gerado' }}</p>
       <Button 
       v-if="perfil.codigoConvite" 
       icon="pi pi-copy" 
       size="small" 
       	text 
       	rounded
       	@click="copiarCodigo"
       	v-tooltip.top="'Copiar código'"
       	class="hover:bg-blue-100"
       />
      	</div>
      </div>
     	</div>
     </div>

     <div>
     	<h3 class="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2 mb-4">
     	 Endereço
     	</h3>
     	
     	<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
     	 <div class="md:col-span-2">
     	 	<label class="text-sm font-semibold text-gray-600 block mb-1">Logradouro</label>
     	 	<p class="text-gray-900">{{ perfil.endereco?.logradouro || 'Não informado' }}</p>
     	 </div>
     	 
     	 <div>
     	 	<label class="text-sm font-semibold text-gray-600 block mb-1">Cidade</label>
     	 	<p class="text-gray-900">{{ perfil.endereco?.cidade || 'Não informado' }}</p>
     	 </div>
     	 
     	 <div>
     	 	<label class="text-sm font-semibold text-gray-600 block mb-1">Estado</label>
     	 	<p class="text-gray-900">{{ perfil.endereco?.estado || 'Não informado' }}</p>
     	 </div>
     	 
     	 <div>
     	 	<label class="text-sm font-semibold text-gray-600 block mb-1">CEP</label>
     	 	<p class="text-gray-900">{{ formatCEP(perfil.endereco?.cep) }}</p>
     	 </div>
     	</div>
    	</div>
   	</div>
   	</TabPanel>

   	<TabPanel>
   	 <template #header>
   	 	<div class="flex items-center gap-2 font-bold text-[#78a9f8]">
   	 	 <i class="pi pi-briefcase"></i>
   	 	 <span>Perfil de Atividade</span>
   	 	</div>
   	 </template>
   	 
   	 <div class="p-6 md:p-8">
   	 	<div>
   	 	 <h3 class="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2 mb-4">
   	 	 	Informações de Atividade
   	 	 </h3>
   	 	 
   	 	 <div class="space-y-6">
   	 	 	<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
   	 	 	 <div class="justify-self-start">
   	 	 	 	<label class="text-sm font-semibold text-gray-600 block mb-1">Ramo de Atividade</label>
   	 	 	 	<p class="text-gray-900 font-medium">{{ getRamoAtividadeLabel(perfil.perfilAtividade?.ramoAtividade) || 'Não informado' }}</p>
   	 	 	 </div>
   	 	 	 
   	 	 	 <div class="justify-self-start">
   	 	 	 	<label class="text-sm font-semibold text-gray-600 block mb-1">CNAE Principal</label>
   	 	 	 	<div v-if="perfil.perfilAtividade?.cnaePrincipal">
   	 	 	 	 <p class="text-gray-900 font-mono">{{ perfil.perfilAtividade.cnaePrincipal }}</p>
   	 	 	 	 <p class="text-sm text-gray-600 w-96">{{ getCnaeLabel(perfil.perfilAtividade.cnaePrincipal) }}</p>
   	 	 	 	</div>
   	 	 	 	<p v-else class="text-gray-900">Não informado</p>
   	 	 	 </div>
   	 	 	</div>
   	 	 	
   	 	 	<div>
   	 	 	 <label class="text-sm font-semibold text-gray-600 block mb-2">Descrição das Atividades</label>
   	 	 	 <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
   	 	 	 	<p class="text-gray-900">{{ perfil.perfilAtividade?.descricaoAtividade || 'Não informado' }}</p>
   	 	 	 </div>
   	 	 	</div>
   	 	 	
   	 	 	<div v-if="perfil.perfilAtividade?.cnaesSecundarios?.length">
   	 	 	 <label class="text-sm font-semibold text-gray-600 block mb-2">CNAEs Secundários</label>
   	 	 	 <div class="flex flex-wrap gap-3">
   	 	 	 	<div
   	 	 	 	 v-for="cnae in perfil.perfilAtividade.cnaesSecundarios" 
   	 	 	 	 :key="cnae" 
   	 	 	 	 class="bg-gray-100 border border-gray-200 rounded-lg p-2 w-full md:w-auto md:max-w-xs"
   	 	 	 	>
   	 	 	 	 <p class="font-mono font-medium text-gray-800">{{ cnae }}</p>
   	 	 	 	 <p class="text-sm text-gray-600">{{ getCnaeLabel(cnae) }}</p>
   	 	 	 	</div>
   	 	 	 </div>
   	 	 	</div>
   	 	 	
        <div>
   	 	 	 <div v-if="!estaEditandoPalavrasChave">
   	 	 	 	<div class="flex justify-between items-center mb-2">
   	 	 	 	 <label class="text-sm font-semibold text-gray-600">Palavras-chave</label>
   	 	 	 	 <Button 
   	 	 	 	 	icon="pi pi-pencil" 
   	 	 	 	 	text 
   	 	 	 	 	rounded 
   	 	 	 	 	size="small" 
   	 	 	 	 	@click="iniciarEdicaoPalavrasChave"
   	 	 	 	 	v-tooltip.top="'Editar palavras-chave'"
   	 	 	 	 	class="hover:bg-blue-100 text-blue-400"
   	 	 	 	 />
   	 	 	 	</div>
   	 	 	 	
   	 	 	 	<div v-if="perfil.perfilAtividade?.palavrasChave?.length > 0" class="flex flex-wrap gap-2">
   	 	 	 	 <Tag 
   	 	 	 	 	v-for="palavra in perfil.perfilAtividade.palavrasChave" 
   	 	 	 	 	:key="palavra" 
   	 	 	 	 	:value="palavra"
   	 	 	 	 	class="custom-tag"
   	 	 	 	 />
   	 	 	 	</div>
   	 	 	 	<p v-else class="text-gray-500 text-sm italic">
   	 	 	 	 Nenhuma palavra-chave cadastrada. Clique no lápis para adicionar.
   	 	 	 	</p>
   	 	 	 </div>

   	 	 	 <div v-else>
   	 	 	 	<label class="text-sm font-semibold text-gray-600 block mb-2">Editar Palavras-chave</label>
   	 	 	 	<p class="text-xs text-gray-500 mb-2">Pressione Enter para adicionar uma nova palavra.</p>
   	 	 	 	
   	 	 	 	<Chips 
   	 	 	 	 v-model="palavrasChaveEditaveis"
   	 	 	 	 class="w-full"
   	 	 	 	 :pt="{ container: { class: 'w-full' } }"
   	 	 	 	/>
   	 	 	 	
   	 	 	 	<div class="flex justify-end gap-2 mt-3">
   	 	 	 	 <Button
   	 	 	 	 	label="Cancelar"
   	 	 	 	 	icon="pi pi-times"
   	 	 	 	 	@click="cancelarEdicaoPalavrasChave"
   	 	 	 	 	:disabled="salvandoPalavrasChave"
   	 	 	 	 	outlined
   	 	 	 	 	severity="secondary"
   	 	 	 	 	class="p-button-sm"
   	 	 	 	 />
   	 	 	 	 <Button
   	 	 	 	 	label="Salvar"
   	 	 	 	 	icon="pi pi-check"
   	 	 	 	 	:loading="salvandoPalavrasChave"
   	 	 	 	 	@click="salvarPalavrasChave"
   	 	 	 	 	class="p-button-sm"
   	 	 	 	 	style="background-color: #4081e9; border-color: #4081e9;"
   	 	 	 	 />
   	 	 	 	</div>
   	 	 	 </div>
   	 	 	</div>
   	 	 	
        <div>
          <div v-if="!estaEditandoEstados">
   	 	 	 		<div class="flex justify-between items-center mb-2">
   	 	 	 			<label class="text-sm font-semibold text-gray-600">Estados de Atuação</label>
   	 	 	 			<Button 
   	 	 	 				icon="pi pi-pencil" 
   	 	 	 				text 
   	 	 	 				rounded 
   	 	 	 				size="small" 
   	 	 	 				@click="iniciarEdicaoEstados"
   	 	 	 				v-tooltip.top="'Editar estados de atuação'"
   	 	 	 				class="hover:bg-blue-100 text-blue-400"
   	 	 	 			/>
   	 	 	 		</div>
   	 	 	 		
   	 	 	 		<div v-if="perfil.perfilAtividade?.idsEstadoAtuacao?.length > 0">
   	 	 	 			<div>
   	 	 	 				<div class="flex flex-wrap gap-2">
   	 	 	 					<Tag 
   	 	 	 						v-for="idEstado in perfil.perfilAtividade.idsEstadoAtuacao" 
   	 	 	 						:key="idEstado" 
   	 	 	 						:value="getEstadoLabel(idEstado)"
   	 	 	 						severity="info"
   	 	 	 					/>
   	 	 	 				</div>
   	 	 	 			</div>
   	 	 	 		</div>
   	 	 	 		<p v-else class="text-gray-500 text-sm italic">
   	 	 	 			Nenhum estado de atuação cadastrado. Clique no lápis para adicionar.
   	 	 	 		</p>
   	 	 	 	</div>

   	 	 	 	   	 	 	 	<div v-else>
   	 	 	 		<label class="text-sm font-semibold text-gray-600 block mb-2">Editar Estados de Atuação</label>
   	 	 	 		
   	 	 	 		<MultiSelect
   	 	 	 			v-model="estadosAtuacaoEditaveis"
   	 	 	 			:options="ESTADOS"
   	 	 	 			optionLabel="label"
   	 	 	 			optionValue="id"
   	 	 	 			placeholder="Selecione os estados"
   	 	 	 			display="chip"
   	 	 	 			class="w-full"
   	 	 	 		/>
   	 	 	 		
   	 	 	 		<div class="flex justify-end gap-2 mt-3">
   	 	 	 			<Button
   	 	 	 				label="Cancelar"
   	 	 	 				icon="pi pi-times"
   	 	 	 				@click="cancelarEdicaoEstados"
   	 	 	 				:disabled="salvandoEstados"
   	 	 	 				outlined
   	 	 	 				severity="secondary"
   	 	 	 				class="p-button-sm"
   	 	 	 			/>
   	 	 	 			<Button
   	 	 	 				label="Salvar"
   	 	 	 				icon="pi pi-check"
   	 	 	 				:loading="salvandoEstados"
   	 	 	 				@click="salvarEstadosAtuacao"
   	 	 	 				class="p-button-sm"
   	 	 	 				style="background-color: #4081e9; border-color: #4081e9;"
   	 	 	 			/>
   	 	 	 		</div>
   	 	 	 	</div>
   	 	 	</div>
   	 	 	   	 	 	
   	 	 	<div v-if="perfil.perfilAtividade?.dataUltimaAtualizacao">
   	 	 	 <label class="text-sm font-semibold text-gray-600 block mb-1">Última Atualização do Perfil</label>
   	 	 	 <p class="text-gray-900">{{ formatDate(perfil.perfilAtividade.dataUltimaAtualizacao) }}</p>
   	 	 	</div>
   	 	 </div>
   	 	</div>
   	 </div>
   	</TabPanel>
   	</TabView>
  	</div>
  </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useToast } from 'primevue/usetoast';
import { formatCNPJ, formatCEP, formatDateTimeBR } from '~/utils/formatters';
import { NATUREZAS_JURIDICAS, PORTES, RAMOS_ATIVIDADE, ESTADOS } from '~/utils/constants';

const toast = useToast();
const user = userStore();

const perfil = ref(null);
const loading = ref(true);
const error = ref(null);

const cache = useCache();
const cnaesDisponiveis = ref([]);

// --- [INÍCIO] Refs para edição de palavras-chave ---
const estaEditandoPalavrasChave = ref(false); 
const palavrasChaveEditaveis = ref([]);
const salvandoPalavrasChave = ref(false);
// --- [FIM] Refs para edição de palavras-chave ---

// --- [INÍCIO] Refs para edição de Estados de Atuação ---
const estaEditandoEstados = ref(false);
const estadosAtuacaoEditaveis = ref([]); // Vai guardar os IDs [1, 5, 25]
const salvandoEstados = ref(false);
// --- [FIM] Refs para edição de Estados de Atuação ---

async function buscarCnaes() {
  try {
    const data = await cache.get(
      'cnaes-list',
      async () => {
        return await $fetch(`/api/licitmatch/listar-cnaes`, {
          method: 'GET',
        });
      },
      60 * 60 * 1000 // Cache for 1 hour (CNAEs rarely change)
    );
    cnaesDisponiveis.value = data;
  } catch (err) {
    toast.add({
      severity: 'warn',
      summary: 'Aviso',
      detail: 'Não foi possível carregar as descrições dos CNAEs.',
      life: 3000
    });
  }
}

onMounted(async () => {
  await Promise.all([
  carregarPerfil(),
  	buscarCnaes()
  ]);
});

definePageMeta({
  layout: 'logged',
  middleware: 'empresa-check',
});

async function carregarPerfil() {
  try {
    loading.value = true;
  	error.value = null;
  	
  	const idEmpresa = user.idEmpresa;
  	if (!idEmpresa) {
  	 throw new Error('ID da empresa não encontrado');
  	}
  	
    const cacheKey = `perfil-empresa-${idEmpresa}`;
    
  	const data = await cache.get(
      cacheKey,
      async () => {
        return await $fetch('/api/licitmatch/perfil-empresa', {
          params: {
            idEmpresa: idEmpresa
          }
        });
      },
      5 * 60 * 1000 // Cache for 5 minutes
    );
    
  	perfil.value = data;

  	// Popula as palavras-chave editáveis com os dados carregados
  	if (data.perfilAtividade?.palavrasChave) {
  	 palavrasChaveEditaveis.value = [...data.perfilAtividade.palavrasChave];
  	} else {
  	 palavrasChaveEditaveis.value = [];
  	}
  	estaEditandoPalavrasChave.value = false; // Garante que comece em modo leitura

  	// [NOVO] Popula os estados editáveis com os dados carregados
  	if (data.perfilAtividade?.idsEstadoAtuacao) {
  		estadosAtuacaoEditaveis.value = [...data.perfilAtividade.idsEstadoAtuacao];
  	} else {
  		estadosAtuacaoEditaveis.value = [];
  	}
  	estaEditandoEstados.value = false; // Garante que comece em modo leitura

  } catch (err) {
  	error.value = err.data?.message || err.message || 'Erro ao carregar perfil da empresa';
  } finally {
  	loading.value = false;
  }
}

// --- Funções de Palavras-chave ---

function iniciarEdicaoPalavrasChave() {
  palavrasChaveEditaveis.value = perfil.value.perfilAtividade?.palavrasChave
  	? [...perfil.value.perfilAtividade.palavrasChave]
  	: [];
  estaEditandoPalavrasChave.value = true;
}

function cancelarEdicaoPalavrasChave() {
  if (perfil.value.perfilAtividade?.palavrasChave) {
  	palavrasChaveEditaveis.value = [...perfil.value.perfilAtividade.palavrasChave];
  } else {
  	palavrasChaveEditaveis.value = [];
  }
  estaEditandoPalavrasChave.value = false;
}

async function salvarPalavrasChave() {
  if (!user.idEmpresa) {
  	toast.add({ severity: 'error', summary: 'Erro', detail: 'ID da empresa não encontrado.', life: 3000 });
  	return;
  }

  salvandoPalavrasChave.value = true;
  try {
  	// Optimized: Filter and deduplicate in a single operation
  	const palavrasFiltradas = Array.from(new Set(
  	  palavrasChaveEditaveis.value.filter(p => p && p.trim() !== '')
  	));
  	
  	await $fetch('/api/licitmatch/atualizar-palavras-chave', {
  	 	method: 'PUT',
  	 	body: {
  	 		idEmpresa: user.idEmpresa,
  	 		novasPalavrasChave: palavrasFiltradas
  	 	}
  	});

  	if (perfil.value.perfilAtividade) {
  	 	perfil.value.perfilAtividade.palavrasChave = palavrasFiltradas;
  	} else {
  	 	perfil.value.perfilAtividade = { palavrasChave: palavrasFiltradas };
  	}
  	
  	palavrasChaveEditaveis.value = palavrasFiltradas;
  	toast.add({ severity: 'success', summary: 'Sucesso!', detail: 'Palavras-chave atualizadas.', life: 3000 });
  	estaEditandoPalavrasChave.value = false; 
    
    // Invalidate cache after update
    cache.invalidate(`perfil-empresa-${user.idEmpresa}`);

  } catch (err) {
  	toast.add({
  	 	severity: 'error',
  	 	summary: 'Erro ao salvar',
  	 	detail: err.data?.message || 'Não foi possível atualizar as palavras-chave.',
  	 	life: 4000
  	});
  	if (perfil.value.perfilAtividade?.palavrasChave) {
  	 	palavrasChaveEditaveis.value = [...perfil.value.perfilAtividade.palavrasChave];
  	} else {
  	 	palavrasChaveEditaveis.value = [];
  	}
  } finally {
  	salvandoPalavrasChave.value = false;
  }
}

// --- [INÍCIO] Funções de controle de edição dos Estados de Atuação ---

function iniciarEdicaoEstados() {
  // Garante que o array de edição está sincronizado com o perfil atual
  estadosAtuacaoEditaveis.value = perfil.value.perfilAtividade?.idsEstadoAtuacao
  	? [...perfil.value.perfilAtividade.idsEstadoAtuacao]
  	: [];
  estaEditandoEstados.value = true;
}

function cancelarEdicaoEstados() {
  // Reverte quaisquer mudanças feitas no array de edição
  if (perfil.value.perfilAtividade?.idsEstadoAtuacao) {
  	estadosAtuacaoEditaveis.value = [...perfil.value.perfilAtividade.idsEstadoAtuacao];
  } else {
  	estadosAtuacaoEditaveis.value = [];
  }
  estaEditandoEstados.value = false;
}

async function salvarEstadosAtuacao() {
  if (!user.idEmpresa) {
  	toast.add({
  	 	severity: 'error',
  	 	summary: 'Erro',
  	 	detail: 'ID da empresa não encontrado. Faça login novamente.',
  	 	life: 3000
  	});
  	return;
  }

  salvandoEstados.value = true;
  try {
  	const idsParaSalvar = estadosAtuacaoEditaveis.value || [];

  	await $fetch('/api/licitmatch/atualizar-estados-atuacao', {
  	 	method: 'PUT',
  	 	body: {
  	 		idEmpresa: user.idEmpresa,
  	 		idsEstados: idsParaSalvar
  	 	}
  	});

  	// Atualiza o 'perfil' original localmente após o sucesso
  	if (perfil.value.perfilAtividade) {
  	 	perfil.value.perfilAtividade.idsEstadoAtuacao = idsParaSalvar;
  	} else {
  	 	perfil.value.perfilAtividade = { idsEstadoAtuacao: idsParaSalvar };
  	}

  	toast.add({
  	 	severity: 'success',
  	 	summary: 'Sucesso!',
  	 	detail: 'Estados de atuação atualizados com sucesso.',
  	 	life: 3000
  	});

  	estaEditandoEstados.value = false; // Volta para o modo de leitura
    
    // Invalidate cache after update
    cache.invalidate(`perfil-empresa-${user.idEmpresa}`);

  } catch (err) {
  	toast.add({
  	 	severity: 'error',
  	 	summary: 'Erro ao salvar',
  	 	detail: err.data?.message || 'Não foi possível atualizar os estados de atuação.',
  	 	life: 4000
  	});
  } finally {
  	salvandoEstados.value = false;
  }
}

// --- [FIM] Funções de controle ---


function getCnaeLabel(codigo) {
  if (!codigo) return '';
  if (!cnaesDisponiveis.value || cnaesDisponiveis.value.length === 0) {
  	return 'Carregando...';
  }
  const cnae = cnaesDisponiveis.value.find(c => c.codigo === codigo);
  return cnae ? cnae.descricao : 'Descrição não encontrada';
}

function getNaturezaJuridicaLabel(value) {
  const natureza = NATUREZAS_JURIDICAS.find(n => n.value === value);
  return natureza ? natureza.label : value;
}

function getPorteLabel(value) {
  const porte = PORTES.find(p => p.value === value);
  return porte ? porte.label : value;
}

function getRamoAtividadeLabel(value) {
  const ramo = RAMOS_ATIVIDADE.find(r => r.value === value);
  return ramo ? ramo.label : value;
}

function getEstadoLabel(id) {
  const estado = ESTADOS.find(e => e.id === id);
  return estado ? estado.label : id;
}

function getSituacaoSeverity(situacao) {
  if (!situacao) return 'secondary';
  const situacaoLower = situacao.toLowerCase();
  if (situacaoLower.includes('ativa')) return 'success';
  if (situacaoLower.includes('suspensa')) return 'warning';
  if (situacaoLower.includes('baixada') || situacaoLower.includes('inativa')) return 'danger';
return 'secondary';
}

function copiarCodigo() {
  if (perfil.value?.codigoConvite) {
  	navigator.clipboard.writeText(perfil.value.codigoConvite);
  	toast.add({
  	 	severity: 'success',
  	 	summary: 'Copiado!',
  	 	detail: 'Código de convite copiado para a área de transferência',
  	 	life: 3000
  	});
  }
}
</script>

<style scoped>
.custom-tabview :deep(.p-tabview-nav) {
  background: white;
  border-bottom: 2px solid #e5e7eb;
}

.custom-tabview :deep(.p-tabview-nav-link) {
  color: #6b7280;
  padding: 1rem 1.5rem;
  font-weight: 500;
  transition: all 0.3s;
}

.custom-tabview :deep(.p-tabview-nav-link:hover) {
  color: #4081e9;
}

.custom-tabview :deep(.p-tabview-nav-link:focus) {
  box-shadow: none;
}

.custom-tabview :deep(.p-highlight .p-tabview-nav-link) {
  color: #4081e9;
  border-color: #4081e9;
  font-weight: 600;
}

.custom-tabview :deep(.p-tabview-panels) {
  background: white;
  padding: 0;
}

.custom-tag :deep(.p-tag) {
  background: #78a9f8;
  color: white;
}

/* --- [INÍCIO] Estilos para o Chips (como no custom-tag) --- */
:deep(.p-chips .p-chips-token) {
  background: #78a9f8; /* Cor do seu custom-tag */
  color: white; /* Cor do seu custom-tag */
  border-radius: 6px; /* Para combinar com os Tags */
  margin: 0.25rem;
}

:deep(.p-chips .p-chips-token .p-chips-token-icon) {
  color: white;
  margin-left: 0.5rem;
}

:deep(.p-chips .p-chips-input-token > input) {
  padding: 0.375rem 0.5rem; 
}
/* --- [FIM] Estilos para o Chips --- */


@keyframes fadeIn {
  from {
  	opacity: 0;
  	transform: translateY(10px);
  }
  to {
  	opacity: 1;
  	transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-in-out;
}

  ::v-deep(.p-tabview-ink-bar) { border: none !important; background: #78a9f8 !important;}
</style>