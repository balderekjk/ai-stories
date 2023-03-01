migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("crbj98ibt159kbe")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bsg5edfv",
    "name": "createdBy",
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
  const collection = dao.findCollectionByNameOrId("crbj98ibt159kbe")

  // remove
  collection.schema.removeField("bsg5edfv")

  return dao.saveCollection(collection)
})
