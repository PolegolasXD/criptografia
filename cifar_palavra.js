const fs = require('fs');

const { chave, letras } = require('../criptografia/utils');

let { resultado_encriptado, resultado_desencriptado, historico_de_resultados } = require('../criptografia/utils');

const salvar_no_historico = (palavra, encripatada) => {
	historico_de_resultados.push({
		palavra: palavra,
		encriptado: encripatada
	});

	let formatData = `Total de palavras: ${historico_de_resultados.length}\nPalavras registradas:\n\n`;

	historico_de_resultados.map((item) => {
		formatData += `palavra: ${item.palavra}\n\nencriptada: ${item.encriptado}\n\n-------\n\n`;
	});

	fs.writeFile('historico.txt', formatData, (err) => {
		if (err) {
			console.log(err);
		}
	});
};

const tratativas = (palavra) => {
	const palavra_sem_acentos = palavra.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
	const apenas_letras_minusculas = palavra_sem_acentos.toLowerCase();
	const sem_pontuação = apenas_letras_minusculas.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
	const array_de_palavras = sem_pontuação.split('');

	return array_de_palavras;
};

const mod_do_excel = (dividendo, divisor) => {
	// no excel a função MOD faz uma tratativa
	// com números negativos que o javascript
	// faz de uma forma diferente por isso foi
	// necessário uma função para fazer essa tratativa
	// por isso criei a função com a formula do excel para funcionar 

	let resto = dividendo % divisor;
	return resto >= 0 ? resto : resto + divisor;
};

const formula_encriptar = (index) => {
	const dividendo = index + chave;
	const divisor = letras.length;

	return mod_do_excel(dividendo, divisor);
};

const formula_desencriptar = (index) => {
	const dividendo = index - chave;
	const divisor = letras.length;

	return mod_do_excel(dividendo, divisor);
};

const cifrar = (letra, desencriptar) => {
	if (letra === ' ') {
		return ' ';
	} else {
		const index = letras.indexOf(letra);

		if (desencriptar) {
			return letras[formula_desencriptar(index)];
		} else {
			return letras[formula_encriptar(index)];
		}
	}
};

function cifar_palavra(palavra, desencriptar) {
	resultado_encriptado = '';
	resultado_desencriptado = '';

	const palavra_tratada = tratativas(palavra);

	palavra_tratada.map((letra) => {
		if (desencriptar) {
			resultado_desencriptado += cifrar(letra, desencriptar);
		} else {
			const resultado = cifrar(letra);
			resultado_encriptado += resultado;
		}
	});

	salvar_no_historico(palavra, resultado_encriptado);
	return desencriptar ? resultado_desencriptado : resultado_encriptado;
}

module.exports = {
	cifar_palavra
};
