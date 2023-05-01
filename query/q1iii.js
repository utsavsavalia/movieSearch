// Task 1iii

db.rating.aggregate([
    // TODO: Write your query here
    {
        $group:
        {
            _id: "$rating",
            count: {$sum: 1}
        }
    },
    {
        $project:
        {
            _id: 0,
            rating: "$_id",
            count: 1
        }
    }
]);