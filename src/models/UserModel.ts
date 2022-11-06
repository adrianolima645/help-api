import { Schema, model} from 'mongoose';
import { IUser } from "../interfaces/UserInterface";

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
  userStatus: {
    type: Boolean,
    required: true,
    default: true,
  },
  termsOfUse: {
    type: Boolean,
    required: true,
  },

});
userSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();

  object.id = _id;

  return object;
});

const User = model<IUser>('user', userSchema, 'users');
export {User}