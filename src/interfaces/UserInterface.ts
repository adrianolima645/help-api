export interface IUser {
  _id ?: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  dateOfBirth: Date,
  phone: string,
  city: string,
  state: string,
  userType: string,
  userStatus: boolean,
  termsOfUse:boolean
}