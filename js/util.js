
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
        this.selectMenu(templateObj.id);
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
    playerBattingStats(battingObj, playerObj) {
        if (playerObj.highestruns < battingObj.runs) {
            playerObj.highestruns = battingObj.runs;
        }
        if(battingObj.how_to_out == "not out") {
            playerObj.notout++;
        } else if (battingObj.runs == 0) {
            playerObj.ducks ++;
        }
        if (battingObj.runs >= 30 && battingObj.runs < 50) {
            playerObj["30s"] ++;
        }
        if (battingObj.runs >= 50 && battingObj.runs < 100) {
            playerObj["50s"] ++;
        }
        if (battingObj.runs >= 100) {
            playerObj["100s"]  ++;
        }
        playerObj.matches++;
        playerObj.innings++;
        playerObj["4s"] += battingObj["4s"] || 0;
        playerObj["6s"] += battingObj["6s"] || 0;
        playerObj.runs += battingObj.runs || 0;
        playerObj.balls += battingObj.balls || 0;

    },
    playerBowlingStats(bowlingObj, playerObj) {
        if (bowlingObj.wickets >= 3 && bowlingObj.wickets < 5) {
            playerObj["3wickets"] ++;
        }
        if (bowlingObj.wickets >= 5) {
            playerObj["5wickets"] ++;
        }
        
        playerObj.innings++;
        playerObj["4s"] += bowlingObj["4s"] || 0;
        playerObj["6s"] += bowlingObj["6s"] || 0;
        playerObj.runs  += bowlingObj.runs || 0;
        playerObj.maidens  += bowlingObj.maidens || 0;
        playerObj.overs  += bowlingObj.overs || 0;
        playerObj.noballs  += bowlingObj.noball || 0;
        playerObj.wides  += bowlingObj.wide || 0;
        playerObj.wickets  += bowlingObj.wickets || 0;
        playerObj.dotballs  += bowlingObj["0s"] || 0;
        playerObj.balls  += matchUtil.oversToBalls(bowlingObj.overs || 0);

        if (bowlingObj.wickets > playerObj.bestWickets) {
            playerObj.bestWickets = bowlingObj.wickets;
            playerObj.bestRuns = bowlingObj.runs;
        } else if (bowlingObj.wickets === playerObj.bestWickets && bowlingObj.runs < playerObj.bestRuns) {
            playerObj.bestRuns = bowlingObj.runs;
        }
    },

    // playerFieldingStats(fieldingObj, playerObj) {
        // playerObj.innings++;
        // playerObj["4s"] += bowlingObj["4s"] || 0;
        // playerObj["6s"] += bowlingObj["6s"] || 0;
        // playerObj.runs  += bowlingObj.runs || 0;
        // playerObj.maidens  += bowlingObj.maidens || 0;
        // playerObj.overs  += bowlingObj.overs || 0;
        // playerObj.noballs  += bowlingObj.noball || 0;
        // playerObj.wides  += bowlingObj.wide || 0;
        // playerObj.wickets  += bowlingObj.wickets || 0;
        // playerObj.dotballs  += bowlingObj["0s"] || 0;
        // playerObj.balls  += matchUtil.oversToBalls(bowlingObj.overs || 0);
    // },

    parseTopRuns(players,key) {
        var newArray = [];
        players.forEach(function(player,index) {
            newArray[index] = [index+1,playerIdNames[player.player_id], player[key]];
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