import mongoose from 'mongoose';

mongoose
    .connect(
        process.env.MONGODB_URI || '',
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
