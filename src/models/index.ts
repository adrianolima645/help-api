import mongoose from 'mongoose';

const myMongoose = mongoose;

const connection = (async () => {
  try {
    await myMongoose.connect('mongodb+srv://adrianorl:aA83Rk3EvPx1jTPU@cluster0.ze3bguo.mongodb.net/?retryWrites=true&w=majority');
    return true;
  } catch (error) {
    return false;
    process.exit();
  }
})();

export {connection, myMongoose}
