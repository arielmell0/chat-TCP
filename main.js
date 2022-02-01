const net = require('net')
const chatServer = net.createServer()
const clientList = []


const broadcast = (message, client) => {
    clientList
        .filter(item => item !== client)
        .forEach(item => item.write(message))
}

chatServer.on('connection', (client) => {
    client.write('Olá convidado' + '!\n')
})

client.on('end', () => {
    console.log('Convidado saiu...', clientList.indexOf(client))
    clientList.splice(clientList.indexOf(client), 1)
})