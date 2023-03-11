import mongoose from 'mongoose';

const myMongoose = mongoose;

const connection = (async () => {
  const user = process.env.MONGOUSER;
  const pwd = process.env.MONGOPWD;
  try {
    await myMongoose.connect(`mongodb+srv://${user}:${pwd}@cluster0.ze3bguo.mongodb.net/?retryWrites=true&w=majority`);
    return true;
  } catch (error) {
    return false;
    process.exit();
  }
})();

export {connection, myMongoose}
