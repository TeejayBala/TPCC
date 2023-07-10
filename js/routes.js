Router.add({
    path: '#/',
    on: function() {
        console.log("on - /")
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
            controller.leaderboard.init();
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