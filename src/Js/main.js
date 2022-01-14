import verificarFormula from './verificarFormula.js';
import subFormula from './subFormula.js';
import complexidade from './complexidade.js';

const main = () => {
    const formula = document.getElementById('formula').value;
    let menssagem = "";
    let i;
    console.log(formula);
    let tamanho = formula.length;

    if (verificarFormula(formula, tamanho) == 0){
        menssagem = "Status: Não é uma formula proposicional."
        document.getElementById("menssagem").innerHTML = menssagem;
    } else {
        menssagem = "Status: É uma formula proposicional."
        document.getElementById("menssagem").innerHTML = menssagem;
        subFormula(formula, tamanho);
        complexidade(formula, tamanho);    
    }
}

document.getElementById("AA").addEventListener("click", main);