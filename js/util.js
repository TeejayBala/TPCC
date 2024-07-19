
var templateUtil = {
    loadTemplate(templateObj) {
        this.clean();
        var template    = document.querySelector("template[layout-id="+templateObj.id+"]");
        var clone       = template.content.cloneNode(true);
        var wrapper     = document.createElement('div');
        wrapper.setAttribute("id", "layout-"+templateObj.id);
        wrapper.classList.add("layouts");
        wrapper.appendChild(clone);
        this.setTitle(templateObj.title);
        this.selectMenu(templateObj.tab_id || templateObj.id);
        document.querySelector(templateObj.container).appendChild(wrapper);
        templateObj.callback();
    },
    clean() {
        document.querySelectorAll('.layouts').forEach((layout) => layout.remove());
    },
    setTitle(title)  {
        document.title = title;
    },
    selectMenu(id) {
        document.querySelectorAll(".menu-list").forEach((layout) => layout.classList.remove("selected"));
        document.querySelector(".menu-list#"+id).classList.add("selected");
    }
}

var stringUtil = {
    parseDate(str) {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(str).toLocaleDateString("en-US", options);
    },
    _CountUp(querySelector,value) {
        const options = {};
        if (value % 1 !== 0) {
            options.decimalPlaces = 2;
        }
        let demo = new CountUp(querySelector, value, options);
        if (!demo.error) {
            demo.start();
        } else {
            console.error(demo.error);
        }
    }
}

String.prototype.format = function(dataObj) {
    a = this;
    for (k in dataObj) {
        a = a.replaceAll("{" + k + "}", dataObj[k])
    }
    return a
  }
  

var contentUtil = {
    pointsMessage(type, data) {
        return pointsHighlight[type].format(data);
    }
}

var matchUtil = {
    parseBattingScore(team) {
        batterArray = team.scorecard[0].batting;
        var battingScore = [];
        batterArray.forEach(function (battingObj) {
            battingScore.push([
                battingObj.name,
                battingObj.how_to_out,
                battingObj.runs,
                battingObj.balls,
                battingObj['4s'],
                battingObj['6s'],
                battingObj.SR,
                battingObj.minutes
            ]);
        });
        battingScore.push(["Extras",team.scorecard[0].extras.summary,team.scorecard[0].extras.total]);
        battingScore.push(["Total", "("+team.innings[0].total_wicket+" wkts, "+team.innings[0].overs_played+" Overs) RR:"+team.innings[0].summary.rr, team.innings[0].summary.score]);
        return battingScore;
    },
    parseBowlingScore(team) {
        bowlerArray = team.scorecard[0].bowling;
        var bowlerScore = [];
        bowlerArray.forEach(function (bowlerObj) {
            bowlerScore.push([
                bowlerObj.name,
                bowlerObj.overs,
                bowlerObj.maidens,
                bowlerObj.runs,
                bowlerObj.wickets,
                bowlerObj['0s'],
                bowlerObj['4s'],
                bowlerObj['6s'],
                bowlerObj.wide,
                bowlerObj.noball,
                bowlerObj.economy_rate
            ]);
        });
        return bowlerScore;
    },
    playerBattingStats(battingObj, playerObj, match, position) {
        this.calculateBattingStats(battingObj, playerObj.batting);

        //Batting position calculation
        if (playerObj.batting.position_data[position]) {
            this.calculateBattingStats(battingObj, playerObj.batting.position_data[position]);
        } else {
            playerObj.batting.position_data[position] = JSON.parse(JSON.stringify(battingPositionStatsObj));
            this.calculateBattingStats(battingObj, playerObj.batting.position_data[position]);
        }

        //Batting points calculation
        var battingPoints = 0;
        var pointsLog = [];
        var playerName = playerIdNames[playerObj.player_id];

        if (battingObj.runs == 0) {//Points: Dismissed for duck
            battingPoints -= 10;
            pointsLog.push(contentUtil.pointsMessage("duck",{player_name : playerName , "total_runs" : battingObj.runs , total_points : -10 }));
        }

        if (battingObj["6s"] > 0) { //Points: Six runs (off one ball) bonus
            battingPoints += battingObj["6s"] * 2;
            pointsLog.push(contentUtil.pointsMessage("six",{player_name : playerName , "total_six" : battingObj["6s"] , total_points : battingObj["6s"] * 2 }));
        }
        if (battingObj["4s"] > 0) { //Points: Four runs (off one ball) bonus
            battingPoints += battingObj["4s"] * 1;
            pointsLog.push(contentUtil.pointsMessage("four",{player_name : playerName , "total_four" : battingObj["4s"] , total_points : battingObj["4s"] * 1 }));
        }

        var SR = JSON.parse(battingObj.SR);
        if (SR < 50) {
            battingPoints -= 10;
            pointsLog.push(contentUtil.pointsMessage("strike_rate_1",{player_name : playerName , "total_runs" : battingObj.runs , "total_balls_faced" : battingObj.balls , "strike_rate" : battingObj.SR , total_points : -10 }));
        }

        var runs = battingObj.runs;

        if (runs > 0) {
            battingPoints += runs*1;
            pointsLog.push(contentUtil.pointsMessage("runs",{player_name : playerName , "total_runs" : battingObj.runs , total_points : runs*1 }));
        }
        
        if (runs >= 10) {
            if (SR >= 200) {
                battingPoints += 50;
                pointsLog.push(contentUtil.pointsMessage("strike_rate_6",{player_name : playerName , "total_runs" : runs , "total_balls_faced" : battingObj.balls , "strike_rate" : battingObj.SR , total_points : 50 }));
            } else if (SR >= 175) {
                battingPoints += 40;
                pointsLog.push(contentUtil.pointsMessage("strike_rate_5",{player_name : playerName , "total_runs" : runs , "total_balls_faced" : battingObj.balls , "strike_rate" : battingObj.SR , total_points : 40 }));
            } else if (SR >= 150) {
                battingPoints += 30;
                pointsLog.push(contentUtil.pointsMessage("strike_rate_4",{player_name : playerName , "total_runs" : runs , "total_balls_faced" : battingObj.balls , "strike_rate" : battingObj.SR , total_points : 30 }));
            } else if (SR >= 125) {
                battingPoints += 20;
                pointsLog.push(contentUtil.pointsMessage("strike_rate_3",{player_name : playerName , "total_runs" : runs , "total_balls_faced" : battingObj.balls , "strike_rate" : battingObj.SR , total_points : 20 }));
            } else if (SR >= 100) {
                battingPoints += 10;
                pointsLog.push(contentUtil.pointsMessage("strike_rate_2",{player_name : playerName , "total_runs" : runs , "total_balls_faced" : battingObj.balls , "strike_rate" : battingObj.SR , total_points : 10 }));
            }
        }
        
        if (runs >= 50) {
            battingPoints += runs*2;
            pointsLog.push(contentUtil.pointsMessage("runs_50_plus",{player_name : playerName , "total_runs" : runs , total_points : runs*2 }));
        } else if (runs >= 40) {
            battingPoints += 40;
            pointsLog.push(contentUtil.pointsMessage("runs_40",{player_name : playerName , "total_runs" : runs , total_points : 40 }));
        } else if (runs >= 30) {
            battingPoints += 30;
            pointsLog.push(contentUtil.pointsMessage("runs_30",{player_name : playerName , "total_runs" : runs , total_points : 30 }));
        } else if (runs >= 20) {
            battingPoints += 20;
            pointsLog.push(contentUtil.pointsMessage("runs_20",{player_name : playerName , "total_runs" : runs , total_points : 20 }));
        } else if (runs >= 10) {
            battingPoints += 10;
            pointsLog.push(contentUtil.pointsMessage("runs_10",{player_name : playerName , "total_runs" : runs , total_points : 10 }));
        }

        playerObj.points.batting += battingPoints;
        if (pointsLog.length > 0) {
            playerObj.pointsLog.batting[match.match_id] = pointsLog;
        }
    },
    calculateBattingStats(battingObj, playerBattingObj) {
        if (playerBattingObj.highestruns < battingObj.runs) {
            playerBattingObj.highestruns = battingObj.runs;
        }
        if(battingObj.how_to_out == "not out") {
            playerBattingObj.notout++;
        } else if (battingObj.runs == 0) {
            playerBattingObj.ducks ++;
        }
        if (battingObj.runs >= 30 && battingObj.runs < 50) {
            playerBattingObj["30s"] ++;
        }
        if (battingObj.runs >= 50 && battingObj.runs < 100) {
            playerBattingObj["50s"] ++;
        }
        if (battingObj.runs >= 100) {
            playerBattingObj["100s"]  ++;
        }
        playerBattingObj.matches++;
        playerBattingObj.innings++;
        playerBattingObj["4s"] += battingObj["4s"] || 0;
        playerBattingObj["6s"] += battingObj["6s"] || 0;
        playerBattingObj.runs += battingObj.runs || 0;
        playerBattingObj.balls += battingObj.balls || 0;
    },
    playerBowlingStats(bowlingObj, playerObj, match) {
        this.calculateBowlingStats(bowlingObj, playerObj.bowling);

        // //Bowling position calculation
        // if (playerObj.bowling.position_data[position]) {
        //     this.calculateBowlingStats(battingObj, playerObj.bowling.position_data[position]);
        // } else {
        //     playerObj.bowling.position_data[position] = JSON.parse(JSON.stringify(battingPositionStatsObj));
        //     this.calculateBowlingStats(battingObj, playerObj.bowling.position_data[position], oversPostionData);
        // }

        //Bowling points calculation
        var bowlingPoints = 0;
        var pointsLog = [];
        var playerName = playerIdNames[playerObj.player_id];
        
        bowlingPoints += bowlingObj.wickets * 20;
        if (bowlingObj.wickets > 0)
        pointsLog.push(contentUtil.pointsMessage("wicket",{player_name : playerName , "total_wickets" : bowlingObj.wickets, total_points : bowlingObj.wickets * 20 }));
        
        bowlingPoints += bowlingObj.maidens * 40;
        if (bowlingObj.maidens > 0)
        pointsLog.push(contentUtil.pointsMessage("maidens",{player_name : playerName , "total_maidens" : bowlingObj.maidens, total_points : bowlingObj.maidens * 40 }));
        
        if (playerObj.bowling.balls >= 12) {
            var eco = JSON.parse(bowlingObj.economy_rate);
            if(eco >= 12) {
                bowlingPoints -= 30;
                pointsLog.push(contentUtil.pointsMessage("economy_rate_6",{player_name : playerName , "economy_rate" : bowlingObj.economy_rate, total_runs_conceded : bowlingObj.runs , total_overs_bowled : bowlingObj.overs , total_points : -30 }));
            } else if (eco >= 10) {
                bowlingPoints -= 20;
                pointsLog.push(contentUtil.pointsMessage("economy_rate_5",{player_name : playerName , "economy_rate" : bowlingObj.economy_rate, total_runs_conceded : bowlingObj.runs , total_overs_bowled : bowlingObj.overs , total_points : -20 }));
            } else if (eco >= 8) {
                bowlingPoints -= 10;
                pointsLog.push(contentUtil.pointsMessage("economy_rate_4",{player_name : playerName , "economy_rate" : bowlingObj.economy_rate, total_runs_conceded : bowlingObj.runs , total_overs_bowled : bowlingObj.overs , total_points : -10 }));
            } else if (eco >= 6) {
                bowlingPoints += 0;
            } else if (eco >= 4) {
                bowlingPoints += 10;
                pointsLog.push(contentUtil.pointsMessage("economy_rate_3",{player_name : playerName , "economy_rate" : bowlingObj.economy_rate, total_runs_conceded : bowlingObj.runs , total_overs_bowled : bowlingObj.overs , total_points : 10 }));
            } else if (eco >= 2) {
                bowlingPoints += 20;
                pointsLog.push(contentUtil.pointsMessage("economy_rate_2",{player_name : playerName , "economy_rate" : bowlingObj.economy_rate, total_runs_conceded : bowlingObj.runs , total_overs_bowled : bowlingObj.overs , total_points : 20 }));
            } else {
                bowlingPoints += 30;
                pointsLog.push(contentUtil.pointsMessage("economy_rate_1",{player_name : playerName , "economy_rate" : bowlingObj.economy_rate, total_runs_conceded : bowlingObj.runs , total_overs_bowled : bowlingObj.overs , total_points : 30 }));
            }
        }

        if (bowlingObj.wickets >= 5) {
            bowlingPoints += 80;
            pointsLog.push(contentUtil.pointsMessage("wickets_5",{player_name : playerName , "total_wickets" : bowlingObj.wickets , total_points : 50 }));
        } else if (bowlingObj.wickets >= 4) {
            bowlingPoints += 40;
            pointsLog.push(contentUtil.pointsMessage("wickets_4",{player_name : playerName , "total_wickets" : bowlingObj.wickets , total_points : 40 }));
        } else if (bowlingObj.wickets >= 3) {
            bowlingPoints += 20;
            pointsLog.push(contentUtil.pointsMessage("wickets_3",{player_name : playerName , "total_wickets" : bowlingObj.wickets , total_points : 20 }));
        } else if (bowlingObj.wickets >= 2) {
            bowlingPoints += 10;
            pointsLog.push(contentUtil.pointsMessage("wickets_2",{player_name : playerName , "total_wickets" : bowlingObj.wickets , total_points : 10 }));
        } 

        
        playerObj.points.bowling += bowlingPoints;
        if (pointsLog.length > 0) {
            playerObj.pointsLog.bowling[match.match_id] = pointsLog;
        }
    },

    calculateBowlingStats(bowlingObj, playerBowlingObj, oversPostionData) {
        if (bowlingObj.wickets >= 3 && bowlingObj.wickets < 5) {
            playerBowlingObj["3wickets"] ++;
        }
        if (bowlingObj.wickets >= 5) {
            playerBowlingObj["5wickets"] ++;
        }
        
        playerBowlingObj.innings++;
        playerBowlingObj["4s"] += bowlingObj["4s"] || 0;
        playerBowlingObj["6s"] += bowlingObj["6s"] || 0;
        playerBowlingObj.runs  += bowlingObj.runs || 0;
        playerBowlingObj.maidens  += bowlingObj.maidens || 0;
        playerBowlingObj.overs  += bowlingObj.overs || 0;
        playerBowlingObj.noballs  += bowlingObj.noball || 0;
        playerBowlingObj.wides  += bowlingObj.wide || 0;
        playerBowlingObj.wickets  += bowlingObj.wickets || 0;
        playerBowlingObj.dotballs  += bowlingObj["0s"] || 0;
        playerBowlingObj.balls  += matchUtil.oversToBalls(bowlingObj.overs || 0);

        if (bowlingObj.wickets > playerBowlingObj.bestWickets) {
            playerBowlingObj.bestWickets = bowlingObj.wickets;
            playerBowlingObj.bestRuns = bowlingObj.runs;
        } else if (bowlingObj.wickets === playerBowlingObj.bestWickets && bowlingObj.runs < playerBowlingObj.bestRuns) {
            playerBowlingObj.bestRuns = bowlingObj.runs;
        }
    },

    playerFieldingStats(oppBatterObj, playersResultObj, match, wicketKeeper) {
        
        if(oppBatterObj.how_to_out != "not out") {
            var how_to_out = oppBatterObj.how_to_out;

            if (how_to_out.startsWith("run out ")) {
                how_to_out = how_to_out.replace("run out", "").split("/");
                var runoutFielder = playerNames[how_to_out[0].trim()];
                if (how_to_out.length > 1) {
                    var runoutAssistFielder = playerNames[how_to_out[1].trim()];
                    if (playersResultObj[runoutAssistFielder]) {
                        playersResultObj[runoutAssistFielder].fielding.assistedrunouts++;
                        playersResultObj[runoutAssistFielder].points.fielding += 10;
                        var pointsLog = playersResultObj[runoutAssistFielder].pointsLog.fielding[match.match_id];
                        if (pointsLog) {
                            pointsLog.push(contentUtil.pointsMessage("run_out_indirect",{player_name : playerIdNames[runoutAssistFielder] , total_points : 10 }));
                        } else {
                            playersResultObj[runoutAssistFielder].pointsLog.fielding[match.match_id] = [contentUtil.pointsMessage("run_out_indirect",{player_name : playerIdNames[runoutAssistFielder] , total_points : 10 })]
                        }
                    } else {
                        errorAlert("Fielding data parseing error. how_to_out "+oppBatterObj.how_to_out+". Matchid - "+match.match_id,true);
                    }
                }
                if (playersResultObj[runoutFielder]) {
                    playersResultObj[runoutFielder].fielding.runouts++;
                    var pointLog;
                    if (how_to_out.length > 1) {
                        playersResultObj[runoutFielder].points.fielding += 10;
                        pointLog = contentUtil.pointsMessage("run_out_indirect",{player_name : playerIdNames[runoutFielder] , total_points : 10 });
                    } else {
                        playersResultObj[runoutFielder].points.fielding += 20;
                        pointLog = contentUtil.pointsMessage("run_out_direct",{player_name : playerIdNames[runoutFielder] , total_points : 20 });
                    }
                    var pointsLog = playersResultObj[runoutFielder].pointsLog.fielding[match.match_id];
                    if (pointsLog) {
                        pointsLog.push(pointLog);
                    } else {
                        playersResultObj[runoutFielder].pointsLog.fielding[match.match_id] = [pointLog];
                    }
                } else {
                    errorAlert("Fielding data parseing error. how_to_out "+oppBatterObj.how_to_out+". Matchid - "+match.match_id,true);
                }

            } else if (how_to_out.startsWith("c ")) {
                how_to_out = how_to_out.replace("c", "").split(" b ");
                if (how_to_out.length > 2) {
                    errorAlert("Fielding data parseing error. how_to_out "+oppBatterObj.how_to_out+". Matchid - "+match.match_id,false);
                }
                var catcherId = playerNames[how_to_out[0].trim()];
                if (playersResultObj[catcherId]) {
                    var pointLog;
                    if (wicketKeeper && wicketKeeper.player_id == catcherId ) {
                        playersResultObj[catcherId].fielding.caughtbehind++;
                        pointLog = contentUtil.pointsMessage("catches_wicketkeeper",{player_name : playerIdNames[catcherId] , total_points : 10 });
                    } else {
                        playersResultObj[catcherId].fielding.catches++;
                        pointLog = contentUtil.pointsMessage("catches_fielder",{player_name : playerIdNames[catcherId] , total_points : 10 });
                    }
                    playersResultObj[catcherId].points.fielding += 10;
                    var pointsLog = playersResultObj[catcherId].pointsLog.fielding[match.match_id];
                    if (pointsLog) {
                        pointsLog.push(pointLog);
                    } else {
                        playersResultObj[catcherId].pointsLog.fielding[match.match_id] = [pointLog];
                    }
                } else {
                    errorAlert("Fielding data parseing error. how_to_out "+oppBatterObj.how_to_out+". Matchid - "+match.match_id,true);
                }

            } else if (how_to_out.startsWith("c&b ")) {
                how_to_out = how_to_out.replace("c&b", "");
                var catcherId = playerNames[how_to_out.trim()];
                if (playersResultObj[catcherId]) {
                    playersResultObj[catcherId].fielding.catches++;
                    playersResultObj[catcherId].points.fielding += 10;
                    var pointsLog = playersResultObj[catcherId].pointsLog.fielding[match.match_id];
                    if (pointsLog) {
                        pointsLog.push(contentUtil.pointsMessage("catches_fielder",{player_name : playerIdNames[catcherId] , total_points : 10 }));
                    } else {
                        playersResultObj[catcherId].pointsLog.fielding[match.match_id] = [contentUtil.pointsMessage("catches_fielder",{player_name : playerIdNames[catcherId] , total_points : 10 })]
                    }
                } else {
                    errorAlert("Fielding data parseing error. how_to_out "+oppBatterObj.how_to_out+". Matchid - "+match.match_id,true);
                }

            } else if (how_to_out.startsWith("st ")) {
                how_to_out = how_to_out.replace("st", "").split("b");
                var keeperId = playerNames[how_to_out[0].trim()];

                if (playersResultObj[keeperId]) {
                    playersResultObj[keeperId].fielding.stumpings++;
                    playersResultObj[keeperId].points.fielding += 20;
                    var pointsLog = playersResultObj[keeperId].pointsLog.fielding[match.match_id];
                    if (pointsLog) {
                        pointsLog.push(contentUtil.pointsMessage("stumping",{player_name : playerIdNames[keeperId] , total_points : 10 }));
                    } else {
                        playersResultObj[keeperId].pointsLog.fielding[match.match_id] = [contentUtil.pointsMessage("stumping",{player_name : playerIdNames[keeperId] , total_points : 20 })]
                    }
                } else {
                    errorAlert("Fielding data parseing error. how_to_out "+oppBatterObj.how_to_out+". Matchid - "+match.match_id,true);
                }
            } else if (how_to_out.startsWith("b ") || how_to_out.startsWith("lbw ") || how_to_out.startsWith('retired out') ) {
                //skiped
            } else {
                errorAlert("Fielding data parseing error.",false);
            }
        }
    },

    playerOtherStats(playersResultObj,match) {
        var mvpPlayer = mvpList[match.match_id][0] && mvpList[match.match_id][0].player_id || 0;
        if (playersResultObj[mvpPlayer]) {
            playersResultObj[mvpPlayer].points.others += 50;
            var pointsLog = playersResultObj[mvpPlayer].pointsLog.others[match.match_id];
            if (pointsLog) {
                pointsLog.push(contentUtil.pointsMessage("man_of_the_match",{player_name : playerIdNames[mvpPlayer] , total_points : 10 }));
            } else {
                playersResultObj[mvpPlayer].pointsLog.others[match.match_id] = [contentUtil.pointsMessage("man_of_the_match",{player_name : playerIdNames[mvpPlayer] , total_points : 50 })]
            }
        } else if (mvpPlayer != 0) {
            errorAlert("MVP player not a team player. Matchid - "+match.match_id +" Player id - "+mvpPlayer, false);
        }
    },

    parseForTable(players,key,key2) {
        var newArray = [];
        players.forEach(function(player,index) {
            if (key2) {
                newArray[index] = [index+1,playerIdNames[player.player_id], player[key], player[key2], player.player_id];
            } else {
                newArray[index] = [index+1,playerIdNames[player.player_id], player[key], player.player_id];
            }
        });
        return newArray;
    },
    
    oversToBalls(overs) {
        var overs = (overs+"").split(".")
        const over = Number(overs[0]);
        const balls = Number(overs[1] || 0);
        return (over*6) + balls;
    } 
}

var i = 0;
var errorAlert = function(message,silent) {
    i++;
    localStorage.setItem("errorAlert - "+i+" - "+(new Date().getTime()) , message);
    if (!silent) {
        alert("!!!Error Alert : "+message+". Kindly inform to the administrator.");
    }
}

function redirectHash(hashurl,silentRedirect) {
    if (silentRedirect) {
        hashurl = (hashurl[0] == "#")? hashurl : "#"+hashurl;
        router.replaceCurrentRouteWith(hashurl);
    } else {
        window.location.hash = hashurl;
    }
    
}