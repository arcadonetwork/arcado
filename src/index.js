const dotenv = require('dotenv');
dotenv.config();

const { Application, genesisBlockDevnet, configDevnet } = require('lisk-sdk');
const CreateGameTransaction = require('./transactions/create-game');
const CreateTournamentTransaction = require('./transactions/create-tournament');
const JoinTournamentTransaction = require('./transactions/join-tournament')
const StartTournamentTransaction = require('./transactions/start-tournament')
const StopTournamentTransaction = require('./transactions/stop-tournament')

configDevnet.app.label = 'arcado-network';

const { ExtendedHTTPApiModule } = require('@moosty/lisk-extended-api');

const app = new Application(genesisBlockDevnet, configDevnet);
app.registerTransaction(CreateGameTransaction);
app.registerTransaction(CreateTournamentTransaction);
app.registerTransaction(JoinTournamentTransaction);
app.registerTransaction(StartTournamentTransaction);
app.registerTransaction(StopTournamentTransaction);

app.registerModule(ExtendedHTTPApiModule, {
  port: 2020,
  limit: 1000,
  assets: ['gameId', 'tournamentId', 'recipientId', 'type']
});

app
    .run()
    .then(() => app.logger.info('Arcado Network started...'))
    .catch(error => {
        console.error('Faced error in application', error);
        process.exit(0);
    });
