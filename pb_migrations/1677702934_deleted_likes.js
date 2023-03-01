migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("275135rsv7gwjqq");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "275135rsv7gwjqq",
    "created": "2023-03-01 18:49:42.538Z",
    "updated": "2023-03-01 18:50:44.425Z",
    "name": "likes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "xlughhqd",
        "name": "storyId",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "crbj98ibt159kbe",
          "cascadeDelete": false,
          "maxSelect": 1,
          "displayFields": [
            "id"
          ]
        }
      },
      {
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
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
