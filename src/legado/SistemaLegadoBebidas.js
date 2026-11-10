// =====================================================
// ADAPTER - Adaptee (sistema legado)
//
// ATENÇÃO: este arquivo representa o sistema antigo da empresa.
// Ele NÃO deve ser modificado. Sua interface é incompatível com o novo
// sistema: identifica bebidas por CÓDIGO NUMÉRICO e devolve um texto
// no formato "TIPO;ML;PRECO_EM_CENTAVOS".
//
//   101, 102, 103 -> refrigerante 300, 500 e 700 ml
//   201, 202, 203 -> suco         300, 500 e 700 ml
// =====================================================
class SistemaLegadoBebidas {
  constructor() {
    this.catalogo = {
      101: "REFRIGERANTE;300;650",
      102: "REFRIGERANTE;500;850",
      103: "REFRIGERANTE;700;1050",
      201: "SUCO;300;750",
      202: "SUCO;500;950",
      203: "SUCO;700;1150",
    };
  }

  consultarProduto(codigo) {
    var registro = this.catalogo[codigo];
    if (!registro) {
      throw new Error("ERRO LEGADO: CODIGO " + codigo + " NAO CADASTRADO");
    }
    return registro;
  }

  listarCodigos() {
    return Object.keys(this.catalogo).map(Number);
  }
}

module.exports = SistemaLegadoBebidas;
