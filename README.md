# zapsdatabase
_Zapscloud Database API Client_

**Initialize Library with config values**
    
    var zapsdb = new ZapsDB({
        app: 'appname',
        authkey: ' ',
        authsecret: ' '
    })
    
**Snippet for Collection create**

    var dbstudents = 'students'
    // Create Collection
    // createCollection(collectionname, collectionkey, description)
    zapsdb.createCollection(dbstudents, 'student_id', 'Students Collection')
    .then(function (response) {
        // collection created successfully
    })
    .catch(function (err) {
        // collection created failed
    });
    
**Snippet for Insert Document**

    // Insert a record
    //  insertOne(collectionname, jsondata)
    zapsdb.insertOne(dbstudents, {
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
    zapsdb.getOne(dbstudents, '0001')
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

    zapsdb.getMany(dbstudents,'student_class=10')
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

    zapsdb.getAggregation(dbstudents, aggquery)
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
    zapsdb.updateOne(dbstudents, '0001', updaterecord)
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
    zapsdb.updateMany(dbstudents, 
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
    zapsdb.deleteOne(dbstudents, '001')
    .then(function (response) {
        // delete successful
    })
    .catch(function (err) {
        // delete failure 
    });


**Snippet for Delete Multiple Documents**

    // Delete multiple records by query
    // deleteMany(collectionname, filterquery)
    zapsdb.deleteMany(dbstudents,  'student_mark.maths<25&student_class=10')
    .then(function (response) {
        // delete records with key_value contains '00' successful
    })
    .catch(function (err) {
        // delete failure 
    });


**Snippet for Retive Multiple Documents**

     Get multiple record
    // getMany(collectionname,filterquery)
    // filterquery => query to filter, sort, skip and limit

#### Skip / Limit operators

- Useful to limit the number of records returned.
- Default operator keys are `skip` and `limit`.

#### Sort operator

- Useful to sort returned records.
- Default operator key is `sort`.
- It accepts a comma-separated list of fields. Default behavior is to sort in ascending order. Use `-` prefixes to sort in descending order.

#### Filtering operators

| Function   | URI                  | Example                 |
| --------- | -------------------- | ----------------------- |
| `=`     | `key=val`            | `type=public`           |
| `>`     | `key>val`            | `count>5`               |
| `>=`    | `key>=val`           | `rating>=9.5`           |
| `<`     | `key<val`            | `createdAt<2016-01-01`  |
| `<=`    | `key<=val`           | `score<=-5`             |
| `!=`     | `key!=val`           | `status!=success`       |
| `In`     | `key=val1,val2`      | `country=GB,US`         |
| `Not In`    | `key!=val1,val2`     | `lang!=fr,en`           |
| `Exist` | `key`                | `phone`                 |
| `Not Exist` | `!key`               | `!email`                |
| `Regex`  | `key=/value/<opts>`  | `email=/@gmail\.com$/i` |
| `Regex`  | `key!=/value/<opts>` | `phone!=/^06/`          |


> Query with multiple conditions

    // Example of multiple conditions
    zapsdb.getMany(dbstudents,'student_class=10&student_mark.science>10')
    .then(function (response) {
        // get successful
    })
    .catch(function (err) {
        // get failure 
    });

**Snippet for Retive Number in String Documents**

    // Get multiple record
    // student_id is Numeric stored in String

> Query with String numeric search

    // Example of multiple conditions
    zapsdb.getMany(dbstudents,'student_id=string(0001)')
    .then(function (response) {
        // get successful
    })
    .catch(function (err) {
        // get failure 
    });

**Snippet for Multiple Document With Skip & Limit**
> Skip 2 records and Limit 10 records

    // Example of multiple conditions
    zapsdb.getMany(dbstudents, 'skip=2&limit=10')
    .then(function (response) {
        // get successful
    })
    .catch(function (err) {
        // get failure 
    });

**Snippet for Multiple Document With Sorting**
> Sorting document with student_class desending and student_name ascending

    // Example of multiple conditions
    zapsdb.getMany(dbstudents, 'sort=-student_class,student_name')
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
    zapsdb.getMany(dbstudents, 'student_class=10&sort=-student_class,student_name&skip=1&limit=5')
    .then(function (response) {
        // get successful
    })
    .catch(function (err) {
        // get failure 
    });


**Snippet for Lookup Relations**


> Define Relationship between collections and lookup reference values

> Students document has student_class field
> Create relationship between Student document and Class document

> _Create Classes collection_

     var dbclasses = 'classes'
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
        class_teacher: 'Bobbee Callas',
    })
    .then(function (response) {
        console.log('Class Inserted', response)
    })
    .catch(function (err) {
        console.log('Error Insert', err)
    });

> _Create Relation_

    zapsdb.createRelation(dbstudents, 'student_class', dbclasses, 'class_id')
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



**Snippet for Transaction (Commit All or Rollback All)**

* _startTransaction_
* _commitTransaction_
* _rollbackTransaction_

> 1. Start a Transaction
> 2. Create / Update / Delete actions with Transaction
> 3. Commit / Rollback based on Success / Failure

    var _txn;
    zapsdb.startTransaction()
        .then(function (txn) {
            _txn = txn;            
            var _stu = { 
                student_name: 'Maurise Ottie',
                student_mark: { maths: 6, science: 98, language: 98 },
                student_class: 6 
            }
            return zapsdb.insertOne(dbstudents, _stu , _txn.transaction_id)
        })
        .then(function (response) {
            var resultupdate = {
                student_result: 'pass'
            }
            return zapsdb.updateMany(dbstudents, 'student_mark.maths>40&student_mark.science>40&student_mark.language>40', resultupdate, null , _txn.transaction_id)
        })
        .then(function (response) {
            var _stu = { 
                student_name: 'Arlee Kermit',
                student_mark: { maths: 19, science: 79, language: 96 },
                student_class: 9 
            }
            return zapsdb.insertOne(dbstudents, stu, _txn.transaction_id)
        })
        .then(function (response) {
            return zapsdb.deleteMany(dbstudents, 'student_id=/xyz/', _txn.transaction_id)
        })        
        .then(function (response) {
            return zapsdb.commitTransaction(_txn.transaction_id)
        })
        .then(function (response) {
            console.log('Commit Done', response)
        })
        .catch(function (err) {
            console.log('Error Commit', err)
            return zapsdb.rollbackTransaction(_txn.transaction_id)
            .then(function(res){
                console.log('Rollback Done ', res)
            })
            .catch(function(err){
                console.log('Rollback Error', err)
            })
        });
