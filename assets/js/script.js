

$(document).ready(function () {



// Initialize Firebase
    var config = {
        apiKey: "AIzaSyCcq6xpoTo4bUDZup2RhETYdKVNi8dxarY",
        authDomain: "click-20450.firebaseapp.com",
        databaseURL: "https://click-20450.firebaseio.com",
        projectId: "click-20450",
        storageBucket: "click-20450.appspot.com",
        messagingSenderId: "979097961272"
    };
    firebase.initializeApp(config);


    // Create a variable to reference the database

    var database = firebase.database();

    var name;
    var email;
    var startDate;
    var monthlyRate;


    // Capture Button Click
    $("#add-user").on("click", function () {
        // Don't refresh the page!
        event.preventDefault();

        // YOUR TASK!!!

        name = $("#name-input").val().trim();
        email = $("#email-input").val().trim();
        startDate = $("#startDate-input").val().trim();
        monthlyRate = $("#monthly-input").val().trim();

        // Save new value to Firebase

        database.ref().push({
            name: name,
            email: email,
            startDate: startDate,
            monthlyRate: monthlyRate
        });

        // Code in the logic for storing and retrieving the most recent user.

        $("#name-display").html(name);
        $("#email-display").html(email);
        $("#startDate-display").html(startDate);
        $("#monthly-display").html(monthlyRate);


        var firstRowTds = $("table")
            .children()
            .eq(1).children("tr")
            .eq(1).children("td");
        // Setting the inner text of each td in the first row
        firstRowTds.eq(0).text(name);
        firstRowTds.eq(2).text(startDate);
        firstRowTds.eq(4).text(monthlyRate);


    });



    // Create Firebase "watcher" Hint: .on("value")

    database.ref().on("value", function(snapshot) {

        //Console logs the value from the snapshot online
        console.log(snapshot.val());

        //
        $("#name-display").html(snapshot.val().name);
        $("#email-display").html(snapshot.val().email);
        $("#startDate-display").html(snapshot.val().startDate);
        $("#monthly-display").html(snapshot.val().monthlyRate);

        //
        name = snapshot.val().name;
        email = snapshot.val().email;
        startDate = snapshot.val().startDate;
        monthlyRate = snapshot.val().monthlyRate;


        var firstRowTds = $("table")
            .children()
            .eq(1).children("tr")
            .eq(0).children("td");
        // Setting the inner text of each td in the first row
        firstRowTds.eq(0).text(snapshot.val().name);
        firstRowTds.eq(2).text(snapshot.val().startDate);
        firstRowTds.eq(4).text(snapshot.val().monthlyRate);

        //Catches any errors
    }, function(errorObject) {

        //Logs into the console log
        console.log("The read failed: " + errorObject.code);
    });



});
