import { IQuestion } from "../interfaces/QuestionInterface";
import { Schema, model} from 'mongoose';

const QuestionSchema = new Schema<IQuestion>({
  description: {
    type: String,
    required: true,
  },
  questionStatus: {
    type: Boolean,
    required: true,
    default: true,
  }
});
QuestionSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();

  object.id = _id;

  return object;
});


const Question = model<IQuestion>('question', QuestionSchema, 'questions');
export {Question}