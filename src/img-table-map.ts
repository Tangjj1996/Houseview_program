import { MongoClient, ObjectId } from "mongodb";
import config from "./config.js";
import type { ImageValue, TableMap, ResponseFile } from "./interface.js";
import { DB_NAME, COLLECTION_NAME } from "./constance.js";

const client = new MongoClient(config.MONGODB_URL);

await client.connect();

const db = client.db(DB_NAME);
const collection = db.collection<ImageValue>(COLLECTION_NAME);

export class ImgMapingTable {
  private tableMap: TableMap;

  /**
   * Init fetch latest DB
   */
  private async init() {
    this.tableMap = new Map();
    for (const item of await collection.find({}).toArray()) {
      this.tableMap.set(item._id.toString(), item);
    }
  }

  constructor() {
    this.init();
  }

  async insert(file: ResponseFile) {
    const { insertedId } = await collection.insertOne(file);
    this.tableMap.set(insertedId.toString(), file);
  }

  getById(_id: string) {
    return this.tableMap.get(_id);
  }

  getAll() {
    const list: ImageValue[] = [];
    for (const _id of this.tableMap.keys()) {
      list.push(this.tableMap.get(_id));
    }
    return list;
  }

  async deleteById(_id: string) {
    this.tableMap.delete(_id);
    return await collection.deleteOne({ _id: new ObjectId(_id) });
  }

  async deleteAll() {
    for (const _id of this.tableMap.keys()) {
      this.tableMap.delete(_id);
    }
    return await collection.deleteMany({});
  }
}
