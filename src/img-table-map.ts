export type TableMap = Map<number, { nick: string, name: string, id: number }>

export class ImgMapingTable {
  private tableMap: TableMap;

  constructor() {
    this.tableMap = new Map();
  }

  insert(item: TableMap) {
    for (const id of item.keys()) {
      this.tableMap.set(id, item.get(id))
    }
  }

  getById(id: number) {
    return this.tableMap.get(id)
  }

  getAll() {
    const list = []
    for (const id of this.tableMap.keys()) {
      list.push(this.tableMap.get(id))
    }
    return list;
  }

  deleteById(id: number) {
    return this.tableMap.delete(id)
  }

  deleteAll() {
    for (const id of this.tableMap.keys()) {
      this.tableMap.delete(id)
    }
  }
}