$(document).ready(function () {
    function login(userName, password1) {
        $.ajax
            ({
                type: "POST",
                //the url where you want to sent the userName and password to
                url: "https://localhost:7086/api/Values/login",
                async: false,
                crossDomain: true,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                //json object to sent to the authentication url
                //data: {"username": "' + userName + '", "password" : "' + password + '"},
                data: '{ "username": "' + userName + '", "password": "' + password1 + '" }',
                success: function (data) {
                    //do any process for successful authentication here
                    localStorage.setItem("token", data.token)
                    //console.log("Local"+localStorage.getItem("token"));
                    //console.log("Response "+data.token);
                },
                error: function (error){
                    error.forEach(e => {
                        $("#errors").append(e)
                    })
                }
            })
    }
    function register(userName, email, password1) {
        $.ajax
            ({
                type: "POST",
                //the url where you want to sent the userName and password to
                url: "https://localhost:7086/api/Values/register",
                async: false,
                crossDomain: true,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                //json object to sent to the authentication url
                //data: {"username": "' + userName + '", "password" : "' + password + '"},
                data: '{ "username": "' + userName + '", "email": "' + email + '" , "password": "' + password1 + '" }',
                success: function (data) {
                    //do any process for successful authentication here
                    localStorage.setItem("token", data.token)
                },
                error: function (error){
                    error.forEach(e => {
                        $("#errors").append(e)
                    })
                }
            })
    }
    function getdata(token) {
        $.ajax({
            type: "GET",
            url: "https://localhost:7086/WeatherForecast",
            async: false,
            crossDomain: true,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            headers: {
                "Authorization": "Bearer " + token
            },
            success: function (data) {
                //console.log(data);
                data.forEach(element => {

                    let content = "<tr><td>"+element.date+"</td><td>"+element.temperatureC+"</td><td>"+element.temperatureF+"</td><td>"+element.summary+"</td></tr>"
                    console.log(element);
                    $("table tbody").append(content);
                });
            },
            error: function (error){
                error.forEach(e => {
                    $("#errors").append(e)
                })
            }
        })
    }
    $("#login-form").submit(function (e) {
        e.preventDefault();
        let email = $("#login-email").val();
        let pass = $("#login-pass").val();
        login(email, pass)
    });
    $("reg-form").submit(function (e) {
        e.preventDefault();
        let username = $("#reg-username").val()
        let email = $("#reg-email").val()
        let pass = $("#reg-pass").val()
        register(username, email, pass)
    })
    $("#get-data").click(function (e) {
        e.preventDefault();
        let token = localStorage.getItem("token")
        console.log(token);
        getdata(token);
    });
    $("#logout").click(function (e){
        e.preventDefault()
        localStorage.clear();
    })
})