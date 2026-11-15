document.addEventListener("DOMContentLoaded", function() {
   
    if (document.getElementById("widget-acessibilidade-container")) return;

    const widgetContainer = document.createElement("div");
    widgetContainer.id = "widget-acessibilidade-container";
    widgetContainer.innerHTML = `
        <style>
            #btn-acessibilidade-flutuante {
                position: fixed;
                bottom: 20px;
                left: 20px;
                z-index: 99999;
                background: #004dff;
                color: #fff;
                border: none;
                border-radius: 50%;
                width: 55px;
                height: 55px;
                cursor: pointer;
                font-size: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 10px rgba(0,0,0,0.3);
                transition: transform 0.2s ease;
            }
            #btn-acessibilidade-flutuante:hover {
                transform: scale(1.1);
            }
            #painel-acessibilidade {
                position: fixed;
                bottom: 85px;
                left: 20px;
                z-index: 99999;
                background: #ffffff;
                color: #333333;
                border: 1px solid #ccc;
                border-radius: 8px;
                padding: 15px;
                width: 220px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                display: none;
                font-family: Arial, sans-serif;
            }
            #painel-acessibilidade h4 {
                margin: 0 0 10px 0;
                font-size: 16px;
                text-align: center;
            }
            #painel-acessibilidade button {
                width: 100%;
                padding: 8px;
                margin-bottom: 5px;
                background: #f1f1f1;
                border: 1px solid #ccc;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
                text-align: left;
            }
            #painel-acessibilidade button:hover {
                background: #e2e2e2;
            }
            .alto-contraste {
                background-color: #000 !important;
                color: #fff !important;
            }
            .alto-contraste * {
                background-color: #000 !important;
                color: #fff !important;
                border-color: #fff !important;
            }
        </style>

        <button id="btn-acessibilidade-flutuante" aria-label="Abrir menu de acessibilidade">
            ♿
        </button>

        <div id="painel-acessibilidade">
            <h4>Acessibilidade</h4>
            <button id="AumentarFonte">Aumentar Fonte</button>
            <button id="AlternarContraste">Alto Contraste</button>
        </div>
    `;

    document.body.appendChild(widgetContainer);

    const btnAbrir = document.getElementById("btn-acessibilidade-flutuante");
    const painel = document.getElementById("painel-acessibilidade");
    const btnAumentar = document.getElementById("AumentarFonte");
    const btnContraste = document.getElementById("AlternarContraste");

    btnAbrir.addEventListener("click", function(e) {
        e.stopPropagation();
        painel.style.display = painel.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", function(e) {
        if (!widgetContainer.contains(e.target)) {
            painel.style.display = "none";
        }
    });

   
    let nivelZoom = 0; // 0: Normal, 1: Grande, 2: Muito Grande
    const classesZoom = ["", "zoom-nivel-1", "zoom-nivel-2"];

    
    const estiloZoom = document.createElement("style");
    estiloZoom.innerHTML = `
        body.zoom-nivel-1 { font-size: 115% !important; }
        body.zoom-nivel-1 p, body.zoom-nivel-1 span, body.zoom-nivel-1 a, body.zoom-nivel-1 li, body.zoom-nivel-1 h1, body.zoom-nivel-1 h2, body.zoom-nivel-1 h3, body.zoom-nivel-1 h4, body.zoom-nivel-1 h5, body.zoom-nivel-1 h6 { font-size: 1.15em !important; }
        
        body.zoom-nivel-2 { font-size: 130% !important; }
        body.zoom-nivel-2 p, body.zoom-nivel-2 span, body.zoom-nivel-2 a, body.zoom-nivel-2 li, body.zoom-nivel-2 h1, body.zoom-nivel-2 h2, body.zoom-nivel-2 h3, body.zoom-nivel-2 h4, body.zoom-nivel-2 h5, body.zoom-nivel-2 h6 { font-size: 1.3em !important; }
    `;
    document.head.appendChild(estiloZoom);

    btnAumentar.addEventListener("click", function() {
       
        if (classesZoom[nivelZoom] !== "") {
            document.body.classList.remove(classesZoom[nivelZoom]);
        }
        
        
        nivelZoom = (nivelZoom + 1) % classesZoom.length;
        
        
        if (classesZoom[nivelZoom] !== "") {
            document.body.classList.add(classesZoom[nivelZoom]);
        }
    });

    btnContraste.addEventListener("click", function() {
        document.body.classList.toggle("alto-contraste");
    });
});