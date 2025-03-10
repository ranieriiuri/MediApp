import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongo = undefined;

//seta a criação de um banco nosql em memória, pega a uri dele e utiliza essas infos para conectar com o mongoose
const setUp = async () => {
    mongo = await MongoMemoryServer.create();
    const url = mongo.getUri();

    await mongoose.connect(url);
};

//func p fechar a conexão com o db em memoria criado
const dropDatabase = async () => {
    if (mongo) {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongo.stop();
    }
};
//deleta as coleções criadas
const dropCollections = async () => {
    if (mongo) {
        const collections = mongoose.connection.collections;

        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany();
        }
    }
};
//expõe as func criadas p usarmos nos testes
const db = {
    setUp,
    dropDatabase,
    dropCollections
}

export default db;