import { Schema, model} from 'mongoose';
import { IAnswer } from '../interfaces/AnswerInterface';

const answerSchema = new Schema<IAnswer>({
  userId: {
    type: String,
    required: true,
  },
  questionId: {
    type: String,
    required: true,
  },
  answer: {
    type: Boolean,
    required: true,
  },
  dateOfAnswer: {
    type: Date,
    required: true,
  }
});
answerSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();

  object.id = _id;

  return object;
});

const Answer = model<IAnswer>('answer', answerSchema, 'answers');
export {Answer}