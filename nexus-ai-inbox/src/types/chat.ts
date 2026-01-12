export type Platform = 'whatsapp' | 'messenger' | 'email' | 'webchat';

export interface User {
  id: string;
  name: string;
  avatar: string;
  role: 'agent' | 'customer';
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: string; // ISO string
  type: 'text' | 'image' | 'system';
  status: 'sent' | 'delivered' | 'read';
}

export interface Conversation {
  id: string;
  contactId: string;
  contactName: string;
  contactAvatar: string; // URL
  platform: Platform;
  unreadCount: number;
  lastMessage: string;
  lastMessageAt: string; // ISO string
  tags: string[]; // e.g. "VIP", "Support"
  messages: Message[]; // We nest messages here for simplicity in this mock
}