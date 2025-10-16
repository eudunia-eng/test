// Carrega dados e constroi slides por país + tabela comparativa
(async function(){
  const countries = await loadCountries();
  renderTable(countries);
  renderCountrySlides(countries);
  renderSources(countries);
})();

async function loadCountries(){
  // Dados basilares 2024–2025. Cada entrada deve ter: nome, cit, vat_std, formacao, vistos, burocracia, hubs, fontes, flag.
  // Observação: taxas são estatutárias; regimes especiais podem alterar efetivas. Confirmar sempre na fonte oficial.
  const data = [
    // Bélgica
    {code:'BE', nome:'Bélgica', cit:'25%', vat_std:'21%',
     formacao:'Constituição de SRL/SA via notário; BancoCarrefour; UBO; conta empresa; eGov bem integrado.',
     vistos:'Residência para empreendedores com plano e meios; permissão de trabalho necessária para não‑UE.',
     burocracia:'Multilíngue; elevada qualidade institucional; custos mais altos em Bruxelas.',
     hubs:'Bruxelas (RegTech, fintech, políticas UE), Antuérpia, Gent, Leuven.',
     fontes:[
       {t:'SPF Finances — ISoc', u:'https://finance.belgium.be'},
       {t:'VAT rates — Comissão Europeia (01/2025)', u:'https://taxation-customs.ec.europa.eu'}
     ], flag:'https://flagcdn.com/w640/be.png'},

    // Bulgária
    {code:'BG', nome:'Bulgária', cit:'10%', vat_std:'20%',
     formacao:'LTD (OOD) rápida; registro comercial online; custo baixo; contabilidade local necessária.',
     vistos:'Residência para negócios com investimento/emprego; fora Schengen (2025: aéreo/marítimo).',
     burocracia:'Baixo CIT; maior escrutínio bancário; apoio via EDIHs e fundos UE.',
     hubs:'Sófia, Plovdiv, Varna.',
     fontes:[
       {t:'NRA — Corporate tax', u:'https://nra.bg'},
       {t:'VAT rates — CE (01/2025)', u:'https://taxation-customs.ec.europa.eu'}
     ], flag:'https://flagcdn.com/w640/bg.png'},

    // Chéquia (República Checa)
    {code:'CZ', nome:'Chéquia', cit:'21%', vat_std:'21%',
     formacao:'s.r.o. com capital simbólico; registro comercial; conta; relatórios anuais.',
     vistos:'Vistos de empreendedor; residência para diretores não‑UE conforme substância.',
     burocracia:'Ambiente pro‑indústria/IA; boa infraestrutura; linguagem local em órgãos.',
     hubs:'Praga, Brno, Ostrava.',
     fontes:[
       {t:'Finanční správa — Corporate tax', u:'https://www.financnisprava.cz'},
       {t:'VAT rates — CE (01/2025)', u:'https://taxation-customs.ec.europa.eu'}
     ], flag:'https://flagcdn.com/w640/cz.png'},

    // Dinamarca
    {code:'DK', nome:'Dinamarca', cit:'22%', vat_std:'25%',
     formacao:'ApS via virk.dk; digital-first; NemID/MitID; alto nível de serviço.',
     vistos:'Startup Denmark para fundadores; vistos qualificados com salário mínimo.',
     burocracia:'Custos altos; alta confiança institucional; inglês difundido.',
     hubs:'Copenhaga, Aarhus, Odense (robótica).',
     fontes:[
       {t:'SKAT — Corporate tax', u:'https://www.skm.dk'},
       {t:'VAT rates — CE (01/2025)', u:'https://taxation-customs.ec.europa.eu'}
     ], flag:'https://flagcdn.com/w640/dk.png'},

    // Alemanha
    {code:'DE', nome:'Alemanha', cit:'~29.9% média (federal+municipal)', vat_std:'19%',
     formacao:'GmbH/UG; notário; Handelsregister; IHK; possível demorar; alta credibilidade.',
     vistos:'Startup/empreendedor regional; Blue Card para tech; requisitos de salário.',
     burocracia:'Rigor contábil; benefícios I&D; clusters industriais fortes.',
     hubs:'Berlim, Munique, Hamburgo, Colónia.',
     fontes:[
       {t:'BMF — Körperschaftsteuer', u:'https://www.bundesfinanzministerium.de'},
       {t:'VAT rates — CE (01/2025)', u:'https://taxation-customs.ec.europa.eu'}
     ], flag:'https://flagcdn.com/w640/de.png'},

    // Estónia
    {code:'EE', nome:'Estónia', cit:'0% lucros reinvestidos; 20% sobre distribuições', vat_std:'22%',
     formacao:'e‑Residency; OÜ 100% online; assinatura digital; relatórios eletrónicos.',
     vistos:'Startup Visa e residência para fundadores/empregados tech.',
     burocracia:'Altíssima digitalização; banking para não residentes pode exigir substância.',
     hubs:'Tallinn, Tartu.',
     fontes:[
       {t:'Estonian Tax and Customs Board', u:'https://www.emta.ee'},
       {t:'VAT rates — CE (01/2025)', u:'https://taxation-customs.ec.europa.eu'}
     ], flag:'https://flagcdn.com/w640/ee.png'},

    // Irlanda
    {code:'IE', nome:'Irlanda', cit:'12.5% (trading income)', vat_std:'23%',
     formacao:'LTD pela CRO; rápido com provedores; ambiente pró‑IP.',
     vistos:'Start‑up Entrepreneur Programme (STEP) e Critical Skills.',
     burocracia:'Custos altos; exigência de substância para regimes de IP.',
     hubs:'Dublin, Cork, Galway, Limerick.',
     fontes:[
       {t:'Revenue — Corporation Tax', u:'https://www.revenue.ie'},
       {t:'VAT rates — CE (01/2025)', u:'https://taxation-customs.ec.europa.eu'}
     ], flag:'https://flagcdn.com/w640/ie.png'},

    // Grécia
    {code:'GR', nome:'Grécia', cit:'22%', vat_std:'24%',
     formacao:'IKE/SA; balcão único GEMI; incentivos digitais.',
     vistos:'Vistos de empreendedor e tech; digital nomad visa.',
     burocracia:'Reformas pró‑negócios; cadastros digitais em expansão.',
     hubs:'Atenas, Tessalónica.',
     fontes:[
       {t:'AADE — Corporate tax', u:'https://www.aade.gr'},
       {t:'VAT rates — CE (01/2025)', u:'https://taxation-customs.ec.europa.eu'}
     ], flag:'https://flagcdn.com/w640/gr.png'},

    // Espanha
    {code:'ES', nome:'Espanha', cit:'25% (15% startups — Lei das Startups)', vat_std:'21%',
     formacao:'SL/SR; lei de startups reduziu barreiras; empreendedor estrangeiro facilitado.',
     vistos:'Startup Act: residência para empreendedores e nômadas digitais.',
     burocracia:'Generosos incentivos I&D e Patent Box.',
     hubs:'Barcelona, Madrid, Valência, Bilbao.',
     fontes:[
       {t:'AEAT — Impuesto sobre Sociedades', u:'https://sede.agenciatributaria.gob.es'},
       {t:'VAT rates — CE (01/2025)', u:'https://taxation-customs.ec.europa.eu'}
     ], flag:'https://flagcdn.com/w640/es.png'},

    // França
    {code:'FR', nome:'França', cit:'25%', vat_std:'20%',
     formacao:'SAS/SARL; guichet‑entreprises; forte apoio a deep tech (Bpifrance).',
     vistos:'French Tech Visa.',
     burocracia:'Mercado grande; mais formalidades trabalhistas.',
     hubs:'Paris, Lyon, Lille, Toulouse.',
     fontes:[
       {t:'DGFiP — Impôt sur les sociétés', u:'https://www.impots.gouv.fr'},
       {t:'VAT rates — CE (01/2025)', u:'https://taxation-customs.ec.europa.eu'}
     ], flag:'https://flagcdn.com/w640/fr.png'},

    // Croácia
    {code:'HR', nome:'Croácia', cit:'18% (10% para pequenas empresas)', vat_std:'25%',
     formacao:'d.o.o.; e‑Građani; euro desde 2023; boa conectividade.',
     vistos:'Residência para empreendedores e TI; nômada digital.',
     burocracia:'Ecossistema em crescimento; turismo/IT.',
     hubs:'Zagreb, Split.',
     fontes:[
       {t:'Porezna uprava — Corporate tax', u:'https://www.porezna-uprava.hr'},
       {t:'VAT rates — CE (01/2025)', u:'https://taxation-customs.ec.europa.eu'}
     ], flag:'https://flagcdn.com/w640/hr.png'},

    // Itália
    {code:'IT', nome:'Itália', cit:'24% IRES + ~3.9% IRAP', vat_std:'22%',
     formacao:'SRL; notário; registro; incentivos para "startup innovativa".',
     vistos:'Italia Startup Visa.',
     burocracia:'Formalidades regionais; forte manufatura e design.',
     hubs:'Milão, Roma, Turim, Bolonha.',
     fontes:[
       {t:'Agenzia delle Entrate — IRES/IRAP', u:'https://www.agenziaentrate.gov.it'},
       {t:'VAT rates — CE (01/2025)', u:'https://taxation-customs.ec.europa.eu'}
     ], flag:'https://flagcdn.com/w640/it.png'},

    // Chipre
    {code:'CY', nome:'Chipre', cit:'12.5%', vat_std:'19%',
     formacao:'LTD com Companies House; regime IP atrativo; common law.',
     vistos:'Residência por negócio; rotas de trabalho qualificadas.',
     burocracia:'Networking regional; compliance AML rigorosa.',
     hubs:'Nicósia, Limassol.',
     fontes:[
       {t:'Tax Department — Corporate tax', u:'https://mof.gov.cy'},
       {t:'VAT rates — CE (01/2025)', u:'https://taxation-customs.ec.europa.eu'}
     ], flag:'https://flagcdn.com/w640/cy.png'},

    // Letónia
    {code:'LV', nome:'Letónia', cit:'20% sobre distribuição (efetivo ~20/80 base)', vat_std:'21%',
     formacao:'SIA digital; e‑Assinatura; requisitos de capital reduzidos.',
     vistos:'Startup Law com vistos facilitados.',
     burocracia:'Ecossistema Baltics; lingua local na administração.',
     hubs:'Riga.',
     fontes:[
       {t:'VID — Corporate income tax', u:'https://www.vid.gov.lv'},
       {t:'VAT rates — CE (01/2025)', u:'https://taxation-customs.ec.europa.eu'}
     ], flag:'https://flagcdn.com/w640/lv.png'},

    // Lituânia
    {code:'LT', nome:'Lituânia', cit:'15% (reduzido p/ pequenas empresas)', vat_std:'21%',
     formacao:'UAB; registro online; forte hub FinTech e sandbox.',
     vistos:'Startup Visa e Tech Visa.',
     burocracia:'Banco central ágil para EMI/FinTech.',
     hubs:'Vílnius, Kaunas.',
     fontes:[
       {t:'VMI — Corporate income tax', u:'https://www.vmi.lt'},
       {t:'VAT rates — CE (01/2025)', u:'https://taxation-customs.ec.europa.eu'}
     ], flag:'https://flagcdn.com/w640/lt.png'},

    // Luxemburgo
    {code:'LU', nome:'Luxemburgo', cit:'24.94% aproximado (CIT+MBT+communal)', vat_std:'17% (padrão mais baixo da UE)',
     formacao:'SARL/SARL‑S; ambiente pró‑finance; multilingue.',
     vistos:'Vistos de negócio e trabalho qualificado.',
     burocracia:'Foco em finanças, ciber, espaço.',
     hubs:'Cidade de Luxemburgo.',
     fontes:[
       {t:'AED/DG — Corporate tax', u:'https://guichet.public.lu'},
       {t:'VAT rates — CE (01/2025)', u:'https://taxation-customs.ec.europa.eu'}
     ], flag:'https://flagcdn.com/w640/lu.png'},

    // Hungria
    {code:'HU', nome:'Hungria', cit:'9%', vat_std:'27%',
     formacao:'Kft.; processos digitais em expansão; custos baixos.',
     vistos:'Vistos de negócios/tech; regimes para I&D.',
     burocracia:'Maior VAT da UE; incentivos industriais.',
     hubs:'Budapeste, Debrecen.',
     fontes:[
       {t:'NAV — Corporate tax', u:'https://nav.gov.hu'},
       {t:'VAT rates — CE (01/2025)', u:'https://taxation-customs.ec.europa.eu'}
     ], flag:'https://flagcdn.com/w640/hu.png'},

    // Malta
    {code:'MT', nome:'Malta', cit:'35% estatutário; efetivo ~5–10% via refunds', vat_std:'18%',
     formacao:'LTD; Companies Act; forte uso de provedores; iGaming e fintech.',
     vistos:'Startup Residence Programme; rotas tech.',
     burocracia:'Sistema de reembolso fiscal requer substância e compliance.',
     hubs:'Valeta.',
     fontes:[
       {t:'CFR — Corporate tax', u:'https://cfr.gov.mt'},
       {t:'VAT rates — CE (01/2025)', u:'https://taxation-customs.ec.europa.eu'}
     ], flag:'https://flagcdn.com/w640/mt.png'},

    // Países Baixos
    {code:'NL', nome:'Países Baixos', cit:'25.8% (faixa superior 2025)', vat_std:'21%',
     formacao:'BV; notário; câmaras; ambiente pró‑inovação; 30% ruling para talento estrangeiro (ajustes em 2024–2025).',
     vistos:'Startup Visa via facilitadores; residence para fundadores.',
     burocracia:'Regras de classificação freelancer (VBAR) apertando em 2025.',
     hubs:'Amesterdão, Eindhoven, Roterdão, Utrecht.',
     fontes:[
       {t:'Belastingdienst — Vpb', u:'https://www.belastingdienst.nl'},
       {t:'VAT rates — CE (01/2025)', u:'https://taxation-customs.ec.europa.eu'}
     ], flag:'https://flagcdn.com/w640/nl.png'},

    // Áustria
    {code:'AT', nome:'Áustria', cit:'24%', vat_std:'20%',
     formacao:'GmbH; notário; ambiente estável; ponte para CEE.',
     vistos:'Rotas para fundadores altamente qualificados.',
     burocracia:'Forte deep tech e manufatura.',
     hubs:'Viena, Graz, Linz.',
     fontes:[
       {t:'BMF — Körperschaftsteuer', u:'https://www.bmf.gv.at'},
       {t:'VAT rates — CE (01/2025)', u:'https://taxation-customs.ec.europa.eu'}
     ], flag:'https://flagcdn.com/w640/at.png'},

    // Polónia
    {code:'PL', nome:'Polónia', cit:'19% (CIT standard) / 9% pequenas', vat_std:'23%',
     formacao:'Sp. z o.o.; processos digitais; IP Box 5% para renda qualificada.',
     vistos:'Cartas para TI e Startup Poland iniciativas.',
     burocracia:'Burocracia moderada; talento abundante.',
     hubs:'Varsóvia, Cracóvia, Wrocław, Gdańsk.',
     fontes:[
       {t:'MF — CIT/Estónia‑like regime', u:'https://www.podatki.gov.pl'},
       {t:'VAT rates — CE (01/2025)', u:'https://taxation-customs.ec.europa.eu'}
     ], flag:'https://flagcdn.com/w640/pl.png'},

    // Portugal
    {code:'PT', nome:'Portugal', cit:'21% (taxa geral; PME com faixas reduzidas)', vat_std:'23%',
     formacao:'Empresa Online; 2–3 dias; integração fiscal e segurança social.',
     vistos:'Startup Visa, Tech Visa e nómada digital.',
     burocracia:'Custos moderados; hubs Lisboa/Porto/Braga/Coimbra.',
     hubs:'Lisboa, Porto, Braga, Coimbra.',
     fontes:[
       {t:'AT — IRC', u:'https://www.portaldasfinancas.gov.pt'},
       {t:'VAT rates — CE (01/2025)', u:'https://taxation-customs.ec.europa.eu'}
     ], flag:'https://flagcdn.com/w640/pt.png'},

    // Roménia
    {code:'RO', nome:'Roménia', cit:'16%', vat_std:'19%',
     formacao:'SRL; custos baixos; TI forte.',
     vistos:'Rotas de trabalho qualificado; empreendedor.',
     burocracia:'Mudanças frequentes; ver consultor local.',
     hubs:'Bucareste, Cluj‑Napoca, Iași.',
     fontes:[
       {t:'ANAF — Corporate tax', u:'https://www.anaf.ro'},
       {t:'VAT rates — CE (01/2025)', u:'https://taxation-customs.ec.europa.eu'}
     ], flag:'https://flagcdn.com/w640/ro.png'},

    // Eslovénia
    {code:'SI', nome:'Eslovénia', cit:'22%', vat_std:'22%',
     formacao:'d.o.o.; portal SPOT; logística alpina.',
     vistos:'Residência por negócio e tech.',
     burocracia:'Pequeno mercado, boa qualidade de vida.',
     hubs:'Liubliana, Maribor.',
     fontes:[
       {t:'FURS — Corporate tax', u:'https://www.fu.gov.si'},
       {t:'VAT rates — CE (01/2025)', u:'https://taxation-customs.ec.europa.eu'}
     ], flag:'https://flagcdn.com/w640/si.png'},

    // Eslováquia
    {code:'SK', nome:'Eslováquia', cit:'21%', vat_std:'20%',
     formacao:'s.r.o.; processos diretos; custos baixos.',
     vistos:'Rotas para fundadores/tech.',
     burocracia:'Admin ainda com papelada em alguns casos.',
     hubs:'Bratislava, Košice.',
     fontes:[
       {t:'FR SR — Corporate tax', u:'https://www.financnasprava.sk'},
       {t:'VAT rates — CE (01/2025)', u:'https://taxation-customs.ec.europa.eu'}
     ], flag:'https://flagcdn.com/w640/sk.png'},

    // Finlândia
    {code:'FI', nome:'Finlândia', cit:'20%', vat_std:'24%',
     formacao:'Oy; PRH; ambiente digital; alta educação.',
     vistos:'Startup Permit; residence para fundadores.',
     burocracia:'Custos altos; estabilidade e P&D.',
     hubs:'Helsínquia, Espoo, Tampere.',
     fontes:[
       {t:'Vero — Corporate tax', u:'https://www.vero.fi'},
       {t:'VAT rates — CE (01/2025)', u:'https://taxation-customs.ec.europa.eu'}
     ], flag:'https://flagcdn.com/w640/fi.png'},

    // Suécia
    {code:'SE', nome:'Suécia', cit:'20.6%', vat_std:'25%',
     formacao:'AB; Bolagsverket; transparência elevada.',
     vistos:'Startup e talentos qualificados.',
     burocracia:'Forte financiamento de inovação (Vinnova).',
     hubs:'Estocolmo, Gotemburgo, Malmö.',
     fontes:[
       {t:'Skatteverket — Corporate tax', u:'https://www.skatteverket.se'},
       {t:'VAT rates — CE (01/2025)', u:'https://taxation-customs.ec.europa.eu'}
     ], flag:'https://flagcdn.com/w640/se.png'}
  ];

  // Verificar se todos os 27 membros estão presentes
  const expected = ['BE','BG','CZ','DK','DE','EE','IE','GR','ES','FR','HR','IT','CY','LV','LT','LU','HU','MT','NL','AT','PL','PT','RO','SI','SK','FI','SE'];
  const missing = expected.filter(c=>!data.find(d=>d.code===c));
  if(missing.length){ console.warn('Faltando países:', missing); }
  return data;
}

function renderTable(countries){
  const host = document.getElementById('table-cit-vat');
  const rows = countries.map(c=>`<tr><td>${c.nome}</td><td>${c.cit}</td><td>${c.vat_std}</td><td>${c.hubs}</td></tr>`).join('');
  host.innerHTML = `<table class="rtable"><thead><tr><th>País</th><th>CIT</th><th>IVA padrão</th><th>Principais hubs</th></tr></thead><tbody>${rows}</tbody></table>`;
}

function countrySection(c){
  return `<section data-background-gradient>
    <h2>${c.nome}</h2>
    <div class="country-card">
      <img class="flag" src="${c.flag}" alt="${c.nome}">
      <div>
        <div>
          <span class="pill">CIT: ${c.cit}</span>
          <span class="pill">IVA: ${c.vat_std}</span>
        </div>
        <h3>Vantagens & hubs</h3>
        <p>${c.hubs}</p>
        <h3>Formação</h3>
        <p>${c.formacao}</p>
        <h3>Vistos/Residência</h3>
        <p>${c.vistos}</p>
        <h3>Burocracia & notas</h3>
        <p>${c.burocracia}</p>
        <div class="citations">
          ${c.fontes.map(f=>`<div class="source">• <a href="${f.u}" target="_blank" rel="noreferrer noopener">${f.t}</a></div>`).join('')}
        </div>
      </div>
    </div>
  </section>`;
}

function renderCountrySlides(countries){
  const slidesRoot = document.querySelector('.slides');
  const anchor = document.getElementById('paises');
  countries.forEach(c=>{
    anchor.insertAdjacentHTML('afterend', countrySection(c));
  });
}

function renderSources(countries){
  const all = new Map();
  countries.forEach(c=>c.fontes.forEach(f=> all.set(f.u, f.t)));
  const host = document.getElementById('fontes-list');
  host.innerHTML = Array.from(all.entries()).map(([u,t])=>`<div class="source">• <a href="${u}" target="_blank" rel="noreferrer noopener">${t}</a></div>`).join('');
}
