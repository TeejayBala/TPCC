//Override hash-routes.min.js
Router.navigate = function(n,silentRedirect) {
    // if (silentRedirect) { 
    //         n = (n[0] == "#")? n : "#"+n;
    //         history.replaceState({}, null, n);
    // } else {
            window.location.hash = n;
    // }
}

//Controller part

var controller = {
    dashboard : {
        init() {
            this.eventHandler();
        },
        eventHandler() {
            var winningCounts = winsCounts.byFirstBat + winsCounts.byFirstBowl;
            var lossingCounts = lossesCounts.byFirstBat + lossesCounts.byFirstBowl;
            var no_Results = noResults.byFirstBat + noResults.byFirstBowl;
            
            var config = stats.winRadio;
            config.data = {
                labels: ['Wins','No Result' , 'Losses','Won by batting first.', 'Won by bowling first.','Batting first.', 'Bowling first.','Lose by batting first.', 'Lose by bowling first.'],
                datasets: [
                    {
                        data: [winningCounts,no_Results,lossingCounts],
                        backgroundColor: ["#64C864","#eee","#DC8282"],
                        borderRadius : 20
                    },{ 
                        weight: 0.3
                    },
                    {
                        backgroundColor: ["#6478C8","#6478C8","#6478C8","#6478C8","#9664C8","#eee","#eee",'#E6A064', '#A0825A'],
                        data: [0,0,0, winsCounts.byFirstBat,winsCounts.byFirstBowl, noResults.byFirstBat , noResults.byFirstBowl , lossesCounts.byFirstBat,lossesCounts.byFirstBowl],
                        weight: 0.7,
                        borderRadius : 20
                    }
                ]
            };
            var winningRatioStats = new Chart(document.getElementById('win-ratio-stats'), config);

            stringUtil._CountUp(document.querySelector("#wins-count"), winningCounts);
            stringUtil._CountUp(document.querySelector("#losses-count"), lossingCounts);
            
            var config = stats.runrate;
            config.data = {
                labels: matchNames,
                datasets: [
                    {
                        label: 'Run Rate',
                        data: matchRunrates,
                        borderColor: "#b01e2e",
                        fill: false,
                        cubicInterpolationMode: 'monotone',
                        tension: 0.4
                    }
                ]
            };
            var runrateStats = new Chart(document.getElementById('run-rate-stats'), config);
        },
        destory() {

        }
    },
    matches : {
        init(matches) {
            this.eventHandler();
            this.constructorMatchesList(matches);
            this.constructorMatch(matches[route.params.match_id]);
        },
        eventHandler(matches) {
            
        },
        constructorMatchesList(matches) {
            var self = this;
            matchOrder.forEach(function(matchId) {
                self.constructorMatchList(matches[matchId]);
            });
        },
        constructorMatchList(matchData) {
            var matchList = document.querySelector(".match-list.dummy.hide").cloneNode(true);
            matchList.setAttribute("data-match-id", matchData.match_id);
            matchList.classList.remove("hide","dummy");
            matchList.classList.add(matchData.result);
            if (matchData.team_a.name != myTeam.name) {
                var team_a = matchList.querySelector("#team_a");
                team_a.innerText = matchData.team_a.name;
                team_a.title    = matchData.team_a.name;
                team_a.classList.remove("hide");
            }
            if (matchData.team_b.name != myTeam.name) {
                var team_b = matchList.querySelector("#team_b");
                team_b.innerText = matchData.team_b.name;
                team_b.title    = matchData.team_b.name;
                team_b.classList.remove("hide");
            }
            matchList.querySelector("#date").innerText = stringUtil.parseDate(matchData.start_datetime);
            matchList.querySelector("#summary").innerText = matchData.match_summary.summary;
            
            document.querySelector("#match-lists").appendChild(matchList);

            matchList.addEventListener("click", function(event) {
                Router.navigate("#/matches/"+matchData.match_id,true);
            });

            if (route.params.match_id == matchData.match_id.toString()) {
                matchList.classList.add("selected");
            }
        },
        constructorMatch(match) {
            var matchDetails = document.querySelector("#match-details");
            matchDetails.querySelector("#tournament-name").innerText = match.tournament_name;
            matchDetails.querySelector("#toss-result").innerText = match.toss_details;
            matchDetails.querySelector("#ground-detail").innerText = match.ground_name;
            matchDetails.querySelector("#date").innerText = stringUtil.parseDate(match.start_datetime);
            matchDetails.querySelector("#overs").innerText = match.overs + " Overs";
            matchDetails.querySelector("#team_a_run").innerText = match.team_a.summary +" (" + match.team_a.innings[0].overs_played+")";
            matchDetails.querySelector("#team_b_run").innerText = match.team_b.summary +" (" + match.team_b.innings[0].overs_played+")";
            matchDetails.querySelector("#result").innerText = match.match_summary.summary;
            matchDetails.querySelector("#result").classList.add(match.result);

            matchDetails.querySelector("#team_a").innerText =
            matchDetails.querySelector("#team_a_score_name").innerText = match.team_a.name;
            matchDetails.querySelector("#team_b").innerText =
            matchDetails.querySelector("#team_b_score_name").innerText = match.team_b.name;

            matchDetails.querySelector("#team_a_logo").style.backgroundImage =
            matchDetails.querySelector("#team_a_score_logo").style.backgroundImage = 'url('+match.team_a.logo+')';
            matchDetails.querySelector("#team_b_logo").style.backgroundImage = 
            matchDetails.querySelector("#team_b_score_logo").style.backgroundImage ='url('+match.team_b.logo+')';

            
            new gridjs.Grid({
                columns: ["Batters", "", "R","B","4s","6s","SR","Min"],
                data: matchUtil.parseBattingScore(match.team_a)
            }).render(document.querySelector("#team-a-batting-table"));

            new gridjs.Grid({
                columns: ["Bowlers", "O","M","R","W","0s","4s","6s","WD","NB","Eco"],
                data: matchUtil.parseBowlingScore(match.team_a)
            }).render(document.querySelector("#team-a-bowling-table"));


            new gridjs.Grid({
                columns: ["Batters", "", "R","B","4s","6s","SR","Min"],
                data: matchUtil.parseBattingScore(match.team_b)
            }).render(document.querySelector("#team-b-batting-table"));
            
            new gridjs.Grid({
                columns: ["Bowlers", "O","M","R","W","0s","4s","6s","WD","NB","Eco"],
                data: matchUtil.parseBowlingScore(match.team_b)
            }).render(document.querySelector("#team-b-bowling-table"));

            
            document.querySelector(".match-list[data-match-id='"+match.match_id+"']").scrollIntoView({ block: "center", inline: "center" });
        },
        destory() {

        }
    },
    players : {
        init(players) {
            this.eventHandler();
            this.constructorplayersList(players);
            this.constructorPlayer(players.members[route.params.player_id],playersStats[route.params.player_id]);
        },
        eventHandler(players) {
            
        },
        constructorplayersList(players) {
            var self = this;
            playerIds.forEach(function(playerId) {
                var player = players.members[playerId];
                self.constructorplayerList(player);
            });
        },
        constructorplayerList(playerData) {
            var playerList = document.querySelector(".player-list.dummy.hide").cloneNode(true);
            playerList.setAttribute("data-player-id", playerData.player_id);
            playerList.classList.remove("hide","dummy");
            playerList.querySelector("#profile-pic").src = "../"+playersPhotos[playerData.player_id];
            playerList.querySelector("#name").innerText = playerIdNames[playerData.player_id];
            
            document.querySelector("#player-lists").appendChild(playerList);

            playerList.addEventListener("click", function(event) {
                Router.navigate("#/players/"+playerData.player_id,true);
            });

            if (route.params.player_id == playerData.player_id.toString()) {
                playerList.classList.add("selected");
            }
        },
        constructorPlayer(player,playerStats) {
            var battingStats = document.querySelector("#batting-stats");
            stringUtil._CountUp(battingStats.querySelector("#matches"), playerStats.batting.matches);
            stringUtil._CountUp(battingStats.querySelector("#innings"), playerStats.batting.innings);
            stringUtil._CountUp(battingStats.querySelector("#notout"), playerStats.batting.notout);
            stringUtil._CountUp(battingStats.querySelector("#highestruns"), playerStats.batting.highestruns);
            stringUtil._CountUp(battingStats.querySelector("#avg"), playerStats.batting.avg);
            stringUtil._CountUp(battingStats.querySelector("#runs"), playerStats.batting.runs);
            stringUtil._CountUp(battingStats.querySelector("#balls"), playerStats.batting.balls);
            stringUtil._CountUp(battingStats.querySelector("#sr"), playerStats.batting.sr);
            stringUtil._CountUp(battingStats.querySelector("#ducks"), playerStats.batting.ducks);
            stringUtil._CountUp(battingStats.querySelector("[data-id='4s']"), playerStats.batting["4s"]);
            stringUtil._CountUp(battingStats.querySelector("[data-id='6s']"), playerStats.batting["6s"]);
            stringUtil._CountUp(battingStats.querySelector("[data-id='30s']"), playerStats.batting["30s"]);
            stringUtil._CountUp(battingStats.querySelector("[data-id='50s']"), playerStats.batting["50s"]);
            stringUtil._CountUp(battingStats.querySelector("[data-id='100s']"), playerStats.batting["100s"]);

            var bowlingStats = document.querySelector("#bowling-stats");
            stringUtil._CountUp(bowlingStats.querySelector("#matches"), playerStats.bowling.matches);
            stringUtil._CountUp(bowlingStats.querySelector("#innings"), playerStats.bowling.innings);
            stringUtil._CountUp(bowlingStats.querySelector("#overs"), playerStats.bowling.overs);
            stringUtil._CountUp(bowlingStats.querySelector("#maidens"), playerStats.bowling.maidens);
            stringUtil._CountUp(bowlingStats.querySelector("#wickets"), playerStats.bowling.wickets);
            stringUtil._CountUp(bowlingStats.querySelector("#runs"), playerStats.bowling.runs);
            stringUtil._CountUp(bowlingStats.querySelector("[data-id='3wickets']"), playerStats.bowling["3wickets"]);
            stringUtil._CountUp(bowlingStats.querySelector("[data-id='5wickets']"), playerStats.bowling["5wickets"]);
            stringUtil._CountUp(bowlingStats.querySelector("#economy"), playerStats.bowling.economy);
            stringUtil._CountUp(bowlingStats.querySelector("#sr"), playerStats.bowling.sr);
            stringUtil._CountUp(bowlingStats.querySelector("#avg"), playerStats.bowling.avg);
            stringUtil._CountUp(bowlingStats.querySelector("#wides"), playerStats.bowling.wides);
            stringUtil._CountUp(bowlingStats.querySelector("#noballs"), playerStats.bowling.noballs);
            stringUtil._CountUp(bowlingStats.querySelector("#dotballs"), playerStats.bowling.dotballs);
            stringUtil._CountUp(bowlingStats.querySelector("[data-id='4s']"), playerStats.bowling["4s"]);
            stringUtil._CountUp(bowlingStats.querySelector("[data-id='6s']"), playerStats.bowling["6s"]);
            bowlingStats.querySelector("#bestbowling").innerText = playerStats.bowling.bestWickets + "/" + playerStats.bowling.bestRuns;


            var fieldingStats = document.querySelector("#fielding-stats");
            stringUtil._CountUp(fieldingStats.querySelector("#matches"), playerStats.fielding.matches);
            stringUtil._CountUp(fieldingStats.querySelector("#catches"), playerStats.fielding.catches);
            stringUtil._CountUp(fieldingStats.querySelector("#caughtbehind"), playerStats.fielding.caughtbehind);
            stringUtil._CountUp(fieldingStats.querySelector("#runouts"), playerStats.fielding.runouts);
            stringUtil._CountUp(fieldingStats.querySelector("#stumpings"), playerStats.fielding.stumpings);

            document.querySelector(".player-list[data-player-id='"+player.player_id+"']").scrollIntoView({ block: "center", inline: "center" });

        },
        destory() {

        }
    },
    leaderboard : {
        range : "",
        init() {
            this.eventHandler();
            this.constructorLeaderboardData();
            this.constructorLeaderboardDetails("first");
        },
        eventHandler() {
            var self = this;
            this.range = document.querySelectorAll("#range")[0].value;
            document.querySelectorAll("#range")[0].addEventListener("change", function(){
                self.range = document.querySelectorAll("#range")[0].value;
                self.constructorLeaderboardData();
                self.constructorLeaderboardDetails();
            });
        },
        constructorLeaderboardData() {

            var self = this;
            
            this.topRuns = [];
            this["30s"] = [];
            this["50s"] = [];
            this["100s"] = [];
            this.topWickets = [];
            this.maidens = [];
            this["3wickets"] = [];
            this["5wickets"] = [];
            this.mostRunouts = [];
            this.mostCatches = [];
            this.mostStumpings = [];
            playerIds.forEach(function(playerId){
                var playerStats = window[self.range][playerId];
                if (playerStats.batting.runs > 0) {
                    self.topRuns.push({runs : playerStats.batting.runs , player_id : playerId , innings : window[self.range][playerId].batting.innings});
                }
                if (playerStats.batting["30s"] > 0) {
                    self["30s"].push({"30s" : playerStats.batting["30s"] , player_id : playerId});
                }
                if (playerStats.batting["50s"] > 0) {
                    self["50s"].push({"50s" : playerStats.batting["50s"] , player_id : playerId});
                }
                if (playerStats.batting["100s"] > 0) {
                    self["100s"].push({"100s" : playerStats.batting["100s"] , player_id : playerId});
                }


                if (playerStats.bowling.wickets > 0) {
                    self.topWickets.push({wickets : playerStats.bowling.wickets , player_id : playerId, innings : window[self.range][playerId].bowling.innings});
                }
                if (playerStats.bowling["3wickets"] > 0) {
                    self["3wickets"].push({"3wickets" : playerStats.bowling["3wickets"] , player_id : playerId});
                }
                if (playerStats.bowling["5wickets"] > 0) {
                    self["5wickets"].push({"5wickets" : playerStats.bowling["5wickets"] , player_id : playerId});
                }
                if (playerStats.bowling.maidens > 0) {
                    self.maidens.push({"maidens" : playerStats.bowling.maidens , player_id : playerId});
                }

                if (playerStats.fielding.runouts > 0 || playerStats.fielding.assistedrunouts > 0) {
                    self.mostRunouts.push({runouts : (playerStats.fielding.runouts + playerStats.fielding.assistedrunouts) , player_id : playerId});
                }
                if (playerStats.fielding.catches > 0 || playerStats.fielding.caughtbehind > 0) {
                    self.mostCatches.push({catches : (playerStats.fielding.catches + playerStats.fielding.caughtbehind) , player_id : playerId});
                }
                if (playerStats.fielding.stumpings > 0) {
                    self.mostStumpings.push({"stumpings" : playerStats.fielding.stumpings , player_id : playerId});
                }
            });

            self.topRuns = self.topRuns.sort((a, b) => {
                return b.runs - a.runs;
            });

            self["30s"] = self["30s"].sort((a, b) => {
                return b["30s"] - a["30s"];
            });

            self["50s"] = self["50s"].sort((a, b) => {
                return b["50s"] - a["50s"];
            });

            self["100s"] = self["100s"].sort((a, b) => {
                return b["100s"] - a["100s"];
            });

            self.topWickets = self.topWickets.sort((a, b) => {
                return b.wickets - a.wickets;
            });

            self["3wickets"] = self["3wickets"].sort((a, b) => {
                return b["3wickets"] - a["3wickets"];
            });

            self["5wickets"] = self["5wickets"].sort((a, b) => {
                return b["5wickets"] - a["5wickets"];
            });

            self.maidens = self.maidens.sort((a, b) => {
                return b.maidens - a.maidens;
            });

            self.mostRunouts = self.mostRunouts.sort((a, b) => {
                return b.runouts - a.runouts;
            });

            self.mostCatches = self.mostCatches.sort((a, b) => {
                return b.catches - a.catches;
            });

            self.mostStumpings = self.mostStumpings.sort((a, b) => {
                return b.stumpings - a.stumpings;
            });
        },
        constructorLeaderboardDetails(data) {

            if (this.range == "playersStats_2023") {
                document.querySelector("#batting-time-range").innerText = "May 15 2023 to Dec 31  2023";
                document.querySelector("#bowling-time-range").innerText = "May 15  2023 to Dec 31  2023";
                document.querySelector("#fielding-time-range").innerText = "May 15  2023 to Dec 31  2023";
            } else {
                document.querySelector("#batting-time-range").innerText = "January 1 2022 to Today";
                document.querySelector("#bowling-time-range").innerText = "January 1 2022 to Today";
                document.querySelector("#fielding-time-range").innerText = "January 1 2022 to Today";
            }
            
            var self = this;
            if (data == "first" ) {
                this.topRunsReportGrid = new gridjs.Grid(Object.assign({
                    columns: ["#", "Name",  {name : "R" ,width : "80px" },{name : "In" ,width : "80px" }],
                    data: matchUtil.parseForTable(self.topRuns,"runs","innings")
                },tabelStyle)).render(document.querySelector("#top-runs-report"));

                this.thirtiesReportGrid = new gridjs.Grid(Object.assign({
                    columns: ["#", "Name",  {name : "30s" ,width : "100px" }],
                    data: matchUtil.parseForTable(self["30s"],"30s")
                },tabelStyle)).render(document.querySelector("#thirties-report"));

                this.fiftiesReportGrid = new gridjs.Grid(Object.assign({
                    columns: ["#", "Name",  {name : "50s" ,width : "100px" }],
                    data: matchUtil.parseForTable(self["50s"],"50s")
                },tabelStyle)).render(document.querySelector("#fifties-report"));

                this.hundredsReportGrid = new gridjs.Grid(Object.assign({
                    columns: ["#", "Name",  {name : "100s" ,width : "100px" }],
                    data: matchUtil.parseForTable(self["100s"],"100s")
                },tabelStyle)).render(document.querySelector("#hundreds-report"));

                this.topWicketsReportGrid = new gridjs.Grid(Object.assign({
                    columns: ["#", "Name",  {name : "W" ,width : "80px" },{name : "In" ,width : "80px" }],
                    data: matchUtil.parseForTable(self.topWickets,"wickets","innings")
                },tabelStyle)).render(document.querySelector("#top-wickets-report"));

                this.mostThreeWicketsReportGrid = new gridjs.Grid(Object.assign({
                    columns: ["#", "Name",  {name : "3W" ,width : "100px" }],
                    data: matchUtil.parseForTable(self["3wickets"],"3wickets")
                },tabelStyle)).render(document.querySelector("#most-three-wickets-report"));

                this.mostFiveWicketsReportGrid = new gridjs.Grid(Object.assign({
                    columns: ["#", "Name",  {name : "5W" ,width : "100px" }],
                    data: matchUtil.parseForTable(self["5wickets"],"5wickets")
                },tabelStyle)).render(document.querySelector("#most-five-wickets-report"));

                this.maidenOversReportGrid = new gridjs.Grid(Object.assign({
                    columns: ["#", "Name",  {name : "M" ,width : "100px" }],
                    data: matchUtil.parseForTable(self.maidens,"maidens")
                },tabelStyle)).render(document.querySelector("#maiden-overs-report"));

                this.catchesReportGrid = new gridjs.Grid(Object.assign({
                    columns: ["#", "Name",  {name : "C" ,width : "100px" }],
                    data: matchUtil.parseForTable(self.mostCatches,"catches")
                },tabelStyle)).render(document.querySelector("#catches-report"));

                this.runoutsReportGrid = new gridjs.Grid(Object.assign({
                    columns: ["#", "Name",  {name : "R" ,width : "100px" }],
                    data: matchUtil.parseForTable(self.mostRunouts,"runouts")
                },tabelStyle)).render(document.querySelector("#runouts-report"));

                this.stumpingsReportGrid = new gridjs.Grid(Object.assign({
                    columns: ["#", "Name",  {name : "S" ,width : "100px" }],
                    data: matchUtil.parseForTable(self.mostStumpings,"stumpings")
                },tabelStyle)).render(document.querySelector("#stumpings-report"));
            } else {
                this.topRunsReportGrid.updateConfig({
                    data: matchUtil.parseForTable(self.topRuns,"runs","innings")
                }).forceRender();

                this.thirtiesReportGrid.updateConfig({
                    data: matchUtil.parseForTable(self["30s"],"30s")
                }).forceRender();

                this.fiftiesReportGrid.updateConfig({
                    data: matchUtil.parseForTable(self["50s"],"50s")
                }).forceRender();

                this.hundredsReportGrid.updateConfig({
                    data: matchUtil.parseForTable(self["100s"],"100s")
                }).forceRender();

                this.topWicketsReportGrid.updateConfig({
                    data: matchUtil.parseForTable(self.topWickets,"wickets","innings")
                }).forceRender();

                this.mostThreeWicketsReportGrid.updateConfig({
                    data: matchUtil.parseForTable(self["3wickets"],"3wickets")
                }).forceRender();

                this.mostFiveWicketsReportGrid.updateConfig({
                    data: matchUtil.parseForTable(self["5wickets"],"5wickets")
                }).forceRender();

                this.maidenOversReportGrid.updateConfig({
                    data: matchUtil.parseForTable(self.maidens,"maidens")
                }).forceRender();

                this.catchesReportGrid.updateConfig({
                    data: matchUtil.parseForTable(self.mostCatches,"catches")
                }).forceRender();

                this.runoutsReportGrid.updateConfig({
                    data: matchUtil.parseForTable(self.mostRunouts,"runouts")
                }).forceRender();

                this.stumpingsReportGrid.updateConfig({
                    data: matchUtil.parseForTable(self.mostStumpings,"stumpings")
                }).forceRender();
            }

            var searchInputs = document.querySelectorAll(".gridjs-search-input");
            searchInputs.forEach(function(input) {
                input.setAttribute("placeholder","Search a keyword...");
            });

        },
        destory() {

        }
    },
    points : {
        batting : [],
        bowling : [],
        fielding : [],
        others : [],
        init() {
            this.eventHandler();
            this.constructorPoints("first");
        },
        eventHandler() {
            var self = this;
            this.range = document.querySelectorAll("#range")[0].value;
            document.querySelectorAll("#range")[0].addEventListener("change", function(){
                self.range = document.querySelectorAll("#range")[0].value;
                self.constructorPoints();
            });
        },
        constructorPoints(data) { 
            if (this.range == "playersStats_2023") {
                document.querySelector("#points-time-range").innerText = "May 15 2023 to Dec 31  2023";
            } else {
                document.querySelector("#points-time-range").innerText = "January 1 2022 to Today";
            }
            
            this.batting = [];
            this.bowling = [];
            this.fielding = [];
            this.others = [];
            
            var self = this;
            playerIds.forEach(function(playerId){
                var playerObj = window[self.range][playerId];
                self.batting.push({player_id : playerId , points : playerObj.points.batting});
                self.bowling.push({player_id : playerId , points : playerObj.points.bowling});
                self.fielding.push({player_id : playerId , points : playerObj.points.fielding});
                self.others.push({player_id : playerId , points : playerObj.points.others});
            });

            self.topBattingPoint = self.batting.sort((a, b) => {
                return b.points - a.points;
            });

            self.topBowlingPoint = self.bowling.sort((a, b) => {
                return b.points - a.points;
            });

            self.topFieldingPoint = self.fielding.sort((a, b) => {
                return b.points - a.points;
            });

            self.topOtherPoint = self.others.sort((a, b) => {
                return b.points - a.points;
            });
            
            if (data == "first" ) {
                this.battingGrid = new gridjs.Grid(Object.assign({
                    columns: ["Rank", "Batsmen", "Points",{id: "name" , name : "Name" , hidden : true}],
                    data: matchUtil.parseForTable(self.topBattingPoint,"points")
                },tabelStyle)).render(document.querySelector("#batting-points"));
    
                this.bowlingGrid = new gridjs.Grid(Object.assign({
                    columns: ["Rank", "Bowler", "Points",{id: "name" , name : "Name" , hidden : true}],
                    data: matchUtil.parseForTable(self.topBowlingPoint,"points")
                },tabelStyle)).render(document.querySelector("#bowling-points"));
    
                this.fieldingGrid = new gridjs.Grid(Object.assign({
                    columns: ["Rank", "Fielder", "Points",{id: "name" , name : "Name" , hidden : true}],
                    data: matchUtil.parseForTable(self.topFieldingPoint,"points")
                },tabelStyle)).render(document.querySelector("#fielding-points"));

                this.otherGrid = new gridjs.Grid(Object.assign({
                    columns: ["Rank", "Name", "Points",{id: "name" , name : "Name" , hidden : true}],
                    data: matchUtil.parseForTable(self.topOtherPoint,"points")
                },tabelStyle)).render(document.querySelector("#other-points"));

                this.battingGrid.on('rowClick', (...args) => {
                    var playerId = args[1].cells[3].data;
                    var playerName =  args[1].cells[1].data;
                    if (args[0].target.getAttribute("data-column-id") == "points") {
                        var playerPointsLog = window[self.range][playerId].pointsLog.batting;
                        var popupContent = "";
                        Object.keys(playerPointsLog).forEach(matchId => {
                            var oppObj = matches[matchId].team_a.name === myTeam.name ? matches[matchId].team_b : matches[matchId].team_a;
                            var oppName = oppObj.name;
                            var match = matches[matchId];
                            popupContent += "{popup-match-name}[Vs "+ oppName + "] - "+stringUtil.parseDate(match.start_datetime)+"\n";
                            playerPointsLog[matchId].forEach(function(pointLog) {
                                popupContent += "<li>"+pointLog + "</li>\n";
                            });
                        })
                        window.popup = new Popup(Object.assign(popupStyle,{
                            id: "batting-points",
                            title: `Batting points - ${playerName} - ${window[self.range][playerId].points.batting} points`,
                            content: popupContent,
                        }));
            
                        window.popup.show();
                    } else if (args[0].target.getAttribute("data-column-id") == "batsmen") {
                        // redirectHash("/players/"+playerId);
                    }
                });
                
                this.bowlingGrid.on('rowClick', (...args) => {
                    var playerId = args[1].cells[3].data;
                    var playerName =  args[1].cells[1].data;
                    if (args[0].target.getAttribute("data-column-id") == "points") {
                        var playerPointsLog = window[self.range][playerId].pointsLog.bowling;
                        var popupContent = "";
                        Object.keys(playerPointsLog).forEach(matchId => {
                            var oppObj = matches[matchId].team_a.name === myTeam.name ? matches[matchId].team_b : matches[matchId].team_a;
                            var oppName = oppObj.name;
                            var match = matches[matchId];
                            popupContent += "{popup-match-name}[Vs "+ oppName + "] - "+stringUtil.parseDate(match.start_datetime)+"\n";
                            playerPointsLog[matchId].forEach(function(pointLog) {
                                popupContent += "<li>"+pointLog + "</li>\n";
                            });
                        })
                        window.popup = new Popup(Object.assign(popupStyle,{
                            id: "bowling-points",
                            title: `Bowling points - ${playerName} - ${window[self.range][playerId].points.bowling} points`,
                            content: popupContent,
                        }));
            
                        window.popup.show();
                    } else if (args[0].target.getAttribute("data-column-id") == "bowler") {
                        // redirectHash("/players/"+playerId);
                    }
                });
                
                this.fieldingGrid.on('rowClick', (...args) => {
                    var playerId = args[1].cells[3].data;
                    var playerName =  args[1].cells[1].data;
                    if (args[0].target.getAttribute("data-column-id") == "points") {
                        var playerPointsLog = window[self.range][playerId].pointsLog.fielding;
                        var popupContent = "";
                        Object.keys(playerPointsLog).forEach(matchId => {
                            var oppObj = matches[matchId].team_a.name === myTeam.name ? matches[matchId].team_b : matches[matchId].team_a;
                            var oppName = oppObj.name;
                            var match = matches[matchId];
                            popupContent += "{popup-match-name}[Vs "+ oppName + "] - "+stringUtil.parseDate(match.start_datetime)+"\n";
                            playerPointsLog[matchId].forEach(function(pointLog) {
                                popupContent += "<li>"+pointLog + "</li>\n";
                            });
                        })
                        window.popup = new Popup(Object.assign(popupStyle,{
                            id: "fielding-points",
                            title: `Fielding points - ${playerName} - ${window[self.range][playerId].points.fielding} points`,
                            content: popupContent,
                        }));
            
                        window.popup.show();
                    } else if (args[0].target.getAttribute("data-column-id") == "fielder") {
                        // redirectHash("/players/"+playerId);
                    }
                });

                this.otherGrid.on('rowClick', (...args) => {
                    var playerId = args[1].cells[3].data;
                    var playerName =  args[1].cells[1].data;
                    if (args[0].target.getAttribute("data-column-id") == "points") {
                        var playerPointsLog = window[self.range][playerId].pointsLog.others;
                        var popupContent = "";
                        Object.keys(playerPointsLog).forEach(matchId => {
                            var oppObj = matches[matchId].team_a.name === myTeam.name ? matches[matchId].team_b : matches[matchId].team_a;
                            var oppName = oppObj.name;
                            var match = matches[matchId];
                            popupContent += "{popup-match-name}[Vs "+ oppName + "] - "+stringUtil.parseDate(match.start_datetime)+"\n";
                            playerPointsLog[matchId].forEach(function(pointLog) {
                                popupContent += "<li>"+pointLog + "</li>\n";
                            });
                        })
                        window.popup = new Popup(Object.assign(popupStyle,{
                            id: "other-points",
                            title: `Other points - ${playerName} - ${window[self.range][playerId].points.others} points`,
                            content: popupContent,
                        }));
            
                        window.popup.show();
                    } else if (args[0].target.getAttribute("data-column-id") == "fielder") {
                        // redirectHash("/players/"+playerId);
                    }
                });

            } else {
                this.battingGrid.updateConfig({
                    data: matchUtil.parseForTable(self.topBattingPoint,"points")
                }).forceRender();
    
                this.bowlingGrid.updateConfig({
                    data: matchUtil.parseForTable(self.topBowlingPoint,"points")
                }).forceRender();
    
                this.fieldingGrid.updateConfig({
                    data: matchUtil.parseForTable(self.topFieldingPoint,"points")
                }).forceRender();

                this.otherGrid.updateConfig({
                    data: matchUtil.parseForTable(self.topOtherPoint,"points")
                }).forceRender();
            }

            var searchInputs = document.querySelectorAll(".gridjs-search-input");
            searchInputs.forEach(function(input) {
                input.setAttribute("placeholder","Search a keyword...");
            });
            
        },
        destory() {

        }
    },
    pointsSystem : {
        init() {
            this.eventHandler();
        },
        eventHandler() {
            
        },
        destory() {

        }
    }
}