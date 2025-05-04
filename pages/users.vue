<template>
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-6">Users & Memberships</h1>
      
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white rounded-lg overflow-hidden">
          <thead class="bg-gray-100 text-black">
            <tr>
              <th class="py-3 px-4 text-left">User</th>
              <th class="py-3 px-4 text-left">Email</th>
              <th class="py-3 px-4 text-left">Membership</th>
              <th class="py-3 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50 text-black">
              <td class="py-4 px-4">
                <div class="flex items-center">
                  <img 
                    v-if="user.image" 
                    :src="user.image" 
                    class="w-10 h-10 rounded-full mr-3"
                  >
                  <span>{{ user.name || 'No name' }}</span>
                </div>
              </td>
              <td class="py-4 px-4">{{ user.email }}</td>
              <td class="py-4 px-4">
                <div v-for="userMembership in user.memberships" :key="userMembership.id">
                  <span class="font-medium">{{ userMembership.membership.type }}</span>
                  <span class="text-sm block text-black">${{ userMembership.membership.price }}/{{ userMembership.membership.duration }}mo</span>
                </div>
              </td>
              <td class="py-4 px-4">
                <span 
                  v-for="userMembership in user.memberships" 
                  :key="userMembership.id"
                  :class="{
                    'bg-green-100 text-green-800': new Date(userMembership.endDate) > new Date(),
                    'bg-red-100 text-red-800': new Date(userMembership.endDate) <= new Date()
                  }"
                  class="px-2 py-1 rounded-full text-xs font-medium"
                >
                  {{ new Date(userMembership.endDate) > new Date() ? 'Active' : 'Expired' }}
                  (until {{ new Date(userMembership.endDate).toLocaleDateString() }})
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const { data: users } = await useFetch('/api/users')
  </script>