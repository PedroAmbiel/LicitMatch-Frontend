<script setup lang="ts">
defineProps<{
  licitacao: {
    orgao: string;
    modalidade: string;
    status: string;
    data: string;
  }
}>();
</script>

<template>
  <div class="bg-white rounded-lg p-5 border border-transparent hover:border-blue-500 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer hover:-translate-y-1">
    <h4 class="font-bold text-blue-800 text-base mb-4">{{ licitacao.orgao }}</h4>
    
    <div class="space-y-3 text-sm text-gray-600">
      <div class="flex items-center gap-2">
        <i class="pi pi-tag text-gray-400"></i>
        <span>{{ licitacao.modalidade }}</span>
      </div>
      <div class="flex items-center gap-2">
        <i class="pi pi-info-circle text-gray-400"></i>
        <span>{{ licitacao.status }}</span>
      </div>
      <div class="flex items-center gap-2">
        <i class="pi pi-calendar text-gray-400"></i>
        <span>{{ licitacao.data }}</span>
      </div>
    </div>
  </div>
</template>