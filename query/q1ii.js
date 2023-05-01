// Task 1ii

db.movies_metadata.aggregate([
    // TODO: Write your query here
    {
        $match: {genres: {$elemMatch: {id: 35 }}}//{name: "comedy" } } }
    },
    {
        $match: {vote_count : {$gte: 50}}
    },
//        $or{ keywords: { $elemMatch: { name: "marvel comic" } }

//        $match: {
//                    keywords: { $elemMatch: { name: "marvel comic" } }
//                }
    {
        $project: {
            _id: 0,
            title: 1,
            vote_average: 1,
            vote_count: 1,
            movieId: 1
        }
    },
    {
        $sort: {
            // movieId: 1,
            vote_average: -1,
            vote_count: -1,
            movieId: 1
        }
    },
    {
        $limit: 50
    }
]);