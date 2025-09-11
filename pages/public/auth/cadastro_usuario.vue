<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
    <div class="w-full max-w-6xl flex bg-white rounded-2xl shadow-2xl overflow-hidden">
      
      <div class="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 to-blue-700 items-center justify-center relative overflow-hidden">
        <div class="absolute inset-0">
          <div class="absolute top-10 left-10 w-72 h-72 bg-white rounded-full opacity-10 blur-3xl animate-pulse"></div>
          <div class="absolute bottom-10 right-10 w-96 h-96 bg-blue-300 rounded-full opacity-10 blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
        </div>

        <div class="relative z-10 text-center px-8">
          <div class="mb-8">
            <h1 class="text-6xl font-black text-white">
              <span class="animate-slideInLeft inline-block">Licit</span>
              <span class="animate-slideInRight inline-block text-black" style="animation-delay: 0.3s;">Match</span>
            </h1>
            <div class="w-24 h-1 bg-black mx-auto mt-4 animate-widthExpand"></div>
          </div>

          <h2 class="text-3xl font-bold text-white mb-4 animate-fadeInUp" style="animation-delay: 0.5s;">
            Bem-vindo ao Sistema
          </h2>
          <p class="text-blue-100 text-lg mb-8 animate-fadeInUp" style="animation-delay: 0.7s;">
            Junte-se a milhares de fornecedores e órgãos públicos que já utilizam nossa plataforma
          </p>

          <div class="space-y-4 text-left max-w-sm mx-auto animate-fadeInUp" style="animation-delay: 0.9s;">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <i class="pi pi-check text-green-400 text-lg"></i>
              </div>
              <span class="text-white">Processos 100% digitais</span>
            </div>
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <i class="pi pi-shield text-green-400 text-lg"></i>
              </div>
              <span class="text-white">Segurança e conformidade garantidas</span>
            </div>
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <i class="pi pi-chart-line text-green-400 text-lg"></i>
              </div>
              <span class="text-white">Acompanhamento em tempo real</span>
            </div>
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <i class="pi pi-users text-green-400 text-lg"></i>
              </div>
              <span class="text-white">Suporte especializado</span>
            </div>
          </div>

          <div class="mt-12 animate-fadeInUp" style="animation-delay: 1.1s;">
            <p class="text-blue-100">Já possui uma conta?</p>
            <NuxtLink to="/public/auth/login" class="text-white font-bold text-lg hover:text-green-400 transition-colors inline-flex items-center mt-2">
              Fazer Login
              <i class="pi pi-arrow-right ml-2"></i>
            </NuxtLink>
          </div>
        </div>

        <div class="absolute bottom-0 left-0 right-0">
          <svg class="w-full h-24 text-blue-800 opacity-30" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
          </svg>
        </div>
      </div>

      <div class="w-full lg:w-1/2 p-6 md:p-10 bg-gray-50">
        <div class="max-w-md mx-auto">
          <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl mb-4 shadow-lg">
              <i class="pi pi-user-plus text-white text-2xl"></i>
            </div>
            <h2 class="text-3xl font-bold text-gray-800">Criar Conta</h2>
            <p class="text-gray-600 mt-2">Preencha os dados para se cadastrar</p>
          </div>

          <div class="mb-6">
            <ProgressBar :value="progressValue" :showValue="false" class="h-2" pt:value:class="bg-blue-600" />
            <p class="text-xs text-gray-500 mt-1 text-center">{{ completedFields }} de 5 campos preenchidos</p>
          </div>

          <form @submit.prevent="handleRegister" class="space-y-5">
            <div class="field">
              <label for="nomePessoa" class="block text-sm font-semibold text-gray-700 mb-2">
                Nome Completo <span class="text-red-500">*</span>
              </label>
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon bg-white">
                  <i class="pi pi-user text-gray-400"></i>
                </span>
                <InputText 
                  id="nomePessoa"
                  v-model="formData.nomePessoa"
                  placeholder="Digite seu nome completo"
                  :class="{'p-invalid': errors.nomePessoa && touched.nomePessoa}"
                  @blur="touched.nomePessoa = true; validateField('nomePessoa')"
                  @input="validateField('nomePessoa')"
                />
              </div>
              <small v-if="errors.nomePessoa && touched.nomePessoa" class="text-red-500 text-xs mt-1 block">
                {{ errors.nomePessoa }}
              </small>
            </div>

            <div class="field">
              <label for="cpf" class="block text-sm font-semibold text-gray-700 mb-2">
                CPF <span class="text-red-500">*</span>
              </label>
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon bg-white">
                  <i class="pi pi-id-card text-gray-400"></i>
                </span>
                <InputMask
                  id="cpf"
                  v-model="formData.cpf"
                  mask="999.999.999-99"
                  placeholder="000.000.000-00"
                  :class="{'p-invalid': errors.cpf && touched.cpf}"
                  @blur="touched.cpf = true; validateField('cpf')"
                  @complete="validateField('cpf')"
                />
              </div>
              <small v-if="errors.cpf && touched.cpf" class="text-red-500 text-xs mt-1 block">
                {{ errors.cpf }}
              </small>
            </div>

            <div class="field">
              <label for="dataNascimento" class="block text-sm font-semibold text-gray-700 mb-2">
                Data de Nascimento <span class="text-red-500">*</span>
              </label>
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon bg-white">
                  <i class="pi pi-calendar text-gray-400"></i>
                </span>
                <Calendar
                  id="dataNascimento"
                  v-model="formData.dataNascimento"
                  dateFormat="dd/mm/yy"
                  placeholder="DD/MM/AAAA"
                  :maxDate="maxDate"
                  :showIcon="false"
                  :class="{'p-invalid': errors.dataNascimento && touched.dataNascimento}"
                  @blur="touched.dataNascimento = true; validateField('dataNascimento')"
                  @date-select="validateField('dataNascimento')"
                />
              </div>
              <small v-if="errors.dataNascimento && touched.dataNascimento" class="text-red-500 text-xs mt-1 block">
                {{ errors.dataNascimento }}
              </small>
            </div>

            <div class="field">
              <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
                E-mail <span class="text-red-500">*</span>
              </label>
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon bg-white">
                  <i class="pi pi-envelope text-gray-400"></i>
                </span>
                <InputText 
                  id="email"
                  v-model="formData.email"
                  type="email"
                  placeholder="seu@email.com"
                  :class="{'p-invalid': errors.email && touched.email}"
                  @blur="touched.email = true; validateField('email')"
                  @input="validateField('email')"
                />
              </div>
              <small v-if="errors.email && touched.email" class="text-red-500 text-xs mt-1 block">
                {{ errors.email }}
              </small>
            </div>

            <div class="field">
              <label for="senha" class="block text-sm font-semibold text-gray-700 mb-2">
                Senha <span class="text-red-500">*</span>
              </label>
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon bg-white">
                  <i class="pi pi-lock text-gray-400"></i>
                </span>
                <Password 
                  id="senha"
                  v-model="formData.senha"
                  placeholder="Mínimo 8 caracteres"
                  toggleMask
                  :class="{'p-invalid': errors.senha && touched.senha}"
                  @blur="touched.senha = true; validateField('senha')"
                  @input="validateField('senha')"
                  :inputClass="'w-full'"
                >
                  <template #header>
                    <h6>Escolha uma senha</h6>
                  </template>
                  <template #footer>
                    <Divider />
                    <p class="mt-2">Sugestões:</p>
                    <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                      <li>Ao menos uma letra minúscula</li>
                      <li>Ao menos uma letra maiúscula</li>
                      <li>Ao menos um número</li>
                      <li>Mínimo de 8 caracteres</li>
                    </ul>
                  </template>
                </Password>
              </div>
              <small v-if="errors.senha && touched.senha" class="text-red-500 text-xs mt-1 block">
                {{ errors.senha }}
              </small>
            </div>

            <div class="field">
              <label for="confirmarSenha" class="block text-sm font-semibold text-gray-700 mb-2">
                Confirmar Senha <span class="text-red-500">*</span>
              </label>
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon bg-white">
                  <i class="pi pi-lock text-gray-400"></i>
                </span>
                <Password 
                  id="confirmarSenha"
                  v-model="formData.confirmarSenha"
                  placeholder="Repita a senha"
                  :feedback="false"
                  toggleMask
                  :class="{'p-invalid': errors.confirmarSenha && touched.confirmarSenha}"
                  @blur="touched.confirmarSenha = true; validateField('confirmarSenha')"
                  @input="validateField('confirmarSenha')"
                  :inputClass="'w-full'"
                />
              </div>
              <small v-if="errors.confirmarSenha && touched.confirmarSenha" class="text-red-500 text-xs mt-1 block">
                {{ errors.confirmarSenha }}
              </small>
            </div>

            <div class="field-checkbox">
              <Checkbox 
                id="termos"
                v-model="formData.aceitaTermos"
                :binary="true"
                @change="validateField('aceitaTermos')"
              />
              <label for="termos" class="ml-2 text-sm text-gray-700">
                Li e aceito os 
                <a href="#" class="text-blue-600 hover:underline">Termos de Uso</a> 
                e a 
                <a href="#" class="text-blue-600 hover:underline">Política de Privacidade</a>
              </label>
            </div>
            <small v-if="errors.aceitaTermos" class="text-red-500 text-xs mt-1 block">
              {{ errors.aceitaTermos }}
            </small>

            <div class="flex gap-3 mt-6">
              <Button 
                type="button"
                label="Voltar"
                severity="secondary"
                class="flex-1"
                @click="navigateTo('/public/auth/login')"
                :disabled="loading"
              />
              <Button 
                type="submit"
                label="Cadastrar"
                class="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                :loading="loading"
                :disabled="!isFormValid || loading"
              />
            </div>
          </form>

          <div class="text-center mt-6 lg:hidden">
            <p class="text-sm text-gray-600">
              Já possui uma conta? 
              <NuxtLink to="/public/auth/login" class="text-blue-600 hover:text-blue-800 font-semibold">
                Fazer Login
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </div>

    <Toast position="top-right" />

    <Dialog 
      v-model:visible="showSuccessDialog" 
      modal 
      :header="'Cadastro Realizado!'"
      :style="{ width: '450px' }"
      :closable="false"
    >
      <div class="text-center py-4">
        <i class="pi pi-check-circle text-green-500 text-6xl mb-4"></i>
        <p class="text-lg mb-2">Sua conta foi criada com sucesso!</p>
        <p class="text-gray-600">Você será redirecionado para a tela de login.</p>
      </div>
      <template #footer>
        <Button 
          label="Ir para Login" 
          icon="pi pi-sign-in" 
          @click="navigateTo('/public/auth/login')"
          class="w-full"
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const authStore = userStore()

const formData = ref({
  nomePessoa: '',
  cpf: '',
  dataNascimento: null,
  email: '',
  senha: '',
  confirmarSenha: '',
  aceitaTermos: false
})

const errors = ref({
  nomePessoa: '',
  cpf: '',
  dataNascimento: '',
  email: '',
  senha: '',
  confirmarSenha: '',
  aceitaTermos: ''
})

const touched = ref({
  nomePessoa: false,
  cpf: false,
  dataNascimento: false,
  email: false,
  senha: false,
  confirmarSenha: false,
  aceitaTermos: false
})

const loading = ref(false)
const showSuccessDialog = ref(false)

const maxDate = computed(() => {
  const date = new Date()
  date.setFullYear(date.getFullYear() - 18)
  return date
})

const completedFields = computed(() => {
  let count = 0
  if (formData.value.nomePessoa && !errors.value.nomePessoa) count++
  if (formData.value.cpf && !errors.value.cpf) count++
  if (formData.value.dataNascimento && !errors.value.dataNascimento) count++
  if (formData.value.email && !errors.value.email) count++
  if (formData.value.senha && !errors.value.senha) count++
  return count
})

const progressValue = computed(() => (completedFields.value / 5) * 100)

const validateField = (field) => {
  switch (field) {
    case 'nomePessoa':
      if (!formData.value.nomePessoa) {
        errors.value.nomePessoa = 'Nome completo é obrigatório'
      } else if (formData.value.nomePessoa.length < 3) {
        errors.value.nomePessoa = 'Nome deve ter no mínimo 3 caracteres'
      } else if (!formData.value.nomePessoa.includes(' ')) {
        errors.value.nomePessoa = 'Digite o nome completo'
      } else {
        errors.value.nomePessoa = ''
      }
      break

    case 'cpf':
      const cpfClean = formData.value.cpf.replace(/\D/g, '')
      if (!cpfClean) {
        errors.value.cpf = 'CPF é obrigatório'
      } else if (!validarCPF(cpfClean)) {
        errors.value.cpf = 'CPF inválido'
      } else {
        errors.value.cpf = ''
      }
      break

    case 'dataNascimento':
      if (!formData.value.dataNascimento) {
        errors.value.dataNascimento = 'Data de nascimento é obrigatória'
      } else {
        const idade = calcularIdade(formData.value.dataNascimento)
        if (idade < 18) {
          errors.value.dataNascimento = 'Você deve ter pelo menos 18 anos'
        } else if (idade > 120) {
          errors.value.dataNascimento = 'Data de nascimento inválida'
        } else {
          errors.value.dataNascimento = ''
        }
      }
      break

    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!formData.value.email) {
        errors.value.email = 'E-mail é obrigatório'
      } else if (!emailRegex.test(formData.value.email)) {
        errors.value.email = 'E-mail inválido'
      } else {
        errors.value.email = ''
      }
      break

    case 'senha':
      if (!formData.value.senha) {
        errors.value.senha = 'Senha é obrigatória'
      } else if (formData.value.senha.length < 8) {
        errors.value.senha = 'Senha deve ter no mínimo 8 caracteres'
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.value.senha)) {
        errors.value.senha = 'Senha deve conter maiúsculas, minúsculas e números'
      } else {
        errors.value.senha = ''
      }

      if (touched.value.confirmarSenha) {
        validateField('confirmarSenha')
      }
      break

    case 'confirmarSenha':
      if (!formData.value.confirmarSenha) {
        errors.value.confirmarSenha = 'Confirmação de senha é obrigatória'
      } else if (formData.value.senha !== formData.value.confirmarSenha) {
        errors.value.confirmarSenha = 'As senhas não coincidem'
      } else {
        errors.value.confirmarSenha = ''
      }
      break

    case 'aceitaTermos':
      if (!formData.value.aceitaTermos) {
        errors.value.aceitaTermos = 'Você deve aceitar os termos'
      } else {
        errors.value.aceitaTermos = ''
      }
      break
  }
}

const validarCPF = (cpf) => {
  if (cpf.length !== 11) return false
  
  const invalidCPFs = [
    '00000000000', '11111111111', '22222222222', '33333333333',
    '44444444444', '55555555555', '66666666666', '77777777777',
    '88888888888', '99999999999'
  ]
  if (invalidCPFs.includes(cpf)) return false
  
  let soma = 0
  let resto
  
  for (let i = 1; i <= 9; i++) {
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
  }
  
  resto = (soma * 10) % 11
  if (resto === 10 || resto === 11) resto = 0
  if (resto !== parseInt(cpf.substring(9, 10))) return false
  
  soma = 0
  for (let i = 1; i <= 10; i++) {
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
  }
  
  resto = (soma * 10) % 11
  if (resto === 10 || resto === 11) resto = 0
  if (resto !== parseInt(cpf.substring(10, 11))) return false
  
  return true
}

const calcularIdade = (dataNascimento) => {
  const hoje = new Date()
  const nascimento = new Date(dataNascimento)
  let idade = hoje.getFullYear() - nascimento.getFullYear()
  const mes = hoje.getMonth() - nascimento.getMonth()
  
  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--
  }
  
  return idade
}

const isFormValid = computed(() => {
  return (
    formData.value.nomePessoa &&
    formData.value.cpf &&
    formData.value.dataNascimento &&
    formData.value.email &&
    formData.value.senha &&
    formData.value.confirmarSenha &&
    formData.value.aceitaTermos &&
    !errors.value.nomePessoa &&
    !errors.value.cpf &&
    !errors.value.dataNascimento &&
    !errors.value.email &&
    !errors.value.senha &&
    !errors.value.confirmarSenha
  )
})

const handleRegister = async () => {
  Object.keys(touched.value).forEach(key => {
    touched.value[key] = true
  })
  
  Object.keys(formData.value).forEach(field => {
    validateField(field)
  })
  
  if (!isFormValid.value) {
    toast.add({
      severity: 'error',
      summary: 'Erro de validação',
      detail: 'Por favor, corrija os campos destacados',
      life: 3000
    })
    return
  }
  
  loading.value = true
  
  try {
    const newUser = {
      nomePessoa: formData.value.nomePessoa,
      cpf: formData.value.cpf.replace(/\D/g, ''),
      dataNascimento: formData.value.dataNascimento,
      email: formData.value.email,
      senha: formData.value.senha
    }
    
    const { data, error } = await $fetch('/api/licitmatch/user-sign-up', {
      method: 'POST',
      body: newUser
    })
    
    if (error) {
      throw new Error(error.message || 'Erro ao cadastrar usuário')
    }
    
    showSuccessDialog.value = true
    
    resetForm()
    
  } catch (error) {
    console.error('Erro no cadastro:', error._data)
    
    if (error.statusCode === 400) {
      toast.add({
        severity: 'error',
        summary: 'Erro no cadastro',
        detail: 'CPF ou e-mail já cadastrado',
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
        summary: 'Erro no cadastro',
        detail: 'Ocorreu um erro ao processar seu cadastro. Tente novamente.',
        life: 5000
      })
    }
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  formData.value = {
    nomePessoa: '',
    cpf: '',
    dataNascimento: null,
    email: '',
    senha: '',
    confirmarSenha: '',
    aceitaTermos: false
  }
  
  Object.keys(errors.value).forEach(key => {
    errors.value[key] = ''
  })
  
  Object.keys(touched.value).forEach(key => {
    touched.value[key] = false
  })
}

onMounted(() => {

})
</script>

<style scoped>
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
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

@keyframes widthExpand {
  from {
    width: 0;
  }
  to {
    width: 6rem;
  }
}

.animate-slideInLeft {
  animation: slideInLeft 0.6s ease-out forwards;
}

.animate-slideInRight {
  animation: slideInRight 0.6s ease-out forwards;
  opacity: 0;
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

.animate-widthExpand {
  animation: widthExpand 0.8s ease-out forwards;
  animation-delay: 0.6s;
}

::v-deep(.p-inputtext) {
  @apply border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-r-lg py-2.5 px-3 transition-all duration-200;
}

::v-deep(.p-inputgroup-addon) {
  @apply border-gray-300 rounded-l-lg m-auto mr-2 bg-none;
}

::v-deep(.p-inputgroup-addon:first-child) {
  @apply border-r-0;
}

::v-deep(.p-inputtext:hover) {
  @apply border-gray-400;
}

</style>