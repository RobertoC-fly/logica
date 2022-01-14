import identificar from "./identificar.js";

const subFormula = (formula, tamanho) => {
    let aux;
    let ver = 1;
    let cont;
    let i;
    let j;

    const test = [];
    const test2 = [];
    const test3 = [];

    const subFormulaUm = [];
    const subFormulaDois = [];

    console.log("Subformula: ");

    for (i = 0; i < tamanho; i++) {
        aux = identificar(formula[i]);

        //Letras
        if (aux == 0) {
            for (j = 0; j < i; j++) {
                if (formula[j] == formula[i]) {
                    ver = 0;
                    break;
                }
            }
            if (ver == 1){ 
                //console.log(formula[i]);
                test.push(formula[i]);
            }
            ver = 1;
        }

        //Negacao
        if (aux == 1) {
            if (identificar(formula[i+1]) == 0) { //Negacao seguido de letra
                for (j = 0; j < i; j++) { //Verificar se o valor ja nao foi digitado
                    if (formula[i] == formula[j] && formula[i+1] == formula[j+1]) {
                        ver = 0;
                        break;
                    }
                }
                if (ver == 1) {
                    //console.log("-" + formula[i+1]);
                    test2.push(("-" + formula[i+1]));
                }
                ver = 1;
            } else { //Negacao seguido de parentese
                //console.log("-");
                test2.push("-");
                j = i+1;
                cont = 0;
                
                do { //Enquanto for diferente de )
                    if (formula[j] == '(') cont++; //Caso abra mais de um parentese
                    else if (formula[j] == ')') cont--;
                    
                    //console.log(formula[j]);
                    test2.push(formula[j]);
                    j++;
                } while (formula[j] != ')' && cont != 0);
                //console.log(')');
                test2.push(")");
            }
        }

        /*preciso adicionar algo que fa�a a verifica��o de formulas proposicionais que iniciem com parentese, para assim poder
		dividir ap�s encontrar uma implica��o ou algo do tipo*/

        if (aux == 2) { //Conectivos
            if(formula[i-2] == "-") {//Printa negacao caso o valor anterior estiver negando
                //console.log("-");
                test3.push("-");
            } 
            if(formula[i-1] == ")") { //Caso o valor anterior ao conectivo seja um parentese
                j = i-1;
                cont = 0;

                do {
                    if (formula[j] == ")") cont++;
                    else if(formula[j] == "(") cont--;
                    j--;
                } while (formula[j] != 40 && cont != 0);

                if (formula[j-1] == "-") {
                    //console.log("-")
                    test3.push("-");
                }

                while (j != i-1) {
                    //console.log(formula[j]);
                    test3.push(formula[j]);
                    j++;
                }
            }

            //console.log(formula[i-1], formula[i]); //Printa o valor anterior e o conectivo
            test3.push(formula[i-1], formula[i]);

            if (identificar(formula[i+1]) == 0) {//Printa caso o valor seguinte for letra
                //console.log(formula[i+1]);
                test3.push(formula[i+1]);
            }

            if (formula[i+1] == "(") { //Caso o valor ap�s o conectivo for parentese, printa ate seu fechamento
                j = i+1;
                cont = 0;

                do {
                    if (formula[j] == "(") cont++;
                    else if (formula[j] == ")") cont--;

                    //console.log(formula[j]);
                    test3.push(formula[j]);
                    j++;
                } while (formula[j] != ")" && cont != 0);
                //console.log(")");
                test3.push(")");
            }

            if (formula[i+1] == "-") { //Caso negacao apos o conectivo
                if (formula[i+2] != "(") {//Caso a negacao acompanhe uma letra
                    //console.log(formula[i+1], formula[i+2]);
                    test3.push(formula[i+1], formula[i+2]);
                } 
                else { //Caso a necacao acompanhe um parentese
                    j = i+2;
                    cont = 0;

                    do {
                        if (formula[j] == "(") cont++;
                        else if (formula[j] == ")") cont--;

                        //console.log(formula[j]);
                        test3.push(formula[j]);
                        j++;
                    } while (formula[j] != ")" && cont != 0);
                    //console.log(")");
                    test3.push(")");
                }
            }
        }
    }

    //(p>p)
    let parada;
    let parentese = 0;
    let posicao = 0;
    let index = 0;

    for (index = 0; index <= formula.length; index++) {
        subFormulaUm.push(formula[index])
    }
    for (index = 0; index < subFormulaUm.length; index++) {
        if (
            subFormulaUm[index] == ">"
            && subFormulaUm[index - 1] != '(' 
            && subFormulaUm[index - 1] != '#' 
            && subFormulaUm[index - 1] != '&' 
            && subFormulaUm[index - 1] != ')'            
            && subFormulaUm[index - 1] != '>'
        ) {
            subFormulaUm[index - 1] = "-" + subFormulaUm[index - 1]
            subFormulaUm[index] = "#"
        }else if (
            subFormulaUm[index] == ">"
            && subFormulaUm[index - 1] == ')'
        ) {
            parentese = 1
            posicao = index;
            while (parentese != 0) {
                subFormulaUm[posicao] == '(' ? parentese-- : posicao--                
            }
            subFormulaUm[posicao] = "-" + subFormulaUm[posicao]
            subFormulaUm[index] = "#"
        }
    }
    for (index = 0; index < subFormulaUm.length; index++) {
        if (
            subFormulaUm[index] == ">"
            && subFormulaUm[index - 1] != '(' 
            && subFormulaUm[index - 1] != '#' 
            && subFormulaUm[index - 1] != '&' 
            && subFormulaUm[index - 1] != ')'            
            && subFormulaUm[index - 1] != '>'
        ) {
            subFormulaUm[index - 1] = "-" + subFormulaUm[index - 1]
            subFormulaUm[index] = "#"
        }else if (
            subFormulaUm[index] == ">"
            && subFormulaUm[index - 1] == ')'
        ) {
            parentese = 1
            posicao = index;
            while (parentese != 0) {
                subFormulaUm[posicao] == '(' ? parentese-- : posicao--                
            }
            subFormulaUm[posicao] = "-" + subFormulaUm[posicao]
            subFormulaUm[index] = "#"
        }
    }
    posicao = 0;
    let re = /-/
    let letras = /[a-z]/i
    parentese = 0;

    for (index = 0; index < subFormulaUm.length; index++) {        
        if (subFormulaUm[index] == "-(" || (subFormulaUm[index] == "-" && subFormulaUm[index + 1] == "(")) {
            subFormulaUm[index] == "-(" ? subFormulaUm[index] = "(" : ''
            posicao = index;            
            while (subFormulaUm[posicao] != ")") {
                if (re.test(subFormulaUm[posicao])) {
                    subFormulaUm[posicao] = '-' + subFormulaUm[posicao]
                }else if (subFormulaUm[posicao] == "#") {
                    subFormulaUm[posicao] = "&" 
                }else if (subFormulaUm[posicao] == "&") {
                    subFormulaUm[posicao] = "#" 
                }else if (letras.test(subFormulaUm[posicao])){
                    subFormulaUm[posicao] = "-" + subFormulaUm[posicao]
                }                
                posicao++
            }
        }
        if (subFormulaUm[index] == "#") {
            if (letras.test(subFormulaUm[index+1])) {
                subFormulaUm[index + 1] = "-" + subFormulaUm[index + 1]
                subFormulaUm[index] = "&"
            }
        }
        

    }
    console.log(subFormulaUm);
    /*
    for (const key in formula) {
        formula[key] == ">" ? parada = key : '';
    }
    for (index = 0; index < parada; index++) {
        subFormulaUm.push(formula[index])
    }
    parada++
    for (index = parada; index < formula.length; index++) {            
        subFormulaDois.push(formula[index])
    }
    
    subFormulaUm.unshift('-')
    if (subFormulaUm[0] == '-' && subFormulaUm[1] == '-') {
        subFormulaUm.shift()
        subFormulaUm.shift()        
    }

    if (subFormulaUm[0] == '-') {
        subFormulaUm.shift()
        for (let index = 0; index < subFormulaUm.length; index++) {
            if (
                subFormulaUm[index] != '(' 
                && subFormulaUm[index] != '#' 
                && subFormulaUm[index] != '&' 
                && subFormulaUm[index] != ')'
                && subFormulaUm[index] != '-'
                && subFormulaUm[index] != '>'
            ) {

                if ( subFormulaUm[index - 1] == '-'  ) {
                    subFormulaUm[index] = subFormulaUm[index]
                    subFormulaUm.splice(index - 1, 1)
                    index = index - 1
                }else {
                    subFormulaUm[index] = '-' + subFormulaUm[index]
                }
                
            }else if ( subFormulaUm[index] == '#' ) {
                subFormulaUm[index] = '&'
            }else if ( subFormulaUm[index] == '&' ) {
                subFormulaUm[index] = '#'
            }
        }
    }
    */
   
    document.getElementById("atomos").innerHTML = '';
    document.getElementById("negacao").innerHTML = subFormulaUm;
    document.getElementById("subformulas").innerHTML = subFormulaDois;
    
}

export default subFormula;