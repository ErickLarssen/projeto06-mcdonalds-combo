// =====================================================
// ADAPTER - Adapter (adaptador de objeto)
//
// Faz uma bebida do sistema legado (código numérico) se comportar como
// uma Bebida do novo sistema, sem alterar o SistemaLegadoBebidas.
//
//   - HERANÇA:    estende Bebida (Target), então o Combo a aceita
//                 como qualquer outra bebida.
//   - COMPOSIÇÃO: guarda uma referência ao SistemaLegadoBebidas (Adaptee)
//                 e delega a ele a consulta do produto.
// =====================================================
const { Bebida } = require("../cardapio/Bebida");

const TIPOS_LEGADO = {
  REFRIGERANTE: "Refrigerante",
  SUCO: "Suco",
};

// Traduz "SUCO;500;950" -> { tipo: "Suco", tamanhoMl: 500, precoCentavos: 950 }
function traduzirRegistro(registro, codigo) {
  const [tipoLegado, ml, centavos] = String(registro).split(";");
  const tipo = TIPOS_LEGADO[tipoLegado];
  if (!tipo) {
    throw new Error(`Código legado ${codigo}: tipo de bebida desconhecido ("${tipoLegado}").`);
  }
  return { tipo, tamanhoMl: Number(ml), precoCentavos: Number(centavos) };
}

class BebidaLegadaAdapter extends Bebida {
  constructor(sistemaLegado, codigo) {
    // delega a consulta ao sistema legado (Adaptee) e converte a resposta
    const registro = sistemaLegado.consultarProduto(codigo);
    const { tipo, tamanhoMl, precoCentavos } = traduzirRegistro(registro, codigo);

    super(tipo, tamanhoMl, precoCentavos);
    this._sistemaLegado = sistemaLegado; // composição
    this._codigoLegado = codigo;
  }

  getCodigoLegado() {
    return this._codigoLegado;
  }

  getNome() {
    return `${super.getNome()} [legado cód. ${this._codigoLegado}]`;
  }
}

module.exports = BebidaLegadaAdapter;
