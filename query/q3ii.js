// Task 3ii

db.credits.aggregate([
    // TODO: Write your query here
    {
        $match:
        {
            //$and
            // crew: {ElemMatch: {id}}, //{crew: { $elemMatch: { job: "Director" } } 

            crew: { $elemMatch: { id: 5655, job: "Director" } } 
            //Justin Recommend:
            //you want it to check id = 5655 and Director job, but the and statement somehow still takes when just one is matching
            //so use Elem match where both querries in one statement, so that way it checks both at same time.
            //Checkout ElemMatch doc: https://www.mongodb.com/docs/manual/reference/operator/query/elemMatch/
            
            
            // "crew.id": 5655,
            // "crew.job": "Director"
        }
    },
    {
        //Maybe be unwind?? -- Yes
        $unwind: "$cast"
    },
    {
        $group: {
            _id: {
                name: "$cast.name",
                id: "$cast.id"
            },
            count: {$sum: 1}
        }
    },
    {
        $project:
        {
            _id: 0,
            count: 1,
            //count: "$count"
            id: "$_id.id",
            name: "$_id.name"
        }
    },
    {
        $sort:
        {
            count: -1,
            id: 1
        }
    },
    {
        $limit: 5
    }
]);

/*
SELECT actor_name, id, (actor_count)
WHERE Director = "Anderson"
ORDER BY #collab DESC, actor_id ASC
*/

/* Justin OH error:
- {"count": 8, "id": 1532, "name": "Bill Murray"}
+ {"count": 7, "id": 1532, "name": "Bill Murray"}
- {"count": 7, "id": 887, "name": "Owen Wilson"}
+ {"count": 6, "id": 887, "name": "Owen Wilson"}
  {"count": 6, "id": 17881, "name": "Jason Schwartzman"}
  {"count": 4, "id": 3490, "name": "Adrien Brody"}
  {"count": 4, "id": 5301, "name": "Waris Ahluwalia"}
*/


/*
! MISSING FIELDS
  - id
  - name
  
! FORMAT MISMATCH
  - Example of expected document:
  {
      "count": 7,
      "id": 1532,
      "name": "Bill Murray"
  }
  
  - Your document:
  {
      "count": 8
  }
  */
