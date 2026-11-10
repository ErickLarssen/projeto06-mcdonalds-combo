// =====================================================
// BRIDGE - Abstraction
//
// O Combo NÃO herda de lanche, bebida ou batata, nem existe uma classe
// para cada combinação (BigMacRefri500BatataMedia...). Em vez disso, ele
// GUARDA REFERÊNCIAS (composição) para os objetos das hierarquias de
// implementação: Lanche, Bebida e Batata. Essa referência é a "ponte".
//
// Assim, os dois lados variam de forma independente:
//   - Abstração:     tipos de combo (ComboTradicional, ComboPromocional)
//   - Implementação: itens (BigMac, Suco 700 ml, Batata grande...)
// e os itens podem ser trocados em tempo de execução.
// =====================================================
const { Lanche } = require("../cardapio/Lanche");
const { Bebida } = require("../cardapio/Bebida");
const { Batata } = require("../cardapio/Batata");
const { formatarMoeda } = require("../util/moeda");

class Combo {
  constructor(nome, lanche, bebida, batata) {
    if (new.target === Combo) {
      throw new Error("Combo é abstrata: use ComboTradicional ou ComboPromocional.");
    }
    this.nome = nome;
    // a "ponte": referências para as implementações
    this.trocarLanche(lanche);
    this.trocarBebida(bebida);
    this.trocarBatata(batata);
  }

  // ---------- Personalização em tempo de execução ----------
  trocarLanche(lanche) {
    if (!(lanche instanceof Lanche)) {
      throw new TypeError(`${this.nome}: o lanche informado não é válido.`);
    }
    this._lanche = lanche;
    return this;
  }

  trocarBebida(bebida) {
    // Qualquer objeto que siga a interface Bebida é aceito,
    // inclusive bebidas vindas do sistema legado por meio do Adapter.
    if (!(bebida instanceof Bebida)) {
      throw new TypeError(`${this.nome}: a bebida informada não é válida.`);
    }
    this._bebida = bebida;
    return this;
  }

  trocarBatata(batata) {
    if (!(batata instanceof Batata)) {
      throw new TypeError(`${this.nome}: a batata informada não é válida.`);
    }
    this._batata = batata;
    return this;
  }

  getLanche() { return this._lanche; }
  getBebida() { return this._bebida; }
  getBatata() { return this._batata; }

  getItens() {
    return [this._lanche, this._bebida, this._batata];
  }

  // ---------- Preço ----------
  getSubtotal() {
    return this.getItens().reduce((soma, item) => soma + item.getPreco(), 0);
  }

  // método abstrato: cada tipo de combo define seu desconto
  getPercentualDesconto() {
    throw new Error("Método abstrato: implemente getPercentualDesconto().");
  }

  // método abstrato: descrição do tipo de combo
  getTipo() {
    throw new Error("Método abstrato: implemente getTipo().");
  }

  getDesconto() {
    return Math.round((this.getSubtotal() * this.getPercentualDesconto()) / 100);
  }

  getTotal() {
    return this.getSubtotal() - this.getDesconto();
  }

  // ---------- Exibição no terminal ----------
  descrever() {
    const linhaItem = item =>
      `│  ${(item.getCategoria() + ":").padEnd(8)} ${item.getNome().padEnd(42)} ${formatarMoeda(item.getPreco()).padStart(10)}`;

    return [
      `┌─ ${this.nome} · ${this.getTipo()}`,
      ...this.getItens().map(linhaItem),
      `│  ${"".padEnd(8)} ${"Subtotal".padEnd(42)} ${formatarMoeda(this.getSubtotal()).padStart(10)}`,
      `│  ${"".padEnd(8)} ${`Desconto (${this.getPercentualDesconto()}%)`.padEnd(42)} ${("-" + formatarMoeda(this.getDesconto())).padStart(10)}`,
      `└─ ${"".padEnd(8)} ${"TOTAL DO COMBO".padEnd(42)} ${formatarMoeda(this.getTotal()).padStart(10)}`,
    ].join("\n");
  }
}

module.exports = Combo;
