<template>
    <header class="flex flex-row items-center justify-between bg-blue-800 text-white text-xl">
        <div class="px-4 py-2">
            <img src="assets/images/gym.webp" class="w-16 h-16 bg-transparent">
        </div>
        
        <nav class="flex flex-row gap-2 px-2">
            <!-- Always visible main links -->
            <NuxtLink to="/" class="links">Home</NuxtLink>
            
            <!-- Dropdown for Gym Management -->
            <div class="relative group">
                <button class="links flex items-center">
                    Management
                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                </button>
                <div class="absolute hidden group-hover:block bg-blue-900 min-w-max z-10 rounded shadow-lg">
                   
                    <NuxtLink to="/users" class="block px-4 py-2 hover:bg-blue-700">Users</NuxtLink>
                    <NuxtLink to="/memberships" class="block px-4 py-2 hover:bg-blue-700">Memberships</NuxtLink>
                    <NuxtLink to="/trainers" class="block px-4 py-2 hover:bg-blue-700">Trainers</NuxtLink>
                    <NuxtLink to="/classes" class="block px-4 py-2 hover:bg-blue-700">Classes</NuxtLink>
                    <NuxtLink to="/schedules" class="block px-4 py-2 hover:bg-blue-700">Schedules</NuxtLink>
                </div>
            </div>
             <NuxtLink to="/performance" class="links">Performance</NuxtLink>
            
            <!-- Auth links -->
            <NuxtLink to="/login" class="links">LogIn</NuxtLink>
            <div class="links" @click="signOut({callbackUrl: '/login'})">LogOut</div>
            
            <img :src="data?.user?.image" v-show="log_check" class="w-14 h-14 border-2 border-black rounded-full">
        </nav>
    </header>

    <main class="min-h-screen bg-black text-white text-xl flex">
        <div class="m-auto">
            <slot />
        </div>
    </main>
</template>

<style scoped>

    .links {
        @apply p-2 rounded-md hover:bg-black hover:text-yellow-300;
    }

</style>

<script setup lang = 'ts'>


const {signOut, status} = useAuth()

const log_check = computed(()=> status.value === 'authenticated')

const { data } = useAuth()



</script>

