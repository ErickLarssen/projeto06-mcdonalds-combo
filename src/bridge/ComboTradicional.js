// =====================================================
// BRIDGE - RefinedAbstraction
// Combo do cardápio normal: 10% de desconto sobre a soma dos itens.
// =====================================================
const Combo = require("./Combo");

class ComboTradicional extends Combo {
  getPercentualDesconto() {
    return 10;
  }

  getTipo() {
    return "Combo Tradicional";
  }
}

module.exports = ComboTradicional;
