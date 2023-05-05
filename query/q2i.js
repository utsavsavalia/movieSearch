db.movies_metadata.aggregate([
    //add this query since you to only include votes above 1838, Justin OH
    {
        $match:
        {
            vote_count: {$gte: 1838}
        }
    },
    //wrong place, sort after not before
    // {
    //     $sort: {
    //       score: -1,
    //       vote_count: -1,
    //       title: 1
    //     }
    // },
    {
        $project: 
        {
            _id: 0,
            title: 1,
            vote_count: 1,
            score: 
            {
                $round: [
                {
                    $add: [{$multiply: [{ $divide: ["$vote_count", { $add: ["$vote_count", 1838] }] },"$vote_average"]},
                           {$multiply: [{ $divide: [1838, { $add: ["$vote_count", 1838] }] }, 7]}]
                }, 2]
            }
        }
    },
    {
        $sort: {
          score: -1,
          vote_count: -1,
          title: 1
        }
    },
    {
      $limit: 20
    }
  ]);
  