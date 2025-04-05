let temp = 20;
let DernierClic = 0;
let now = 0;
let Facteurderefroidissement = 0.99;
let succes = [false, false, false, false, false, false, false, false, false, false];
let succesaquis = [false, false, false, false, false, false, false, false, false, false];
let nowsucces = 0;

function updateTemperature() {
    $("#temp").text(temp);
}

$(".bite").click(function() {
    console.log("Bite clicked!");
    temp ++;
    DernierClic = Date.now();
    updateTemperature();
});

function vartemp(){
    now = Date.now();
    if (now - DernierClic > 10000) {
        if (temp + 32 > 0) {
            temp -= 32;
            temp -= temp / Math.exp(Facteurderefroidissement);
        }
    }

    temp = Math.round(temp) + 32;
    console.log("temp: " + temp);
    updateTemperature();
}

function updatesucces() {
    if (temp >= 50 && !succes[0]) {
        succes[0] = true;
        notifsucces(1);
        nowsucces = Date.now();
        console.log(nowsucces);
    }
    if (temp >= 100 && !succes[1]) {
        succes[1] = true;
        notifsucces(2);
    }  
}

function updatebite() {
    const bite = document.getElementById("bite");

    if (temp > 100 && temp < 200) {
        bite.style.animationDuration = "0.5s";
        bite.style.color = "#ff8a8a";
    }
    else if (temp > 200 && temp < 300) {
        bite.style.animationDuration = "0.1s";
        bite.style.color = "#fa6161";
    }
    else if (temp > 300) {
        bite.style.animationDuration = "0.01s";
        bite.style.color = "#ff0000";
    }
    else {
        bite.style.animationDuration = "5s";
        bite.style.color = "black";
    }
}

function notifsucces(succes) {
    $("#succesnotif" + succes).addClass("show");
    setTimeout(function() {
        $("#succesnotif" + succes).removeClass("show"); 
    }, 2000);
}

$("#button1").click(function() {
    $("#succespage").show();
    $("#succespage").addClass("showsuccespage"); 
    $("#body").addClass("succespageestla");
    $("#game").addClass("succespageestla");
});

$("#imgcroix").click(function() {
    $("#succespage").removeClass("showsuccespage"); 
    $("#body").removeClass("succespageestla");
    $("#game").removeClass("succespageestla");
    setTimeout(function() {
        $("#succespage").hide(); 
    }, 500);
});

$("#imgcroix").hover(
  function() {
    $(this).attr("src", "img/1487086345-cross_81577(3).png");
  },
  function() {
    $(this).attr("src", "img/1487086345-cross_81577(2).png");
  }
);


$("#succespage").hide();

setInterval(vartemp, 1000);
setInterval(updatebite, 10);
setInterval(updatesucces, 10);