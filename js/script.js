// Variables globales
let temp = 20;
let DernierClic = 0;
let now = 0;
let bite_clicks = 0;
let succesunlocked = 0;
let succestotal = 0;
let succes9 = false;

let bite_state = [
    {Animation:"tremblementRotation 1s linear infinite", Duree:"5s", Couleur:"black"},
    {Animation:"tremblementRotation 1s linear infinite", Duree:"0.5s", Couleur:"#ff8a8a"},
    {Animation:"tremblementRotation 1s linear infinite", Duree:"0.1s", Couleur:"#fa6161"},
    {Animation:"tremblementRotation 1s linear infinite", Duree:"0.01s", Couleur:"#ff0000"},
    {Animation:"roatationbrulante 1s linear infinite", Duree:"1s", Couleur:"#edb974"},
    {Animation:"roatationbrulante 1s linear infinite", Duree:"0.5s", Couleur:"#edb974"},
    {Animation:"roatationbrulante 1s linear infinite", Duree:"0.1s", Couleur:"#edb974"},
];
let succes = [
    {ID:"0", Nom:"Préliminaire", Description:"Toucher votre bite pour la premièrre fois", Image:"img/kqzh6koq.png", Obtention:"N", Type:"Clicker"},
    {ID:"1", Nom:"Youtubeur", Description:"Vous vous êtes touché la bite 100 fois, c'était surement sur des enfants", Image:"img/images.jpg", Obtention:"N", Type:"Clicker"},
    {ID:"2", Nom:"Bite innitiée", Description:"Vous commencez a comprendre le gameplay", Image:"img/5ed8xhzh.png", Obtention:"N", Type:"Température"},
    {ID:"3", Nom:"Bite moyenne", Description:"C'est bon vous maitrisez vraiment le jeu !", Image:"img/e6cz06af.png", Obtention:"N", Type:"Température"},
    {ID:"11", Nom:"Afrique", Description:"Il commence a faire insuportable chaud ici.", Image:"img/afc.webp", Obtention:"N", Type:"Température"},
    {ID:"4", Nom:"Bitte", Description:"Vous avez fodue votre bitte d'amarage", Image:"img/22887-11744183.jpg", Obtention:"N", Type:"Température"},
    {ID:"5", Nom:"Gros porc", Description:"Vous vous êtes touché la bite 1000 fois, euh j'éspère que vous n'habitez pas a coté d'une maternelle...", Image:"img/000_37n48g4-1.png", Obtention:"N", Type:"Clicker"},
    {ID:"8", Nom:"Zizicoptère", Description:"Votre bite ... tourne ?", Image:"img/IMG_3412-e1477430546370.jpg", Obtention:"N", Type:"Etat"},
    {ID:"6", Nom:"Fromager", Description:"Votre bite est maintenant fermentée", Image:"img/appel_salonv.png", Obtention:"N", Type:"Fermentation"},
    {ID:"7", Nom:"Monsieur Klein", Description:"«Oh bah c'est pas cool ça»", Image:"img/file.jpg", Obtention:"N", Type:"Fermentation"},
    {ID:"9", Nom:"Display flex", Description:"«Oh bah c'est quoi ca display flex ???»", Image:"img/file.jpg", Obtention:"N", Type:"Terminal"},   
    {ID:"10", Nom:"Favé", Description:"Favé a la barre et il s'est fait djoufara au mans, même mon clebs n'en veut pas.", Image:"img/182596ed0a4c45f85f4d4474ccedb58e2d65ab00.jpg", Obtention:"N", Type:"Terminal"},   
];
let diff_type = [];
let succestrie = {};

// Variables pour les succes type T

let display = "pasflex";
let djoufara = false;


// Initialisation
$(document).ready(function() {
    succestotal = succes.length;
    $("#succesentout").text(succestotal);
    $("#succespage").hide();

    triertype();
    write_succes();

    setInterval(vartemp, 1000);
    setInterval(bite_state_define, 10);
    setInterval(updatesuccestypeT, 10);
    setInterval(updatesuccestypeTE, 10);
});

// Fonctions de succès
function find_ID(ID) {
    for (let i = 0; i < succestotal; i++) {
        if (succes[i].ID == ID)
            return i;
    }
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
    $("#containersucces").empty();

    for (let type in succestrie) {
        if (succestrie.hasOwnProperty(type)) {
            let typeContainer = $('<div/>', {
                "id": type,
                "class": "succes-type-container"
            });

            if (type == "Terminal") {
                typeContainer.append('<h2 class="titletype"> Succès de type : ??? </h2>');

                for (let i = 0; i < succestrie[type].length; i++) {
                    let succesObj = succestrie[type][i];
                    let nveau_succes = $('<div/>', {
                        "class": "succes locked",
                        "id": "succes" + succesObj.ID, 
                        html: '<img src="img/pngimg.com - question_mark_PNG53.png" class="imgsucces">' +
                            '<div>' +
                            '<h2>???</h2>' +
                            '<p>???????</p>' +
                            '</div>'
                    });
                    typeContainer.append(nveau_succes);
                }
                $("#containersucces").append(typeContainer);

                break;
            }

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

function unlock_succes(succesn) {
    notifsucces(succesn)
    succes[succesn].Obtention = "Y"
    $("#succes" + succesn).removeClass("locked");
    succesunlocked += 1;
    $("#succesrempostes").text(succesunlocked);

    if (succes[find_ID(succesn)].Type == "Terminal") {

        if (succesn == 9) {
            let succesObj = succes[find_ID(succesn)];
        console.log(succesObj);
        $("#succes" + succesn).empty();
        let nveau_succes = $('<div/>', {
            "class": "",
            "id": "succes" + succesObj.ID, 
            "style": "padding-bottom: 150px;",
            html: '<img src="' + succesObj.Image + '">' +
                '<div>' +
                '<h2>' + succesObj.Nom + '</h2>' +
                '<p>' + succesObj.Description + '</p>' +
                '</div>'
        });

        $("#succes" + succesn).append(nveau_succes);

        return;

        }

        let succesObj = succes[find_ID(succesn)];
        console.log(succesObj);
        $("#succes" + succesn).empty();
        $("#succes" + succesn).html('<img src="' + succesObj.Image + '" class="imgsucces" style="height: 48px">' +
                '<div>' +
                '<h2>' + succesObj.Nom + '</h2>' +
                '<p>' + succesObj.Description + '</p>' +
                '</div>');
    }

    if (succes[find_ID(succesn)].Type == "Température") {
        var temp_succes = $('<div/>', {
            "class": "Tempsucces",
            html: '<h2>Débloqué à :&nbsp; ' + temp + '°C</h2>'
        });
        
        $("#succes" + succesn).append(temp_succes);
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

function updatesuccestypeTE() {
    if (display === "flex" && succes[find_ID(9)].Obtention === "N") {
        unlock_succes(9);
    }

    if (djoufara === true && succes[find_ID(10)].Obtention === "N") {
        const body = document.getElementById("body");
        body.style.backgroundImage = "url('img/182596ed0a4c45f85f4d4474ccedb58e2d65ab00.jpg')";
        body.style.backgroundSize = "100px 100px";
        body.style.backgroundRepeat = "repeat"; 
        body.style.backgroundPosition = "0 0"; 
        unlock_succes(10);
    }
}

function updatesuccestypeE() {
    const bite = document.getElementById("bite");

    const computedStyle = window.getComputedStyle(bite);
    const animationName = computedStyle.animationName;
    const animationDuration = computedStyle.animationDuration;

    if (animationName.includes("roatationbrulante") && animationDuration.includes("1s") && succes[find_ID(8)].Obtention === "N") {
        console.log("Déblocage du succès 8");
        unlock_succes(8);
        succes[find_ID(8)].Obtention = "Y"; 
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

function notifsucces(succesn) {
    if (succesn == 10) {
        var audiopassteam = document.getElementById("favenotif");
        audiopassteam.play();
    }
    else {
    var audiosteam = document.getElementById("steamnotif");
    audiosteam.play();
    }
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

// Fonctions de température et d'état de la bite
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
    else if (temp >= 1000 && temp < 1500) {
        updatebite(4);
    }
    else if (temp >= 1500 && temp < 2000) {
        updatebite(5);
    }
    else if (temp >= 2000) {
        updatebite(6);
    }

}

function updatebite(state) {
    const bite = document.getElementById("bite");

    bite.style.animation = bite_state[state].Animation;
    bite.style.animationDuration = bite_state[state].Duree;
    bite.style.color = bite_state[state].Couleur;
    updatesuccestypeE()
}

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

function updateTemperature() {
    $("#temp").text(Math.round(temp));
}

function updateDjoufara() {
    if (trerapidefavetier > 200) {
        djoufara = true
    }

    console.log("Djoufara : " + trerapidefavetier)
}

// Fonctions d'événements et d'interface utilisateur
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
    updateDjoufara();
});

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

// Fonction non utilisée (à supprimer ?)
function find_index_inhtml(ID) {
    const succueshtml = document.getElementById("containersucces");
    const succehtml = succueshtml.childNodes;
    const succesordehtml = [];

    for (let i = 1; i < succehtml.length; i++) {
        const lesucceshtml = succehtml[i];
        const lesucceshtmljustelesdivs = lesucceshtml.getElementsByClassName("succes");
        for (let j = 0; j < lesucceshtmljustelesdivs.length; j++) {
            succesordehtml.push(lesucceshtmljustelesdivs[j].id);
        }
    }
    console.log(succesordehtml);

    for (let i = 0; i < succesordehtml.length; i++) {
        if (succesordehtml[i].id == "succes" + ID) {
            return i;
        }
    }
}