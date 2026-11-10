// =====================================================
// ItemCardapio - classe base (abstrata) de todos os itens do combo.
// Define a interface comum que o Combo usa: getNome(), getPreco(), getCategoria().
// =====================================================
class ItemCardapio {
  constructor(nome, precoCentavos) {
    if (new.target === ItemCardapio) {
      throw new Error("ItemCardapio é abstrata e não pode ser instanciada diretamente.");
    }
    if (!Number.isInteger(precoCentavos) || precoCentavos < 0) {
      throw new Error(`Preço inválido para "${nome}".`);
    }
    this._nome = nome;
    this._precoCentavos = precoCentavos;
  }

  getNome() {
    return this._nome;
  }

  getPreco() {
    return this._precoCentavos;
  }

  getCategoria() {
    throw new Error("Método abstrato: as subclasses devem implementar getCategoria().");
  }
}

module.exports = ItemCardapio;
