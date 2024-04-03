<template>
  <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
    <template #header>
      <slot name="header"></slot>
    </template>
    <slot name="content"></slot>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </UCard>
</template>
