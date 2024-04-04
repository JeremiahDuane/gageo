<script setup lang="ts">
const props = defineProps<{
  size: string;
  icon: any;
  disabled?: boolean;
}>();

const size = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-12 h-12 text-2xl';
    case 'md':
      return 'w-16 h-16 text-4xl';
  }
});

const isOpen = ref<boolean>();
const handleOpen = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div>
    <UButton
      :disabled="disabled"
      @click="handleOpen"
      :class="[size, 'flex flex-col justify-center items-center rounded-full']"
    >
      <ICustom :icon="icon" />
    </UButton>
    <UModal v-model="isOpen" :ui="{ container: 'items-center' }"><slot></slot></UModal>
  </div>
</template>
