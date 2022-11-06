import { Schema, model} from 'mongoose';
import { IImages } from '../interfaces/ImagesInterface';
import { ITouristicPoint } from "../interfaces/TouristicPointInterface";

const imagesSchema = new Schema<IImages>({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const touristicPointSchema = new Schema<ITouristicPoint>({
  category_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: false,
  },
  facebook: {
    type: String,
    required: false,
  },
  instagram: {
    type: String,
    required: false,
  },
  youtube: {
    type: String,
    required: false,
  },
  whatsappNumber: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  petFriendly: {
    type: Boolean,
    required: true,
  },
  sponsored: {
    type: Boolean,
    required: true,
  },
  pointStatus: {
    type: Boolean,
    required: true,
  },
  openOnWeekends: {
    type: Boolean,
    required: true,
  },
  openingHours: {
    type: String,
    required: true,
  },
  pictures: {
    type: [imagesSchema],
    required: true,
    default: undefined,
  },
  geolocation: {
    latitude: String,
    longitude: String,
  },

});
touristicPointSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();

  object.id = _id;

  return object;
});

const TouristicPoint = model<ITouristicPoint>('touristicPoint', touristicPointSchema, 'touristicPoints');
export {TouristicPoint}