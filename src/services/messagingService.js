import { db } from '../config/firebase'; // Import the Firestore database
import { collection, addDoc, query, onSnapshot, orderBy } from 'firebase/firestore';

// Function to send a message
export const sendMessage = async (messageData) => {
    try {
        const messagesRef = collection(db, 'messages'); // Reference to the messages collection
        await addDoc(messagesRef, messageData); // Add a new message document
    } catch (error) {
        console.error("Error sending message: ", error);
    }
};

// Function to listen for new messages
export const listenForMessages = (callback) => {
    const messagesRef = collection(db, 'messages'); // Reference to the messages collection
    const q = query(messagesRef, orderBy('timestamp')); // Query to order messages by timestamp

    // Listen for real-time updates
    return onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Map documents to an array
        callback(messages); // Call the callback with the new messages
    });
}; 