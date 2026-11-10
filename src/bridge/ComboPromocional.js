// =====================================================
// BRIDGE - RefinedAbstraction
// Combo de promoção, com nome e desconto configuráveis.
// Usa exatamente os mesmos itens do ComboTradicional: o lado da
// abstração mudou sem precisar mexer no lado da implementação.
// =====================================================
const Combo = require("./Combo");

class ComboPromocional extends Combo {
  constructor(nome, lanche, bebida, batata, nomePromocao, percentualDesconto = 20) {
    super(nome, lanche, bebida, batata);
    if (!Number.isInteger(percentualDesconto) || percentualDesconto < 0 || percentualDesconto > 50) {
      throw new Error("O desconto promocional deve ser um inteiro entre 0 e 50%.");
    }
    this._nomePromocao = nomePromocao;
    this._percentualDesconto = percentualDesconto;
  }

  getPercentualDesconto() {
    return this._percentualDesconto;
  }

  getTipo() {
    return `Combo Promocional "${this._nomePromocao}"`;
  }
}

module.exports = ComboPromocional;
