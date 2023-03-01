migrate((db) => {
  const collection = new Collection({
    "id": "crbj98ibt159kbe",
    "created": "2023-02-28 21:33:05.883Z",
    "updated": "2023-02-28 21:33:05.883Z",
    "name": "stories",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "p2rwfhvz",
        "name": "story",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "mmphvnjx",
        "name": "likes",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      }
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": "",
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("crbj98ibt159kbe");

  return dao.deleteCollection(collection);
})
