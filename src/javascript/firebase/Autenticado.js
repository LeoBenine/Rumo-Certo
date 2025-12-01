import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";

// 🔧 Configuração Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDT_QnRFhIN9zLqwpZfrEkjuZM6v9hcApo",
  authDomain: "lb-lb-2b672.firebaseapp.com",
  projectId: "lb-lb-2b672",
  storageBucket: "lb-lb-2b672.appspot.com",
  messagingSenderId: "543303918925",
  appId: "1:543303918925:web:d8067bf1c506dee9b1c304"
};

// 🚀 Inicializa Firebase apenas uma vez
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

// 🔍 Detecta login
onAuthStateChanged(auth, async (user) => {
  const btnLogin = document.querySelector(".btn-login");

  if (user) {
    const docRef = doc(db, "usuarios", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const dados = docSnap.data();

      // Se for admin, mostra link para admin
      if (dados.role === "admin") {
        console.log("Admin conectado:", user.email);
        if (btnLogin) {
          btnLogin.textContent = "Painel Admin";
          btnLogin.href = "/Html/admin.html";
        }
      } else {
        console.log("Usuário conectado:", user.email);
        if (btnLogin) {
          btnLogin.textContent = "Sair";
          btnLogin.href = "#";
          btnLogin.addEventListener("click", async (e) => {
            e.preventDefault();
            await signOut(auth);
            alert("Você saiu da conta.");
            window.location.href = "/Html/Login.html";
          });
        }
      }
    }
  } else {
    if (btnLogin) {
      btnLogin.textContent = "Entrar";
      btnLogin.href = "/Html/Login.html";
    }
  }
});