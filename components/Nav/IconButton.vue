<script setup lang="ts">
const props = defineProps<{
  size: string;
  icon: any;
  disabled?: boolean;
  expanded?: boolean;
}>();

const size = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-12 h-12 text-2xl';
    case 'md':
      return 'w-16 h-16 text-4xl';
  }
});
</script>

<template>
  <UButton :disabled="disabled" :class="[size, 'relative flex flex-col justify-center items-center rounded-full']">
    <ICustom :icon="icon" />
    <span v-if="expanded" class="absolute h-full w-full opacity-20 bg-black rounded-full" />
  </UButton>
</template>
