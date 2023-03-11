import { Schema, model} from 'mongoose';
import { IAssessment } from '../interfaces/AssessmentInterface';

const assessmentSchema = new Schema<IAssessment>({
  userId: {
    type: String,
    required: true,
  },
  touristicPointId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  assessmentDate: {
    type: Date,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});
assessmentSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();

  object.id = _id;

  return object;
});

const Assessment = model<IAssessment>('assessment', assessmentSchema, 'assessments');
export {Assessment}