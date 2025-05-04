<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold">Hello, Dear {{ data.user.name }}</h1>
      <h1 class="text-xl mb-4">There are your Products</h1>
  
      <!-- Форма создания продукта -->
      <form @submit.prevent="createProduct" class="space-y-4 mb-8">
        <input v-model="title" type="text" placeholder="Product Title" class="border p-2 w-full text-black" />
        <input v-model.number="price" type="number" placeholder="Price" class="border p-2 w-full text-black" />
        <textarea v-model="description" placeholder="Description" class="border p-2 w-full text-black"></textarea>
        <button type="submit" class="bg-blue-600 text-white p-2 rounded">
          Create Product
        </button>
      </form>
  
      <!-- Список продуктов -->
      <div v-if="products.length" class="space-y-4">
        <div
          v-for="product in products"
          :key="product.id"
          class="border p-4 rounded shadow-sm"
        >
          <h2 class="text-xl font-semibold">{{ product.title }}</h2>
          <p class="text-gray-600">{{ product.description }}</p>
          <p class="text-green-600 font-bold">{{ product.price }} $</p>
        </div>
      </div>
      <div v-else>
        <p>No products yet. Create one!</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  
  const { data } = useAuth()
  definePageMeta({ middleware: 'sidebase-auth' })
  
  const title = ref('')
  const price = ref<number | null>(null)
  const description = ref('')
  const products = ref<any[]>([])
  
  const fetchProducts = async () => {
    try {
      const res = await $fetch('/api/product', {
        credentials: 'include'  // ОБЯЗАТЕЛЬНО
      })
      products.value = res.products || []
    } catch (error) {
      console.error('Failed to fetch products:', error)
    }
  }
  
  const createProduct = async () => {
    if (!title.value || price.value === null) {
      alert('Fill in both title and price!')
      return
    }
  
    try {
      const res = await $fetch('/api/product', {
        method: 'POST',
        credentials: 'include',  // ← ДОБАВИЛ ВОТ ЭТО!!
        body: {
          title: title.value,
          price: price.value,
          description: description.value,
        },
      })
  
      products.value.unshift(res.product)
      title.value = ''
      price.value = null
      description.value = ''
    } catch (error) {
      console.error('Failed to create product:', error)
    }
  }
  
  onMounted(() => {
    fetchProducts()
  })
  </script>
  