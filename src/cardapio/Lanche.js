// =====================================================
// BRIDGE - Implementor (lanches)
// Lanche é a hierarquia de IMPLEMENTAÇÃO usada pelo Combo.
// Novos lanches entram aqui sem afetar os combos existentes.
// =====================================================
const ItemCardapio = require("./ItemCardapio");

class Lanche extends ItemCardapio {
  constructor(nome, precoCentavos) {
    if (new.target === Lanche) {
      throw new Error("Lanche é abstrata: use BigMac, Quarteirao ou McFish.");
    }
    super(nome, precoCentavos);
  }

  getCategoria() {
    return "Lanche";
  }
}

// ConcreteImplementors
class BigMac extends Lanche {
  constructor() {
    super("Big Mac", 2490);
  }
}

class Quarteirao extends Lanche {
  constructor() {
    super("Quarteirão", 2690);
  }
}

class McFish extends Lanche {
  constructor() {
    super("McFish", 2290);
  }
}

module.exports = { Lanche, BigMac, Quarteirao, McFish };
