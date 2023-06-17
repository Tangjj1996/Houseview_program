import { MongoClient } from "mongodb";
import type { ObjectId } from "mongodb";
import config from "./config.js";
import { DB_NAME, COLLECTION_NAME } from "./constance.js";

const client = new MongoClient(config.MONGODB_URL);

await client.connect();

const db = client.db(DB_NAME);
const collection = db.collection<ImageValue>(COLLECTION_NAME);

export interface ImageValue extends Express.Multer.File {
  _id?: ObjectId;
  path: string;
}

export type TableMap = Map<ObjectId, ImageValue>;

export class ImgMapingTable {
  private tableMap: TableMap;

  /**
   * Init fetch latest DB
   */
  private async init() {
    this.tableMap = new Map();
    for (const item of await collection.find({}).toArray()) {
      this.tableMap.set(item._id, item);
    }
  }

  constructor() {
    this.init();
  }

  async insert(file: Express.Multer.File) {
    await collection.insertOne(file);
    for (const item of await collection.find({}).toArray()) {
      this.tableMap.set(item._id, item);
    }
  }

  getById(_id: ObjectId) {
    return this.tableMap.get(_id);
  }

  getAll() {
    const list: ImageValue[] = [];
    for (const id of this.tableMap.keys()) {
      list.push(this.tableMap.get(id));
    }
    return list;
  }

  async deleteById(_id: ObjectId) {
    this.tableMap.delete(_id);
    await collection.deleteOne({ _id });
  }

  async deleteAll() {
    for (const _id of this.tableMap.keys()) {
      this.tableMap.delete(_id);
    }
    await collection.deleteMany({});
  }
}
