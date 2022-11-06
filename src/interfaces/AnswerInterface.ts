export interface IAnswer {
  _id ?: string,
  userId: string,
  questionId: string,
  answer: boolean,
  dateOfAnswer: Date,
}