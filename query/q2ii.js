// Task 2ii

//db.movies_metadata.aggregate({$project: {"_id": 0, "tagline": 1}})

db.movies_metadata.aggregate([
    // TODO: Write your query here
    // { //Doesn't work, you need to lower before trim
    //     $project:
    //     {
    //         "_id": {$split: [{$trim: {input: "$tagline", chars: ",.!?"}}, " "]},
    //     }
    // },
    {
        $project:
        {
            lowered: {$toLower: "$tagline"}
        }
    },
    {
        $project:
        {
            //_id: {$split: [{$toLower: "$tagline"}, " "]},
            _id: {$split: ["$lowered", " "]},
            count: 1
        }
    },
    {
        $unwind: "$_id"
    },
    {
        $project:
        {
            "_id": {$trim: {input: "$_id", chars: ",.!?" } }
        }
    },
    {
        $match: 
        {
            $expr: { $gt: [{ $strLenCP: "$_id" }, 3]  }
        }
    },
    {
        $group: 
        {
            _id: "$_id",
            count: {$sum: 1}
        }
    },
    {
        $sort: {count: -1}
    },
    {
        $limit: 20
    }
]);

/*
First split, then lower, then get rid of punctuations
select word, count(word)
WHERE len(word) > 3
tagline = lowercase(trim(tagline)),
words = split(tagline)
*/