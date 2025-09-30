<template>
  <div>
    <slot />
    <GlobalLoading v-if="loadingStore.isLoading" />
  </div>
</template>

<script lang="ts" setup>

  const loadingStore = useLoadingStore();

</script>

<style>

</style>