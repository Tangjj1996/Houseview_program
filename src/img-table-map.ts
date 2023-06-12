export type TableMap = Map<number, { nick: string, name: string }>

export class ImgMapingTable {
  tableMap: TableMap

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

  deleteById(id: number) {
    return this.tableMap.delete(id)
  }

  deleteAll() {
    for (const id of this.tableMap.keys()) {
      this.tableMap.delete(id)
    }
  }
}