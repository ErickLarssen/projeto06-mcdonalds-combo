// Valores monetários são guardados em CENTAVOS (inteiros) para evitar
// erros de arredondamento com ponto flutuante (ex.: 0.1 + 0.2).
const formatador = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

function formatarMoeda(centavos) {
  return formatador.format(centavos / 100).replace(/ /g, " ");
}

module.exports = { formatarMoeda };
