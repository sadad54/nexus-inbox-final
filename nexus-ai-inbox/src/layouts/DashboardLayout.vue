<template>
  <div class="h-screen w-screen bg-dark-bg text-white overflow-hidden flex">
    <aside class="w-[280px] bg-dark-surface border-r border-gray-700 flex flex-col">
      <div class="p-6 font-bold text-2xl tracking-tighter text-brand-500 flex items-center gap-2">
        <v-icon icon="mdi-robot" /> Nexus
      </div>
      
      <nav class="flex-1 px-4 space-y-2 mt-4">
        <div v-for="item in navItems" :key="item.text" 
             class="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-white/5 transition-all text-gray-400 hover:text-white">
          <v-icon :icon="item.icon" size="small" />
          <span class="font-medium text-sm">{{ item.text }}</span>
        </div>
      </nav>

      <div class="p-4 border-t border-gray-700">
        <div class="flex items-center gap-3">
          <div class="h-8 w-8 rounded-full bg-brand-500 flex items-center justify-center font-bold">JD</div>
          <div class="text-sm">
            <p class="text-white font-medium">John Doe</p>
            <p class="text-gray-500 text-xs">Admin</p>
          </div>
        </div>
      </div>
    </aside>

    <main class="flex-1 flex flex-col relative">
      <header class="h-16 border-b border-gray-700 flex items-center justify-between px-6 bg-dark-bg/50 backdrop-blur-md sticky top-0 z-10">
        <h2 class="font-semibold text-lg">Inbox</h2>
        <div class="flex gap-4">
          <v-btn icon="mdi-bell" variant="text" size="small" color="grey"></v-btn>
          <v-btn icon="mdi-cog" variant="text" size="small" color="grey"></v-btn>
        </div>
      </header>

      <div class="flex-1 overflow-auto p-6">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const navItems = ref([
  { text: 'Inbox', icon: 'mdi-inbox' },
  { text: 'Automations', icon: 'mdi-flash' },
  { text: 'Analytics', icon: 'mdi-chart-bar' },
  { text: 'Contacts', icon: 'mdi-account-group' },
])
</script>