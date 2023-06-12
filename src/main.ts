import 'dotenv/config';
import express from 'express';
import chalk from 'chalk';
import dayjs from 'dayjs';
import config from './config';
import routes from './route';

const app = express();

app.use(express.static('./assets'));
app.use('/', routes);

app.listen(config.PORT, () => {
  console.log(chalk.green('✅', `Running success on ${chalk.bgCyanBright(config.PORT)}`, dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss')))
})