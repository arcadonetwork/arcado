const dotenv = require('dotenv');
dotenv.config();

const { Application, genesisBlockDevnet, configDevnet } = require('lisk-sdk');

const { TournamentsModule } = require('./modules/tournaments/TournamentsModule');
const { GamesModule } = require('./modules/games/GamesModule');

const app = Application.defaultApplication(genesisBlockDevnet, configDevnet);

app.registerModule(TournamentsModule);
app.registerModule(GamesModule);

app
    .run()
    .then(() => app.logger.info('Arcado Network started...'))
    .catch(error => {
        console.error('Faced error in application', error);
        process.exit(0);
    });
