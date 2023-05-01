// Task 1iv

db.todo.aggregate([
    // TODO: Write your query here
    {
        $project:
        {
            _id: 0
        }
    },
    {limit: 50}
]);

match
project
group
limit
sort