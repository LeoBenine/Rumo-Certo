// Importa módulos do Firebase
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";

// 🔧 Configuração do Firebase
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

// 🎯 Captura o formulário
const formCadastro = document.getElementById("formCadastro");

if (formCadastro) {
  formCadastro.addEventListener("submit", async (event) => {
    event.preventDefault();

    // 📌 Captura os campos do formulário
    const nome = document.getElementById("nome").value;
    const sobrenome = document.getElementById("sobrenome").value;
    const cpf = document.getElementById("cpf").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    try {
      // 🔐 Cria usuário no Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      // 📦 Salva dados no Firestore (coleção "usuarios")
      await setDoc(doc(db, "usuarios", user.uid), {
        nome: nome,
        sobrenome: sobrenome,
        cpf: cpf,
        email: email,
        criadoEm: new Date().toISOString(),
        role: "user" // todo novo usuário começa como comum
      });

      alert("Cadastro realizado com sucesso!");
      window.location.href = "Login.html"; // redireciona para página de login
    } catch (error) {
      console.error("Erro no cadastro:", error);
      alert("Erro: " + error.message);
    }
  });
}