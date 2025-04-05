let temp = 20;
let DernierClic = 0;
let now = 0;
let bite_state = [
    {Animation:"tremblementRotation 1s linear infinite", Duree:"5s", Couleur:"black"},
    {Animation:"tremblementRotation 1s linear infinite", Duree:"0.5s", Couleur:"#ff8a8a"},
    {Animation:"tremblementRotation 1s linear infinite", Duree:"0.1s", Couleur:"#fa6161"},
    {Animation:"tremblementRotation 1s linear infinite", Duree:"0.01s", Couleur:"#ff0000"},
    {Animation:"roatationbrulante 1s linear infinite", Duree:"1s", Couleur:"#edb974"},
    {Animation:"tremblementRotation 1s linear infinite", Duree:"0.5s", Couleur:"#edb974"},
    {Animation:"tremblementRotation 1s linear infinite", Duree:"0.1s", Couleur:"#edb974"},
];
let succes = [
    {ID:"0", Nom:"Préliminaire", Description:"Toucher votre bite pour la premièrre fois", Image:"img/kqzh6koq.png", Obtention:"N", Type:"Clicker"},
    {ID:"1", Nom:"Youtubeur", Description:"Vous vous êtes touché la bite 100 fois, c'était surement sur des enfants", Image:"img/images.jpg", Obtention:"N", Type:"Clicker"},
    {ID:"2", Nom:"Bite innitiée", Description:"Vous commencez a comprendre le gameplay", Image:"img/5ed8xhzh.png", Obtention:"N", Type:"Température"},
    {ID:"3", Nom:"Bite moyenne", Description:"C'est bon vous maitrisez vraiment le jeu !", Image:"img/e6cz06af.png", Obtention:"N", Type:"Température"},
    {ID:"4", Nom:"Bitte", Description:"Vous avez fodue votre bitte d'amarage", Image:"img/22887-11744183.jpg", Obtention:"N", Type:"Température"},
    {ID:"5", Nom:"Gros porc", Description:"Vous vous êtes touché la bite 1000 fois, euh j'éspère que vous n'habitez pas a coté d'une maternelle...", Image:"img/000_37n48g4-1.png", Obtention:"N", Type:"Clicker"},
    {ID:"6", Nom:"Fromager", Description:"Votre bite est maintenant fermentée", Image:"img/appel_salonv.png", Obtention:"N", Type:"Fermentation"},
    {ID:"7", Nom:"Monsieur Klein", Description:"«Oh bah c'est pas cool ça»", Image:"img/file.jpg", Obtention:"N", Type:"Fermentation"},
];
let diff_type = [];
let succestrie = {};
let succestotal = succes.length;
let nowsucces = 0;
let succesunlocked = 0;
let bite_clicks = 0;

function find_ID(ID) {
    for (let i = 0; i < succestotal; i++) {
        if (succes[i].ID == ID)
            return i;
    }
}

function find_index(ID) {
    return $("succes" + ID).index();
}

function triertype() {
    succestrie = {};
    diff_type = [];

    for (let i = 0; i < succestotal; i++) {
        const type = succes[i].Type;
        if (!succestrie[type]) {
            succestrie[type] = [];
            diff_type.push(type);
        }
        succestrie[type].push(succes[i]);
    }
    console.log(succestrie);
    console.log(diff_type);
}

function write_succes() {

    for (let type in succestrie) {
        if (succestrie.hasOwnProperty(type)) {
            let typeContainer = $('<div/>', {
                "id": type,
                "class": "succes-type-container"
            });

            typeContainer.append('<h2 class="titletype"> Succès de type : ' + type + ' </h2>');

            for (let i = 0; i < succestrie[type].length; i++) {
                let succesObj = succestrie[type][i];
                let nveau_succes = $('<div/>', {
                    "class": "succes locked",
                    "id": "succes" + succesObj.ID, 
                    html: '<img src="' + succesObj.Image + '" class="imgsucces">' +
                        '<div>' +
                        '<h2>' + succesObj.Nom + '</h2>' +
                        '<p>' + succesObj.Description + '</p>' +
                        '</div>'
                });
                typeContainer.append(nveau_succes);
            }
            $("#containersucces").append(typeContainer);
        }
    }
}

function updateTemperature() {
    $("#temp").text(Math.round(temp));
}

$(".bite").click(function() {
    const maintenant = Date.now();
    const deltanow = maintenant - DernierClic;

    if (deltanow < 300) {
        trerapidefavetier++;
    }
    else {
        trerapidefavetier = 0;
    }

    DernierClic = maintenant;
    temp += 1 + (trerapidefavetier * 0.2);
    bite_clicks ++;
    console.log(bite_clicks)
    updateTemperature();
    updatesuccestypeC();
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
    

function unlock_succes(succesu) {
    notifsucces(succesu)
    succes[succesu].Obtention = "Y"
    $("#succes" + find_ID(succesu)).removeClass("locked");
    succesunlocked += 1;
    $("#succesrempostes").text(succesunlocked);

    if (succes[succesu].Type == "T") {
        var temp_succes = $('<div/>', {
            "class": "Tempsucces",
            html: '<h2>Débloqué à :&nbsp; ' + temp + '°C</h2>'
        });
        
        $("#succes" + succesu).append(temp_succes);
    }
}

function updatesuccestypeT() {
    if (temp >= 300 && succes[find_ID(2)].Obtention == "N") {
        unlock_succes(2);
    }  
    if (temp >= 600 && succes[find_ID(3)].Obtention == "N") {
        unlock_succes(3);
    }
    if (temp >= 1250 && succes[find_ID(4)].Obtention == "N"){
        unlock_succes(4);
    }
}

function updatesuccestypeC() {
    if (succes[0].Obtention == "N") {
        unlock_succes(0);
    }
    if (bite_clicks == 100) {
        unlock_succes(1);
    }
    if (bite_clicks == 1000) {
        unlock_succes(5);
    }
}

function bite_state_define() {
    if (temp < 100) {
        updatebite(0);
    }
    else if (temp >= 100 && temp < 400) {
        updatebite(1);
    }
    else if (temp >= 400 && temp < 600) {
        updatebite(2);
    }
    else if (temp >= 600 && temp < 1000) {
        updatebite(3);
    }
}

function updatebite(state) {
    const bite = document.getElementById("bite");

    bite.style.animation = bite_state[state].Animation;
    bite.style.animationDuration = bite_state[state].Duree;
    bite.style.color = bite_state[state].Couleur;
}

function notifsucces(succesn) {
    var audiosteam = document.getElementById("steamnotif");
    audiosteam.play();

    var nvelle_notif = $('<div/>', {
        "class": "succesnotif",
        "id": "succesnotif" + succesn,
        html: '<div><img src="'+ succes[find_ID(succesn)].Image + '" class="imgsucces">' +
            '</div>' +
                '<div style="width:163px;">' +
                '<h2>Succès !</h2>' +
                '<p>Vous avez débloqué un nouveau succès !</p>' +
            '</div>'
    });
    $("#notifcontainer").append(nvelle_notif);
    new Promise(resolve => setTimeout(resolve, 20))
    .then(() => {
        $("#succesnotif" + succesn).addClass("show");
        setTimeout(function() {
            $("#succesnotif" + succesn).removeClass("show"); 
        }, 2000);
    });
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


$("#succesentout").text(succestotal)
$("#succespage").hide();
triertype();
write_succes();

setInterval(vartemp, 1000);
setInterval(bite_state_define, 10);
setInterval(updatesuccestypeT, 10);