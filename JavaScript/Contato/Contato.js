const container = document.getElementById("info-contato");

const address = document.createElement("address");
address.lang = "pt-br";
address.title = "Informações de contato da Rumo Certo";

const endereco = document.createElement("p");
endereco.innerHTML = "<strong>Endereço:</strong> R. Dr. Delfino Cintra, 275 - Botafogo, Campinas - SP, 13020-100";

const telefone = document.createElement("p");
telefone.innerHTML = '<strong>Telefone:</strong> <a href="tel:+551932317673">(19) 3231-7673</a>';

const email = document.createElement("p");
email.innerHTML = '<strong>Email:</strong> <a href="mailto:rumocertoassist@gmail.com">rumocertoassist@gmail.com</a>';

const whatsapp = document.createElement("p");
whatsapp.innerHTML = `
  <a href="https://wa.me/551932317673" target="_blank" rel="noopener noreferrer" aria-label="Abrir conversa no WhatsApp com Rumo Certo">
    Fale conosco pelo WhatsApp
  </a>
`;

address.appendChild(endereco);
address.appendChild(telefone);
address.appendChild(email);
address.appendChild(whatsapp);

const horarioDiv = document.createElement("div");
horarioDiv.className = "horario";

const horario = document.createElement("p");
horario.innerHTML = "<strong>Horário de atendimento:</strong> Segunda a sexta, das 08:30 às 17:00";

const aviso = document.createElement("p");
aviso.innerHTML = "<em>Não atendemos aos sábados, domingos e feriados.</em>";

const status = document.createElement("p");
status.id = "status-atendimento";

horarioDiv.appendChild(horario);
horarioDiv.appendChild(aviso);
horarioDiv.appendChild(status);

container.appendChild(address);
container.appendChild(horarioDiv);

// Verifica se está aberto
function verificarHorario() {
  const agora = new Date();
  const diaSemana = agora.getDay();
  const hora = agora.getHours();
  const minuto = agora.getMinutes();

  const estaAberto =
    diaSemana >= 1 && diaSemana <= 5 &&
    (hora > 8 || (hora === 8 && minuto >= 30)) &&
    (hora < 17 || (hora === 17 && minuto === 0));

  status.innerText = estaAberto
    ? "✅ Estamos abertos agora!"
    : "⛔ Estamos fechados no momento.";
  status.style.color = estaAberto ? "green" : "red";
  status.style.fontWeight = "bold";
}

verificarHorario();
setInterval(verificarHorario, 60000);
