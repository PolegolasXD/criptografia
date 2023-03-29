const readLine = require('./readLine');
const { cifar_palavra } = require('./cifar_palavra');

const principal = () => {
	return readLine.question('\n\n1 - Encriptar \n2 - Desencriptar\n0 - Sair \n\n| ', (resposta) => {
		switch (resposta) {
			case '1':
				encriptar();
				break;
			case '2':
				desencriptar();
				break;
			case '0':
				console.log('\n\nVolte sempre...');
				readLine.close();
				break;
			default:
				console.log('Opção inválida!');
				readLine.close();
				break;
		}
	});
};

const encriptar = () => {
	readLine.question('\n\nDigite a palavra a ser encriptada\n| ', (palavra) => {
		console.log('\nA palavra encriptada é:', cifar_palavra(palavra));
		principal();
	});
};

const desencriptar = () => {
	readLine.question('\n\nDigite a palavra a ser desencriptada\n| ', (palavra) => {
		console.log('\nA palavra desencriptada é:', cifar_palavra(palavra, true));
		principal();
	});
};

console.clear();
principal();
