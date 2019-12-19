/*
    0 Obter um usuario
    1 Obter o numero de telefone de um usuario através do seu id
    2 Obter o endereco do usuario pelo id
*/

function ObterUsuario(callback) {
    setTimeout(() => {
        return callback(null, {
            id: 1,
            nome: 'Aladin',
            dataNascimento: new Date()
        })
    }, 1000);
}

function ObterTelefone(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            telefone: '110050505',
            ddd: 11
        })
    }, 2000);
}

function ObterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'dos bobos',
            numero: 0
        })
    }, 2000);
}



ObterUsuario((error, usuario) => {
    if (error) {
        console.error('DEU RUIM em USUARIO', error);
        return;
    }
    ObterTelefone(usuario.id, (error1, telefone) => {
        if (error1) {
            console.error('DEU RUIM em TELEFONE', error1);
            return;
        }
        ObterEndereco(usuario.id, (error2, endereco) => {
            if (error2) {
                console.error('DEU RUIM em ENDERECO', error2);
                return;
            }
            console.log(`
                Nome: ${usuario.nome},
                Endereco: ${endereco.rua}, ${endereco.numero},
                Telefone: (${telefone.ddd})${telefone.telefone};
 
            `)
        });
    });
});
// const telefone = ObterTelefone(usuario.id);

// console.log('telefone', telefone);