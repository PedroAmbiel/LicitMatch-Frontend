<template>
  <Toast />
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8">
    <div class="container mx-auto px-4 max-w-6xl">
      <div class="bg-white rounded-t-2xl shadow-lg p-6 border-b-4 border-blue-500">
        <h1 class="text-3xl font-bold text-gray-800">Cadastro de Empresa</h1>
        <p class="text-gray-600 mt-2">Preencha os dados da sua empresa para continuar</p>
      </div>

      <div class="bg-white shadow-lg">
        <Steps :model="items" :activeStep="activeStep" class="custom-steps p-5" 
        pt:itemlabel:class="!text-blue-500" 
        pt:itemnumber:class="!text-blue-400"  />
      </div>

      <div class="bg-white rounded-b-2xl shadow-lg p-8">
        <form @submit.prevent="handleSubmit">
          <div v-if="activeStep === 0" class="space-y-6 animate-fadeIn">
            <h2 class="text-2xl font-semibold text-gray-700 mb-6">Dados da Empresa</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="flex flex-col">
                <label class="text-sm font-medium text-gray-700 mb-2">CNPJ *</label>
                <InputMask 
                  @blur="buscarDadosPorCnpj(formData.cnpj)"
                  v-model="formData.cnpj" 
                  mask="99.999.999/9999-99"
                  placeholder="00.000.000/0000-00"
                  class="custom-input"
                  :class="{'p-invalid': errors.cnpj}"
                />
                <small v-if="errors.cnpj" class="text-red-500 text-xs mt-1">{{ errors.cnpj }}</small>
              </div>

              <div class="flex flex-col">
                <label class="text-sm font-medium text-gray-700 mb-2">Razão Social *</label>
                <InputText 
                  v-model="formData.razao_social"
                  :disabled="loadingStore.isLoading"
                  placeholder="Nome da empresa"
                  class="custom-input"
                  :class="{'p-invalid': errors.razao_social}"
                />
                <small v-if="errors.razao_social" class="text-red-500 text-xs mt-1">{{ errors.razao_social }}</small>
              </div>

              <div class="flex flex-col">
                <label class="text-sm font-medium text-gray-700 mb-2">Natureza Jurídica</label>
                <Dropdown 
                  v-model="formData.natureza_juridica" 
                  :options="naturezasJuridicas"
                  optionLabel="label"
                  optionValue="value"
                  placeholder="Selecione"
                  class="custom-dropdown"
                  :disabled="loadingStore.isLoading"
                />
              </div>

              <div class="flex flex-col">
                <label class="text-sm font-medium text-gray-700 mb-2">Porte da Empresa</label>
                <Dropdown 
                  v-model="formData.porte" 
                  :disabled="loadingStore.isLoading"
                  :options="portes"
                  optionLabel="label"
                  optionValue="value"
                  placeholder="Selecione o porte"
                  class="custom-dropdown"
                />
              </div>

              <div class="flex flex-col">
                <label class="text-sm font-medium text-gray-700 mb-2">Situação Cadastral</label>
                <Dropdown 
                  v-model="formData.situacao_cadastral" 
                  :options="situacoes"
                  :disabled="loadingStore.isLoading"
                  optionLabel="label"
                  optionValue="value"
                  disabled="true"
                  placeholder="Selecione"
                  class="custom-dropdown"
                />
              </div>
            </div>

            <Divider />

            <h3 class="text-lg font-semibold text-gray-700">Códigos de Acesso</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="flex flex-col">
                <label class="text-sm font-medium text-gray-700 mb-2">Código de Convite</label>
                <InputText 
                  :disabled="true"
                  v-model="formData.codigo_convite" 
                  placeholder="Código único para convidar usuários"
                  class="custom-input"
                  :class="{'p-invalid': errors.codigo_convite}"
                />
                <small class="text-gray-500 text-xs mt-1">Este código será usado para convidar novos usuários</small>
                <small v-if="errors.codigo_convite" class="text-red-500 text-xs mt-1">{{ errors.codigo_convite }}</small>
              </div>

              <div class="flex flex-col">
                <label class="text-sm font-medium text-gray-700 mb-2">Senha do Convite *</label>
                <Password 
                  v-model="formData.senha_convite" 
                  placeholder="Senha de segurança"
                  toggleMask
                  :feedback="false"
                  class="custom-input w-full"
                  :inputClass="'w-full'"
                  :class="{'p-invalid': errors.senha_convite}"
                />
                <small class="text-gray-500 text-xs mt-1">Senha necessária para aceitar o convite</small>
                <small v-if="errors.senha_convite" class="text-red-500 text-xs mt-1">{{ errors.senha_convite }}</small>
              </div>
            </div>
          </div>

          <div v-if="activeStep === 1" class="space-y-6 animate-fadeIn">
            <h2 class="text-2xl font-semibold text-gray-700 mb-6">Endereço da Empresa</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="flex flex-col md:col-span-2">
                <label class="text-sm font-medium text-gray-700 mb-2">CEP *</label>
                <div class="flex gap-2">
                  <InputMask 
                    v-model="formData.endereco.cep" 
                    mask="99999-999"
                    placeholder="00000-000"
                    class="custom-input flex-1"
                    :class="{'p-invalid': errors['endereco.cep']}"
                    @blur="buscarCEP"
                    :disabled="loadingStore.isLoading"
                  />
                  <Button 
                    label="Buscar CEP" 
                    icon="pi pi-search"
                    @click="buscarCEP"
                    class="bg-blue-500 hover:bg-blue-600 !border-none"
                    pt:root:class="!border-none"
                    :loading="buscandoCEP"
                  />
                </div>
                <small v-if="errors['endereco.cep']" class="text-red-500 text-xs mt-1">{{ errors['endereco.cep'] }}</small>
              </div>

              <div class="flex flex-col md:col-span-2">
                <label class="text-sm font-medium text-gray-700 mb-2">Logradouro *</label>
                <InputText 
                  v-model="formData.endereco.logradouro" 
                  placeholder="Rua, Avenida, etc."
                  class="custom-input"
                  :class="{'p-invalid': errors['endereco.logradouro']}"
                />
                <small v-if="errors['endereco.logradouro']" class="text-red-500 text-xs mt-1">{{ errors['endereco.logradouro'] }}</small>
              </div>

              <div class="flex flex-col">
                <label class="text-sm font-medium text-gray-700 mb-2">Cidade *</label>
                <InputText 
                  v-model="formData.endereco.cidade" 
                  placeholder="Nome da cidade"
                  class="custom-input"
                  :class="{'p-invalid': errors['endereco.cidade']}"
                />
                <small v-if="errors['endereco.cidade']" class="text-red-500 text-xs mt-1">{{ errors['endereco.cidade'] }}</small>
              </div>

              <div class="flex flex-col">
                <label class="text-sm font-medium text-gray-700 mb-2">Estado *</label>
                <Dropdown 
                  v-model="formData.endereco.estado" 
                  :options="estados"
                  optionLabel="label"
                  optionValue="value"
                  placeholder="Selecione o estado"
                  class="custom-dropdown"
                  :class="{'p-invalid': errors['endereco.estado']}"
                  filter
                  showClear
                />
                <small v-if="errors['endereco.estado']" class="text-red-500 text-xs mt-1">{{ errors['endereco.estado'] }}</small>
              </div>
            </div>
          </div>

          <div v-if="activeStep === 2" class="space-y-6 animate-fadeIn">
            <h2 class="text-2xl font-semibold text-gray-700 mb-6">Perfil de Atividade</h2>
            
            <div class="space-y-6">
              <div class="flex flex-col">
                <label class="text-sm font-medium text-gray-700 mb-2">Ramo de Atividade *</label>
                <Dropdown 
                  v-model="formData.perfil.ramo_atividade" 
                  :options="ramosAtividade"
                  optionLabel="label"
                  optionValue="value"
                  :disabled="loadingStore.isLoading"
                  placeholder="Selecione o ramo"
                  class="custom-dropdown"
                  :class="{'p-invalid': errors['perfil.ramo_atividade']}"
                  filter
                />
                <small v-if="errors['perfil.ramo_atividade']" class="text-red-500 text-xs mt-1">{{ errors['perfil.ramo_atividade'] }}</small>
              </div>

              <div class="flex flex-col">
                <label class="text-sm font-medium text-gray-700 mb-2">Descrição das Atividades *</label>
                <Textarea 
                  v-model="formData.perfil.descricao_atividades" 
                  rows="4"
                  placeholder="Descreva as principais atividades da empresa..."
                  class="custom-input"
                  :class="{'p-invalid': errors['perfil.descricao_atividades']}"
                />
                <small v-if="errors['perfil.descricao_atividades']" class="text-red-500 text-xs mt-1">{{ errors['perfil.descricao_atividades'] }}</small>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="flex flex-col">
                  <label class="text-sm font-medium text-gray-700 mb-2">CNAE Principal</label>
                  <Dropdown 
                    v-model="formData.perfil.cnae_principal"
                    :options="cnaesDisponiveis"
                    :disabled="loadingStore.isLoading"
                    optionLabel="descricao"
                    optionValue="codigo"
                    placeholder="Digite para buscar CNAE"
                    class="custom-autocomplete w-full"
                    dropdown
                    filter
                  >
                    <template #option="slotProps">
                      <div class="flex flex-col">
                        <span class="font-medium">{{ slotProps.option.codigo }}</span>
                        <span class="text-sm text-gray-500">{{ slotProps.option.descricao }}</span>
                      </div>
                    </template>
                  </Dropdown>
                </div>

                <div class="flex flex-col">
                  <label class="text-sm font-medium text-gray-700 mb-2">CNAEs Secundários</label>
                  <MultiSelect 
                    v-model="formData.perfil.codigos_cnae" 
                    :options="cnaesDisponiveis"
                    :disabled="loadingStore.isLoading"
                    optionLabel="descricao"
                    optionValue="codigo"
                    placeholder="Selecione CNAEs adicionais"
                    class="custom-multiselect w-full"
                    filter
                    :maxSelectedLabels="15"
                  >
                    <template #option="slotProps">
                      <div class="flex flex-col">
                        <span class="font-medium">{{ slotProps.option.codigo }}</span>
                        <span class="text-sm text-gray-500">{{ slotProps.option.descricao }}</span>
                      </div>
                    </template>
                  </MultiSelect>
                </div>
              </div>

              <div class="flex flex-col">
                <label class="text-sm font-medium text-gray-700 mb-2">Estados de Atuação</label>
                <MultiSelect 
                  v-model="formData.perfil.fk_estado_atuacao" 
                  :options="estados"
                  optionLabel="label"
                  optionValue="id"
                  placeholder="Selecione os estados de atuação"
                  class="custom-multiselect w-full"
                  filter
                  :maxSelectedLabels="5"
                />
              </div>

              <div class="flex flex-col">
                <label class="text-sm font-medium text-gray-700 mb-2">Palavras-chave</label>
                <Chips 
                  v-model="formData.perfil.palavras_chave" 
                  placeholder="Digite e pressione Enter"
                  class="custom-chips w-full"
                  separator=","
                />
                <small class="text-gray-500 text-xs mt-1">Separe as palavras-chave por vírgula ou Enter</small>
              </div>
            </div>
          </div>

          <div class="flex justify-between mt-8 pt-6 border-t">
            <Button 
              v-if="activeStep > 0"
              label="Voltar" 
              icon="pi pi-chevron-left"
              @click="previousStep"
              class="bg-blue-400 hover:!bg-blue-500 text-white"
              text
            />
            <div v-else></div>
            
            <div class="flex gap-3">
              <Button 
                v-if="activeStep < 2"
                label="Próximo" 
                icon="pi pi-chevron-right"
                iconPos="right"
                @click="nextStep"
                class="bg-blue-500 hover:bg-blue-600 hover:!text-white border-none"
              />
              <Button 
                v-else
                label="Cadastrar Empresa" 
                icon="pi pi-check"
                @click="handleSubmit"
                class="bg-green-500 hover:bg-green-600"
                :loading="salvando"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { userStore } from '#imports'

const router = useRouter()
const toast = useToast()

const activeStep = ref(0)
const items = ref([
  { label: 'Dados da Empresa', icon: 'pi pi-building' },
  { label: 'Endereço', icon: 'pi pi-map-marker' },
  { label: 'Perfil de Atividade', icon: 'pi pi-briefcase' }
])

const formData = reactive({
  cnpj: '',
  razao_social: '',
  natureza_juridica: '',
  porte: '',
  situacao_cadastral: 'Ativa',
  codigo_convite: '',
  senha_convite: '',
  endereco: {
    logradouro: '',
    cidade: '',
    estado: '',
    cep: ''
  },
  perfil: {
    ramo_atividade: '',
    descricao_atividades: '',
    cnae_principal: '',
    codigos_cnae: [],
    palavras_chave: [],
    fk_estado_atuacao: []
  }
})

const errors = reactive({})

const salvando = ref(false)
const buscandoCEP = ref(false)

const loadingStore = useLoadingStore();

const naturezasJuridicas = ref([
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
  { label: '219-4 - Estabelecimento, no Brasil, de Empresa Binacional Argentino-Brasileira', value: '2194' },
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
  { label: 'MEI - Microempreendedor Individual', value: '00' },
  { label: 'ME - Microempresa', value: '02' },
  { label: 'EPP - Empresa de Pequeno Porte', value: '03' },
  { label: 'Demais', value: '05' },
])

const situacoes = ref([
  { label: 'Ativa', value: 'Ativa' },
  { label: 'Inativa', value: 'Inativa' },
  { label: 'Suspensa', value: 'Suspensa' },
  { label: 'Baixada', value: 'Baixada' }
])

const ramosAtividade = ref([
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
])

const estados = ref([
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
])

const cnaesDisponiveis = ref()

// const cnaesDisponiveis = ref([
//   { codigo: '62.01-5', descricao: 'Desenvolvimento de programas de computador sob encomenda' },
//   { codigo: '62.02-3', descricao: 'Desenvolvimento e licenciamento de programas de computador customizáveis' },
//   { codigo: '62.03-1', descricao: 'Desenvolvimento e licenciamento de programas de computador não-customizáveis' },
//   { codigo: '62.04-0', descricao: 'Consultoria em tecnologia da informação' },
//   { codigo: '63.11-9', descricao: 'Tratamento de dados, hospedagem na internet e outras atividades relacionadas' }
// ])

const cnaesFiltrados = ref([])

const validateStep = (step) => {
  const newErrors = {}
  
  if (step === 0) {
    if (!formData.cnpj) newErrors.cnpj = 'CNPJ é obrigatório'
    if (!formData.razao_social) newErrors.razao_social = 'Razão Social é obrigatória'
    if (!formData.codigo_convite) newErrors.codigo_convite = 'Código de convite é obrigatório'
    if (!formData.senha_convite) newErrors.senha_convite = 'Senha do convite é obrigatória'
  }
  
  if (step === 1) {
    if (!formData.endereco.cep) newErrors['endereco.cep'] = 'CEP é obrigatório'
    if (!formData.endereco.logradouro) newErrors['endereco.logradouro'] = 'Logradouro é obrigatório'
    if (!formData.endereco.cidade) newErrors['endereco.cidade'] = 'Cidade é obrigatória'
    if (!formData.endereco.estado) newErrors['endereco.estado'] = 'Estado é obrigatório'
  }
  
  if (step === 2) {
    if (!formData.perfil.ramo_atividade) newErrors['perfil.ramo_atividade'] = 'Ramo de atividade é obrigatório'
    if (!formData.perfil.descricao_atividades) newErrors['perfil.descricao_atividades'] = 'Descrição é obrigatória'
  }
  
  Object.keys(errors).forEach(key => delete errors[key])
  Object.assign(errors, newErrors)
  
  return Object.keys(newErrors).length === 0
}

const nextStep = () => {
  if (validateStep(activeStep.value)) {
    activeStep.value++
  } else {
    toast.add({
      severity: 'warn',
      summary: 'Atenção',
      detail: 'Por favor, preencha todos os campos obrigatórios',
      life: 3000
    })
  }
}

const previousStep = () => {
  activeStep.value--
}

const buscarCEP = async () => {
  if (!formData.endereco.cep) return
  
  buscandoCEP.value = true
  loadingStore.isLoading = true
  try {
    const cep = formData.endereco.cep.replace('-', '')
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const data = await response.json()
    
    console.log(data)

    if (!data.erro) {
      formData.endereco.logradouro = data.logradouro
      formData.endereco.cidade = data.localidade
      formData.endereco.estado = data.uf
      
      toast.add({
        severity: 'success',
        summary: 'CEP Encontrado',
        detail: 'Endereço preenchido automaticamente',
        life: 3000
      })
    }else{
      toast.add({
      severity: 'error',
      summary: 'CEP não encontrado',
      detail: 'Preencha os dados manualmente',
      life: 3000
    })
    }
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Erro ao buscar CEP',
      life: 3000
    })
  } finally {
    buscandoCEP.value = false
    loadingStore.isLoading = false
  }
}

const buscarCNAEs = (event) => {
  cnaesFiltrados.value = cnaesDisponiveis.value.filter(cnae => 
    cnae.codigo.replace(/[.\-]/g, "").includes(event.query.replace(/[.\-]/g, "")) || 
    cnae.descricao.toLowerCase().includes(event.query.toLowerCase())
  )
}

const handleSubmit = async () => {
  if (!validateStep(0) || !validateStep(1) || !validateStep(2)) {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Por favor, preencha todos os campos obrigatórios',
      life: 3000
    })
    return
  }
  
  loadingStore.isLoading = true
  const userStoreImport = userStore()
  
  try {
    const cnpjLimpo = formData.cnpj.replace(/\D/g, '')
    const cepLimpo = formData.endereco.cep.replace(/\D/g, '')

    const response = await $fetch('/api/licitmatch/cadastrar-nova-empresa', {
      method: 'POST',
      body:{
        idUsuarioCriou: userStoreImport.idUsuario,
        cnpj: cnpjLimpo,
        razaoSocial: formData.razao_social,
        naturezaJuridica: formData.natureza_juridica,
        porte: formData.porte,
        situacaoCadastral: formData.situacao_cadastral,
        codigoConvite: formData.codigo_convite,
        senhaConvite: formData.senha_convite,
        endereco: {
          logradouro: formData.endereco.logradouro,
          cidade: formData.endereco.cidade,
          estado: formData.endereco.estado,
          cep: cepLimpo,
        },
        perfilEmpresa: {
          ramoAtividade: formData.perfil.ramo_atividade,
          descricaoAtividades: formData.perfil.descricao_atividades,
          cnaePrincipal: formData.perfil.cnae_principal,
          codigosCnae: formData.perfil.codigos_cnae,
          palavrasChave: formData.perfil.palavras_chave,
          fkEstadoAtuacao: formData.perfil.fk_estado_atuacao,
        },

      }
    })
    console.log("response id: ", response.id)
    console.log("response razaoSocial: ", response.razaoSocial)
    if(response.id && response.razaoSocial){

      

      await userStoreImport.setEmpresa(
        response.id,
        response.razaoSocial
      )

      toast.add({
        severity: 'success',
        summary: 'Sucesso!',
        detail: 'Empresa cadastrada com sucesso',
        life: 3000
      })

      router.push('/main/dashboard')
    }else{
      toast.add({
        severity: 'error',
        summary: 'Erro!',
        detail: 'Não foi possível cadastrar empresa',
        life: 3000
      })
    }
    
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Erro ao cadastrar empresa',
      life: 3000
    })
  } finally {
    loadingStore.isLoading = false
  }
}

const generateRandomCode = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let part1 = '';
  let part2 = '';

  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    part1 += characters.charAt(randomIndex);
  }

  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    part2 += characters.charAt(randomIndex);
  }

  return `${part1}-${part2}`;
};

const buscarDadosPorCnpj = async (cnpj) => {
  const cnpjLimpo = cnpj.replace(/\D/g, '');

  var errorMessage = '';
  if (cnpjLimpo.length !== 14) {
    errorMessage = 'CNPJ inválido. Por favor, digite 14 números.';
    return;
  }

  loadingStore.isLoading = true;

  try {
    const response = await fetch(`https://publica.cnpj.ws/cnpj/${cnpjLimpo}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detalhes || `Erro ao buscar CNPJ: ${response.statusText}`);
    }

    const data = await response.json();

    formData.razao_social = data.razao_social || '';
    formData.natureza_juridica = data.natureza_juridica?.id || '';
    formData.porte = data.porte?.id || '';
    formData.situacao_cadastral = data.estabelecimento?.situacao_cadastral || 'Ativa';

    formData.endereco.cep = data.estabelecimento?.cep || '';

    formData.perfil.ramo_atividade = data.estabelecimento?.atividade_principal?.descricao || '';
    formData.perfil.cnae_principal = data.estabelecimento?.atividade_principal?.id.slice(0, -2).replace(/(\d{2})(\d{2})(\d{1})/, "$1.$2-$3") || '';
    
    if (data.estabelecimento?.atividades_secundarias && Array.isArray(data.estabelecimento.atividades_secundarias)) {
      formData.perfil.codigos_cnae = data.estabelecimento.atividades_secundarias.map(cnae => cnae.id.slice(0, -2).replace(/(\d{2})(\d{2})(\d{1})/, "$1.$2-$3"));
    } else {
      formData.perfil.codigos_cnae = [];
    }
    
  } catch (error) {
    console.error('Falha na busca do CNPJ:', error);
    errorMessage = error.message || 'Não foi possível consultar o CNPJ. Tente novamente.';
  } finally {
    loadingStore.isLoading = false;
  }
};

async function buscarCnaes() {
  try {
    const response = await $fetch(`/api/licitmatch/listar-cnaes`, {
      method: 'GET',
    });
    console.log(response.data)
    cnaesDisponiveis.value = response
    
    
  }catch(error){
    alert(error)
  }
  
}

onMounted(() => {
  formData.codigo_convite = generateRandomCode()
  buscarCnaes();
  
})

definePageMeta({
  middleware: 'empresa-check',
})

</script>

<style scoped>
.custom-input :deep(.p-inputtext),
.custom-input :deep(input) {
  @apply w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all;
}

.custom-dropdown :deep(.p-dropdown) {
  @apply w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
}

.custom-multiselect :deep(.p-multiselect) {
  @apply w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
}

.custom-autocomplete :deep(.p-autocomplete-input) {
  @apply w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
}

.custom-chips :deep(.p-chips-input-token input) {
  @apply px-4 py-2 focus:ring-2 focus:ring-blue-500;
}

.custom-steps ::v-deep(.p-steps-item.p-steps-current .p-menuitem-link) {
  @apply bg-gradient-to-r from-blue-500 to-blue-600 !p-10;
}

.custom-steps :deep(.p-steps-item.p-steps-current .p-steps-number) {
  @apply text-white font-bold;
}

.custom-steps :deep(.p-steps-item.p-steps-current .p-steps-title) {
  @apply text-blue-600 font-semibold;
}

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
  animation: fadeIn 0.3s ease-in-out;
}
</style>