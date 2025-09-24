<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import type { PageState } from 'primevue';

const props = defineProps<{
  editais: Array<any>,
  numTotalEditais : number,
  numTotalPorPagina : number,
}>();


const emit = defineEmits<{
  (e: 'toggle-favorito', id: string): void
  (e: 'edital-selected', edital: any, isFavorito : boolean): void
  (e: 'trocar-pagina', event: PageState) : void
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
  <div class="datatable-container">
    <DataTable
      :value="editais"
      dataKey="id" 
      class="p-datatable-sm" 
      responsiveLayout="scroll"
      :show-headers="false"
      paginator
      :rows="numTotalPorPagina"
      paginator-position="top">
      <template #empty>
          <p class="p-4 text-slate-500 text-center">Nenhum edital encontrado</p>
      </template>
      
    <template #paginatorcontainer >
      <Paginator @page="emit('trocar-pagina', $event)" class="p-2" :rows="numTotalPorPagina" 
        :totalRecords="numTotalEditais" :rowsPerPageOptions="[10, 20, 30]"
        :pt = "{
          page:  ({ context }) => ({
            class: context.active ? '!bg-[#4081e9] !text-white' : 'bg-transparent text-black' + ' hover:!bg-[#78a9f8]', 
          }),
          pcRowPerPageDropdown: {
            root: 'focus:!border-none',
            option: ({ context }) => ({class: context.selected ? '!bg-[#4081e9] !text-white' : '' + 'hover:!bg-[#78a9f8]'}),
          }
        }" />
    </template>
    
    <div class="mt-4 w-full max-w-2xl mx-auto rounded-lg bg-gray-100 px-4 py-2 text-center
      text-sm sm:text-base md:text-lg font-medium text-gray-800 shadow-sm">
      Editais encontrados:
      <span class="font-semibold text-[#4081e9]">{{ numTotalEditais }}</span>
    </div>
    
      <Column>
        <template #body="slotProps">
          <div class="edital-card flex justify-between items-start p-4">
            
            <div class="flex-grow" @click="emit('edital-selected', slotProps.data, slotProps.data.isFavorito)">
              <div class="grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-2 text-sm mb-3">
                <div><strong>Órgão:</strong> <span class="text-blue-600 font-semibold">{{ slotProps.data.orgao }}</span></div>
                <div><strong>Status:</strong> <Tag :value="slotProps.data.status" :severity="getStatusSeverity(slotProps.data.status)" /></div>
                <div><strong>Modalidade:</strong> <span class="text-blue-600 font-semibold">{{ slotProps.data.modalidade }}</span></div>
                <div><strong>Data:</strong> <span class="text-blue-600 font-semibold">{{ slotProps.data.data }}</span></div>
                <div><strong>Edital:</strong> {{ slotProps.data.id }}</div>
                <div><strong>UF:</strong> {{ slotProps.data.uf }}</div>
                <div><strong>Local:</strong> {{ slotProps.data.local }}</div>
              </div>
              <p class="text-gray-600 text-sm text-justify">
                <strong>Objeto:</strong> {{ slotProps.data.objeto }}
              </p>
            </div>
            
            <div class="flex flex-col items-center gap-2 pl-4">
              <Button icon="pi pi-bookmark" text rounded severity="secondary" aria-label="Salvar" />
              <Button 
                :icon="slotProps.data.isFavorito ? 'pi pi-star-fill' : 'pi pi-star'" 
                text 
                rounded
                aria-label="Favoritar"
                class="text-[#4081e9]
                hover:!text-[#4081e9] hover:!bg-[#93b9f527]"
                @click="emit('toggle-favorito', slotProps.data.id)"
              />
            </div>

          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped>

.datatable-container {
  border-radius: 12px;
  border: 1px solid #e5e7eb; /* Borda sutil */
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05); 
  overflow: hidden;     
}

::v-deep(.p-datatable .p-datatable-tbody > tr > td) {
  padding: 0;
  border: none;
}

::v-deep(.p-datatable .p-datatable-tbody > tr) {
  background-color: transparent !important;
}

.edital-card {
  position: relative;
  background-color: #ffffff;
  border-bottom: 1px solid #f3f4f6; 
  transition: all 0.2s ease-in-out;
  overflow: hidden; 
  cursor: pointer;
}

::v-deep(.p-datatable-tbody > tr:last-child .edital-card) {
  border-bottom: none;
}

.edital-card:hover {
  background-color: #f8fafc; 
  transform: translateY(-2px); 
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.04), 0 4px 6px -4px rgb(0 0 0 / 0.04);
}

.edital-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background-color: #2563eb; 
  transform: scaleY(0); 
  transform-origin: center;
  transition: transform 0.2s ease-in-out;
}

.edital-card:hover::before {
  transform: scaleY(1); 
}

.edital-card strong {
  color: #4b5563; 
  font-weight: 500;
}

.edital-card .text-blue-600 {
  transition: color 0.2s;
}

.edital-card:hover .text-blue-600 {
  color: #1d4ed8;
}
</style>