import { ICategory } from "../interfaces/CategoryInterface";
import { Schema, model} from 'mongoose';

const categorySchema = new Schema<ICategory>({
  title: {
    type: String,
    required: true,
  }
});
categorySchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();

  object.id = _id;

  return object;
});


const Category = model<ICategory>('category', categorySchema, 'categories');
export {Category}