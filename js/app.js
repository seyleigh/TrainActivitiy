var fireConfig = {
    apiKey: "AIzaSyCpqrjzKrGxu_4RVtSnO8RmNUjK7w_rAns",
    authDomain: "trainproject-e9fe7.firebaseapp.com",
    databaseURL: "https://trainproject-e9fe7.firebaseio.com",
    projectId: "trainproject-e9fe7",
    storageBucket: "",
    messagingSenderId: "906406671477",
    appId: "1:906406671477:web:15aa748de057917c31343c"
  };
  // Initialize Firebase
  firebase.initializeApp(fireConfig);
  var database = firebase.database();


  //event listener for user input
$('#search').on('click', function(){
  event.preventDefault();
  var barName = $('#set-name').val().trim();
  var dest = $('#destination').val().trim();
  var firstTime = $('#time').val().trim();
  var freq = $('#frequency').val().trim();

  var addBar = {
    name: barName,
    location: dest,
    runtime: firstTime,
    frequency: freq
  }
  
  if (barName == '' || dest == '' || firstTime == '' || freq == ''){
    swal('You need to enter every value')
    return;
  }

  database.ref().push(addBar)


// clearing out forms
  $('#set-name').val("");
  $('#destination').val("");
  $('#time').val("");
  $('#frequency').val("");
})


// Adding a bar to the table
database.ref().on("child_added", function (childReturn){
  console.log(childReturn.val());
  var barName = childReturn.val().name;
  var dest = childReturn.val().location;
  var firstTime = childReturn.val().runtime;
  var freq = childReturn.val().frequency;

// var firstTimeConv = moment(firstTime, "HH:mm");
// var currentTime = moment().format("HH:mm");
// var timeDiff = moment().diff(moment(firstTimeConv), "minutes");
// var timeRemain = timeDiff % timeRemain
// var minToBar = freq - timeRemain;

// var pushBar = moment().add(minToBar, "minutes").format("HH:mm");
// $("#bar-body").append(
//   '<tr>'+
// 				'<td scope="row">' + barName + '</td>' +
// 				'<td>' + dest + '</td>' +
// 				'<td>' + freq + '</td>' +
// 				'<td>' + pushBar + '</td>' +
// 				'<td>' + minToBar + '</td>' +
// 			'</tr>'
// )

var newBar = $("<tr>").append(
  $("<td>").text(barName),
  $("<td>").text(dest),
  $("<td>").text(freq),
  // $("<td>").text(insertvariablehere),
  // $("<td>").text(minAway),
);
$("#bar-body").append(newBar);

},function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});