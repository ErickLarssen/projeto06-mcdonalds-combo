// =====================================================
// Sistema de personalização de combos - demonstração no terminal
// Padrões estruturais GoF: BRIDGE + ADAPTER
// =====================================================
const { BigMac, Quarteirao, McFish } = require("./src/cardapio/Lanche");
const { Refrigerante, Suco } = require("./src/cardapio/Bebida");
const { Batata } = require("./src/cardapio/Batata");
const ComboTradicional = require("./src/bridge/ComboTradicional");
const ComboPromocional = require("./src/bridge/ComboPromocional");
const SistemaLegadoBebidas = require("./src/legado/SistemaLegadoBebidas");
const BebidaLegadaAdapter = require("./src/adapter/BebidaLegadaAdapter");
const { formatarMoeda } = require("./src/util/moeda");

const LARGURA = 72;
const titulo = texto => {
  console.log("\n" + "═".repeat(LARGURA));
  console.log(" " + texto);
  console.log("═".repeat(LARGURA));
};
const passo = texto => console.log(`\n▶ ${texto}`);

console.log("🍔  SISTEMA DE COMBOS — Padrões GoF Bridge + Adapter");
console.log("    3 lanches × 6 bebidas (2 tipos × 3 tamanhos) × 3 batatas = 54 combinações");
console.log("    possíveis, sem nenhuma classe específica por combinação.");

// -----------------------------------------------------
// 1. BRIDGE: montagem de cinco combos diferentes
// -----------------------------------------------------
titulo("1. MONTAGEM DE COMBOS (Bridge)");

const combos = [
  new ComboTradicional("Combo 1", new BigMac(), new Refrigerante(500), new Batata("MEDIA")),
  new ComboTradicional("Combo 2", new Quarteirao(), new Suco(300), new Batata("PEQUENA")),
  new ComboTradicional("Combo 3", new McFish(), new Refrigerante(700), new Batata("GRANDE")),
  new ComboPromocional("Combo 4", new BigMac(), new Suco(700), new Batata("GRANDE"), "Terça do Big Mac", 20),
  new ComboPromocional("Combo 5", new Quarteirao(), new Refrigerante(300), new Batata("MEDIA"), "Happy Hour", 15),
];

combos.forEach(combo => console.log("\n" + combo.descrever()));

// -----------------------------------------------------
// 2. BRIDGE: personalização em tempo de execução
// -----------------------------------------------------
titulo("2. PERSONALIZAÇÃO DE COMBOS EXISTENTES (Bridge)");

const [combo1, combo2, combo3, combo4] = combos;

passo("Combo 1: trocar a bebida (Refrigerante 500 ml → Suco 700 ml)");
console.log("ANTES:\n" + combo1.descrever());
combo1.trocarBebida(new Suco(700));
console.log("DEPOIS:\n" + combo1.descrever());

passo("Combo 2: trocar o tamanho da batata (pequena → grande)");
console.log("ANTES:\n" + combo2.descrever());
combo2.trocarBatata(new Batata("GRANDE"));
console.log("DEPOIS:\n" + combo2.descrever());

passo("Combo 3: trocar bebida E batata de uma vez (encadeando métodos)");
console.log("ANTES:\n" + combo3.descrever());
combo3.trocarBebida(new Suco(500)).trocarBatata(new Batata("PEQUENA"));
console.log("DEPOIS:\n" + combo3.descrever());

passo("Combo 4: trocar o tamanho da bebida mantendo o tipo (Suco 700 ml → Suco 300 ml)");
combo4.trocarBebida(new Suco(300));
console.log(combo4.descrever());

// -----------------------------------------------------
// 3. ADAPTER: bebidas do sistema legado
// -----------------------------------------------------
titulo("3. INTEGRAÇÃO COM O SISTEMA LEGADO (Adapter)");

const sistemaLegado = new SistemaLegadoBebidas();

passo("O sistema legado só entende códigos e devolve texto no formato próprio:");
sistemaLegado.listarCodigos().forEach(codigo => {
  console.log(`   consultarProduto(${codigo}) → "${sistemaLegado.consultarProduto(codigo)}"`);
});

passo("Convertendo cada código com o BebidaLegadaAdapter:");
sistemaLegado.listarCodigos().forEach(codigo => {
  const bebida = new BebidaLegadaAdapter(sistemaLegado, codigo);
  console.log(`   ${codigo} → ${bebida.getTipo()} ${bebida.getTamanhoMl()} ml · ${formatarMoeda(bebida.getPreco())}`);
});

passo("Criando um NOVO combo com a bebida legada de código 202 (Suco 500 ml):");
const sucoLegado = new BebidaLegadaAdapter(sistemaLegado, 202);
const combo6 = new ComboTradicional("Combo 6", new McFish(), sucoLegado, new Batata("MEDIA"));
combos.push(combo6);
console.log(combo6.descrever());

passo("Trocando a bebida do Combo 5 por uma bebida legada (código 103 — Refrigerante 700 ml):");
const combo5 = combos[4];
combo5.trocarBebida(new BebidaLegadaAdapter(sistemaLegado, 103));
console.log(combo5.descrever());

passo("Tratamento de erro: código legado inexistente (999)");
try {
  new BebidaLegadaAdapter(sistemaLegado, 999);
} catch (erro) {
  console.log(`   ✖ ${erro.message}`);
}

passo("Tratamento de erro: tentar colocar uma batata no lugar da bebida");
try {
  combo6.trocarBebida(new Batata("GRANDE"));
} catch (erro) {
  console.log(`   ✖ ${erro.message}`);
}

// -----------------------------------------------------
// 4. Resumo do pedido
// -----------------------------------------------------
titulo("4. RESUMO DO PEDIDO");

combos.forEach(combo => {
  const itens = combo.getItens().map(item => item.getNome()).join(" + ");
  console.log(`${combo.nome.padEnd(8)} ${formatarMoeda(combo.getTotal()).padStart(10)}  ${itens}`);
});

const totalPedido = combos.reduce((soma, combo) => soma + combo.getTotal(), 0);
console.log("─".repeat(LARGURA));
console.log(`${"TOTAL".padEnd(8)} ${formatarMoeda(totalPedido).padStart(10)}  (${combos.length} combos)`);
console.log("\n✔ Demonstração concluída.\n");
