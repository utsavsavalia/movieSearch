// Task 1iii
//siddharth fixed it, the problem was that its ratings, not rating.

db.ratings.aggregate([
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
            timestamp: 1,
            movie_rating: 1,
            count: 1
        }
    },
    {
        $sort: {
            // movieId: 1,
            // vote_average: -1,
            // vote_count: -1,
            // movieId: 1
            rating: -1
        }
    }
]);