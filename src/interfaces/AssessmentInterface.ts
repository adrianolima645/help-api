export interface IAssessment {
  _id ?: string,
  userId: string,
  touristicPointId: string,
  description: string,
  rating: string,
  assessmentDate: Date,
  author: string,
}