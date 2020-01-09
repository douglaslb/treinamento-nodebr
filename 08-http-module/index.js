const http = require('http')

http.createServer((resquest, response) => {
    response.end('Hello Node!!!')
})
    .listen(4000, () => console.log('O servidor está rodando!!!'))