const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb+srv://temerson:temerson@cluster0-26fiw.mongodb.net/test?retryWrites=true',
  port: process.env.PORT || 5000,
};

export default config;
