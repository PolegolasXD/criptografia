let resultado_encriptado = '';
let resultado_desencriptado = '';

let historico_de_resultados = [];

const letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const caracteres_especiais = ['.', ' ', ',', '/', '#', '!', '$', '%', '^', '&', '*', ';', ':', '{', '}', '=', '-', '_', '`', '~', '(', ')'];
const chave = 5;

module.exports = {
	letras,
	chave,
	resultado_encriptado,
	resultado_desencriptado,
	historico_de_resultados,
	caracteres_especiais
};
