// // Task 1iv

// db.ratings.aggregate([
//     // TODO: Write your query here
//     {
//         $match: {userId: 186}
//     },
//     {
//         $group:
//         {
//             //Ben suggest to do $group and search how to _id group by null
//             //_id: 0,
//             _id: null,
//             //rating: 1
//             movieIds: {$push: "$movieId"},
//             ratings: {$push: "$rating"},
//             timestamps: {$push: "$timestamp"}
//         }
//     },
//     {
//         $project:
//         {
//             _id: 0,
//             movieIds: 1,
//             ratings: 1,
//             timestamps: 1
//         }
//     },
//     {
//         $sort:
//         {
//             timestamp: -1
//         }
//     },
//     {
//         $limit: 5
//     }
// ]);

// // match: userid = 186
// // group: push on movierating, movieid
// // project: 
// // limit
// // sortc



// Task 1iv

db.ratings.aggregate([
    // TODO: Write your query here
    {
        $match: {userId: 186}
    },
    {
        $sort:
        {
            timestamp: -1
        }
    },
    {
        $limit: 5
    },
    //changed the order because earlier the format was wrong, now format is current but number order are mismatched
    //changing order makes first SELECT then sort then group, rather than select group and then sort
    //also use movieIds, ratings, timestamps, not just id, rating, or timestamp
    {
        $group:
        {
            //Ben suggest to do $group and search how to _id group by null
            //_id: 0,
            _id: null,
            //rating: 1
            movieIds: {$push: "$movieId"},
            ratings: {$push: "$rating"},
            timestamps: {$push: "$timestamp"}
        }
    },
    {
        $project:
        {
            _id: 0,
            movieIds: 1,
            ratings: 1,
            timestamps: 1
        }
    }
]);

// match: userid = 186
// group: push on movierating, movieid
// project: 
// limit
// sortc