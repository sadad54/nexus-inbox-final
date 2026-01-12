<template>
  <div class="h-full flex overflow-hidden bg-dark-surface rounded-xl border border-gray-700 shadow-2xl">
    
    <div class="w-80 border-r border-gray-700 flex flex-col bg-dark-bg/50 backdrop-blur">
      <div class="p-4 border-b border-gray-700">
        <v-text-field
          density="compact"
          variant="outlined"
          placeholder="Search messages..."
          prepend-inner-icon="mdi-magnify"
          hide-details
          class="rounded-lg"
          theme="dark"
        ></v-text-field>
      </div>
      
      <div class="flex-1 overflow-y-auto p-2 space-y-1">
        <ChatListItem 
          v-for="chat in store.sortedConversations" 
          :key="chat.id"
          :conversation="chat"
          :isActive="store.activeConversationId === chat.id"
          @click="store.selectConversation(chat.id)"
        />
      </div>
    </div>

    <div class="flex-1 flex flex-col relative bg-[#0B1120]">
      
      <div v-if="!store.activeConversation" class="flex-1 flex flex-col items-center justify-center text-gray-500">
        <v-icon icon="mdi-chat-processing-outline" size="64" class="mb-4 opacity-50" />
        <p>Select a conversation to start messaging</p>
      </div>

      <template v-else>
        <div class="h-16 border-b border-gray-700 flex items-center px-6 justify-between bg-dark-surface/80 backdrop-blur">
          <div class="flex items-center gap-3">
            <img :src="store.activeConversation.contactAvatar" class="w-8 h-8 rounded-full" />
            <div>
              <h3 class="font-medium text-white">{{ store.activeConversation.contactName }}</h3>
              <div class="flex items-center gap-1 text-xs text-gray-400">
                <v-icon icon="mdi-whatsapp" size="x-small" color="green" />
                <span>via WhatsApp</span>
              </div>
            </div>
          </div>
          <div class="flex gap-2">
            <v-btn icon="mdi-phone" variant="text" size="small" color="grey"></v-btn>
            <v-btn icon="mdi-dots-vertical" variant="text" size="small" color="grey"></v-btn>
          </div>
        </div>

        <div class="flex-1 overflow-y-auto p-6 space-y-4" ref="messagesContainer">
          <div 
            v-for="msg in store.activeConversation.messages" 
            :key="msg.id" 
            class="flex flex-col max-w-[70%]"
            :class="msg.senderId === 'me' ? 'self-end items-end' : 'self-start items-start'"
          >
            <div 
              class="px-4 py-2 rounded-2xl text-sm"
              :class="msg.senderId === 'me' 
                ? 'bg-brand-600 text-white rounded-tr-none' 
                : 'bg-gray-700 text-gray-100 rounded-tl-none'"
            >
              {{ msg.content }}
            </div>
            <span class="text-[10px] text-gray-500 mt-1 px-1">
              {{ new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}
            </span>
          </div>
        </div>

        <div class="p-4 bg-dark-surface border-t border-gray-700">
          <div class="flex items-end gap-2 bg-dark-bg p-2 rounded-xl border border-gray-600 focus-within:border-brand-500 transition-colors">
            <v-btn icon="mdi-paperclip" size="small" variant="text" color="grey"></v-btn>
            <textarea 
              v-model="newMessage"
              @keydown.enter.prevent="handleSend"
              placeholder="Type a message..."
              class="flex-1 bg-transparent text-white text-sm outline-none resize-none max-h-32 py-2"
              rows="1"
            ></textarea>
            
            <v-btn 
              icon="mdi-magic-staff" 
              size="small" 
              variant="text" 
              class="text-purple-400 hover:bg-purple-400/10"
              title="AI Magic Draft"
            ></v-btn>
            
            <v-btn 
              @click="handleSend" 
              icon="mdi-send" 
              size="small" 
              color="brand-500" 
              class="text-white"
            ></v-btn>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch } from 'vue';
import { useChatStore } from '@/stores/chatStore'
import ChatListItem from '@/components/chat/ChatListItem.vue';

const store = useChatStore();
const newMessage = ref('');
const messagesContainer = ref<HTMLElement | null>(null);

function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
}

// Scroll to bottom when messages change or chat opens
watch(
  () => store.activeConversation?.messages.length, 
  () => scrollToBottom()
);
watch(
  () => store.activeConversationId,
  () => scrollToBottom()
);

function handleSend() {
  if (!newMessage.value.trim()) return;
  store.sendMessage(newMessage.value);
  newMessage.value = '';
}
</script>