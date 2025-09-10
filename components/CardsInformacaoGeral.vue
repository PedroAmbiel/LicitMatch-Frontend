<script setup lang="ts">

defineProps({
  value: String,
  title: String,
  colorClass: String,
});

</script>

<template>
  <div 
    class="
      bg-white 
      rounded-xl 
      p-5
      text-center 
      border 
      border-gray-100 
      shadow-lg
      transition-all 
      duration-200 
      ease-in-out 
      hover:-translate-y-1 
      hover:shadow-xl
    "
  >
    <span 
      class="block text-6xl font-extrabold leading-none" 
      :class="colorClass"
    >
      {{ value }}
    </span>
    <p class="mt-3 text-sm font-medium text-gray-500">
      {{ title }}
    </p>
  </div>
</template>