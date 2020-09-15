import mongoose from 'mongoose';

mongoose
    .connect('mongodb://localhost:27017/santiago', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch(() => {
        const msg = 'ERRO! Não foi possível conectar com o MongoDB!';
        console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m');
    });
