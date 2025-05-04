<template>
    <h1>This is main page</h1>
    
</template>

<script setup lang = 'ts'>
definePageMeta({
  auth: {
    unauthenticatedOnly: false,
    navigateAuthenticatedTo: '/protected',
  },
})



</script>