import mysql from 'mysql2/promise';
export declare type ServiceName = 'print-questionnaires' | 'ml-admin' | 'edit-content' | 'adverts' | 'admin';
export declare function createConnectionFor(fileLocation: string, serviceName: ServiceName, db?: string): Promise<mysql.Connection>;
