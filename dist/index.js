"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConnectionFor = void 0;
const fs_1 = __importDefault(require("fs"));
const promise_1 = __importDefault(require("mysql2/promise"));
let config;
async function getConfig(fileLocation) {
    if (config) {
        return config;
    }
    try {
        const read = await fs_1.default.promises.readFile(fileLocation, 'utf8');
        config = JSON.parse(read);
        return config;
    }
    catch (err) {
        return { "database": {} };
    }
}
async function createConnectionFor(fileLocation, serviceName, db) {
    const config = (await getConfig(fileLocation)).database;
    const host = config[serviceName]?.host ?? config.host ?? 'localhost';
    const user = config[serviceName]?.username ?? config.username ?? 'user';
    const password = config[serviceName]?.password ?? config.password ?? 'password';
    const database = db ?? config[serviceName]?.database;
    return await promise_1.default.createConnection({
        host: host,
        user: user,
        password: password,
        database: database
    });
}
exports.createConnectionFor = createConnectionFor;
