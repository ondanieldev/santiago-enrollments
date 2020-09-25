import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@santiago.lorra.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    )
    .then(res => {
        const msg = 'MongoDB connected!';
        console.log('\x1b[42m\x1b[30m%s', msg, '\x1b[0m');
        autoIncrement.initialize(res.connection);
    })
    .catch(err => {
        const msg = 'ERRO! Não foi possível conectar com o MongoDB!';
        console.log(err);
        console.log('\x1b[41m\x1b[30m%s', msg, '\x1b[0m');
    });
