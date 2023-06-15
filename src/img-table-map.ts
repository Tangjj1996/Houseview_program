export interface ImageValue {
  nick: string;
  name: string;
  id: number;
  path: string;
}

export type TableMap = Map<number, ImageValue>;

export class ImgMapingTable {
  private tableMap: TableMap;

  constructor() {
    this.tableMap = new Map();
  }

  insert(item: TableMap) {
    for (const id of item.keys()) {
      this.tableMap.set(id, item.get(id));
    }
  }

  getById(id: number) {
    return this.tableMap.get(id);
  }

  getAll() {
    const list: ImageValue[] = [];
    for (const id of this.tableMap.keys()) {
      list.push(this.tableMap.get(id));
    }
    return list;
  }

  deleteById(id: number) {
    return this.tableMap.delete(id);
  }

  deleteAll() {
    for (const id of this.tableMap.keys()) {
      this.tableMap.delete(id);
    }
  }
}
