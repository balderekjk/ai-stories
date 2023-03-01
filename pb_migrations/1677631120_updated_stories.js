migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("crbj98ibt159kbe")

  collection.createRule = ""
  collection.deleteRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("crbj98ibt159kbe")

  collection.createRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
