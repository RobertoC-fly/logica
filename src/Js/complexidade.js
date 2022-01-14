import identificar from "./identificar.js";

const complexidade = (formula, tamanho) => {
    let i;
    let aux;
    let result = 0;

    for (i = 0; i < tamanho; i++) {
        aux = identificar(formula[i]);
        if (aux >= 0 && aux <= 2) result++; //A cada letra, negacao ou conectivo � adicionado 1 na complexidade
    }

    console.log("Complexidade: " + result);
}

export default complexidade;