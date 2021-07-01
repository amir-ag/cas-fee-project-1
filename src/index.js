import express from 'express';
import {dirname, join} from 'path';
import bodyParser from 'body-parser';
import {fileURLToPath} from 'url';
import noteRoutes from './routes/noteRoutes.js';

const currentDir = dirname(fileURLToPath(import.meta.url));

const app = express();
let port = process.env.PORT;
if (port == null || port === '') {
    port = 8000;
}

app.use(express.static(join(currentDir, '/public')));
app.use(bodyParser.json());
app.use('/notes', noteRoutes);

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Note app listening at http://localhost:${port}`);
});
