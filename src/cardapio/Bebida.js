// =====================================================
// BRIDGE - Implementor (bebidas)
// Bebida é a interface ALVO (Target) que o novo sistema conhece.
// O Adapter (BebidaLegadaAdapter) também estende esta classe.
// =====================================================
const ItemCardapio = require("./ItemCardapio");

const TAMANHOS_BEBIDA = [300, 500, 700];

class Bebida extends ItemCardapio {
  constructor(tipo, tamanhoMl, precoCentavos) {
    if (new.target === Bebida) {
      throw new Error("Bebida é abstrata: use Refrigerante, Suco ou BebidaLegadaAdapter.");
    }
    if (!TAMANHOS_BEBIDA.includes(tamanhoMl)) {
      throw new Error(`Tamanho de bebida inválido: ${tamanhoMl} ml. Use ${TAMANHOS_BEBIDA.join(", ")} ml.`);
    }
    super(`${tipo} ${tamanhoMl} ml`, precoCentavos);
    this._tipo = tipo;
    this._tamanhoMl = tamanhoMl;
  }

  getTipo() {
    return this._tipo;
  }

  getTamanhoMl() {
    return this._tamanhoMl;
  }

  getCategoria() {
    return "Bebida";
  }
}

// ConcreteImplementors - o tamanho é um parâmetro, não uma nova classe
const PRECOS_REFRIGERANTE = { 300: 650, 500: 850, 700: 1050 };
const PRECOS_SUCO = { 300: 750, 500: 950, 700: 1150 };

class Refrigerante extends Bebida {
  constructor(tamanhoMl) {
    super("Refrigerante", tamanhoMl, PRECOS_REFRIGERANTE[tamanhoMl]);
  }
}

class Suco extends Bebida {
  constructor(tamanhoMl) {
    super("Suco", tamanhoMl, PRECOS_SUCO[tamanhoMl]);
  }
}

module.exports = { Bebida, Refrigerante, Suco, TAMANHOS_BEBIDA };
