module.exports = () => {
  if (!process.env.MONGO_CONNECT_STRING)
    throw new Error('Missing environment variable MONGO_CONNECT_STRING');
  if (!process.env.APP_PORT)
    throw new Error('Missing environment variable APP_PORT');
  if (!process.env.TOKEN_SECRET)
    throw new Error('Missing environment variable TOKEN_SECRET');

  return {
    mongoConnectionString: process.env.MONGO_CONNECT_STRING,
    port: process.env.APP_PORT,
    tokenSecret: process.env.TOKEN_SECRET
  };
};
