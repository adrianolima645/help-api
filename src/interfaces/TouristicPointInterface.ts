import { IImages } from "./ImagesInterface"

export interface ITouristicPoint {
  _id ?: string,
  category_id: string,
  user_id: string,
  name: string,
  about: string,
  website ?: string,
  facebook ?: string,
  instagram ?: string,
  youtube ?: string,
  whatsappNumber ?: string,
  phoneNumber ?: string,
  petFriendly:boolean,
  sponsored: boolean,
  pointStatus: boolean,
  openOnWeekends: boolean,
  openingHours: string,
  pictures: Array<IImages>,
  geolocation: Geolocation,
}