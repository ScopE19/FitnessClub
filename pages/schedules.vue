<template>
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-6">Class Schedule</h1>
      
      <div class="space-y-4">
        <div 
          v-for="day in groupedSchedules" 
          :key="day.date" 
          class="border rounded-lg overflow-hidden"
        >
          <div class="bg-gray-100 p-3 font-bold text-black">
            {{ new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) }}
          </div>
          <div class="divide-y">
            <div 
              v-for="schedule in day.schedules" 
              :key="schedule.id" 
              class="p-4"
            >
              <div class="flex justify-between items-center">
                <div>
                  <h3 class="font-semibold">{{ schedule.class.name }}</h3>
                  <p class="text-sm text-gray-600">
                    with {{ schedule.class.trainer.name }} • {{ schedule.time }}
                  </p>
                </div>
                <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                  {{ schedule.room || 'Main Hall' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const { data: schedules } = await useFetch('/api/schedules', {
  params: { include: 'class.trainer' }
    })
  
  // Group schedules by date
  const groupedSchedules = computed(() => {
    const groups = {}
    schedules.value?.forEach(schedule => {
      const dateStr = new Date(schedule.date).toDateString()
      if (!groups[dateStr]) {
        groups[dateStr] = {
          date: schedule.date,
          schedules: []
        }
      }
      groups[dateStr].schedules.push(schedule)
    })
    return Object.values(groups)
  })
  </script>