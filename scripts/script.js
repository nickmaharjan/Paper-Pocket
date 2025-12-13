// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNH7ZK5BQbJ4E9SjL_25vXZIGFtiHVd5Q",
  authDomain: "paper-pocket-b81a7.firebaseapp.com",
  projectId: "paper-pocket-b81a7",
  storageBucket: "paper-pocket-b81a7.firebasestorage.app",
  messagingSenderId: "47576230528",
  appId: "1:47576230528:web:ed676f580662278effd465",
  measurementId: "G-BXG9HCJVSP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

/**
 * Writes a new ticket to Firebase Database
 * @param {string} ticketId - Unique ticket ID
 * @param {string} category - Ticket category
 * @param {string} subject - Ticket subject
 * @param {string} description - Ticket description
 */
export function writeTicketData(ticketId, category, subject, description) {
  const ticketsRef = ref(db, 'tickets/' + ticketId);
  set(ticketsRef, {
    category,
    subject,
    description
  })
  .then(() => {
    console.log("Ticket successfully submitted!");
  })
  .catch((error) => {
    console.error("Error writing ticket:", error);
  });
}

/**
 * Writes a new document to Firebase Database
 * @param {string} documentId - Unique document ID
 * @param {string} name - Document name
 * @param {string} imageUrl - URL of uploaded document image
 * @param {number} expirationDate - Expiration timestamp
 * @param {number} reminderDate - Reminder timestamp
 */
export function writeDocumentData(documentId, name, imageUrl, expirationDate, reminderDate) {
  const docRef = ref(db, 'documents/' + documentId);
  set(docRef, {
    name,
    imageUrl,
    expirationDate,
    reminderDate
  })
  .then(() => {
    console.log("Document successfully saved!");
  })
  .catch((error) => {
    console.error("Error writing document:", error);
  });
}
