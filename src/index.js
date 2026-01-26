(function () {
  emailjs.init("gY7QbVXeE5g2Qs8NF");
})();

/* ===== CONFIG ANTI-SPAM ===== */
const COOLDOWN_MS = 60000; // 60 segundos
const STORAGE_KEY = "ultimo_envio_email";
let enviando = false;

function podeEnviar() {
  const ultimoEnvio = localStorage.getItem(STORAGE_KEY);
  if (!ultimoEnvio) return true;

  return Date.now() - Number(ultimoEnvio) >= COOLDOWN_MS;
}

function enviarEmail(event) {
  event.preventDefault();

  if (enviando) return;

  if (!podeEnviar()) {
    alert("Aguarde um pouco antes de enviar outra mensagem.");
    return;
  }

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();
  const botao = document.getElementById("btn-enviar");
  const alerta = document.getElementById("alerta-sucesso");

  if (!nome || !email || !mensagem) return;

  enviando = true;
  botao.disabled = true;
  botao.innerText = "Enviando...";

  const params = {
    name: nome,
    email: email,
    message: mensagem,
    time: new Date().toLocaleString("pt-BR")
  };

  emailjs
    .send("default_service", "template_ltizgii", params)
    .then(() => {
      localStorage.setItem(STORAGE_KEY, Date.now());

      alerta.classList.add("mostrar");
      document.querySelector(".formulario-contato").reset();

      setTimeout(() => {
        alerta.classList.remove("mostrar");
      }, 4000);
    })
    .catch((err) => {
      console.error("Erro ao enviar:", err);
      alert("Erro ao enviar mensagem.");
    })
    .finally(() => {
      enviando = false;
      botao.disabled = false;
      botao.innerText = "Enviar";
    });
}

//Button button-verMais

const btn = document.getElementById("button-verMais");
const msg = document.getElementById("msg");

btn.addEventListener("click", () => {
  btn.classList.toggle("active");

  if (btn.classList.contains("active")) {
    msg.style.display = "block";
  } else {
    msg.style.display = "none";
  }
});
