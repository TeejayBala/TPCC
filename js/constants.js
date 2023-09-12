const myTeam = {
    id   : 2040687,
    name : "Tamil Pasanga Cricket Club"
}

const playerIds = [
    15434419,
    2478593,
    2938678,
    3092272,
    3173458,
    2938679,
    10104412,
    15618359,
    7804617,
    3343356,
    2938688,
    3161332,
    2969572,
    3161354,
    3032818,
    3171953,
    2938713
];

const playerNames = {
        "Ajay":                 15434419,
        "Balakumar S":          2478593,
        "Bhuvanesh R":          2938678,
        "Deepak Raj Mariyappan":3092272,
        "Jay":                  3173458, 
        "Jayaraj M":            2938679, "Arjun":                3173458,
        "Karthi Raja":          10104412, "Karthikraja":          10104412,"Karthikraja G":          10104412,
        "Lokesh G":             15618359,
        "Nagarathinam Harinarayanan":7804617, "†Nagarathinam Harinarayanan":7804617, "† Nagarathinam Harinarayanan":7804617,
        "Raj Kumar":            3343356,
        "Ranjith G":            2938688, "Ranjith" : 2938688,
        "Roman":                3161332,
        "Sanjay V":             2969572, "†Sanjay V":2969572,"† Sanjay V":2969572,
        "Selva":                3161354,
        "Siva Sankar":          3032818,
        "sugumar":              3171953,
        "Sumangar G":           2938713
}
var playerIdNames = {
    15434419 : "Ajay",                 
    2478593 : "Balakumar S",
    2938678 : "Bhuvanesh R",
    3092272 : "Deepak Raj Mariyappan",
    3173458 : "Jay",
    2938679 : "Jayaraj M",
    10104412 : "Karthi Raja",
    15618359 : "Lokesh G",
    7804617 : "Nagarathinam Harinarayanan",
    3343356 : "Raj Kumar",
    2938688 : "Ranjith G",
    3161332 : "Roman",
    2969572 : "Sanjay V",
    3161354 : "Selva",
    3032818 : "Siva Sankar",
    3171953 : "sugumar",
    2938713 : "Sumangar G"
}

const playersPhotos = {
    15434419    :  "/image/profile/15434419.jpeg",     //'Ajay',
    2478593     :  "/image/profile/2478593.jpeg",     //'Balakumar S',
    2938678     :  "/image/profile/2938678.jpeg",     //'Bhuvanesh R',
    3092272     :  "/image/profile/3092272.jpeg",     //'Deepak Raj Mariyappan',
    3173458     :  "/image/profile/3173458.jpeg",     //'Jay',
    2938679     :  "/image/profile/2938679.jpeg",     //'Jayaraj M',
    10104412    :  "/image/profile/10104412.jpeg",     //'Karthi Raja',
    15618359    :  "/image/profile/15618359.jpeg",     //'Lokesh G',
    7804617     :  "/image/profile/7804617.jpeg",     //'Nagarathinam Harinarayanan',
    3343356     :  "/image/profile/3343356.jpeg",     //'Raj Kumar',
    2938688     :  "/image/profile/2938688.jpeg",     //'Ranjith G',
    3161332     :  "/image/profile/3161332.jpeg",     //'Roman',
    2969572     :  "/image/profile/2969572.jpeg",     //'Sanjay V',
    3161354     :  "/image/profile/3161354.jpeg",     //'Selva',
    3032818     :  "/image/profile/3032818.jpeg",     //'Siva Sankar',
    3171953     :  "/image/profile/3171953.jpeg",     //'sugumar',
    2938713     :  "/image/profile/2938713.jpeg",     //'Sumangar G'

    // 14125110    :  "",     //'A S Krishna',
    // 6149496     :   "",     //'Maharajan',
    // 12838213    :   "",     //'Persian',
    // 3293159     :   "",     //'Praba Bro Zoho',
    // 9472826     :   "",     //'Rengaraj',
    // 21396635    :   "",     //'Vignesh Ramesh'
}

var battingStatsObj = {
    "matches" : 0,
    "innings" : 0,
    "notout" : 0,
    "runs" : 0,
    "balls" : 0,
    "highestruns": 0,
    "avg" : 0,
    "sr" : 0,
    "30s" : 0,
    "50s" : 0,
    "100s" : 0,
    "4s" : 0,
    "6s" : 0,
    "ducks" : 0
};
var bowlingStatsObj = {
    matches : 0,
    innings : 0,
    overs : 0,
    maidens : 0,
    wickets : 0,
    balls : 0,
    runs : 0,
    bestbowling : 0,
    "3wickets" : 0,
    noballs : 0,
    dotballs : 0,
    "5wickets" : 0,
    economy : 0,
    sr : 0,
    avg : 0,
    wides : 0,
    "4s" : 0,
    "6s" : 0,
    "bestWickets" : 0,
    "bestRuns" : 0
};
var fieldingStatsObj = {
    matches: 0,
    catches: 0,
    caughtbehind: 0,
    runouts: 0,
    stumpings: 0,
    assistedrunouts: 0
}

const playersStats = {
    15434419    :  {
        player_id: 1543441,
        batting : JSON.parse(JSON.stringify(battingStatsObj)),
        bowling : JSON.parse(JSON.stringify(bowlingStatsObj)),
        fielding: JSON.parse(JSON.stringify(fieldingStatsObj))
    },
    2478593     :  {
        player_id: 2478593,
        batting : JSON.parse(JSON.stringify(battingStatsObj)),
        bowling : JSON.parse(JSON.stringify(bowlingStatsObj)),
        fielding: JSON.parse(JSON.stringify(fieldingStatsObj))
    },
    2938678     :  {
        player_id: 2938678,
        batting : JSON.parse(JSON.stringify(battingStatsObj)),
        bowling : JSON.parse(JSON.stringify(bowlingStatsObj)),
        fielding: JSON.parse(JSON.stringify(fieldingStatsObj))
    },
    3092272     :  {
        player_id: 3092272,
        batting : JSON.parse(JSON.stringify(battingStatsObj)),
        bowling : JSON.parse(JSON.stringify(bowlingStatsObj)),
        fielding: JSON.parse(JSON.stringify(fieldingStatsObj))
    },
    3173458     :  {
        player_id: 3173458,
        batting : JSON.parse(JSON.stringify(battingStatsObj)),
        bowling : JSON.parse(JSON.stringify(bowlingStatsObj)),
        fielding: JSON.parse(JSON.stringify(fieldingStatsObj))
    },
    2938679     :  {
        player_id: 2938679,
        batting : JSON.parse(JSON.stringify(battingStatsObj)),
        bowling : JSON.parse(JSON.stringify(bowlingStatsObj)),
        fielding: JSON.parse(JSON.stringify(fieldingStatsObj))
    },
    10104412    :  {
        player_id: 1010441,
        batting : JSON.parse(JSON.stringify(battingStatsObj)),
        bowling : JSON.parse(JSON.stringify(bowlingStatsObj)),
        fielding: JSON.parse(JSON.stringify(fieldingStatsObj))
    },
    15618359    :  {
        player_id: 1561835,
        batting : JSON.parse(JSON.stringify(battingStatsObj)),
        bowling : JSON.parse(JSON.stringify(bowlingStatsObj)),
        fielding: JSON.parse(JSON.stringify(fieldingStatsObj))
    },
    7804617     :  {
        player_id: 7804617,
        batting : JSON.parse(JSON.stringify(battingStatsObj)),
        bowling : JSON.parse(JSON.stringify(bowlingStatsObj)),
        fielding: JSON.parse(JSON.stringify(fieldingStatsObj))
    },
    3343356     :  {
        player_id: 3343356,
        batting : JSON.parse(JSON.stringify(battingStatsObj)),
        bowling : JSON.parse(JSON.stringify(bowlingStatsObj)),
        fielding: JSON.parse(JSON.stringify(fieldingStatsObj))
    },
    2938688     :  {
        player_id: 2938688,
        batting : JSON.parse(JSON.stringify(battingStatsObj)),
        bowling : JSON.parse(JSON.stringify(bowlingStatsObj)),
        fielding: JSON.parse(JSON.stringify(fieldingStatsObj))
    },
    3161332     :  {
        player_id: 3161332,
        batting : JSON.parse(JSON.stringify(battingStatsObj)),
        bowling : JSON.parse(JSON.stringify(bowlingStatsObj)),
        fielding: JSON.parse(JSON.stringify(fieldingStatsObj))
    },
    2969572     :  {
        player_id: 2969572,
        batting : JSON.parse(JSON.stringify(battingStatsObj)),
        bowling : JSON.parse(JSON.stringify(bowlingStatsObj)),
        fielding: JSON.parse(JSON.stringify(fieldingStatsObj))
    },
    3161354     :  {
        player_id: 3161354,
        batting : JSON.parse(JSON.stringify(battingStatsObj)),
        bowling : JSON.parse(JSON.stringify(bowlingStatsObj)),
        fielding: JSON.parse(JSON.stringify(fieldingStatsObj))
    },
    3032818     :  {
        player_id: 3032818,
        batting : JSON.parse(JSON.stringify(battingStatsObj)),
        bowling : JSON.parse(JSON.stringify(bowlingStatsObj)),
        fielding: JSON.parse(JSON.stringify(fieldingStatsObj))
    },
    3171953     :  {
        player_id: 3171953,
        batting : JSON.parse(JSON.stringify(battingStatsObj)),
        bowling : JSON.parse(JSON.stringify(bowlingStatsObj)),
        fielding: JSON.parse(JSON.stringify(fieldingStatsObj))
    },
    2938713     :  {
        player_id: 2938713,
        batting : JSON.parse(JSON.stringify(battingStatsObj)),
        bowling : JSON.parse(JSON.stringify(bowlingStatsObj)),
        fielding: JSON.parse(JSON.stringify(fieldingStatsObj))
    },
}

const playersStats_2023 = JSON.parse(JSON.stringify(playersStats));