<template>

  <Dialog
  v-model:visible="uiStore.isEmpresaRequeridaDialogVisible" 
  modal 
  :closable="false"
  :closeOnEscape="false"
  :header="false"
  :style="{ width: '550px' }"
  :breakpoints="{'960px': '75vw', '640px': '90vw'}"
  class="empresa-dialog"
  >
    <template #header>
      <div class="w-full text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <i class="pi pi-building text-3xl text-blue-600"></i>
        </div>
        <h2 class="text-2xl font-bold text-gray-800">Empresa Necessária</h2>
      </div>
    </template>

    <div class="text-center mb-6">
      <p class="text-gray-600 text-lg">
        Para utilizar o sistema, você precisa estar vinculado a uma empresa.
      </p>
      <p class="text-gray-500 mt-2">
        Escolha uma das opções abaixo para continuar:
      </p>
    </div>

    <div v-if="!showAccessForm" class="space-y-4">
      <div 
        @click="handleCreateEmpresa"
        class="group cursor-pointer p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300"
      >
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200">
              <i class="pi pi-plus text-green-600 text-xl"></i>
            </div>
          </div>
          <div class="ml-4 text-left">
            <h3 class="text-lg font-semibold text-gray-800">Criar Nova Empresa</h3>
            <p class="text-sm text-gray-500">Cadastre sua empresa no sistema</p>
          </div>
          <i class="pi pi-chevron-right text-gray-400 ml-auto group-hover:text-blue-500"></i>
        </div>
      </div>

      <div 
        @click="showAccessForm = true"
        class="group cursor-pointer p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300"
      >
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200">
              <i class="pi pi-sign-in text-blue-600 text-xl"></i>
            </div>
          </div>
          <div class="ml-4 text-left">
            <h3 class="text-lg font-semibold text-gray-800">Acessar Empresa Existente</h3>
            <p class="text-sm text-gray-500">Entre com o código de convite</p>
          </div>
          <i class="pi pi-chevron-right text-gray-400 ml-auto group-hover:text-blue-500"></i>
        </div>
      </div>
    </div>

    <div v-else-if="!empresa" class="space-y-4">
      <Button 
        label="Voltar" 
        icon="pi pi-arrow-left"
        @click="showAccessForm = false"
        text
        class="mb-4"
      />

      <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <p class="text-sm text-blue-700">
          <i class="pi pi-info-circle mr-2"></i>
          Digite o código de convite e a senha fornecidos pela empresa
        </p>
      </div>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Código de Convite
          </label>
          <InputText 
            v-model="accessData.codigo" 
            placeholder="Digite o código da empresa"
            class="w-full"
            :class="{'p-invalid': errors.codigo}"
            @keyup.enter="handleAccessEmpresa"
          />
          <small v-if="errors.codigo" class="text-red-500 text-xs mt-1">{{ errors.codigo }}</small>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Senha de Acesso
          </label>
          <Password 
            v-model="accessData.senha" 
            placeholder="Digite a senha"
            :feedback="false"
            toggleMask
            class="w-full"
            :inputClass="'w-full'"
            :class="{'p-invalid': errors.senha}"
            @keyup.enter="handleAccessEmpresa"
          />
          <small v-if="errors.senha" class="text-red-500 text-xs mt-1">{{ errors.senha }}</small>
        </div>
      </div>

      <Button 
        label="Acessar Empresa" 
        icon="pi pi-check"
        @click="handleAccessEmpresa"
        class="w-full bg-blue-500 hover:bg-blue-600 text-white"
        :loading="loadingStoreImport.isLoading"
      />
    </div>

    <div v-else class="space-y-6">
      <div class="text-center">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
          <i class="pi pi-check-circle text-4xl text-green-600"></i>
        </div>
        <h3 class="text-xl font-bold text-gray-800 mb-2">Empresa Encontrada!</h3>
      </div>

      <div class="bg-gray-50 border border-gray-200 rounded-xl p-6">
        <div class="flex items-center justify-center mb-3">
          <i class="pi pi-building text-blue-600 text-2xl mr-3"></i>
          <h4 class="text-2xl font-bold text-gray-800">{{ empresa.nomeEmpresa }}</h4>
        </div>
        <p class="text-center text-gray-600">
          Código: <span class="font-semibold">{{ accessData.codigo }}</span>
        </p>
      </div>

      <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
        <p class="text-sm text-yellow-800">
          <i class="pi pi-exclamation-triangle mr-2"></i>
          Confirme se esta é realmente a empresa que deseja acessar
        </p>
      </div>

      <div class="flex gap-3">
        <Button 
          label="Cancelar" 
          icon="pi pi-times"
          @click="resetForm"
          outlined
          class="flex-1"
          severity="secondary"
        />
        <Button 
          label="Confirmar Acesso" 
          icon="pi pi-check"
          @click="handleConfirmarAcesso"
          class="flex-1 bg-green-500 hover:bg-green-600 text-white"
          :loading="loadingStoreImport.isLoading"
        />
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
const router = useRouter()
const { vincularEmpresa } = useUseEmpresa()
const loadingStoreImport = useLoadingStore()
const uiStore = useUiStore()
const user = userStore()
const toast = useToast()

const visible = ref(true)
const showAccessForm = ref(false)

const empresa = ref<Empresa | null>(null)

const accessData = reactive({
  codigo: '',
  senha: ''
})

const errors = reactive({
  codigo: '',
  senha: ''
})

const resetForm = () => {
  showAccessForm.value = false
  empresa.value = null
  accessData.codigo = ''
  accessData.senha = ''
  errors.codigo = ''
  errors.senha = ''
}

const handleConfirmarAcesso = async () => {

  try {
    loadingStoreImport.isLoading = true


    const response = await $fetch('/api/licitmatch/vincular-empresa-usuario', {
      method: 'PUT',
      body: {
        "idEmpresa": empresa.value?.idEmpresa,
        "idUsuario": user.idUsuario,
      }
    })

    user.setEmpresa(empresa.value!.idEmpresa, empresa.value!.nomeEmpresa)
    uiStore.fecharDialogEmpresaRequerida()

  } catch (error) {
    console.error('Erro ao acessar empresa:', error)
  } finally {
    loadingStoreImport.isLoading = false
  }

}

const validateAccessForm = () => {
  let isValid = true
  errors.codigo = ''
  errors.senha = ''

  if (!accessData.codigo) {
    errors.codigo = 'Código de convite é obrigatório'
    isValid = false
  }

  if (!accessData.senha) {
    errors.senha = 'Senha é obrigatória'
    isValid = false
  }

  return isValid
}

function handleCreateEmpresa() {
  uiStore.fecharDialogEmpresaRequerida
  router.push('/main/cadastro_empresa')
  console.log("passou clique")
}

const handleAccessEmpresa = async () => {
  if (!validateAccessForm()) {
    return
  }

  loadingStoreImport.isLoading = true

  try {

      const response = await $fetch<Empresa>('/api/licitmatch/buscar-empresa-por-codigo', {
        method: 'GET',
        query: {
          "codigo": accessData.codigo,
          "senha": accessData.senha,
        }
      })
      
      if(!response){
        toast.add({severity:'error', summary:'Erro', detail:'Empresa não encontrada. Verifique o código e a senha e tente novamente.', life: 5000})
      }else{
        empresa.value = response
      }

        
  } catch (error) {
    console.error('Erro ao acessar empresa:', error)
  } finally {
    loadingStoreImport.isLoading = false
  }
}

interface Empresa {
  idEmpresa: number
  nomeEmpresa : string
}

</script>

<style scoped>
.empresa-dialog :deep(.p-dialog-header) {
  @apply border-b-0 pb-0;
}

.empresa-dialog :deep(.p-dialog-content) {
  @apply pt-0;
}

:deep(.p-inputtext) {
  @apply px-4 py-2.5 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
}

:deep(.p-password-input) {
  @apply px-4 py-2.5 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
}
</style>
