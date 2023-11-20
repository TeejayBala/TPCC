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
    3173269,
    3163993,
    15618359,
    6149496,
    7804617,
    3293159,
    3343356,
    2938688,
    9472826,
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
        "Jenesh":               3173269,
        "Karthi Raja":          3163993, "Karthikraja":          3163993,"Karthikraja G":          3163993,
        "Lokesh G":             15618359,"†Lokesh G":             15618359, 
        "Nagarathinam Harinarayanan":7804617, "†Nagarathinam Harinarayanan":7804617, "† Nagarathinam Harinarayanan":7804617,
        "Raj Kumar":            3343356,
        "Ranjith G":            2938688, "Ranjith" : 2938688,
        "Roman":                3161332,
        "Sanjay V":             2969572, "†Sanjay V":2969572,"† Sanjay V":2969572,
        "Selva":                3161354,
        "Siva Sankar":          3032818,
        "sugumar":              3171953,
        "Sumangar G":           2938713,   "Suman":           2938713,
        "Maharajan" :           6149496,
        "Rengaraj" :            9472826,
        "Prabakaran" :          3293159
}
var playerIdNames = {
    15434419 : "Ajay",                 
    2478593 : "Balakumar S",
    2938678 : "Bhuvanesh R",
    3092272 : "Deepak Raj Mariyappan",
    3173458 : "Jay",
    2938679 : "Jayaraj M",
    3173269 : "Jenesh",
    3163993 : "Karthi Raja",
    15618359 : "Lokesh G",
    7804617 : "Nagarathinam H",
    3343356 : "Raj Kumar",
    2938688 : "Ranjith G",
    3161332 : "Roman",
    2969572 : "Sanjay V",
    3161354 : "Selva",
    3032818 : "Siva Sankar",
    3171953 : "Sugumar",
    2938713 : "Sumangar G",
    6149496 : "Maharajan",
    9472826 : "Rengaraj",
    3293159 : "Prabakaran"
}

const playersPhotos = {
    15434419    :  "/image/profile/15434419.jpeg",     //'Ajay',
    2478593     :  "/image/profile/2478593.jpeg",     //'Balakumar S',
    2938678     :  "/image/profile/2938678.jpeg",     //'Bhuvanesh R',
    3092272     :  "/image/profile/3092272.jpeg",     //'Deepak Raj Mariyappan',
    3173458     :  "/image/profile/3173458.jpeg",     //'Jay',
    2938679     :  "/image/profile/2938679.jpeg",     //'Jayaraj M',
    3173269     :  "/image/profile/3173269.jpeg",     //'Jenesh',
    3163993    :  "/image/profile/10104412.jpeg",     //'Karthi Raja', // Old ID - 10104412
    15618359    :  "/image/profile/15618359.jpeg",    //'Lokesh G',
    7804617     :  "/image/profile/7804617.jpeg",     //'Nagarathinam Harinarayanan',
    3343356     :  "/image/profile/3343356.jpeg",     //'Raj Kumar',
    2938688     :  "/image/profile/2938688.jpeg",     //'Ranjith G',
    3161332     :  "/image/profile/3161332.jpeg",     //'Roman',
    2969572     :  "/image/profile/2969572.jpeg",     //'Sanjay V',
    3161354     :  "/image/profile/3161354.jpeg",     //'Selva',
    3032818     :  "/image/profile/3032818.jpeg",     //'Siva Sankar',
    3171953     :  "/image/profile/3171953.jpeg",     //'sugumar',
    2938713     :  "/image/profile/2938713.jpeg",     //'Sumangar G'
    6149496     :  "/image/profile/6149496.jpeg",     //'Maharajan'
    9472826     :  "/image/profile/9472826.jpeg",     //'Rengaraj'
    3293159     :  "/image/profile/3293159.jpeg",     //'Prabakaran',
    
    // 14125110    :  "",     //'A S Krishna',
    // 6149496     :   "",     //'Maharajan',
    // 12838213    :   "",     //'Persian',
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

var playersStats = {};

playerIds.forEach(function(playerId) {
    playersStats[playerId] = {
        player_id: playerId,
        batting : JSON.parse(JSON.stringify(battingStatsObj)),
        bowling : JSON.parse(JSON.stringify(bowlingStatsObj)),
        fielding: JSON.parse(JSON.stringify(fieldingStatsObj)),
        points : {
            batting: 0,
            bowling: 0,
            fielding: 0,
            // economyRate: 0,
            // strikeRate: 0,
            others : 0
        },
        pointsLog : {
            batting: {},
            bowling: {},
            fielding: {},
            others: {}
        }
    }
});

var playersStats_2023 = JSON.parse(JSON.stringify(playersStats));

var tabelStyle = {
    search : true,
    pagination: {limit : 10 , summary : false},
    sort: true
}

var popupStyle = {
    css: `
        .popup-header {
            text-align: left;
        }
        .popup-body {
            text-align: left;
            overflow: scroll;
        }
        .popup-title {
            font-size: 30px;
        }
        .popup-content{
            height: 80% !important;
            width: 80% !important;
        }
    `,
    // titleMargin: "0",
    titleColor: "rgb(92, 0, 95)",
    // backgroundColor: "#ffebfe",
    fontSizeMultiplier : 0.6,
    // widthMultiplier : 1.2
}

var pointsHighlight = {
    //Run scored - 1 point:
    runs : "🏏 {player_name} scored {total_runs} runs! +1 <b id='sen-point'>point</b> | Total Runs: {total_runs} | Total Points:<b id='sen-point'> {total_points} </b>",
    
    //Six runs (off one ball) bonus - 2 points:
    six : "💥 {player_name} hit {total_six} six! <b id='sen-point'>+2 points</b> | Total Sixes: {total_six} | Total Points:<b id='sen-point'> {total_points} </b>",
    
    //Four runs (off one ball) bonus - 1 point:
    four : "👌 {player_name} scored {total_four} four! <b id='sen-point'>+1 point</b> | Total Fours: {total_four} | Total Points:<b id='sen-point'> {total_points} </b>",
    
    //Dismissed for duck - 10 points:
    duck : "🦆 {player_name} dismissed for a duck! <b id='sen-point'>-10 points</b> | Total Runs: {total_runs} | Total Points:<b id='sen-point'> {total_points} </b>",
    
    //Strike Rate Between 0.00 and 49.99 runs per 100 balls - 10 points:
    strike_rate_1 : "🎯 {player_name} with a low strike rate! <b id='sen-point'>-10 points</b> | Total Runs: {total_runs} | Total Balls Faced: {total_balls_faced} balls | Strike Rate: {strike_rate} | Total Points:<b id='sen-point'> {total_points} </b>",
    
    //Between 100.00 and 124.99 runs per 100 balls - 10 points:
    strike_rate_2 : "🚀 {player_name} with a solid strike rate! <b id='sen-point'>+10 points</b> | Total Runs: {total_runs} | Total Balls Faced: {total_balls_faced} balls | Strike Rate: {strike_rate} | Total Points:<b id='sen-point'> {total_points} </b>",
    
    //Between 125.00 and 149.99 runs per 100 balls - 20 points:
    strike_rate_3 : "🔥 {player_name} on fire with the bat! <b id='sen-point'>+20 points</b> | Total Runs: {total_runs} | Total Balls Faced: {total_balls_faced} balls | Strike Rate: {strike_rate} | Total Points:<b id='sen-point'> {total_points} </b>",
    
    //Between 150.00 and 174.99 runs per 100 balls - 30 Points:
    strike_rate_4 : "🔥 {player_name} with an impressive strike rate! <b id='sen-point'>+30 points</b> | Total Runs: {total_runs} | Total Balls Faced: {total_balls_faced} balls | Strike Rate: {strike_rate} | Total Points:<b id='sen-point'> {total_points} </b>",
    
    //Between 175.00 and 199.99 runs per 100 balls - 40 Points:
    strike_rate_5 : "🚀 {player_name} hitting it out of the park! <b id='sen-point'>+40 points</b> | Total Runs: {total_runs} | Total Balls Faced: {total_balls_faced} balls | Strike Rate: {strike_rate} | Total Points:<b id='sen-point'> {total_points} </b>",
    
    //Above 200.00 runs per 100 balls - 50 Points:
    strike_rate_6 : "🔥 {player_name} with an extraordinary strike rate! <b id='sen-point'>+50 points</b> | Total Runs: {total_runs} | Total Balls Faced: {total_balls_faced} balls | Strike Rate: {strike_rate} | Total Points:<b id='sen-point'> {total_points} </b>",
    
    //On reaching 10 runs - 10 Points:
    runs_10 : "🔟 {player_name} reached 10 runs! <b id='sen-point'>+10 points</b> | Total Runs: {total_runs} | Total Points:<b id='sen-point'> {total_points} </b>",
    
    //On reaching 20 runs - 20 Points:
    runs_20 : "2️⃣0️⃣ {player_name} reached 20 runs! <b id='sen-point'>+20 points</b> | Total Runs: {total_runs} | Total Points:<b id='sen-point'> {total_points} </b>",
    
    //On reaching 30 runs - 30 Points:
    runs_30 : "3️⃣0️⃣ {player_name} reached 30 runs! <b id='sen-point'>+30 points</b> | Total Runs: {total_runs} | Total Points:<b id='sen-point'> {total_points} </b>",
    
    //On reaching 40 runs - 40 Points:
    runs_40 : "4️⃣0️⃣ {player_name} reached 40 runs! <b id='sen-point'>+40 points</b> | Total Runs: {total_runs} | Total Points:<b id='sen-point'> {total_points} </b>",
    
    //On reaching 50 runs - 50 points:
    runs_50 : "5️⃣0️⃣ {player_name} reached 50 runs! <b id='sen-point'>+50 points</b> | Total Runs: {total_runs} | Total Points:<b id='sen-point'> {total_points} </b>",
    
    //50 or more Runs Scored - Runs X 2 points:
    runs_50_plus : "🔥🔥 {player_name} scored {total_runs} runs! <b id='sen-point'>+(Runs * 2) points</b> | Total Runs: {total_runs} | Total Points:<b id='sen-point'> {total_points} </b>",
    
    //Wicket - 20 points:
    wicket : "🎯 {player_name} took a wicket! <b id='sen-point'>+20 points</b> | Total Wickets: {total_wickets} wickets | Total Points:<b id='sen-point'> {total_points} </b>",
    
    //Maiden over - 40 points:
    maidens : "🚫 {player_name} bowled a maiden over! <b id='sen-point'>+40 points</b> | Total Maidens: {total_maidens} maidens | Total Points:<b id='sen-point'> {total_points} </b>",
    
    //Economy Between 00.00 and 01.99 runs per over - 30 points:
    economy_rate_1 : "🔒 {player_name} with a tight economy! <b id='sen-point'>+30 points</b> | Total Runs Conceded: {total_runs_conceded} runs | Total Overs Bowled: {total_overs_bowled} overs | Economy Rate: {economy_rate} | Total Points:<b id='sen-point'> {total_points} </b>",
    
    //Between 02.00 and 03.99 runs per over - 20 points:
    economy_rate_2 : "🔒 {player_name} maintaining a good economy! <b id='sen-point'>+20 points</b> | Total Runs Conceded: {total_runs_conceded} runs | Total Overs Bowled: {total_overs_bowled} overs | Economy Rate: {economy_rate} | Total Points:<b id='sen-point'> {total_points} </b>",
    
    //Between 04.00 and 05.99 runs per over - 10 points:
    economy_rate_3 : "🔒 {player_name} with a steady economy! <b id='sen-point'>+10 points</b> | Total Runs Conceded: {total_runs_conceded} runs | Total Overs Bowled: {total_overs_bowled} overs | Economy Rate: {economy_rate} | Total Points:<b id='sen-point'> {total_points} </b>",
    
    //Between 08.00 and 9.99 runs per over - (-10) Points:
    economy_rate_4 : "⚠️ {player_name} struggling with economy. <b id='sen-point'>-10 points</b> | Total Runs Conceded: {total_runs_conceded} runs | Total Overs Bowled: {total_overs_bowled} overs | Economy Rate: {economy_rate} | Total Points:<b id='sen-point'> {total_points} </b>",
    
    //Between 10.00 and 11.99 runs per over - (-20) Points:
    economy_rate_5 : "⚠️ {player_name} under pressure in terms of economy. <b id='sen-point'>-20 points</b> | Total Runs Conceded: {total_runs_conceded} runs | Total Overs Bowled: {total_overs_bowled} overs | Economy Rate: {economy_rate} | Total Points:<b id='sen-point'> {total_points} </b>",
    
    //Above 12.00 runs per over - (-30) Points:
    economy_rate_6 : "⚠️ {player_name} facing challenges with economy. <b id='sen-point'>-30 points</b> | Total Runs Conceded: {total_runs_conceded} runs | Total Overs Bowled: {total_overs_bowled} overs | Economy Rate: {economy_rate} | Total Points:<b id='sen-point'> {total_points} </b>",
    
    //On taking 2 wickets - 10 Points:
    wickets_2 : "✌️ {player_name} grabbed 2 wickets! <b id='sen-point'>+10 points</b> | Total Wickets: {total_wickets} wickets | Total Points:<b id='sen-point'> {total_points} </b>",
    
    //On taking 3 wickets - 20 Points:
    wickets_3 : "🤟 {player_name} grabbed 3 wickets! <b id='sen-point'>+20 points</b> | Total Wickets: {total_wickets} wickets | Total Points:<b id='sen-point'> {total_points} </b>",
    
    //On taking 4 wickets - 40 Points:
    wickets_4 : "🔥 {player_name} on fire with 4 wickets! <b id='sen-point'>+40 points</b> | Total Wickets: {total_wickets} wickets | Total Points:<b id='sen-point'> {total_points} </b>",
    
    //On taking 5 wickets - 50 Points:
    wickets_5 : "🔥🔥 {player_name} with a fantastic 5-wicket haul! <b id='sen-point'>+50 points</b> | Total Wickets: {total_wickets} wickets | Total Points:<b id='sen-point'> {total_points} </b>",
    
    //Official Player of The Match - 50 Points:
    man_of_the_match : "🏆 {player_name} is the Official Player of the Match! <b id='sen-point'>+50 points</b> | Total Points:<b id='sen-point'> {total_points} </b>",
    
    //Catch (Fielder) - 10 Points:
    catches_fielder : "👐 {player_name} took a catch as a fielder! <b id='sen-point'>+10 points</b> | Total Points:<b id='sen-point'> {total_points} </b>",
    
    //Catch (Wicketkeeper) - 10 Points:
    catches_wicketkeeper : "🧤 {player_name} with a catch as the wicketkeeper! <b id='sen-point'>+10 points</b> | Total Points:<b id='sen-point'> {total_points} </b>",
    
    //Stumping - 20 Points:
    stumping : "👏 {player_name} with a stumping behind the stumps! <b id='sen-point'>+20 points</b> | Total Points:<b id='sen-point'> {total_points} </b>",
    
    //Run out (direct) - 20 Points:
    run_out_direct : "🏃‍♂️💨 {player_name} with a direct run-out! <b id='sen-point'>+20 points</b> | Total Points:<b id='sen-point'> {total_points} </b>",
    
    //Run out (indirect/per player) - 10 Points:
    run_out_indirect : "🏃‍♂️💨 {player_name} involved in a run-out! <b id='sen-point'>+10 points</b> | Total Points:<b id='sen-point'> {total_points} </b>",
}