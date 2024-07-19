Router.add({
    path: '#/',
    on: function() {
        Router.navigate('#/dashboard',true);
    }
});

// Dashboard
Router.add({
    path: '#/dashboard',
    on: function() {
        templateUtil.loadTemplate(templateConfig.dashboard);
    }
});


// Matches
Router.add({
    path: '#/matches',
    on: function() {
        Router.navigate('#/matches/'+matchOrder[0],true);
    }
});

Router.add({
    path: '#/matches/:match_id',
    on: function() {
        templateUtil.loadTemplate(templateConfig.matches);
    }
});


// Records
Router.add({
    path: '#/records',
    on: function() {
        templateUtil.loadTemplate(templateConfig.records);
    }
});


// Players
Router.add({
    path: '#/players',
    on: function() {
        Router.navigate('#/players/'+playerIds[0],true);
    }
});

Router.add({
    path: '#/players/:player_id',
    on: function() {
        templateUtil.loadTemplate(templateConfig.players);
    }
});


//Leaderboard
Router.add({
    path: '#/leaderboard',
    on: function() {
        templateUtil.loadTemplate(templateConfig.leaderboard);
    }
});

// //Leaderboard
// Router.add({
//     path: '#/leaderboard/:leaderboard_id',
//     on: function() {
//         templateUtil.loadTemplate(templateConfig.leaderboard_may23,window.route.params.leaderboard_id);
//     }
// });


//Leaderboard
Router.add({
    path: '#/points',
    on: function() {
        templateUtil.loadTemplate(templateConfig.points);
    }
});

//Leaderboard
Router.add({
    path: '#/points-system',
    on: function() {
        templateUtil.loadTemplate(templateConfig.pointsSystem);
    }
});




var templateConfig = {
    dashboard : {
        id : "dashboard",
        container : "#sub-container",
        title : "TPCC - Dashboard",
        callback()  {
            controller.dashboard.init();
        }
    },
    matches : {
        id : "matches",
        container : "#sub-container",
        title : "TPCC - Matches",
        callback()  {
            controller.matches.init(matches);
        }
    },
    records : {
        id : "records",
        container : "#sub-container",
        title : "TPCC - Records",
        callback()  {
            controller.records.init();
        }
    },
    players : {
        id : "players",
        container : "#sub-container",
        title : "TPCC - Players",
        callback()  {
            controller.players.init(players);
        }
    },
    leaderboard : {
        id : "leaderboard",
        container : "#sub-container",
        title : "TPCC - Leaderboard",
        callback()  {
            controller.leaderboard.init(playersStats);
        }
    },
    leaderboard_may23 : {
        id : "leaderboard",
        tab_id : "leaderboard_may23",
        container : "#sub-container",
        title : "TPCC - Leaderboard",
        callback()  {
            controller.leaderboard.init(playersStats_2023,window.route.params.leaderboard_id);
        }
    },
    points : {
        id : "points",
        container : "#sub-container",
        title : "TPCC - Points",
        callback()  {
            controller.points.init();
        }
    },
    pointsSystem : {
        id : "points-system",
        container : "#sub-container",
        title : "TPCC - Points System",
        callback()  {
            controller.pointsSystem.init();
        }
    }
}



//init rule with onRouteChange
var onChangeRoute = function(route){
    window.route = route;
};

//init rule with onRouteNotFound
var onNotFound = function(tokens){
    console.log("onNotFound");
}

Router.init(onChangeRoute,onNotFound);