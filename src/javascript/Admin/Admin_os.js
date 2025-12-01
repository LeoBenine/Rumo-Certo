import { auth, db } from "./firebaseConfig.js";
import { 
  onAuthStateChanged, 
  signOut 
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";

import { 
  doc, 
  getDoc, 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  query, 
  where 
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";

// 🔐 Verifica se é admin
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const docRef = doc(db, "usuarios", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const dados = docSnap.data();
      if (dados.role === "admin") {
        listarUsuarios();
        listarOS();
      } else {
        alert("Você não tem permissão para acessar esta página.");
        window.location.href = "../index.html";
      }
    }
  } else {
    window.location.href = "../index.html";
  }
});

// 📋 Listar usuários
async function listarUsuarios() {
  const lista = document.getElementById("listaUsuarios");
  const querySnapshot = await getDocs(collection(db, "usuarios"));
  lista.innerHTML = "";

  querySnapshot.forEach((docSnap) => {
    const dados = docSnap.data();
    const li = document.createElement("li");
    li.textContent = `${dados.nome} - ${dados.email} (${dados.role})`;
    lista.appendChild(li);
  });
}

// 🛠 Gera número único para cada OS
function gerarNumeroOS() {
  return "OS-" + Date.now(); // exemplo simples
}

// 📌 Puxa nome e celular do cliente pelo CPF
document.getElementById("cpf").addEventListener("blur", async () => {
  const cpf = document.getElementById("cpf").value;
  if (!cpf) return;

  const q = query(collection(db, "clientes"), where("cpf", "==", cpf));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const clienteData = querySnapshot.docs[0].data();
    document.getElementById("cliente").value = clienteData.nome;
    document.getElementById("celular").value = clienteData.celular;
  } else {
    alert("Cliente não encontrado. Cadastre primeiro em 'Usuários'.");
  }
});

// 🛠 Cadastrar nova OS
const formOS = document.getElementById("formOS");
if (formOS) {
  formOS.addEventListener("submit", async (e) => {
    e.preventDefault();

    const numeroSerie = document.getElementById("numeroSerie").value;
    const cpf = document.getElementById("cpf").value;
    const celular = document.getElementById("celular").value;
    const cliente = document.getElementById("cliente").value;
    const descricao = document.getElementById("descricao").value;
    const dataEntrada = document.getElementById("dataEntrada").value;
    const status = document.getElementById("status").value;

    await addDoc(collection(db, "ordens"), {
      numeroOS: gerarNumeroOS(),
      numeroSerie,
      cpf,
      celular,
      cliente,
      descricao,
      dataEntrada,
      status,
      criadoEm: new Date().toISOString()
    });

    alert("Ordem de serviço cadastrada!");
    formOS.reset();
    listarOS();
  });
}

// 📋 Listar OS
async function listarOS() {
  const lista = document.getElementById("listaOS");
  const querySnapshot = await getDocs(collection(db, "ordens"));
  lista.innerHTML = "";

  querySnapshot.forEach((docSnap) => {
    const dados = docSnap.data();
    const li = document.createElement("li");

    li.innerHTML = `
      <strong>${dados.numeroOS}</strong> - ${dados.cliente} (${dados.cpf})<br>
      Série: ${dados.numeroSerie} | Celular: ${dados.celular}<br>
      Entrada: ${dados.dataEntrada} | Status: ${dados.status}<br>
      Descrição: ${dados.descricao}
      <button onclick="atualizarOS('${docSnap.id}', 'concluída')">Concluir</button>
    `;

    lista.appendChild(li);
  });
}

// ✏️ Atualizar OS
window.atualizarOS = async function(id, novoStatus) {
  const osRef = doc(db, "ordens", id);
  await updateDoc(osRef, { status: novoStatus });
  alert("Status atualizado!");
  listarOS();
};

// 🚪 Logout
document.getElementById("btnLogout").addEventListener("click", async (e) => {
  e.preventDefault();
  await signOut(auth);
  alert("Você saiu da conta.");
  window.location.href = "../index.html";
});