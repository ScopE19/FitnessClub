<template>
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-6">Our Trainers</h1>
      
      <div v-for="trainer in trainers" :key="trainer.id" class="mb-6 p-4 border rounded-lg">
        <div class="flex items-start gap-4">
          <img 
            v-if="trainer.imageUrl" 
            :src="trainer.imageUrl" 
            class="w-20 h-20 object-cover rounded-full border-2 border-gray-200"
          >
          <div>
            <h2 class="text-xl font-bold">{{ trainer.name }}</h2>
            <p class="text-gray-600 mb-2">{{ trainer.bio }}</p>
            <div class="bg-blue-50 p-2 rounded text-black">
              <h3 class="font-semibold">Classes:</h3>
              <ul v-if="trainer.classes.length">
                <li v-for="cls in trainer.classes" :key="cls.id" class="ml-4 text-black list-disc">
                  {{ cls.name }}
                </li>
              </ul>
              <p v-else class="text-gray-500">No classes assigned</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const { data: trainers } = await useFetch('/api/trainers', {
  params: { include: 'classes' }
})
  </script>