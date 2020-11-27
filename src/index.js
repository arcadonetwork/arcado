const dotenv = require('dotenv');
dotenv.config();

const {
  Application,
  utils,
  configDevnet,
  genesisBlockDevnet,
  HTTPAPIPlugin
} = require('lisk-sdk');


const { APIPlugin } = require('./plugins');
const GamesModule = require('./modules/games/GamesModule');
const HallarModule = require('./modules/hallar/HallarModule');

const appConfig = utils.objects.mergeDeep({}, configDevnet, {
  label: 'arcado',
  genesisConfig: {
    communityIdentifier: 'ARCD'
  },
  rpc: {
    enable: true,
    port: 4001,
    mode: 'ws',
  },
});

const app = Application.defaultApplication(genesisBlockDevnet, appConfig);

app.registerModule(HallarModule);
app.registerModule(GamesModule);

app.registerPlugin(HTTPAPIPlugin);
app.registerPlugin(APIPlugin);

app
    .run()
    .then(() => app.logger.info('Arcado node has started'))
    .catch(error => {
        console.error('Faced error in application', error);
        process.exit(0);
    });
