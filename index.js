const dotenv = require('dotenv');
dotenv.config();

const { Application, genesisBlockDevnet, configDevnet } = require('lisk-sdk');
const CreateRoomTransaction = require('./transactions/create-room');
const JoinRoomTransaction = require('./transactions/join-room')
const StartRoomTransaction = require('./transactions/start-room')
const StopRoomTransaction = require('./transactions/stop-room')

configDevnet.app.label = 'arcado-network';
configDevnet.modules.http_api.access.public = true;

const { ExtendedHTTPApiModule } = require('@moosty/lisk-extended-api');

const app = new Application(genesisBlockDevnet, configDevnet);
app.registerTransaction(CreateRoomTransaction);
app.registerTransaction(JoinRoomTransaction);
app.registerTransaction(StartRoomTransaction);
app.registerTransaction(StopRoomTransaction);

app.registerModule(ExtendedHTTPApiModule, {
  port: 2020,
  limit: 1000,
  assets: ['gameId', 'roomId', 'recipientId', 'type']
});

app
    .run()
    .then(() => app.logger.info('Arcado Network started...'))
    .catch(error => {
        console.error('Faced error in application', error);
        process.exit(0);
    });
