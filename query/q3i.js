// Task 3i

db.credits.aggregate([
    // TODO: Write your query here
    //try unwind before
    {
        $unwind: "$cast"
    },
    {
        $match:
        {
            //idk why try with quotes, ask in OH
            "cast.id": 7624
        }
    },
    {
        $lookup:{
            from: "movies_metadata",
            localField: "movieId",
            foreignField: "movieId",
            as: "mf"
        }
    },
    // TA justin suggest unwind again, NVM can just do the $first operator
    // {
    //     $unwind: "$mf"
    // },
    {
        $project:
        {
            _id: 0,
            //title: 1,
            title: {$first: "$mf.title"},
            release_date: {$first: "$mf.release_date"},
            //rel_date: 1,
            //nm_ch: "$cast.ch"
            character: "$cast.character"
            //name_char: 1
        }
    },
    {
        $sort:
        {
            release_date: -1
        }
    }
]);


//got help from Reya, ask in OH why local field is movieId, not movie_id

/*
SELECT title, release_date, name_char
ORDER BY release Date: Desc

Unwind on the cast, see if you find Stan the Man
Match by ElemMatch: Stan Lee", suggest cast.id: 7624
*/

/*
! MISSING FIELDS
  - release_date
  - character
  
! EXTRA FIELDS
  - rel_dt
  - nm_ch
  
! MISMATCHED TYPES
  - mismatch on field `title`:
      - expected type: `string` (example: `"Thor: Ragnarok"`)
      - actual type: `array`, (example: `["Grumpier Old Men", "Sudden Death", "Jumanji", "GoldenEye", "Dracula: Dead and Loving It", "Balto", "Tom and Huck", "Nixon", "Cutthroat Island", "Casino", "Sense and Sensibility", "Heat", "Sabrina", "Toy Story", "Father of the Bride Part II", "Waiting to , "RoboCop 3", "Robin Hood: Men in Tights", "Philadelphia", "Romeo Is Bleeding", "Romper Stomper", "The Saint of Fort Washington", "Rudy", "Schindler's List", "Searching for Bobby Fischer", "Second Best", "Savage Nights", "Ruby in Paradise", "The Scout", "The Secret Garden", "The Shadow", "Shadowlands", "Serial Mom", "Short Cuts", "A Simple Twist of Fate", "Sirens", "Six Degrees of Separation", "Sliver", "Harem", "Super Mario Bros.", "The Visitors: Bastille Day", "Monster Ark", "High Plains Invaders", "Headless Horseman", "Titanic 2", "Joanna", "Rasputin: The Mad Monk", "A History of Horror with Mark Gatiss", "Vampires in Havana", "House of the Long Shadows", "Return to the Batcave: The Misadventures of Adam and Burt", "What a Fuck Am I Doing on This Battlefield", "Dead and Deader", "Up 'n' Under", "With Open Arms", "The Airzone Solution", "The Many Faces of Christopher Lee", "Frankenstein Created Woman", "The Return of Captain Invincible", "That Riviera Touch", "The Witchmaker", "Dawn of the Mummy", "The Pope Must Die", "Carry On Follow That Camel", "Carry On England", "How Most Things Work", "LEGO DC Super Hero Girls: Brain Drain", "Treasure Raiders", "The Stranger: Summoned by Shadows", "She Fought Alone", "Carry On Camping", "Take Me", "Phillauri", "Apartment 18", "The Twin Swords", "The Incredible Jessica James", "Polar Flight", "Golden Swallow", "Simbad e il califfo di Bagdad", "Lichtspiel opus I", "It Stains the Sands Red", "Opus III", "Opus II", "Can't Buy My Love", "Sonita", "Bloodletting", "Opus IV", "\u0406\u0432\u0430\u043d \u0421\u0438\u043b\u0430", "Hopeless Romantic", "Dead Daughters", "Two in One", "Thick Lashes of Lauri M\u00e4ntyvaara", "All at Once", "The Tuner", "Travelling with Pets", "Corporate Event", "The Miracle", "Black Sun", "Bedouin", "The Sparrow's Fluttering", "Cinderella", "Mars", "Suicides", "Yuri's Day", "A Death in the Gunj", "Savages", "Aprel", "The Skin of Sorrow", "Swing", "Kuka", "Dyketactics", "Daddy", "Cop and a Half: New Recruit", "Baignade en Mer", "Antidur", "Dead Birds", "Arabian Nights", "The Hunters", "Whiffles, Cubic Artist", "An American Vampire Story", "Fit to Kill", "TechnoCalyps", "Pickpocket", "Pro Lyuboff", "A Black Rose Is an Emblem of Sorrow, a Red Rose an Emblem of Love", "Starquest II", "The Fortunes and Misfortunes of Moll Flanders", "The Prisoner of If Castle", "The Sublet", "Rivers of Sand", "Altar of Fire", "The Wonders of Aladdin", "\u0160\u00edlen\u011b smutn\u00e1 princezna", "Phobos. Fear Kills", "In a Heartbeat", "The Final Storm", "To Be Fat Like Me", "Cadet Kelly", "Jungle Woman", "The Scheming Gambler's Paradise", "Blood, Sweat and Tears", "The Imperceptable Transmutations", "Pooh's Heffalump Halloween Movie", "The Fat and Lean Wrestling Match", "Deep Hearts", "The Untameable Whiskers", "The Man with the Rubber Head", "The Living Playing Cards", "St. Michael Had a Rooster", "Mom", "The One-Man Band", "The Morning After", "Caged Heat 3000", "The Burkittsville 7", "The Hilarious Posters", "Subdue", "Shadow of the Blair Witch", "House of Horrors", "The Devilish Tenant", "Satan Triumphant", "Betrayal", "Century of Birthing", "Robin Hood", "Queerama"]`)
  
! FORMAT MISMATCH
  - Example of expected document:
  {
      "title": "Thor: Ragnarok",
      "release_date": 1508914800,
      "character": ""
  }
  
  - Your document:
  {
      "title": [
          "Grumpier Old Men",
          "Sudden Death",
          "Jumanji",
          "GoldenEye",
          "Dracula: Dead and Loving It",
          "Balto",
          "Tom and Huck",
          "Nixon",
          "Cutthroat Island",
          "Casino",
          "Sense and Sensibility",
          "Heat",
          "Sabrina",
          "Toy Story",
          "Father of the Bride Part II",
          "Waiting to Exhale",
          "Four Rooms",
          "Ace Ventura: When Nature Calls",
          "Othello",
          "Copycat",
          "Assassins",
          "Powder",
          "Leaving Las Vegas",
          "Get Shorty",
          "The American President",
          "Now and Then",
          "Persuasion",
          "Shanghai Triad",
          "Dangerous Minds",
          "Twelve Monkeys",
          "The City of Lost Children",
          "Wings of Courage",
          "Carrington",
          "Dead Man Walking",
          "Dead Presidents",
          "Restoration",


      ],
      "rel_dt": "mf.rel_dt",
      "nm_ch": "Himself"
  }
  
*/