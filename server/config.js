const config = {
    mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/offaxis-chat',
    port: process.env.PORT || 8000,
    secret: 'OffAxis/Chat secret',
};

export default config;
