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

    <div v-else class="space-y-4">
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
        :loading="loading"
      />
    </div>
  </Dialog>
</template>

<script setup>

const router = useRouter()
const { vincularEmpresa } = useUseEmpresa()
const loadingStoreImport = useLoadingStore()
const uiStore = useUiStore()

const visible = ref(true)
const showAccessForm = ref(false)

const accessData = reactive({
  codigo: '',
  senha: ''
})

const errors = reactive({
  codigo: '',
  senha: ''
})

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
    const success = await vincularEmpresa(accessData.codigo, accessData.senha)
    
    if (success) {
      uiStore.fecharDialogEmpresaRequerida
      
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    }
  } catch (error) {
    console.error('Erro ao acessar empresa:', error)
  } finally {
    loadingStoreImport.isLoading = false
  }
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
