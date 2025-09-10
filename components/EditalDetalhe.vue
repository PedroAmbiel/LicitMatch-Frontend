<script setup lang="ts">

defineProps<{
  edital: any
}>();

const emit = defineEmits<{
  (e: 'toggle-favorito', id: number): void
  (e: 'close'): void
}>();

function getStatusSeverity(status: string) {
  switch (status.toLowerCase()) {
    case 'recebendo proposta': return 'info';
    case 'aberto': return 'success';
    case 'em andamento': return 'warning';
    case 'finalizado': return 'danger';
    default: return 'secondary';
  }
}

</script>

<template>
  <div v-if="edital" class="h-full flex flex-col text-gray-700 p-2 relative">
    
    <header class="p-4 border-b border-gray-200">
      <div class="flex justify-between items-start">
        <div class="flex items-center gap-4">
          <i class="pi pi-file-edit text-blue-600 text-3xl"></i>
          <div>
            <p class="text-sm">Modo de disputa: <span class="font-semibold text-gray-800">{{ edital.orgao }}</span></p>
            <p class="text-sm">Situação: <span class="font-semibold text-gray-800">{{ edital.modalidade }}</span></p>
            <p class="text-sm">Status: <Tag :value="edital.status" :severity="getStatusSeverity(edital.status)" /> </p>

          </div>
        </div>
        <div class="flex items-center">
          <Button 
                :icon="edital.isFavorito ? 'pi pi-star-fill' : 'pi pi-star'" 
                text 
                rounded
                aria-label="Favoritar"
                class="text-[#4081e9]
                hover:!text-[#4081e9] hover:!bg-[#93b9f527]"
                @click="emit('toggle-favorito', edital.id)"
              />
          <Button icon="pi pi-times" text rounded severity="secondary" @click="$emit('close')" />
        </div>
      </div>
      <div class="mt-4 flex justify-between text-sm">
        <p>Início Propostas: <span class="font-bold">{{ edital.data }}</span></p>
        <p>Fim Propostas: <span class="font-bold">{{ edital.fimPropostas }}</span></p>
      </div>
    </header>

    <div class="flex-grow p-4 overflow-y-auto">
      <div class="flex items-center gap-3 mb-6">
        <i class="pi pi-book text-xl text-blue-600"></i>
        <div>
          <h3 class="font-bold text-lg">Edital</h3>
          <a :href="edital.link" target="_blank" class="text-blue-500 hover:underline text-sm">LINK</a>
        </div>
      </div>

      <div>
        <h3 class="font-bold text-lg mb-4">Requisitos</h3>
        <ul class="space-y-4">
          <li v-for="(req, index) in edital.requisitos" :key="index" class="flex items-start gap-3">
            <Checkbox :model-value="req.checked" binary class="mt-1" />
            <label class="text-sm text-gray-600">{{ req.texto }}</label>
          </li>
        </ul>
      </div>
    </div>

    <footer class="p-4 mt-auto border-t border-gray-200">
      <Button label="Efetuar Inscrição" class="w-full !bg-blue-700 !hover:bg-blue-800 !border-none" />
    </footer>

  </div>
</template>