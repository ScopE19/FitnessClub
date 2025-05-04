<template>
    
    <div class = 'flex flex-col p-4'>
        <Loginus />
        <button class = 'rounded-xl bg-blue-700 min-w-[250px] h-[60px] text-black font-bold 
        flex flex-row items-center justify-center hover:text-yellow-500' @click = "signIn('github', {callbackUrl: '/', prompt: 'select_account', allow_signup: true})">
        <img src = "assets/images/git.png" class=" mr-2 bg-transparent w-10 h-10">SignIn with GitHUB</button>
    </div>
</template>

<script setup lang = 'ts'>
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  },
})


const {signIn} = useAuth()

</script>