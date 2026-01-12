<template>
  <div 
    @click="$emit('click')"
    class="flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors border-b border-white/5 relative group"
    :class="isActive ? 'bg-brand-500/10 border-l-2 border-l-brand-500' : 'hover:bg-white/5 border-l-2 border-l-transparent'"
  >
    <div class="relative">
      <img :src="conversation.contactAvatar" class="w-10 h-10 rounded-full object-cover" />
      <div class="absolute -bottom-1 -right-1 bg-dark-surface rounded-full p-0.5">
        <v-icon :icon="platformIcon" size="x-small" :color="platformColor" />
      </div>
    </div>

    <div class="flex-1 min-w-0"> <div class="flex justify-between items-start">
        <h4 class="font-medium text-sm text-gray-200 truncate">{{ conversation.contactName }}</h4>
        <span class="text-xs text-gray-500">{{ timeAgo }}</span>
      </div>
      <p class="text-xs text-gray-400 truncate mt-0.5" :class="{'font-bold text-white': conversation.unreadCount > 0}">
        {{ conversation.lastMessage }}
      </p>
    </div>

    <div v-if="conversation.unreadCount > 0" class="absolute right-3 top-8 bg-brand-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
      {{ conversation.unreadCount }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Conversation } from '@/types/chat';

const props = defineProps<{
  conversation: Conversation;
  isActive: boolean;
}>();

const platformIcon = computed(() => {
  switch (props.conversation.platform) {
    case 'whatsapp': return 'mdi-whatsapp';
    case 'email': return 'mdi-email-outline';
    default: return 'mdi-message-outline';
  }
});

const platformColor = computed(() => {
  switch (props.conversation.platform) {
    case 'whatsapp': return 'green';
    case 'email': return 'orange';
    default: return 'blue';
  }
});

const timeAgo = computed(() => {
  const date = new Date(props.conversation.lastMessageAt);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
});
</script>