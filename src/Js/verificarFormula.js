import identificar from "./identificar.js";

const verificarFormula = (formula, tamanho) => {
    let ant = 5;
    let identificarVerifica;
    let i;
    let parenteseAberto = 0;
    let parenteseFechado = 0;
    // a#b)>c
    for (const key in formula) {
        if (formula[key] == '(') parenteseAberto++;
        if (formula[key] == ')') parenteseFechado++;
    }
    if (parenteseAberto != parenteseFechado) return 0;
    
    for (i = 0; i < tamanho; i++) {
        identificarVerifica = identificar(formula[i]);        

        if (identificarVerifica >= 0 && identificarVerifica <= 4) {
            //Inicio
            if (i == 0) if (identificarVerifica == 2 || identificarVerifica == 4) return 0;            
            //Meio
            if(identificarVerifica == 0 && ant == 0) return 0;
			if(identificarVerifica == 0 && ant == 4) return 0;

			if(identificarVerifica == 1 && ant == 0) return 0;

			if(identificarVerifica == 2 && ant == 1) return 0;
			if(identificarVerifica == 2 && ant == 2) return 0;

			if(identificarVerifica == 3 && ant == 0) return 0;
			if(identificarVerifica == 4 && ant == 3) return 0;
            //Fim
            if (i == (tamanho - 1) && identificarVerifica == 0) {
                if (ant == 5) return 0;
                else return 1;
            } else if (i == (tamanho - 1) && identificarVerifica == 4) return 1;
            
            ant = identificarVerifica;
        } else {
            return 0;
        }
    }
    return 0;
}

export default verificarFormula;