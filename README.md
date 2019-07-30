# zapsdatabase
_Zapscloud Database API Client_

**Initialize Library with config values**
    
    var zapsdb = new ZapsDB({
        url: 'https://api.zapscloud.com',
        app: 'appname',
        authkey: ' ',
        authsecret: ' '
    })
    
**Snippet for Collection create**

    var dbcollection = 'students'
    // Create Collection
    // createCollection(collectionname, collectionkey, description)
    zapsdb.createCollection(dbcollection, 'student_id', 'Students Collection')
    .then(function (response) {
        // collection created successfully
    })
    .catch(function (err) {
        // collection created failed
    });
    
**Snippet for Insert Document**

    // Insert a record
    //  insertOne(collectionname, jsondata)
    zapsdb.insertOne(dbcollection, {
        student_id: '0001',
        student_name: 'Petronia Angeline',
        student_mark: { maths: 49, science: 95, language: 89 },
        student_class: 4
    })
    .then(function (response) {
        // insert successful
    })
    .catch(function (err) {
        // insert failure 
    });


**Snippet for Get a Document**

    // Get a record
    // getOne(collectionname, key, lookupkeys)
    // lookupkeys => helps to retrive relative collection
    zapsdb.getOne(dbcollection, '0001')
    .then(function (response) {
        // get successful
    })
    .catch(function (err) {
        // get failure 
    });


**Snippet for Multiple Document retive**

    // Get multiple record
    // getMany(collectionname,filterquery)
    // filterquery => query to filter, sort, skip and limit

    zapsdb.getMany(dbcollection,'student_class=10')
    .then(function (response) {
        // get successful
    })
    .catch(function (err) {
        // get failure 
    });

**Snippet for Aggrigate Documents**

    // Get multiple record
    // getAggregation(collectionname, aggquery, filterquery)
    // aggquery => mongodb style aggregation. match, group, sort
    // filterquery => query to skip and limit

    var aggquery = [{
            $group: {
                _id: "$student_class",
                count: { $sum: 1 },
                avgmaths: { $avg: "$student_mark.maths"},
                avgscience: { $avg: "$student_mark.science"},
                avglanguage: {$avg: "$student_mark.language"}
            }
        },{
            $sort: { _id: 1}
        }
    ];

    zapsdb.getAggregation(dbcollection, aggquery)
    .then(function (response) {
        // get successful
    })
    .catch(function (err) {
        // get failure 
    });

**Snippet for Update a Document**

    // update a record by key
    // updateOne(collectionname, key, setjsondata, unsetjsondata)

     var updaterecord = {
        student_name: 'Amandy Maletta',
        student_mark: { maths: 95, science: 71, language: 44 },
        student_class: 10
    }
    zapsdb.updateOne(dbcollection, '0001', updaterecord)
    .then(function (response) {
        // set & unset data successful
    })
    .catch(function (err) {
        // update failure 
    });

**Snippet for Update Multiple Documents**

    // update multiple records
    // updateMany(collectionname, filterquery, setjsondata, unsetjsondata)
     var resultupdate = {
        student_result: 'pass'
    }
    zapsdb.updateMany(dbcollection, 
        'student_mark.maths>40&student_mark.science>40&student_mark.language>40', resultupdate)
    .then(function (response) {
        // set & unset data successful
    })
    .catch(function (err) {
        // update failure 
    });

**Snippet for Delete a Document**
    
     // Delete a record
     // deleteOne(collectionname, key)
    zapsdb.deleteOne(dbcollection, '001')
    .then(function (response) {
        // delete successful
    })
    .catch(function (err) {
        // delete failure 
    });


**Snippet for Delete Multiple Documents**

    // Delete multiple records by query
    // deleteMany(collectionname, filterquery)
    zapsdb.deleteMany(dbcollection,  'student_mark.maths<25&student_class=10')
    .then(function (response) {
        // delete records with key_value contains '00' successful
    })
    .catch(function (err) {
        // delete failure 
    });

**Snippet for Retive Multiple Documents**

    // Get multiple record
    // getMany(collectionname,filterquery)
    // filterquery => query to filter, sort, skip and limit

> Query with multiple conditions

    // Example of multiple conditions
    zapsdb.getMany(dbcollection,'student_class=10&student_mark.science>10')
    .then(function (response) {
        // get successful
    })
    .catch(function (err) {
        // get failure 
    });

**Snippet for Multiple Document With Skip & Limit**
> Skip 2 records and Limit 10 records

    // Example of multiple conditions
    zapsdb.getMany(dbcollection, 'skip=2&limit=10')
    .then(function (response) {
        // get successful
    })
    .catch(function (err) {
        // get failure 
    });

**Snippet for Multiple Document With Sorting**
> Sorting document with student_class desending and student_name ascending

    // Example of multiple conditions
    zapsdb.getMany(dbcollection, 'sort=-student_class,student_name')
    .then(function (response) {
        // get successful
    })
    .catch(function (err) {
        // get failure 
    });

**Snippet for Multiple Document With Search, Sort and Skips**
> Sorting document with student_class desending and student_name ascending

> student_class=10 and
> sort by -student_class,student_name
> skip=1 and limit=5

    // Example of multiple conditions
    zapsdb.getMany(dbcollection, 'student_class=10&sort=-student_class,student_name&skip=1&limit=5')
    .then(function (response) {
        // get successful
    })
    .catch(function (err) {
        // get failure 
    });


**Snippet for Lookup Relations**


> Define Relationship between collections and lookup reference values

> Students document has student_class field
> Create relationship between Classes document and lookup Class document values

> _Create Classes collection_

    zapsdb.createCollection(dbclasses, 'class_id', 'DB for Classes') 
    .then(function (response) {
        console.log('Create Collection Query', response)
    })
    .catch(function (err) {
        console.log('Error Create collection', err)
    });

> _Create Class document_

    zapsdb.insertOne(dbclasses, {
        class_id: 10,
        class_name: '10th Standard',
        class_teacher: randomname(),
    })
    .then(function (response) {
        console.log('Class Inserted', response)
    })
    .catch(function (err) {
        console.log('Error Insert', err)
    });

> _Create Relation_

    zapsdb.createRelation(dbcollection, 'student_class', 'classes', 'class_id')
    .then(function (response) {
        console.log('Relation Created', response)
    })
    .catch(function (err) {
        console.log('Error Relation Create', err)
    })

> _Lookup with getOne_

    zapsdb.getOne(dbstudents, '001','student_class')
    .then(function (response) {
        console.log('Response Query with Class document', response)
    })
    .catch(function (err) {
        console.log('Error Get Details', err)
    });
