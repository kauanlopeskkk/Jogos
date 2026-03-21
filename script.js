const BASE_URL = "http://127.0.0.1:8000";
const API_URL = BASE_URL + "/jogos";

// Basic Auth
const headersAuth = {
    "Authorization": "Basic " + btoa("admin:kkk"),
    "Content-Type": "application/json"
};

document.addEventListener("DOMContentLoaded", carregarJogos);

document.getElementById("jogoForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const jogo = {
        nome_jogo: document.getElementById("nome_jogo").value,
        genero: document.getElementById("genero").value,
        plataforma: document.getElementById("plataforma").value,
        ano_lancamento: Number(document.getElementById("ano").value),
        desenvolvedora: document.getElementById("desenvolvedora").value,
        preco: Number(document.getElementById("preco").value)
    };

    await fetch(API_URL, {
        method: "POST",
        headers: headersAuth,
        body: JSON.stringify(jogo)
    });

    document.getElementById("jogoForm").reset();
    carregarJogos();
});

// ===== LISTAR =====
async function carregarJogos() {
    const res = await fetch(API_URL + "?page=1&limit=50", {
        headers: headersAuth
    });

    const data = await res.json();
    const lista = document.getElementById("listaJogos");
    lista.innerHTML = "";

    data.jogos.forEach(jogo => {
        const li = document.createElement("li");
        li.innerHTML = `
            🎮 <b>${jogo.nome_jogo}</b> |
            ${jogo.plataforma} |
            R$ ${jogo.preco}
            <button onclick="deletar(${jogo.id})">🗑️</button>
        `;
        lista.appendChild(li);
    });
}

// ===== DELETE =====
async function deletar(id) {
    await fetch(`${BASE_URL}/deletar_Jogos/${id}`, {
        method: "DELETE",
        headers: headersAuth
    });
    carregarJogos();
}
