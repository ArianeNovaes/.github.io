document.addEventListener('DOMContentLoaded', function() {
    // Inicializa o mapa
    const map = L.map('map').setView([-24.18, -46.79], 13);

    // Adiciona a camada base do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Cores para diferentes tipos de ecopontos
    const tipoCores = {
        "Pneus": { color: 'orange', fillColor: '#ff9900', fillOpacity: 0.8 },
        "Recicláveis, Óleo de cozinha": { color: 'green', fillColor: '#2ecc71', fillOpacity: 0.8 },
        "Lâmpadas": { color: 'blue', fillColor: '#3498db', fillOpacity: 0.8 },
        "Pilhas e Baterias": { color: 'red', fillColor: '#e74c3c', fillOpacity: 0.8 },
        "Latas de tinta": { color: 'purple', fillColor: '#9b59b6', fillOpacity: 0.8 }
    };

    // Adiciona os marcadores dos ecopontos
    const ecopontos = [
        {
            nome: "Rodoviária de Itanhaém",
            endereco: "Av. Harry Forssell, 1505 - Corumbá, Itanhaém - SP, 11740-000",
            coordenadas: [-24.184735441051988, -46.8178789220009],
            tipo: "Pneus"
        },
        {
            nome: "Cooperativa Coopersol Reciclando",
            endereco: "Av. João Batista Leal, 119 - Centro",
            coordenadas: [-24.16783504393927, -46.788864896674866],
            tipo: "Recicláveis, Óleo de cozinha"
        },
        {
            nome: "Sodimac – Dicico",
            endereco: "R. João Pedro Orsi, 117/120 – Cidade Anchieta",
            coordenadas: [-24.17567436755759, -46.78311477916522],
            tipo: "Lâmpadas"
        },
        {
            nome: "Elétrica Ramiro",
            endereco: "R. Antonio Olívio de Araujo, 46 – Centro",
            coordenadas: [-24.183610644204656, -46.79061690982741],
            tipo: "Lâmpadas"
        },
        {
            nome: "Baratão das Tintas",
            endereco: "Av. João Batista Leal, 119 – Centro",
            coordenadas: [-24.184413195756658, -46.790310814976515],
            tipo: "Latas de tinta"
        },
        {
            nome: "ACAI – Associação Comercial de Itanhaém",
            endereco: "Av. Pres. Vargas, 757 – Centro",
            coordenadas: [-24.184641896211993, -46.78506433766062],
            tipo: "Pilhas e Baterias"
        },
        {
            nome: "Supermercados Extra",
            endereco: "Av. Rui Barbosa, 763 – Centro/ Av. Trinta e Um de Março, s/nº – Belas Artes",
            coordenadas: [-24.17950544066646, -46.7820375903822],
            tipo: "Pilhas e Baterias"
        },
        {
            nome: "Tenda Atacado",
            endereco: "Rua José S. Bechelli, 1351 – Sabaúna",
            coordenadas: [-24.18173300863788, -46.81340016433096],
            tipo: "Recicláveis, Óleo de cozinha"
        }
    ];

    // Adiciona cada ecoponto ao mapa com círculos coloridos
    ecopontos.forEach(ecoponto => {
        const cor = tipoCores[ecoponto.tipo] || { color: 'gray', fillColor: '#95a5a6', fillOpacity: 0.8 };
        
        L.circleMarker(ecoponto.coordenadas, {
            radius: 8,
            fill: true,
            ...cor
        }).addTo(map)
        .bindPopup(`
            <strong>${ecoponto.nome}</strong><br>
            <small>${ecoponto.endereco}</small><br><br>
            <strong>Resíduos aceitos:</strong> ${ecoponto.tipo}
        `);
    });

    // Adiciona controle de camadas
    const baseLayers = {
        "OpenStreetMap Padrão": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }),
        "OpenStreetMap Humanitário": L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France'
        })
    };

    L.control.layers(baseLayers).addTo(map);

    // Adiciona botão para localização do usuário
    const locateControl = L.control.locate({
        position: 'topright',
        drawCircle: true,
        follow: true,
        setView: 'untilPan',
        keepCurrentZoomLevel: true,
        markerStyle: {
            weight: 1,
            opacity: 0.8,
            fillOpacity: 0.8
        },
        circleStyle: {
            weight: 1,
            clickable: false
        },
        icon: 'fa fa-location-arrow',
        metric: true,
        strings: {
            title: "Mostrar minha localização",
            popup: "Você está dentro de {distance} {unit} deste ponto",
            outsideMapBoundsMsg: "Você parece estar localizado fora dos limites do mapa"
        },
        locateOptions: {
            maxZoom: 16,
            watch: true,
            enableHighAccuracy: true,
            maximumAge: 10000,
            timeout: 10000
        }
    }).addTo(map);

    // Adiciona legenda
    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = function(map) {
        const div = L.DomUtil.create('div', 'info legend');
        let labels = ['<strong>Legenda</strong>'];
        
        // Adiciona itens da legenda para cada tipo
        for (const tipo in tipoCores) {
            labels.push(
                `<i style="background:${tipoCores[tipo].fillColor}"></i> ${tipo}`
            );
        }
        
        div.innerHTML = labels.join('<br>');
        return div;
    };
    legend.addTo(map);
});




document.addEventListener('DOMContentLoaded', function() {
    // Elementos do modal
    const modal = document.getElementById('modalAjuda');
    const overlay = document.getElementById('overlay');
    const btnAjuda = document.querySelector('.cta-button');
    const fecharModal = document.getElementById('fecharModal');

    // Abrir modal ao clicar no botão "Como Ajudar?"
    btnAjuda.addEventListener('click', function(e) {
        e.preventDefault(); // Previne o comportamento padrão do link
        modal.style.display = 'block';
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Impede scroll da página
    });

    // Fechar modal ao clicar no X
    fecharModal.addEventListener('click', function() {
        modal.style.display = 'none';
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Fechar modal ao clicar no overlay
    overlay.addEventListener('click', function() {
        modal.style.display = 'none';
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Fechar modal com a tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            overlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});