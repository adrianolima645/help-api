class AppError{
  public readonly message: String;
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    console.log("CHEGOU");
    this.message = message;
    this.statusCode = statusCode;
  }
}

export { AppError };