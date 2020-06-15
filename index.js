const { Application, genesisBlockDevnet, configDevnet } = require('lisk-sdk');
const CreateRoomTransaction = require('./transactions/create-room');
const JoinRoomTransaction = require('./transactions/join-room')
const StartRoomTransaction = require('./transactions/start-room')
const StopRoomTransaction = require('./transactions/stop-room')

configDevnet.app.label = 'arcado-network';
configDevnet.modules.http_api.access.public = true;

const app = new Application(genesisBlockDevnet, configDevnet);
app.registerTransaction(CreateRoomTransaction);
app.registerTransaction(JoinRoomTransaction);
app.registerTransaction(StartRoomTransaction);
app.registerTransaction(StopRoomTransaction);

app
    .run()
    .then(() => app.logger.info('Arcado Network started...'))
    .catch(error => {
        console.error('Faced error in application', error);
        process.exit(0);
    });