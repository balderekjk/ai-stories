migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("275135rsv7gwjqq")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zmgxdszz",
    "name": "likedBy",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("275135rsv7gwjqq")

  // remove
  collection.schema.removeField("zmgxdszz")

  return dao.saveCollection(collection)
})
