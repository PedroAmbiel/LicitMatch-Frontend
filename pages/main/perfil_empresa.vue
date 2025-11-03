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
   	 	 	 			:options="estados"
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
import { ref, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
// Assumindo que userStore() está disponível globalmente (ex: via auto-imports do Nuxt)
// import { userStore } from '~/stores/user'; 

const toast = useToast();
const user = userStore();

const perfil = ref(null);
const loading = ref(true);
const error = ref(null);

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


const naturezasJuridicas = ref([
  /* ... (lista omitida por brevidade) ... */
  { label: '101-5 - Órgão Público do Poder Executivo Federal', value: '1015' },
  { label: '102-3 - Órgão Público do Poder Executivo Estadual ou do Distrito Federal', value: '1023' },
  { label: '103-1 - Órgão Público do Poder Executivo Municipal', value: '1031' },
  { label: '104-0 - Órgão Público do Poder Legislativo Federal', value: '1040' },
  { label: '105-8 - Órgão Público do Poder Legislativo Estadual ou do DF', value: '1058' },
  { label: '106-6 - Órgão Público do Poder Legislativo Municipal', value: '1066' },
  { label: '107-4 - Órgão Público do Poder Judiciário Federal', value: '1074' },
  { label: '108-2 - Órgão Público do Poder Judiciário Estadual', value: '1082' },
  { label: '110-4 - Autarquia Federal', value: '1104' },
  { label: '111-2 - Autarquia Estadual ou do Distrito Federal', value: '1112' },
  { label: '112-0 - Autarquia Municipal', value: '1120' },
  { label: '113-9 - Fundação Pública de Direito Público Federal', value: '1139' },
  { label: '114-7 - Fundação Pública de Direito Público Estadual ou do Distrito Federal', value: '1147' },
  { label: '115-5 - Fundação Pública de Direito Público Municipal', value: '1155' },
  { label: '116-3 - Órgão Público Autônomo Federal', value: '1163' },
  { label: '117-1 - Órgão Público Autônomo Estadual ou do Distrito Federal', value: '1171' },
  { label: '118-0 - Órgão Público Autônomo Municipal', value: '1180' },
  { label: '119-8 - Comissão Polinacional', value: '1198' },
  { label: '121-0 - Consórcio Público de Direito Público (Associação Pública)', value: '1210' },
  { label: '122-8 - Consórcio Público de Direito Privado', value: '1228' },
  { label: '123-6 - Estado ou Distrito Federal', value: '1236' },
  { label: '124-4 - Município', value: '1244' },
  { label: '125-2 - Fundação Pública de Direito Privado Federal', value: '1252' },
  { label: '126-0 - Fundação Pública de Direito Privado Estadual ou do Distrito Federal', value: '1260' },
  { label: '127-9 - Fundação Pública de Direito Privado Municipal', value: '1279' },
  { label: '128-7 - Fundo Público da Administração Indireta Federal', value: '1287' },
  { label: '129-5 - Fundo Público da Administração Indireta Estadual ou do Distrito Federa', value: '1295' },
  { label: '130-9 - Fundo Público da Administração Indireta Municipal', value: '1309' },
  { label: '131-7 - Fundo Público da Administração Direta Federal', value: '1317' },
  { label: '132-5 - Fundo Público da Administração Direta Estadual ou do Distrito Federal', value: '1325' },
  { label: '133-3 - Fundo Público da Administração Direta Municipal', value: '1333' },
  { label: '134-1 - União', value: '1341' },
  { label: '201-1 - Empresa Pública', value: '2011' },
  { label: '203-8 - Sociedade de Economia Mista', value: '2038' },
  { label: '204-6 - Sociedade Anônima Aberta', value: '2046' },
  { label: '205-4 - Sociedade Anônima Fechada', value: '2054' },
  { label: '206-2 - Sociedade Empresária Limitada (LTDA)', value: '2062' },
  { label: '207-0 - Sociedade Empresária em Nome Coletivo', value: '2070' },
  { label: '208-9 - Sociedade Empresária em Comandita Simples', value: '2089' },
  { label: '209-7 - Sociedade Empresária em Comandita por Ações', value: '2097' },
  { label: '212-7 - Sociedade em Conta de Participação', value: '2127' },
  { label: '213-5 - Empresário (Individual) (EI)', value: '2135' },
  { label: '214-3 - Cooperativa', value: '2143' },
  { label: '215-1 - Consórcio de Sociedades', value: '2151' },
  { label: '216-0 - Grupo de Sociedades', value: '2160' },
  { label: '217-8 - Estabelecimento, no Brasil, de Sociedade Estrangeira', value: '2178' },
- { label: '219-4 - Estabelecimento, no Brasil, de Empresa Binacional Argentino-Brasileira', value: '2194' },
  { label: '221-6 - Empresa Domiciliada no Exterior', value: '2216' },
  { label: '222-4 - Clube/Fundo de Investimento', value: '2224' },
  { label: '223-2 - Sociedade Simples Pura', value: '2232' },
  { label: '224-0 - Sociedade Simples Limitada', value: '2240' },
  { label: '225-9 - Sociedade Simples em Nome Coletivo', value: '2259' },
  { label: '226-7 - Sociedade Simples em Comandita Simples', value: '2267' },
  { label: '228-3 - Consórcio de Empregadores', value: '2283' },
  { label: '229-1 - Consórcio Simples', value: '2291' },
  { label: '230-5 - Empresa Individual de Responsabilidade Limitada (de Natureza Empresária) (EIRELI)', value: '2305' },
  { label: '231-3 - Empresa Individual de Responsabilidade Limitada (de Natureza Simples) (EIRELI)', value: '2313' },
  { label: '232-1 - Sociedade Unipessoal de Advocacia', value: '2321' },
  { label: '233-0 - Cooperativas de Consumo', value: '2330' },
  { label: '234-8 - Sociedade de Advocacia', value: '2348' },
  { label: '235-6 - Sociedade Unipessoal Imobiliária', value: '2356' },
  { label: '236-4 - Sociedade de Propósito Específico', value: '2364' },
  { label: '303-4 - Serviço Notarial e Registral (Cartório)', value: '3034' },
  { label: '306-9 - Fundação Privada', value: '3069' },
  { label: '307-7 - Serviço Social Autônomo', value: '3077' },
  { label: '308-5 - Condomínio Edilício', value: '3085' },
  { label: '310-7 - Comissão de Conciliação Prévia', value: '3107' },
  { label: '311-5 - Entidade de Mediação e Arbitragem', value: '3115' },
  { label: '312-3 - Partido Político', value: '3123' },
  { label: '313-1 - Entidade Sindical', value: '3131' },
  { label: '320-4 - Estabelecimento, no Brasil, de Fundação ou Associação Estrangeiras', value: '3204' },
  { label: '321-2 - Fundação ou Associação Domiciliada no Exterior', value: '3212' },
  { label: '322-0 - Organização Religiosa', value: '3220' },
  { label: '323-9 - Comunidade Indígena', value: '3239' },
  { label: '324-7 - Fundo Privado', value: '3247' },
  { label: '325-5 - Órgão de Direção Nacional de Partido Político', value: '3255' },
  { label: '326-3 - Órgão de Direção Regional de Partido Político', value: '3263' },
  { label: '327-1 - Órgão de Direção Local de Partido Político', value: '3271' },
  { label: '331-0 - Organização Social (OS)', value: '3310' },
  { label: '399-9 - Associação Privada', value: '3999' },
  { label: '213-5 - Microempreendedor Individual (MEI)', value: '2135' },
  { label: '401-4 - Empresa Individual Imobiliária', value: '4014' },
  { label: '402-2 - Segurado Especial', value: '4022' },
  { label: '408-1 - Contribuinte individual', value: '4081' },
  { label: '409-0 - Candidato a Cargo Político Eletivo', value: '4090' },
  { label: '411-1 - Leiloeiro', value: '4111' },
  { label: '412-0 - Produtor Rural (Pessoa Física)', value: '4120' },
]);

const portes = ref([
  /* ... (lista omitida por brevidade) ... */
  { label: 'MEI - Microempreendedor Individual', value: '00' },
  { label: 'ME - Microempresa', value: '02' },
  { label: 'EPP - Empresa de Pequeno Porte', value: '03' },
  { label: 'Demais', value: '05' },
]);

const ramosAtividade = ref([
  /* ... (lista omitida por brevidade) ... */
  { label: 'Tecnologia da Informação', value: 'TI' },
  { label: 'Educação', value: 'EDUCACAO' },
  { label: 'Saúde', value: 'SAUDE' },
  { label: 'Comércio', value: 'COMERCIO' },
  { label: 'Indústria', value: 'INDUSTRIA' },
  { label: 'Serviços', value: 'SERVICOS' },
  { label: 'Construção Civil', value: 'CONSTRUCAO' },
  { label: 'Agronegócio', value: 'AGRONEGOCIO' },
  { label: 'Transporte e Logística', value: 'TRANSPORTE' },
  { label: 'Alimentação', value: 'ALIMENTACAO' }
]);

const estados = ref([
  /* ... (lista omitida por brevidade) ... */
  { label: 'Acre', value: 'AC', id: 1 },
  { label: 'Alagoas', value: 'AL', id: 2 },
  { label: 'Amapá', value: 'AP', id: 3 },
  { label: 'Amazonas', value: 'AM', id: 4 },
  { label: 'Bahia', value: 'BA', id: 5 },
  { label: 'Ceará', value: 'CE', id: 6 },
  { label: 'Distrito Federal', value: 'DF', id: 7 },
  { label: 'Espírito Santo', value: 'ES', id: 8 },
  { label: 'Goiás', value: 'GO', id: 9 },
  { label: 'Maranhão', value: 'MA', id: 10 },
  { label: 'Mato Grosso', value: 'MT', id: 11 },
  { label: 'Mato Grosso do Sul', value: 'MS', id: 12 },
  { label: 'Minas Gerais', value: 'MG', id: 13 },
  { label: 'Pará', value: 'PA', id: 14 },
  { label: 'Paraíba', value: 'PB', id: 15 },
  { label: 'Paraná', value: 'PR', id: 16 },
  { label: 'Pernambuco', value: 'PE', id: 17 },
  { label: 'Piauí', value: 'PI', id: 18 },
  { label: 'Rio de Janeiro', value: 'RJ', id: 19 },
  { label: 'Rio Grande do Norte', value: 'RN', id: 20 },
  { label: 'Rio Grande do Sul', value: 'RS', id: 21 },
  { label: 'Rondônia', value: 'RO', id: 22 },
  { label: 'Roraima', value: 'RR', id: 23 },
  { label: 'Santa Catarina', value: 'SC', id: 24 },
  { label: 'São Paulo', value: 'SP', id: 25 },
  { label: 'Sergipe', value: 'SE', id: 26 },
  { label: 'Tocantins', value: 'TO', id: 27 }
]);

async function buscarCnaes() {
  try {
  const data = await $fetch(`/api/licitmatch/listar-cnaes`, {
   method: 'GET',
  });
  cnaesDisponiveis.value = data;
  } catch (err) {
  console.error('Erro ao buscar CNAEs:', err);
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
  	
  	const data = await $fetch('/api/licitmatch/perfil-empresa', {
  	 params: {
  	 	idEmpresa: idEmpresa
  	 }
  	});
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
  	console.error('Erro ao carregar perfil:', err);
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
  	const palavrasFiltradas = [...new Set(palavrasChaveEditaveis.value)].filter(p => p && p.trim() !== '');
  	
  	await $fetch('/api/licitmatch/atualizar-palavras-chave', {
  	 	method: 'PUT',
  	 	body: {
  	 		idEmpresa: user.idEmpresa,
  	 		novasPalavrasChave: palavrasFiltradas
  	 	}
  	});

  	if (perfil.value.perfilAtividade) {
  	 	perfil.value.perfilAtividade.palavrasChave = [...palavrasFiltradas];
  	} else {
  	 	perfil.value.perfilAtividade = { palavrasChave: [...palavrasFiltradas] };
  	}
  	
  	palavrasChaveEditaveis.value = [...palavrasFiltradas];
  	toast.add({ severity: 'success', summary: 'Sucesso!', detail: 'Palavras-chave atualizadas.', life: 3000 });
  	estaEditandoPalavrasChave.value = false; 

  } catch (err) {
  	console.error('Erro ao salvar palavras-chave:', err);
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
  	// O v-model 'estadosAtuacaoEditaveis' já contém o array de IDs [1, 5, 25]
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
  	 	perfil.value.perfilAtividade.idsEstadoAtuacao = [...idsParaSalvar];
  	} else {
  	 	perfil.value.perfilAtividade = { idsEstadoAtuacao: [...idsParaSalvar] };
  	}

  	toast.add({
  	 	severity: 'success',
  	 	summary: 'Sucesso!',
  	 	detail: 'Estados de atuação atualizados com sucesso.',
  	 	life: 3000
  	});

  	estaEditandoEstados.value = false; // Volta para o modo de leitura

  } catch (err) {
  	console.error('Erro ao salvar estados de atuação:', err);
  	toast.add({
  	 	severity: 'error',
  	 	summary: 'Erro ao salvar',
  	 	detail: err.data?.message || 'Não foi possível atualizar os estados de atuação.',
  	 	life: 4000
  	});
  	// Não reverte as alterações, deixa o usuário corrigir ou cancelar
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
  const natureza = naturezasJuridicas.value.find(n => n.value === value);
  return natureza ? natureza.label : value;
}

function getPorteLabel(value) {
  const porte = portes.value.find(p => p.value === value);
  return porte ? porte.label : value;
}

function getRamoAtividadeLabel(value) {
  const ramo = ramosAtividade.value.find(r => r.value === value);
  return ramo ? ramo.label : value;
}

function getEstadoLabel(id) {
  const estado = estados.value.find(e => e.id === id);
  return estado ? estado.label : id;
}

function formatCNPJ(cnpj) {
  if (!cnpj) return 'Não informado';
  return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
}

function formatCEP(cep) {
  if (!cep) return 'Não informado';
  return cep.replace(/^(\d{5})(\d{3})$/, '$1-$2');
}

function formatDate(dateString) {
  if (!dateString) return 'Não informado';
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
  	day: '2-digit',
  	month: '2-digit',
  	year: 'numeric',
  	hour: '2-digit',
  	minute: '2-digit'
  });
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