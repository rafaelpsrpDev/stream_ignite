import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export class DatabaseCSV {

    #database = {}

    constructor() {
      fs.readFile(databasePath, 'utf8')
        .then((data) => {
          this.#database = JSON.parse(data)
        })
        .catch(() => {
          this.#database = {}
        })
      }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database, null, 2))
  }

    select(table) {
        return this.#database[table];
    }

    selectOne(table, id) {
      const rowIndex = this.#database[table].findIndex(row => row.id === id)

      if (rowIndex > -1) {
          return this.#database[table][rowIndex]
      }

      return null
    }

    insert(table, data) {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        }
        else {
            this.#database[table] = [data]
        }

        this.#persist()

        return data;
    }

    update(table, id, data) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        if (rowIndex > -1) {
            this.#database[table][rowIndex] = { id , ...data }
            this.#persist()

            return this.#database[table][rowIndex]
        }
    }
}