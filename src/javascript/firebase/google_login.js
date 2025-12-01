// login.js

// Importa funções de autenticação do Firebase via CDN
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";

// ✅ Importa a instância de autenticação. 
// Caminho corrigido: sobe 3 níveis (login_cadastro -> javascript -> src -> PROJETO_RAIZ) e desce para o config.
import { auth } from "./FireBaseConfig.js"; 

/**
 * Função genérica para tratar erros do Firebase, exibindo mensagens amigáveis.
 */
function mostrarErro(error) {
  let mensagem = "Ocorreu um erro desconhecido durante a autenticação.";

  // Mapeamento dos códigos de erro mais comuns
  switch (error.code) {
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      mensagem = "E-mail ou senha incorretos. Por favor, tente novamente.";
      break;
    case 'auth/invalid-email':
      mensagem = "O endereço de e-mail fornecido é inválido.";
      break;
    case 'auth/popup-closed-by-user':
      console.log("Login com Pop-up cancelado pelo usuário.");
      return; 
    case 'auth/too-many-requests':
      mensagem = "Muitas tentativas de login falharam. Sua conta foi bloqueada temporariamente.";
      break;
    default:
      console.error("Erro Firebase Detalhado:", error.code, error.message);
      mensagem = "Erro interno: " + error.message;
  }
  
  alert("Falha no Login: " + mensagem);
}

// 🔐 Login com E-mail e Senha
const formLogin = document.getElementById("formLogin");

if (formLogin) {
  formLogin.addEventListener("submit", async (event) => {
    event.preventDefault();

    const emailInput = document.getElementById("email");
    const senhaInput = document.getElementById("senha");
    
    if (!emailInput.value || !senhaInput.value) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const btnSubmitLogin = formLogin.querySelector("button[type='submit']");
    if (btnSubmitLogin) {
        btnSubmitLogin.disabled = true;
        btnSubmitLogin.textContent = "Entrando..."; 
    }




    try {
      const userCredential = await signInWithEmailAndPassword(auth, emailInput.value, senhaInput.value);
      console.log("Usuário logado:", userCredential.user.email);
      alert("Login realizado com sucesso!");
     window.location.href = "../index.html";
    } catch (error) {
      mostrarErro(error);
      senhaInput.value = ""; 
    } finally {
      if (btnSubmitLogin) {
        btnSubmitLogin.disabled = false;
        btnSubmitLogin.textContent = "Entrar"; 
      }
    }
  });
}

// 🔐 Login com Google
const btnGoogle = document.getElementById("btnGoogle");

if (btnGoogle) {
  const provider = new GoogleAuthProvider();

  btnGoogle.addEventListener("click", async () => {
    btnGoogle.disabled = true;
    const originalText = btnGoogle.textContent;
    btnGoogle.textContent = "Abrindo Google...";

    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Usuário Google:", result.user.email);
      alert("Login com Google realizado!");
     window.location.href = "../index.html";
    } catch (error) {
      mostrarErro(error);
    } finally {
      btnGoogle.disabled = false;
      btnGoogle.textContent = originalText; 
    }
  });
}