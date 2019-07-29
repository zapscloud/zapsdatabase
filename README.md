# zapsdatabase
Zapscloud Database


var zapsdb = new ZapsDB({
    url: 'https://api.zapscloud.com',
    app: 'appsample',
    tenant: '',
    authkey: '',
    authsecret: ''
})

var dbcollection = 'samplecoll'

// Create Collection
// createCollection(collectionname, collectionkey, description)
zapsdb.insertOne(dbcollection, 'key_id', 'Sample Collection')
.then(function (response) {
    // collection created successfully
})
.catch(function (err) {
    // collection created failed
});




// Remove Collection
// removeCollection(collectionname)
zapsdb.removeCollection(dbcollection)
.then(function (response) {
    // collection removed successfully
})
.catch(function (err) {
    // collection removed failed
});



// Insert a record
//  insertOne(collectionname, jsondata)
zapsdb.insertOne(dbcollection, {
     'key_id':'001',
     'key_value':'Same Values',
     'key_another_value':123
})
.then(function (response) {
    // insert successful
})
.catch(function (err) {
    // insert failure 
});



// Get a record
// getOne(collectionname, key, lookupkeys)
// lookupkeys => helps to retrive relative collection
zapsdb.getOne(dbcollection, '001')
.then(function (response) {
    // get successful
})
.catch(function (err) {
    // get failure 
});



// update a record by key
// updateOne(collectionname, key, setjsondata, unsetjsondata)
zapsdb.updateOne(dbcollection, '001', 
    {
     'key_value':'Updated Values'
    },
    {
     'key_another_value':0
    }
)
.then(function (response) {
    // set & unset data successful
})
.catch(function (err) {
    // update failure 
});


// update a record by key
// updateMany(collectionname, filterquery, setjsondata, unsetjsondata)
zapsdb.updateMany(dbcollection, 'key_value=/00/&key_another_value > 100', 
    {
     'key_value':'Updated Values'
    },
    {
     'key_another_value':0
    }
)
.then(function (response) {
    // set & unset data successful
})
.catch(function (err) {
    // update failure 
});


 // Delete a record
 // deleteOne(collectionname, key)
zapsdb.deleteOne(dbcollection, '001')
.then(function (response) {
    // delete successful
})
.catch(function (err) {
    // delete failure 
});


// Delete multiple records by query
// deleteMany(collectionname, filterquery)
zapsdb.deleteMany(dbcollection, 'key_value=/00/')
.then(function (response) {
    // delete records with key_value contains '00' successful
})
.catch(function (err) {
    // delete failure 
});
