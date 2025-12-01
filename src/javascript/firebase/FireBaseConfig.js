import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";

// 🔧 Configuração Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDT_QnRFhIN9zLqwpZfrEkjuZM6v9hcApo",
  authDomain: "lb-lb-2b672.firebaseapp.com",
  projectId: "lb-lb-2b672",
  storageBucket: "lb-lb-2b672.appspot.com",
  messagingSenderId: "543303918925",
  appId: "1:543303918925:web:d8067bf1c506dee9b1c304"
};

// 🚀 Inicializa apenas uma vez
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// 🔑 Exporta para usar em outros arquivos
export const auth = getAuth(app);
export const db = getFirestore(app);