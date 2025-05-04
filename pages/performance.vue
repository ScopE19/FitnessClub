<template>
    <div class="p-4 max-w-4xl mx-auto">
      <h1 class="text-2xl font-bold mb-6">Query Performance Analyzer</h1>
      
      <div class="space-y-6">
        <!-- Query Input -->
        <div class="bg-gray-50 p-4 rounded-lg text-black">
          <textarea 
            v-model="query" 
            placeholder="Enter your SQL query (without EXPLAIN ANALYZE)"
            class="w-full p-2 border rounded mb-2 font-mono text-sm h-24"
          ></textarea>
          <button 
            @click="analyzeQuery" 
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            :disabled="loading"
          >
            {{ loading ? 'Analyzing...' : 'Analyze Query' }}
          </button>
        </div>
  
        <!-- Results -->
        <div v-if="results" class="bg-white text-black border rounded-lg overflow-hidden">
          <div class="p-4 bg-gray-100 border-b text-black">
            <h2 class="font-bold">Analysis Results</h2>
            <p class="text-sm text-gray-600 mt-1">{{ results.query }}</p>
          </div>
          
          <pre class="p-4 overflow-x-auto text-sm bg-gray-50">{{ results.analysis }}</pre>
        </div>
  
        <!-- Sample Queries -->
        <div class="mt-8">
          <h3 class="font-bold mb-2">Sample Queries:</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
            <button
              v-for="(sample, i) in sampleQueries"
              :key="i"
              @click="query = sample.query"
              class="p-3 bg-gray-100 rounded-lg text-left hover:bg-gray-200 text-sm"
            >
              <div class="font-medium">{{ sample.name }}</div>
              <div class="text-gray-600 mt-1 font-mono truncate">{{ sample.query }}</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const query = ref('SELECT * FROM "Membership" LIMIT 10')
  const results = ref(null)
  const loading = ref(false)
  
  const sampleQueries = [
    {
      name: 'All Memberships',
      query: 'SELECT * FROM "Membership" LIMIT 10'
    },
    {
      name: 'Busiest Classes',
      query: 'SELECT c.name, COUNT(a.id) FROM "Class" c JOIN "Schedule" s ON c.id = s."classId" JOIN "Attendance" a ON s.id = a."scheduleId" GROUP BY c.name ORDER BY COUNT(a.id) DESC LIMIT 5'
    },
    {
      name: 'Active Users',
      query: 'SELECT u.name, COUNT(a.id) FROM "User" u JOIN "Attendance" a ON u.id = a."userId" WHERE a."attendedOn" > NOW() - INTERVAL \'30 days\' GROUP BY u.name ORDER BY COUNT(a.id) DESC LIMIT 10'
    },
    {
      name: 'Trainer Workload',
      query: 'SELECT t.name, COUNT(c.id) FROM "Trainer" t JOIN "Class" c ON t.id = c."trainerId" GROUP BY t.name ORDER BY COUNT(c.id) DESC'
    }
  ]
  
  async function analyzeQuery() {
    if (!query.value) return
    
    loading.value = true
    try {
      results.value = await $fetch('/api/analyze', {
        method: 'POST',
        body: { query: query.value }
      })
    } catch (error) {
      console.error('Analysis failed:', error)
      alert('Analysis failed. Check console for details.')
    } finally {
      loading.value = false
    }
  }
  </script>