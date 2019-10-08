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
  var firstBar = moment($('#time').val().trim(),"HH:mm").format("HH:mm");
  var freq = $('#frequency').val().trim();

  var addBar = {
    name: barName,
    location: dest,
    start: firstBar,
    frequency: freq
  }
  
  if (barName == '' || dest == '' || firstBar == '' || freq == ''){
    swal({
      title: "Okay eager beaver..",
      text: "You must enter a value for every input",
      icon: "error",
      button: false,
      timer: 4000
    })
    return;
  }

  database.ref().push(addBar);
  console.log(addBar);

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
  var firstBar = childReturn.val().start;
  var freq = childReturn.val().frequency;

  var firstConv = moment(firstBar, "HH:mm")

  // var timeNow = moment().format("HH:mm");

  var difference = moment().diff(moment(firstConv), "minutes");

  var remainder = difference % freq;

  var minToBar = freq - remainder;

  var calculatedBar = moment().add(minToBar, "minutes").format("HH:mm");

  
  
var newBar = $("<tr>").append(
  $("<td>").text(barName),
  $("<td>").text(dest),
  $("<td>").text(freq),
  $("<td>").text(calculatedBar),
  $("<td>").text(minToBar),
);
$("#bar-body").append(newBar);

},function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});