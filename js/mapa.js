document.addEventListener("DOMContentLoaded", function () {
    // 1. Inicializa o mapa centralizado na região central/leste de São Paulo (próximo à UNICID/Tatuapé)
    const mapa = L.map('mapa-sp').setView([-23.5400, -46.5760], 13);

    // 2. Carrega as camadas de mapa do OpenStreetMap (gratuito e sem chave)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapa);

    // 3. Ícones customizados para Terminais e Pontos Acessíveis
    const iconeTerminal = L.divIcon({
        className: 'custom-icon-terminal',
        html: '<div style="background-color: #0284c7; width: 14px; height: 14px; border: 2px solid white; border-radius: 50%; box-shadow: 0 0 4px rgba(0,0,0,0.5);"></div>',
        iconSize: [16, 16]
    });

    const iconeAcessivel = L.divIcon({
        className: 'custom-icon-acessivel',
        html: '<div style="background-color: #10b981; width: 14px; height: 14px; border: 2px solid white; border-radius: 50%; box-shadow: 0 0 4px rgba(0,0,0,0.5);"></div>',
        iconSize: [16, 16]
    });

    // 4. Marcação de Terminais e Estações principais
    const locais = [
        {
            nome: "Terminal e Estação Tatuapé",
            coords: [-23.5404, -46.5766],
            tipo: "terminal",
            detalhes: "Integração Linha 3-Vermelha, Linha 11/12 da CPTM e linhas urbanas de ônibus.",
            acessibilidade: "Elevadores, piso tátil direcional e banheiros adaptados."
        },
        {
            nome: "Estação Carrão - UNICID",
            coords: [-23.5375, -46.5640],
            tipo: "terminal",
            detalhes: "Acesso direto ao campus universitário e terminal de ônibus local.",
            acessibilidade: "Rampas de acesso, elevador de plataforma e avisos sonoros."
        },
        {
            nome: "Terminal Parque Dom Pedro II",
            coords: [-23.5458, -46.6288],
            tipo: "terminal",
            detalhes: "Maior terminal urbano de ônibus da região central.",
            acessibilidade: "Piso tátil e plataformas com embarque em nível."
        },
        {
            nome: "Ponto Acessível - Av. Celso Garcia, 3300",
            coords: [-23.5350, -46.5780],
            tipo: "acessivel",
            detalhes: "Parada de ônibus adaptada com rampa de calçada e abrigo coberto.",
            acessibilidade: "Espaço reservado para cadeira de rodas e totem em braille."
        },
        {
            nome: "Ponto Acessível - Hospital Municipal do Tatuapé",
            coords: [-23.5390, -46.5695],
            tipo: "acessivel",
            detalhes: "Parada prioritária com linha direta de ônibus com piso baixo.",
            acessibilidade: "Guia rebaixada e sinal sonoro de aproximação."
        }
    ];

    // Adiciona os marcadores no mapa
    locais.forEach(local => {
        const icone = local.tipo === "terminal" ? iconeTerminal : iconeAcessivel;
        
        const popupConteudo = `
            <div class="popup-conteudo">
                <h4>${local.nome}</h4>
                <p>${local.detalhes}</p>
                <p><strong>Acessibilidade:</strong> ${local.acessibilidade}</p>
                <span class="badge-acessivel">100% Acessível</span>
            </div>
        `;

        L.marker(local.coords, { icon: icone })
            .addTo(mapa)
            .bindPopup(popupConteudo);
    });

    // 5. Desenho dos Traçados (Corredores e Linhas sobre trilhos)
    
    // Trecho da Linha 3 - Vermelha (representação simplificada: Brás -> Tatuapé -> Carrão -> Penha)
    const traçadoMetroLinha3 = [
        [-23.5480, -46.6150], // Brás
        [-23.5445, -46.5960], // Bresser-Mooca
        [-23.5420, -46.5890], // Belém
        [-23.5404, -46.5766], // Tatuapé
        [-23.5375, -46.5640], // Carrão
        [-23.5330, -46.5450]  // Penha
    ];

    L.polyline(traçadoMetroLinha3, {
        color: '#ef4444', // Vermelho (Metrô Linha 3)
        weight: 5,
        opacity: 0.8
    }).addTo(mapa).bindPopup("<b>Linha 3 - Vermelha</b><br>100% das estações adaptadas com elevadores.");

    // Traçado do Corredor de Ônibus Celso Garcia (Verde sustentável)
    const corredorCelsoGarcia = [
        [-23.5460, -46.6200],
        [-23.5390, -46.5950],
        [-23.5350, -46.5780],
        [-23.5320, -46.5600]
    ];

    L.polyline(corredorCelsoGarcia, {
        color: '#10b981', // Verde
        weight: 4,
        dashArray: '6, 6', // Linha tracejada para diferenciar corredores de ônibus
        opacity: 0.9
    }).addTo(mapa).bindPopup("<b>Corredor de Ônibus Celso Garcia</b><br>Frota com piso baixo e embarque preferencial.");
});