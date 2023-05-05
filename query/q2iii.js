// Task 2iii

db.movies_metadata.aggregate([
    // TODO: Write your query here
    //Aryan's Logic
    {
        $project: 
        {
            budget: {
                $cond: {if: 
                            {$and: 
                                [{$ne: ["$budget", ""]}, {$ne: ["$budget", null]}, {$ne: ["$budget", false]}, {$ne: ["$budget", undefined]} ] }, 
                            then: 
                                {$cond: {if: {$isNumber: "$budget"}, then: {$round: ["$budget" , -7] } , 
                        else: {$round: [{$toInt: {$trim: {input: "$budget", chars: "USD$ "}}}, -7] } } }, 
                    else: "unknown" } }
        }
    },
    {
        $group:
        {
            _id: "$budget",
            count: {$sum: 1}
        }
    },
    {
        $project:
        {
            _id: 0,
            budget: "$_id",
            count: "$count"
        }
    },
    {
        $sort:
        {
            budget: 1
        }
    }
]);