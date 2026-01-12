import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Conversation, Message, Platform } from '@/types/chat';

export const useChatStore = defineStore('chat', () => {
  
  // --- State ---
  const activeConversationId = ref<string | null>(null);
  
  const conversations = ref<Conversation[]>([
    {
      id: 'c1',
      contactId: 'u1',
      contactName: 'Alice Freeman',
      contactAvatar: 'https://i.pravatar.cc/150?u=u1',
      platform: 'whatsapp',
      unreadCount: 2,
      lastMessage: 'Is the pricing negotiable?',
      lastMessageAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 mins ago
      tags: ['Sales', 'Hot Lead'],
      messages: [
        { id: 'm1', conversationId: 'c1', senderId: 'u1', content: 'Hi, I saw your pricing page.', timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), type: 'text', status: 'read' },
        { id: 'm2', conversationId: 'c1', senderId: 'me', content: 'Hello Alice! Yes, we have tiers.', timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), type: 'text', status: 'read' },
        { id: 'm3', conversationId: 'c1', senderId: 'u1', content: 'Is the pricing negotiable?', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), type: 'text', status: 'delivered' }
      ]
    },
    {
      id: 'c2',
      contactId: 'u2',
      contactName: 'TechCorp Support',
      contactAvatar: 'https://i.pravatar.cc/150?u=u2',
      platform: 'email',
      unreadCount: 0,
      lastMessage: 'Ticket #9928 resolved.',
      lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      tags: ['Support'],
      messages: []
    }
  ]);

  const currentUser = ref({
    id: 'me',
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?u=me',
    role: 'agent'
  });

  // --- Getters ---
  const activeConversation = computed(() => 
    conversations.value.find(c => c.id === activeConversationId.value)
  );

  const sortedConversations = computed(() => {
    return [...conversations.value].sort((a, b) => 
      new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()
    );
  });

  // --- Actions ---
  function selectConversation(id: string) {
    activeConversationId.value = id;
    // Clear unread count when opening
    const conv = conversations.value.find(c => c.id === id);
    if (conv) conv.unreadCount = 0;
  }

  function sendMessage(content: string) {
    if (!activeConversation.value) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      conversationId: activeConversation.value.id,
      senderId: 'me',
      content,
      timestamp: new Date().toISOString(),
      type: 'text',
      status: 'sent'
    };

    activeConversation.value.messages.push(newMessage);
    activeConversation.value.lastMessage = content;
    activeConversation.value.lastMessageAt = newMessage.timestamp;
  }

  return { 
    conversations, 
    activeConversationId, 
    activeConversation, 
    sortedConversations,
    currentUser,
    selectConversation,
    sendMessage
  };
});