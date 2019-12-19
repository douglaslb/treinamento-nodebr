
function ObterUsuario() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve({
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date()
            })
        }, 1000)
    })
}

function ObterTelefone(idUsuario) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve({
                telefone: '110050505',
                ddd: 11
            })
        }, 2000)
    })
}

function ObterEndereco(idUsuario) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve({
                rua: 'dos bobos',
                numero: 0
            })
        }, 2000)
    })
}


const usuarioPromise = ObterUsuario();

usuarioPromise
    .then((usuario) => {
        return ObterTelefone(usuario.id)
            .then((result) => {
                return {
                    usuario: {
                        nome: usuario.nome,
                        id: usuario.id
                    },
                    telefone: result
                }
            })
    })
    .then((resultado) => {
        return ObterEndereco(resultado.usuario.id)
            .then((result) => {
                return {
                    usuario: resultado.usuario,
                    telefone: resultado.telefone,
                    endereco: result
                }
            })
    })
    .then((resultado) => {
        console.table(`
            Nome: ${resultado.usuario.nome},
            Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero},
            Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
        `)
    })
    .catch((erro) => {
        console.error('DEU RUIM', erro)
    })

// ObterUsuario((error, usuario) => {
//     if (error) {
//         console.error('DEU RUIM em USUARIO', error);
//         return;
//     }
//     ObterTelefone(usuario.id, (error1, telefone) => {
//         if (error1) {
//             console.error('DEU RUIM em TELEFONE', error1);
//             return;
//         }
//         ObterEndereco(usuario.id, (error2, endereco) => {
//             if (error2) {
//                 console.error('DEU RUIM em ENDERECO', error2);
//                 return;
//             }
//             console.log(`
//                 Nome: ${usuario.nome},
//                 Endereco: ${endereco.rua}, ${endereco.numero},
//                 Telefone: (${telefone.ddd})${telefone.telefone};

//             `)
//         });
//     });
// });
