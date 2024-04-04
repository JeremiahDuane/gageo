<script setup>
useHead({
  title: 'Gageo',
  meta: [
    {
      name: 'Gageo',
      content: 'Gageo',
    },
  ],
  link: [{ rel: 'icon', type: 'image/png', href: '/favicon.ico' }],
});
</script>
<template>
  <VitePwaManifest />
  <NuxtPage />
</template>
