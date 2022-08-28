import { Db, MongoClient, MongoClientOptions } from 'mongodb';
import { config } from '../config';
const dbURI = config.ATLAS_URI;
const client = new MongoClient(dbURI);

let _db :Db;

export const connectToServer = (callback)=>{
  client.connect((err,db)=>{
    if(db){
      _db = db.db('employees');
      console.log('mongodb connection success');
    }
    return callback(err);
  })
}

export const getDB:()=>Db = ()=>{
  return _db;
}