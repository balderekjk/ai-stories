migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("crbj98ibt159kbe")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "v4iynpud",
    "name": "ratings",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("crbj98ibt159kbe")

  // remove
  collection.schema.removeField("v4iynpud")

  return dao.saveCollection(collection)
})
