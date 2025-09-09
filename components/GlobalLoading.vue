<script setup lang="ts">

</script>

<template>
  <Transition name="fade">
    <div class="loading-overlay">
      <div class="loading-content">
        <ProgressSpinner 
          strokeWidth="6" 
          :pt="{
            spinner: { class: '!w-12 !h-12' },
            circle: { class: 'text-blue-500' }
          }"
        />
        <span class="loading-text">Carregando...</span>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999; 
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.loading-text {
  font-size: 1rem;
  font-weight: 500;
  color: #1e40af;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>