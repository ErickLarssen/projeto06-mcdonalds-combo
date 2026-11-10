// =====================================================
// BRIDGE - Implementor (batata frita)
// O tamanho é um parâmetro: uma única classe cobre pequena, média e grande.
// =====================================================
const ItemCardapio = require("./ItemCardapio");

const TAMANHOS_BATATA = {
  PEQUENA: { rotulo: "pequena", preco: 790 },
  MEDIA:   { rotulo: "média",   preco: 990 },
  GRANDE:  { rotulo: "grande",  preco: 1190 },
};

class Batata extends ItemCardapio {
  constructor(tamanho) {
    const chave = String(tamanho || "").toUpperCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    const dados = TAMANHOS_BATATA[chave];
    if (!dados) {
      throw new Error(`Tamanho de batata inválido: "${tamanho}". Use PEQUENA, MEDIA ou GRANDE.`);
    }
    super(`Batata frita ${dados.rotulo}`, dados.preco);
    this._tamanho = chave;
  }

  getTamanho() {
    return this._tamanho;
  }

  getCategoria() {
    return "Batata";
  }
}

module.exports = { Batata, TAMANHOS_BATATA };
