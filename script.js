const fs = require('fs');

const { chave, letras } = require('./utils');

let { resultado_encriptado, resultado_desencriptado, historico_de_resultados } = require('./utils');

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

const formula_encriptar = (index) => {
	return (index + chave) % letras.length;
};

const formula_desencriptar = (index) => {
	return (index - chave) % letras.length;
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
