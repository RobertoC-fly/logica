const identificar = (valor) => {	
	if(valor == '-') return 1; //Negacao
	if(valor == '&' || valor == '#' || valor== '>') return 2;//Conectivos
	if(valor == '(') return 3;//Parentese Abrindo
	if(valor == ')') return 4;//Parentese Fechando
    if(typeof valor === 'string') return 0; //Letras
	else return 5; //Null
}

export default identificar;