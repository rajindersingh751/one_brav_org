caseServices.controller('calendarCtrl', function ($scope, msApi) {
  console.log("show calendar");

  $scope.sessions = {};
  $scope.jumpToCreateSessions = function() {
    window.location = '#/case/new';
    console.log("jump", "window.location");
  }

  let createDate = function(date) {
  	return moment(new Date(date)).format("YYYYMMDD");
  }

  let shortenTimestamp = function(timestring) {
  	return timestring.slice(0, 5);
  }

  msApi.getAllSessions(function(response) {
  	console.log("sessions", response);

    response.sessions.forEach(o=>{
      if(o.schedule && o.schedule.epoch) {
        o.schedule.date = moment(new Date(o.schedule.epoch)).format("YYYYMMDD");
        o.schedule.timeString = new Date(o.schedule.epoch).toTimeString();
        if(!(o.schedule.date in $scope.sessions)) $scope.sessions[o.schedule.date] = [];
        $scope.sessions[o.schedule.date].push(o);
      }
    })
  });
  
  console.log("sessions, ", $scope.sessions);

  // create dates for the calendar
  let today = new Date();
  $scope.time = {
  	epoch: today,
  	date: createDate(today),
  	year: today.getFullYear(),
  	month: today.getMonth(), // January 0
  	day: today.getDay()  // Sunday 0 - Saturday 6
  }

  /*
  function getDaysInMonth(year, month) {
  	return new Date(year, month + 1, 0).getDate();
  } 
  */

  
  // let daysInPreviousMonth = getDaysInMonth($scope.time.year, ($scope.time.month + 11) % 12);
  // let daysInCurrentMonth = getDaysInMonth($scope.time.year, $scope.time.month);

  $scope.months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JULY", "AUG", "SEPT", "OCT", "NOV", "DEC"];
  $scope.weeks = [];

  function getCalendarOfAMonth(year, month) {
  	  let firstDay = (new Date(year, month)).getDay();
  	  let prevDate = new Date(year, month);
      let nextDate = new Date(year, month);
      for(let week = 0; week < 5; week++) {
      let arr = [];
      for(let day = 0; day < 7; day++) {
        if(firstDay-- > 0) {
      	  prevDate.setDate(prevDate.getDate() - 1);
      	  let yesterday = new Date(prevDate);
      	  arr.unshift(yesterday);
        } else {
      	  let tomorrow = new Date(nextDate);
      	  arr.push(tomorrow);
      	  nextDate.setDate(nextDate.getDate() + 1);
        }
      }
      $scope.weeks.push(arr);
    }
  }
  getCalendarOfAMonth($scope.time.year, $scope.time.month);
  console.log("weeks:", $scope.weeks);

  $scope.hasScheduleOnThisDate = function (day) {
    if(createDate(day) in $scope.sessions) return true;
    else false;
  }

  $scope.showSessions = function (day) {
    let sessionsToShow = $scope.sessions[createDate(day)];
    let showText = "";
    sessionsToShow.forEach(function (session) {
    	showText += "Session @ " + shortenTimestamp(session.schedule.timeString);
    });
    return showText;
  }
  
  $scope.styleForToday = function (day) {
  	let style = {
  		"border-right": "1px solid #dddddd",
  		"border-bottom": "1px solid #dddddd",
  		"width": "80px",
  		"padding": "0px",
  		"vertical-align": "top"
  	};
  	if(createDate(day) == $scope.time.date) style["background-color"] = "#5aace0";
  	if(day.getMonth() != $scope.currentTime.getMonth()) style["color"] = "#dddddd";
  	return style;
  }

  $scope.currentTime = new Date(today);
  $scope.lastMonth = function () {
    $scope.currentTime.setMonth($scope.currentTime.getMonth() - 1);
    $scope.weeks = [];
    getCalendarOfAMonth($scope.currentTime.getFullYear(), $scope.currentTime.getMonth());
  }
  $scope.nextMonth = function () {
  	$scope.currentTime.setMonth($scope.currentTime.getMonth() + 1);
  	$scope.weeks = [];
    getCalendarOfAMonth($scope.currentTime.getFullYear(), $scope.currentTime.getMonth());
  }
});