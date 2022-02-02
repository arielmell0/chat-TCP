const net = require('net')
const chatServer = net.createServer()
const clientList = []

const broadcast = (message, client) => {
    clientList
        .filter(item => item !== client)
        .forEach(item => item.write(message))
}

chatServer.on('connection', client => {
    client.write('Bem vindo ao chat TCP convidado!\n')
    clientList.push(client)
    client.on('data', data => broadcast(data, client))
    client.on('end', () => {
        console.log('Convidado saiu...', clientList.indexOf(client))
        clientList.splice(clientList.indexOf(client), 1)
    })
    client.on('error', error => console.log('Ops, algum erro ocorreu: \n', error))
})

chatServer.listen(9000)