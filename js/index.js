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
        init(matches) {
            this.eventHandler();
        },
        eventHandler(matches) {
            
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
            playerList.querySelector("#name").innerText = playerData.name;
            
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
        stats : {},
        init(stats,range) {
            this.range = range;
            this.stats = stats;
            this.eventHandler();
            this.constructorLeaderboardData();
            this.constructorLeaderboardDetails();
        },
        eventHandler() {
            
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
                var playerStats = self.stats[playerId];
                if (playerStats.batting.runs > 0) {
                    self.topRuns.push({runs : playerStats.batting.runs , player_id : playerId});
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
                    self.topWickets.push({wickets : playerStats.bowling.wickets , player_id : playerId});
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
        constructorLeaderboardDetails() {

            if (this.range == "may23") {
                document.querySelector("#batting-time-range").innerText = "May 15 2023 to Nov 15  2023(6 months)";
                document.querySelector("#bowling-time-range").innerText = "May 15  2023 to Nov 15  2023(6 months)";
                document.querySelector("#fielding-time-range").innerText = "May 15  2023 to Nov 15  2023(6 months)";
            } else {
                document.querySelector("#batting-time-range").innerText = "January 1 2022 to Today";
                document.querySelector("#bowling-time-range").innerText = "January 1 2022 to Today";
                document.querySelector("#fielding-time-range").innerText = "January 1 2022 to Today";
            }
            
            var self = this;
            new gridjs.Grid({
                columns: ["#", "Name", "R"],
                data: matchUtil.parseTopRuns(self.topRuns,"runs")
            }).render(document.querySelector("#top-runs-report"));

            new gridjs.Grid({
                columns: ["#", "Name", "30s"],
                data: matchUtil.parseTopRuns(self["30s"],"30s")
            }).render(document.querySelector("#thirties-report"));

            new gridjs.Grid({
                columns: ["#", "Name", "50s"],
                data: matchUtil.parseTopRuns(self["50s"],"50s")
            }).render(document.querySelector("#fifties-report"));

            new gridjs.Grid({
                columns: ["#", "Name", "100s"],
                data: matchUtil.parseTopRuns(self["100s"],"100s")
            }).render(document.querySelector("#hundreds-report"));

            new gridjs.Grid({
                columns: ["#", "Name", "R"],
                data: matchUtil.parseTopRuns(self.topWickets,"wickets")
            }).render(document.querySelector("#top-wickets-report"));

            new gridjs.Grid({
                columns: ["#", "Name", "3W"],
                data: matchUtil.parseTopRuns(self["3wickets"],"3wickets")
            }).render(document.querySelector("#most-three-wickets-report"));

            new gridjs.Grid({
                columns: ["#", "Name", "5W"],
                data: matchUtil.parseTopRuns(self["5wickets"],"5wickets")
            }).render(document.querySelector("#most-five-wickets-report"));

            new gridjs.Grid({
                columns: ["#", "Name", "M"],
                data: matchUtil.parseTopRuns(self.maidens,"maidens")
            }).render(document.querySelector("#maiden-overs-report"));

            new gridjs.Grid({
                columns: ["#", "Name", "M"],
                data: matchUtil.parseTopRuns(self.mostCatches,"catches")
            }).render(document.querySelector("#catches-report"));

            new gridjs.Grid({
                columns: ["#", "Name", "M"],
                data: matchUtil.parseTopRuns(self.mostRunouts,"runouts")
            }).render(document.querySelector("#runouts-report"));

            new gridjs.Grid({
                columns: ["#", "Name", "M"],
                data: matchUtil.parseTopRuns(self.mostStumpings,"stumpings")
            }).render(document.querySelector("#stumpings-report"));

        },
        destory() {

        }
    },
    points : {
        init() {
        }
    }
}