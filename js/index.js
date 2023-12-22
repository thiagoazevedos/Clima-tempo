"use strict";
// 1º configuração do typescript >> npm init -y
// 2º instala o typescript >> npm install -D typescript
// 3º inicializa >> npx tsc --init
// 4º npx tsc -watch
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.querySelector("#search-form > form");
const input = document.querySelector("#input-localizacao");
const sectionTempoInfo = document.querySelector("#tempo-info");
form === null || form === void 0 ? void 0 : form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    if (!input || !sectionTempoInfo)
        return;
    const localizacao = input.value;
    if (localizacao.length < 3) {
        alert("Poucos Caracteres");
        return;
    }
    try {
        const resposta = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=f63c45e724bff2f77298fe3ec1cc7e74&lang=pt_br&units=metric`);
        const dados = yield resposta.json();
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
    }
    catch (err) {
        console.log("Erro na obtenção dos Dados", err);
    }
}));
