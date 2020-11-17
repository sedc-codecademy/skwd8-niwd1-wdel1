window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}; // This line should only be needed if it is needed to support the object's constants for older browsers

window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

if ( ! window.indexedDB) 
{
    console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
}

// if(window.indexedDB)
// {
// 	var request = window.indexedDB.open("DatabaseName", 1);

// 	request.onerror = function(event) {
// 	// Do something with request.errorCode!
// 		console.log(event);
// 	};
// 	request.onsuccess = function(event) {
// 	// Do something with request.result!
// 		console.log(event);
// 	};

// 	request.onupgradeneeded = function(event) { 
// 		// Save the IDBDatabase interface 
// 		var db = event.target.result;
	  
// 		// Create an objectStore for this database
// 		var objectStore = db.createObjectStore("users", {keyPath: "ssn", autoIncrement : true });

// 		objectStore.createIndex("name", "name", { unique: false });

// 		// Create an index to search customers by email. We want to ensure that
// 		// no two customers have the same email, so use a unique index.
// 		objectStore.createIndex("email", "email", { unique: true });
		
// 		let users = [
// 			{name: "user 1", email: "user@user.com"},
// 			{name: "user 2", email: "user2@user.com"}
// 		];

// 		// finished before adding data into it.
// 		objectStore.transaction.oncomplete = function(event) {
// 			console.log(event)

// 			var userObjectStore = db.transaction("users", "readwrite").objectStore("users");
// 			users.forEach(function(user) {
// 				userObjectStore.add(user);
// 			});
			
// 		};
// 	};
	  
// }

class DB
{
	constructor(){
		this.indexedDB = window.indexedDB;
		this.db;
		this.connection;
		this.databaseName;
		this.version;
	}

	async addNewStore(storeName, config, additionalFields)
	{
		let objectStore = this.db.createObjectStore(storeName, config);

		if(additionalFields && additionalFields.length)
		{
			additionalFields.map((field) => {
				objectStore.createIndex(field.name, field.name, field.options);
			})
		}
	}

	async getStoreReferenceBySsn(storeName, ssn)
	{
		return new Promise((resolve, reject) => {

			let objRef = this.indexedDB.open(this.databaseName, this.version)
			
			objRef.addEventListener("success", (e) => {
				let db = e.target.result;
				
				let ref = db.transaction([storeName], "readwrite")
				let store = ref.objectStore(storeName);
				
				resolve(store);

				ref.addEventListener("error", (e) => {
					console.log(e.target.error);
				})
			});

			objRef.addEventListener("error", (error) => {
				reject(error);
			})
		})
	}

	async getStoreBySsn(storeName, ssn)
	{
		return new Promise((resolve, reject) => {

			let objRef = this.indexedDB.open(this.databaseName, this.version)
			
			objRef.addEventListener("success", (e) => {
				let db = e.target.result;
				
				let ref = db.transaction([storeName])
				let store = ref.objectStore(storeName);
				
				store.get(ssn).onsuccess = (data) => {

					console.log(data.target.result);
					resolve(data);
				}

				ref.addEventListener("error", (e) => {
					console.log(e.target.error);
				})
			});

			objRef.addEventListener("error", (error) => {
				reject(error);
			})
		})
	}


	async putStoreDataBySsn(storeName, ssn, data)
	{
		this.getStoreReferenceBySsn(storeName, ssn).then(store => {
			store.get(ssn).onsuccess = (e) => {
				let recordData = e.target.result;

				recordData = Object.assign(recordData, data);

				let update = store.put(recordData);

				update.onsuccess = () => {
					console.log("Updated")
				}

				update.onerror = (e) => {
					console.log("Error on update", e);
				}

			}
		});
	}

	async getStoreData(storeName)
	{
		return new Promise((resolve, reject) => {

			let objRef = this.indexedDB.open(this.databaseName, this.version)
			
			objRef.addEventListener("success", (e) => {
				let db = e.target.result;
				
				let ref = db.transaction([storeName])
				let store = ref.objectStore(storeName);
				let data = [];

				store.openCursor().onsuccess = (e) => {
					let cursor = e.target.result;
					
					if(cursor)
					{
						data.push(cursor.value);
						console.log(cursor)
						cursor.continue();
					}
					else
					{
						console.log(data);
						resolve(data);
					}
				}


				ref.addEventListener("error", (e) => {
					console.log(e.target.error);
				})
			});

			objRef.addEventListener("error", (error) => {
				reject(error);
			})
		})
	}

	async setStoreData(storeName, data)
	{
		return new Promise((resolve, reject) => {

			let objRef = this.indexedDB.open(this.databaseName, this.version)
			
			objRef.addEventListener("success", (e) => {
				let db = e.target.result;
				
				let ref = db.transaction([storeName], "readwrite")
				let store = ref.objectStore(storeName);
				
				data.map((item) => {
					store.add(item);
				});

				ref.addEventListener("error", (e) => {
					console.log(e.target.error);
				})

				resolve();
			});

			objRef.addEventListener("error", (error) => {
				reject(error);
			})

		})
	}

	async deleteStoreData(storeName, whereValue)
	{
		return new Promise((resolve, reject) => {
			let objRef = this.indexedDB.open(this.databaseName, this.version);

			objRef.addEventListener("success", (e) => {
				let db = e.target.result;

				let ref = db.transaction([storeName], "readwrite");
				let store = ref.objectStore(storeName);
				
				store.delete(whereValue);

				ref.addEventListener("error", (e) => {
					console.log(e.target.error);
				});

				resolve();
			})

			objRef.addEventListener("error", (error) => {
				reject(error);
			})

		})
	}

	async connect(databaseName, version)
	{
		version = ! version ? 1 : version;

		this.databaseName = databaseName;
		this.version = version;

		return new Promise((resolve, reject) => {
			let connection = this.indexedDB.open(databaseName, version);
			this.connection = connection;

			connection.addEventListener("error", (error) => {
				reject(error);
			})

			connection.addEventListener("success", (success) => {
				resolve(success);
			});

		})
	}
}


var stores = {
	users: {
		storeOptions: {keyPath: "ssn", autoIncrement : true }, 
		storeIndexes: [
			{name: "name", options: {unique: false}}, 
			{name: "email", options: {unique: true}}
		]
	},
	products: {
		storeOptions: {keyPath: "productId", autoIncrement: true },
		storeIndexes: [
			{name: "productName", options: {unique: true}},
			{name: "sku", options: {unique: false}},
			{name: "price", options: {unique: false}},
			{name: "description", options: {unique: false}},
			{name: "qty", options: {unique: false}}
		]
	}
}

let idb = new DB();

idb.connect('DatabaseName', 2).catch((error) => {
	console.log('Db connection error: ', error);
});

idb.connection.addEventListener("upgradeneeded", (e) => {
	idb.db = e.target.result;
	
	for(let store in stores)
	{
		idb.addNewStore(store, stores[store].storeOptions, stores[store].storeIndexes)
	}
})

//idb.setStoreData("users", [{name: "user1", email: "user@user.com"}]);
//idb.setStoreData("users", [{name: "user3", email: "user3@user.com"}]);

//idb.deleteStoreData("users", 1) //ssn = 1;

//idb.getStoreBySsn("users", 2);

//idb.getStoreData("users");

//idb.putStoreDataBySsn("users", 3, {name: "test3"})