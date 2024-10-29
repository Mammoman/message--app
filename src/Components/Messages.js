import { db, auth } from '../firebase';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp,
  where,
  getDocs,
  doc,
  batch
} from 'firebase/firestore';
import { io } from "socket.io-client";

const socket = io('http://localhost:3000');

class Messages {
  constructor() {
    this.socket = socket;
    this.messageListeners = new Map();
    this.messages = [];
    this.loading = true;
    this.error = null;
  }

  async initialize(chatId, userId) {
    try {
      this.chatId = chatId;
      this.userId = userId;
      await this.subscribeToMessages();
      this.listenToSocketMessages();
    } catch (error) {
      this.error = error.message;
    }
  }

  subscribeToMessages() {
    const q = query(
      collection(db, `chats/${this.chatId}/messages`),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      this.messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      this.loading = false;
      this.notifyListeners('messages', this.messages);
    });

    this.messageListeners.set(this.chatId, unsubscribe);
  }

  listenToSocketMessages() {
    this.socket.on('receive_message', (data) => {
      if (data.chatId === this.chatId) {
        this.messages = [...this.messages, data];
        this.notifyListeners('messages', this.messages);
      }
    });
  }

  async sendMessage(message) {
    try {
      const messageData = {
        text: message,
        sender: auth.currentUser?.uid || 'anonymous',
        timestamp: serverTimestamp(),
        sent: true,
        read: false
      };

      const docRef = await addDoc(
        collection(db, `chats/${this.chatId}/messages`),
        messageData
      );

      this.socket.emit('new_message', {
        chatId: this.chatId,
        messageId: docRef.id,
        userId: this.userId,
        message
      });

      return docRef.id;
    } catch (error) {
      this.error = error.message;
      throw error;
    }
  }

  async markAsRead(messageIds) {
    try {
      const batchOp = batch();
      messageIds.forEach(messageId => {
        const messageRef = doc(db, `chats/${this.chatId}/messages/${messageId}`);
        batchOp.update(messageRef, { read: true });
      });
      await batchOp.commit();
    } catch (error) {
      this.error = error.message;
    }
  }

  async getUnreadCount() {
    try {
      const q = query(
        collection(db, `chats/${this.chatId}/messages`),
        where('read', '==', false),
        where('sender', '!=', this.userId)
      );
      const snapshot = await getDocs(q);
      return snapshot.size;
    } catch (error) {
      this.error = error.message;
      return 0;
    }
  }

  addListener(event, callback) {
    if (!this.listeners) this.listeners = new Map();
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);
  }

  removeListener(event, callback) {
    if (this.listeners?.has(event)) {
      this.listeners.get(event).delete(callback);
    }
  }

  notifyListeners(event, data) {
    if (this.listeners?.has(event)) {
      this.listeners.get(event).forEach(callback => callback(data));
    }
  }

  cleanup() {
    this.socket.off('receive_message');
    this.messageListeners.forEach(unsubscribe => unsubscribe());
    this.messageListeners.clear();
    if (this.listeners) {
      this.listeners.clear();
    }
  }
}

export default Messages;