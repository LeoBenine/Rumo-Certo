import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import { getFirestore, doc, getDoc, collection, getDocs, updateDoc } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";

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

// 🔐 Verifica se usuário é administrador
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const docRef = doc(db, "usuarios", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const dados = docSnap.data();
      if (dados.role === "admin") {
        console.log("Admin conectado:", user.email);
        listarUsuarios();
      } else {
        alert("Você não tem permissão para acessar esta página.");
        window.location.href = "../index.html"; // volta para home
      }
    }
  } else {
    window.location.href = "/Html/Login.html"; // volta para login
  }
});

// 🔼 Promover usuário para admin
window.promover = async function(uid) {
  const userRef = doc(db, "usuarios", uid);
  await updateDoc(userRef, { role: "admin" });
  alert("Usuário promovido a admin!");
  listarUsuarios();
};

// 👥 Listar usuários
async function listarUsuarios() {
  const lista = document.getElementById("listaUsuarios");
  const querySnapshot = await getDocs(collection(db, "usuarios"));
  lista.innerHTML = "";

  querySnapshot.forEach((docSnap) => {
    const dados = docSnap.data();
    const li = document.createElement("li");

    li.innerHTML = `
      <strong>${dados.email}</strong> - Função: ${dados.role || "user"}
      ${dados.role !== "admin" ? `<button onclick="promover('${docSnap.id}')">Tornar admin</button>` : ""}
    `;

    lista.appendChild(li);
  });
}

// 🚪 Logout
document.getElementById("btnLogout").addEventListener("click", async (e) => {
  e.preventDefault();
  await signOut(auth);
  alert("Você saiu da conta.");
  window.location.href = "../index.html"; // volta para login
});