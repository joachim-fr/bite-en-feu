let temp = 20;
let DernierClic = 0;
let now = 0;
let succes = [false, false, false, false, false, false, false, false, false, false];
let succestotal = succes.length;
let nowsucces = 0;
let succesunlocked = 0;

function updateTemperature() {
    $("#temp").text(Math.round(temp));
}

$(".bite").click(function() {
    const maintenant = Date.now();
    const deltanow = maintenant - DernierClic;
    
    if (!succes[0]) {
        succes[0] = true
        notifsucces(1);
    }

    if (deltanow < 300) {
        trerapidefavetier++;
    }
    else {
        trerapidefavetier = 0;
    }

    DernierClic = maintenant;
    temp += 1 + (trerapidefavetier * 0.5);
    updateTemperature();
});

function vartemp() {
    now = Date.now();
    if (now - DernierClic > 3000) {
        if (temp >= 32) {
            temp -= temp * 0.05;
        } else if (temp < 32) {
            temp += (32 - temp) * 0.1;
        }
    }
    console.log("temp: " + temp);
    updateTemperature();
}
    

function stautsucceupdate(succes, temperature) {
    $("#succes" + succes).removeClass("locked");
    succesunlocked += 1;
    $("#succesrempostes").text(succesunlocked);
    $("#Tempsuccesdiv" + succes).show();
    $("#Tempsucces" + succes).html(Math.round(temperature));
}

function updatesuccestypeT() {

    if (temp >= 100 && !succes[1]) {
        succes[1] = true;
        notifsucces(2);
        stautsucceupdate(2, temp);
    }  
    if (temp >= 200 && !succes[2]) {
        succes[2] = true;
        notifsucces(3);
        stautsucceupdate(3, temp);
    }
    if (temp >= 1250 && !succes[3]){
        succes[3] = true;
        notifsucces(4);
        stautsucceupdate(4, temp);
    }

}

function updatebite() {
    const bite = document.getElementById("bite");

    if (temp > 100 && temp < 200) {
        bite.style.animation = "tremblementRotation 1s linear infinite";
        bite.style.animationDuration = "0.5s";
        bite.style.color = "#ff8a8a";
    }
    else if (temp > 200 && temp < 300) {
        bite.style.animation = "tremblementRotation 1s linear infinite";
        bite.style.animationDuration = "0.1s";
        bite.style.color = "#fa6161";
    }
    else if (temp > 300 && temp < 400) {
        bite.style.animation = "tremblementRotation 1s linear infinite";
        bite.style.animationDuration = "0.01s";
        bite.style.color = "#ff0000";
    }
    else if (temp > 400 && temp < 500) {
        bite.style.animation = "roatationbrulante 1s linear infinite";
        bite.style.color = "#edb974";
    }   
    else if (temp > 500 && temp < 600) {
        bite.style.animation = "roatationbrulante 0.5s linear infinite";
        bite.style.color = "#edb974";
    }
    else if (temp > 600) {
        bite.style.animation = "roatationbrulante 0.1s linear infinite";
        bite.style.color = "#edb974";
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

for (let i = 1; i <= succestotal; i++) {
    $("#Tempsuccesdiv" + i).hide();
}

$("#succesentout").text(succestotal)

$("#succespage").hide();

setInterval(vartemp, 1000);
setInterval(updatebite, 10);
setInterval(updatesuccestypeT, 10);