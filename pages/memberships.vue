<template>
    <div class="p-4 max-w-md mx-auto">
      <!-- Create Form -->
      <form @submit.prevent="create" class="mb-8 p-4 border rounded">
        <h2 class="text-xl font-bold mb-4">Add Membership</h2>
        <input v-model="form.type" placeholder="Type" required class="w-full text-black p-2 mb-2 border">
        <input v-model.number="form.price" type="number" placeholder="Price" required class="w-full text-black p-2 mb-2 border">
        <button type="submit" class="bg-blue-500 text-white p-2 rounded w-full">
          Create
        </button>
      </form>
  
      <!-- Memberships List -->
      <div v-for="m in memberships" :key="m.id" class="mb-4 p-4 border rounded">
        <div v-if="editingId !== m.id">
          <h3 class="font-bold">{{ m.type }}</h3>
          <p>${{ m.price }} | {{ m.duration }} months</p>
          <div class="flex gap-2 mt-2">
            <button @click="edit(m)" class="bg-yellow-500 text-white p-1 rounded">Edit</button>
            <button @click="remove(m.id)" class="bg-red-500 text-white p-1 rounded">Delete</button>
          </div>
        </div>
  
        <!-- Edit Form -->
        <form v-else @submit.prevent="update(m.id)" class="space-y-2">
          <input v-model="editForm.type" required class="w-full text-black p-2 border">
          <input v-model.number="editForm.price" type="number" required class="w-full p-2 text-black border">
          <div class="flex gap-2">
            <button type="submit" class="bg-green-500 text-white p-1 rounded flex-1">Save</button>
            <button @click="cancelEdit" class="bg-gray-500 text-white p-1 rounded flex-1">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const memberships = ref([])
  const editingId = ref(null)


  const { data } = useAuth()

  
  // Form for creating
  const form = ref({
    type: '',
    price: 0,
    duration: 1
  })
  
  // Form for editing
  const editForm = ref({
    type: '',
    price: 0
  })
  
  // Fetch all memberships
  async function fetchAll() {
    memberships.value = await $fetch('/api/memberships')
  }
  
  // Create new
  async function create() {
    await $fetch('/api/memberships', {
      method: 'POST',
      body: form.value
    })
    form.value = { type: '', price: 0, duration: 1 }
    fetchAll()
  }
  
  // Set up edit
  function edit(m) {
    editingId.value = m.id
    editForm.value = {
      type: m.type,
      price: m.price
    }
  }
  
  // Update
  async function update(id) {
    await $fetch(`/api/${id}`, {
      method: 'PUT',
      body: editForm.value
    })
    editingId.value = null
    fetchAll()
  }
  
  // Cancel edit
  function cancelEdit() {
    editingId.value = null
  }
  
  // Delete
  async function remove(id) {
    if (confirm('Delete this membership?')) {
      await $fetch(`/api/${id}`, {
        method: 'DELETE'
      })
      fetchAll()
    }
  }

  
  // Initial load
  onMounted(fetchAll)
  onMounted(() => {
    console.log("jopa")
    console.log(data.value)
  })
 
  </script>