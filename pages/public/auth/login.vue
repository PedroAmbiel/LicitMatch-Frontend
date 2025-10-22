<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
    <div class="w-full max-w-6xl flex bg-white rounded-2xl shadow-2xl overflow-hidden">
      
      <div class="w-full lg:w-1/2 p-8 md:p-12 bg-gradient-to-br from-blue-600 to-blue-700">
        <div class="max-w-md mx-auto">
          <Card class="border-0 shadow-xl bg-white/95 backdrop-blur">
            <template #header>
              <div class="text-center pt-4">
                <h2 class="text-2xl font-bold text-gray-800">Acesso Logado</h2>
              </div>
            </template>
            
            <template #content>
              <form @submit.prevent="handleLogin" class="space-y-6">
                <div class="field">
                  <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
                    Digite seu e-mail:
                  </label>
                  <InputText 
                    id="email"
                    v-model="email"
                    type="email"
                    placeholder="seu@email.com"
                    class="w-full"
                    :class="{'p-invalid': errors.email}"
                    @blur="validateEmail"
                  />
                  <small v-if="errors.email" class="p-error text-red-500 text-xs mt-1">
                    {{ errors.email }}
                  </small>
                </div>

                <div class="field">
                  <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">
                    Digite sua senha:
                  </label>
                  <Password 
                    id="password"
                    v-model="password"
                    :feedback="false"
                    toggleMask
                    placeholder="••••••••"
                    class="w-full"
                    inputClass="w-full"
                    :class="{'p-invalid': errors.password}"
                    @blur="validatePassword"
                  />
                  <small v-if="errors.password" class="p-error text-red-500 text-xs mt-1">
                    {{ errors.password }}
                  </small>
                </div>

                <div class="text-right">
                  <a 
                    href="#" 
                    @click.prevent="forgotPassword"
                    class="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium"
                  >
                    Esqueci minha senha
                  </a>
                </div>

                <Button 
                  type="submit"
                  label="Avançar"
                  class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
                  :loading="loading"
                  :disabled="loading || !isFormValid"
                />
              </form>
            </template>

            <template #footer>
              <div class="text-center text-sm text-gray-600">
                Não tem uma conta? 
                <NuxtLink to="/public/auth/cadastro_usuario" class="text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                  Cadastre-se
                </NuxtLink>
              </div>
            </template>
          </Card>
        </div>
      </div>

      <div class="hidden lg:flex w-1/2 bg-gradient-to-br from-white via-gray-50 to-blue-50 items-center justify-center relative overflow-hidden">
        <div class="absolute inset-0">
          <div class="absolute top-20 right-20 w-72 h-72 bg-blue-200 rounded-full opacity-20 blur-3xl animate-pulse"></div>
          <div class="absolute bottom-20 left-20 w-96 h-96 bg-blue-300 rounded-full opacity-20 blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
        </div>

        <div class="relative z-10 text-center">
          <div class="flex justify-center mb-8 animate-fadeIn">
            <div class="relative">
              <div class="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-6 transition-transform duration-300">
                <i class="pi pi-building text-white text-5xl"></i>
              </div>
              <div class="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <i class="pi pi-verified text-white text-2xl"></i>
              </div>
            </div>
          </div>

          <div class="relative inline-block">
            <h1 
              class="text-7xl font-black text-transparent bg-clip-text bg-blue-600 inline-block"
            >
              Licit
            </h1>
            
            <h1 
              class="text-7xl font-black text-transparent bg-clip-text bg-black inline-block animate-slideInLeft"
              style="animation-delay: 0.5s;"
            >
              Match
            </h1>
          </div>

          <p class="mt-6 text-gray-600 text-lg font-medium animate-fadeInUp" style="animation-delay: 1s;">
            Sistema de Gestão de Licitações
          </p>

          <div class="mt-12 space-y-4 animate-fadeInUp" style="animation-delay: 1.2s;">
            <div class="flex items-center justify-center space-x-3 text-gray-700">
              <i class="pi pi-check-circle text-green-500 text-xl"></i>
              <span class="font-medium">Processos Simplificados</span>
            </div>
            <div class="flex items-center justify-center space-x-3 text-gray-700">
              <i class="pi pi-shield text-blue-500 text-xl"></i>
              <span class="font-medium">Segurança Garantida</span>
            </div>
            <div class="flex items-center justify-center space-x-3 text-gray-700">
              <i class="pi pi-chart-line text-purple-500 text-xl"></i>
              <span class="font-medium">Análises em Tempo Real</span>
            </div>
          </div>
        </div>

        <div class="absolute bottom-0 left-0 right-0">
          <svg class="w-full h-24 text-blue-100 opacity-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
          </svg>
        </div>
      </div>
    </div>

    <Toast position="top-right" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const user = userStore()

const email = ref('')
const password = ref('')
const loading = ref(false)
const errors = ref({
  email: '',
  password: ''
})

const validateEmail = () => {
  if (!email.value) {
    errors.value.email = 'E-mail é obrigatório'
    return false
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    errors.value.email = 'E-mail inválido'
    return false
  }
  errors.value.email = ''
  return true
}

const validatePassword = () => {
  if (!password.value) {
    errors.value.password = 'Senha é obrigatória'
    return false
  }
  if (password.value.length < 6) {
    errors.value.password = 'Senha deve ter no mínimo 6 caracteres'
    return false
  }
  errors.value.password = ''
  return true
}

const isFormValid = computed(() => {
  return email.value && password.value && !errors.value.email && !errors.value.password
})

const handleLogin = async () => {
  loading.value = true
  if (!validateEmail() || !validatePassword()) {
    toast.add({
      severity: 'error',
      summary: 'Erro de validação',
      detail: 'Por favor, corrija os campos destacados',
      life: 3000
    })
    return
  }
  try{

    const requestBody =  ref({
      email : email.value,
      senha : password.value
    })

    const resp = await $fetch('/api/licitmatch/user-login', {
      method: 'POST',
      body: requestBody.value
    })

    user.logarUsuario(resp)
    console.log(user)

    useRouter().push("/main/dashboard")

  } catch (error) {
    
    if (error.statusCode === 400) {
      toast.add({
        severity: 'error',
        summary: 'Erro ao realizar acesso',
        detail: 'Email ou senha estão incorretos',
        life: 5000
      })
    } else if(error.statusCode == 500) {
      toast.add({
        severity: 'error',
        summary: 'Serviço Indisponível',
        detail: 'Não foi possível finalizar seu pedido. Tente novamente mais tarde.',
        life: 5000
      })
    } else {
      toast.add({
        severity: 'error',
        summary: 'Erro no login',
        detail: 'Ocorreu um erro ao processar seu login. Tente novamente.',
        life: 5000
      })
    }
  } finally {
    loading.value = false
  }

  
}

const forgotPassword = () => {
  toast.add({
    severity: 'info',
    summary: 'Recuperação de senha',
    detail: 'Funcionalidade em desenvolvimento',
    life: 3000
  })
}
</script>

<style scoped>
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slideInLeft {
  animation: slideInLeft 0.8s ease-out forwards;
}

.animate-slideInRight {
  animation: slideInRight 0.8s ease-out forwards;
  opacity: 0;
}

.animate-fadeIn {
  animation: fadeIn 1s ease-out forwards;
}

.animate-fadeInUp {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

::v-deep(.p-inputtext) {
  @apply border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg py-2.5 px-3 transition-all duration-200;
}

::v-deep(.p-password input) {
  @apply border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg py-2.5 px-3 transition-all duration-200 w-full;
}

::v-deep(.p-inputtext:hover) {
  @apply border-gray-400;
}

::v-deep(.p-invalid.p-inputtext) {
  @apply border-red-500 focus:border-red-500 focus:ring-red-200;
}

::v-deep(.p-card) {
  @apply rounded-xl;
}

::v-deep(.p-card-header) {
  @apply border-b-0;
}

::v-deep(.p-card-content) {
  @apply px-6 py-4;
}

::v-deep(.p-card-footer) {
  @apply border-t border-gray-100 py-4;
}

/* Animação suave para o botão */
::v-deep(.p-button) {
  @apply shadow-md;
}

::v-deep(.p-button:not(:disabled):hover) {
  @apply shadow-xl;
}
</style>