import { useState, useEffect } from 'react';
import { db, auth } from './firebase';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp,
  where,
  getDocs
} from 'firebase/firestore';
import { io } from "socket.io-client";

const socket = io('http://localhost:3000');

class MessageService {
  constructor() {
    this.socket = socket;
    this.messageListeners = new Map();
  }

  // Subscribe to messages for a specific chat
  subscribeToMessages = (chatId, callback) => {
    const q = query(
      collection(db, `chats/${chatId}/messages`),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(messages);
    });

    this.messageListeners.set(chatId, unsubscribe);
    return unsubscribe;
  };

  // Unsubscribe from messages
  unsubscribeFromMessages = (chatId) => {
    const unsubscribe = this.messageListeners.get(chatId);
    if (unsubscribe) {
      unsubscribe();
      this.messageListeners.delete(chatId);
    }
  };

  // Send a message
  sendMessage = async (chatId, message, userId) => {
    try {
      const messageData = {
        text: message,
        sender: auth.currentUser?.uid || 'anonymous',
        timestamp: serverTimestamp(),
        sent: true,
        read: false
      };

      // Add to Firestore
      const docRef = await addDoc(
        collection(db, `chats/${chatId}/messages`),
        messageData
      );

      // Emit socket event for real-time notification
      this.socket.emit('new_message', {
        chatId,
        messageId: docRef.id,
        userId,
        message
      });

      return docRef.id;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  };

  // Mark messages as read
  markAsRead = async (chatId, messageIds) => {
    try {
      const batch = db.batch();
      messageIds.forEach(messageId => {
        const messageRef = doc(db, `chats/${chatId}/messages/${messageId}`);
        batch.update(messageRef, { read: true });
      });
      await batch.commit();
    } catch (error) {
      console.error('Error marking messages as read:', error);
      throw error;
    }
  };

  // Get unread message count
  getUnreadCount = async (chatId, userId) => {
    try {
      const q = query(
        collection(db, `chats/${chatId}/messages`),
        where('read', '==', false),
        where('sender', '!=', userId)
      );
      const snapshot = await getDocs(q);
      return snapshot.size;
    } catch (error) {
      console.error('Error getting unread count:', error);
      return 0;
    }
  };

  // Listen for new messages via socket
  listenToNewMessages = (callback) => {
    this.socket.on('receive_message', (data) => {
      callback(data);
    });
  };

  // Clean up socket listeners
  cleanup = () => {
    this.socket.off('receive_message');
    this.messageListeners.forEach(unsubscribe => unsubscribe());
    this.messageListeners.clear();
  };
}

export const messageService = new MessageService();

// React Hook for using the message service
export const useMessages = (chatId, userId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (chatId) {
      setLoading(true);
      const unsubscribe = messageService.subscribeToMessages(chatId, (newMessages) => {
        setMessages(newMessages);
        setLoading(false);
      });

      messageService.listenToNewMessages((data) => {
        if (data.chatId === chatId) {
          setMessages(prev => [...prev, data]);
        }
      });

      return () => {
        unsubscribe();
        messageService.cleanup();
      };
    }
  }, [chatId]);

  const sendMessage = async (message) => {
    try {
      await messageService.sendMessage(chatId, message, userId);
    } catch (error) {
      setError(error.message);
    }
  };

  return { messages, loading, error, sendMessage };
};

export default messageService;
