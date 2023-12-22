// 1º configuração do typescript >> npm init -y
// 2º instala o typescript >> npm install -D typescript
// 3º inicializa >> npx tsc --init
// 4º npx tsc -watch

const form = document.querySelector("#search-form > form");
const input: HTMLInputElement | null =
  document.querySelector("#input-localizacao");

const sectionTempoInfo = document.querySelector("#tempo-info");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!input || !sectionTempoInfo) return;

  const localizacao = input.value;

  if (localizacao.length < 3) {
    alert("Poucos Caracteres");
    return;
  }
  try {
    const resposta = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=f63c45e724bff2f77298fe3ec1cc7e74&lang=pt_br&units=metric`
    );

    const dados = await resposta.json();

    const infos = {
      temperatura: Math.round(dados.main.temp),
      local: dados.name,
      icone: `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`,
    };

    sectionTempoInfo.innerHTML = `<div class="tempo-dados">
      <h2>${infos.local}</h2>
 
      <span>${infos.temperatura}</span>
      </div>
      <img src="${infos.icone}" />`;
  } catch (err) {
    console.log("Erro na obtenção dos Dados", err);
  }
});
