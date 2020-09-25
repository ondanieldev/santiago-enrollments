import { Schema, Document, model, HookNextFunction } from 'mongoose';
import { IReenrollment } from '@modules/reenrollment/infra/mongoose/schemas/ReenrollmentSchema';

const CounterSchema = new Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 },
});

interface ICounter extends Document {
    _id: string;
    seq: number;
}

CounterSchema.index({ _id: 1, seq: 1 }, { unique: true });

const Counter = model('Counter', CounterSchema);

const autoIncrementModelID = (
    modelName: string,
    doc: Document,
    next: HookNextFunction,
): void => {
    Counter.findByIdAndUpdate(
        modelName,
        { $inc: { seq: 1 } },
        { new: true, upsert: true, useFindAndModify: false },
        (error, counter) => {
            if (error) return next(error);

            const document = doc as IReenrollment;

            const counterInstance = counter as ICounter;

            document.enrollment_number = counterInstance.seq;

            return next();
        },
    );
};

export default autoIncrementModelID;
