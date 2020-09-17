import mongoose from 'mongoose';

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@santiago.lorra.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    )
    .catch(err => {
        const msg = 'ERRO! Não foi possível conectar com o MongoDB!';
        console.log(err);
        console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m');
    });
