function login(googleUser) {
    // var profile = googleUser.getBasicProfile();

    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    var profile = googleUser.getBasicProfile()
    var id_token = googleUser.getAuthResponse().id_token
    console.log(id_token)
    $.ajax({
        type: 'POST',
        url: "/auth/testLogin",
        data: {
            accessToken: id_token
        },
        dataType: 'json',
        statusCode: {
            404: function () {
                
                alert("找不到页面");
            },
            200: function (result) {
                // console.log(result);
            },
            500: function (result) {
                signOut();
                alert("Signed out since the account is not recorded in the system");
            },
            401: function (result) {
                signOut();
                alert("401");
            }
        }
        // success: function( result ) {
        //     console.log(result)
        //     //alert(result);
        //     //$( "#weather-temp" ).html( "<strong>" + result + "</strong> degrees" );
        // }
    });

}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

// $(function(){

// })


// function login() {
//   var username = document.forms["login-info"]["username"].value;
//   var password = document.forms["login-info"]["password"].value;
//   if(username=="dina" && password=="1234567") {
//     window.location.href = "student_portal.html";
//   } else if(username == "") {
//     document.getElementById("test").innerHTML = "Please input your user name!";
//   } else if(password == "") {
//     document.getElementById("test").innerHTML = "Please input your password!"
//   } else {
//     document.getElementById("test").innerHTML = "False password!";
//   }
// }