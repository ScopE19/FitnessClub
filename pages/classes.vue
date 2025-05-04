<template>
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-6">Fitness Classes</h1>
      
      <div class="grid md:grid-cols-2 gap-4">
        <div 
          v-for="cls in classes" 
          :key="cls.id" 
          class="border rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <h2 class="text-xl font-bold mb-2">{{ cls.name }}</h2>
          <div class="flex items-center gap-2 mb-3">
            <img 
              v-if="cls.trainer.imageUrl" 
              :src="cls.trainer.imageUrl" 
              class="w-8 h-8 rounded-full"
            >
            <span>Trainer: {{ cls.trainer.name }}</span>
          </div>
          
          <div class="bg-gray-50 p-3 rounded text-black">
            <h3 class="font-semibold mb-1">Upcoming Sessions:</h3>
            <div 
              v-for="schedule in cls.schedules.slice(0, 2)" 
              :key="schedule.id"
              class="text-sm mb-1"
            >
              {{ new Date(schedule.date).toLocaleDateString() }} at {{ schedule.time }}
            </div>
            <p v-if="!cls.schedules.length" class="text-gray-500 text-sm">No scheduled sessions</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const { data: classes } = await useFetch('/api/classes', {
  params: { include: 'trainer,schedules' }
})
  </script>