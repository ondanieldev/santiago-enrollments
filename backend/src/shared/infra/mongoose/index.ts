import mongoose from 'mongoose';

const user = process.env.MONGO_USER;
const pass = process.env.MONGO_PASSWORD;
const host = process.env.MONGO_HOST;
const port = process.env.MONGO_PORT ? `:${process.env.MONGO_PORT}` : '';
const dtbs = process.env.MONGO_DATABASE;

mongoose
    .connect(
        `mongodb+srv://${user}:${pass}@${host}${port}/${dtbs}?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    )
    .then(() => {
        const msg = 'MongoDB connected!';
        console.log('\x1b[42m\x1b[30m%s', msg, '\x1b[0m');
    })
    .catch(err => {
        const msg = 'ERRO! Não foi possível conectar com o MongoDB!';
        console.log(err);
        console.log('\x1b[41m\x1b[30m%s', msg, '\x1b[0m');
    });
