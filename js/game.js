var puntuacionMaxima=7.5;   //puntuacion de la que no debes pasarte
var turno="player";         //controla quien juega
var playerScore=0;          //puntuacion del jugador
var machineScore=0;         //puntuacion de la maquina
var cardsArray=[];          //array con las rutas a las imagenes de las cartas
for(var i=0;i<=39;i++){
    cardsArray[i]="img/"+i+".png";
}
var seenCards=[];           //array que contrendrá las cartas que ya han salido
var nextIndex=0;            //se utiliza en pedirCarta() para saber en que posicion de seenCards[] meter las cartas que van saliendo

window.onload=function(){//se añaden escuchadores de eventos a los 3 botones
    document.getElementById("pedir").addEventListener("click",mostrarCarta);
    document.getElementById("plantarse").addEventListener("click",plantarse);
    document.getElementById("newGame").addEventListener("click",nuevaPartida);
};

//funcion que se encargara de pedir una carta y mostrarla. se comprueba que el jugador no ha superado los 7.5 de puntuacion
function mostrarCarta(event){
    if (event){//si se ha llamado a la funcion desde el boton pedir, se activa el boton plantarse
    document.getElementById("plantarse").removeAttribute("disabled");
    }
    if(getTurno()<puntuacionMaxima){
        var cartaParaMostrar = document.createElement("img");
        var carta=pedirCarta();//recibe array con ruta de carta [0] y valor de carta[1]
        cartaParaMostrar.src=cardsArray[carta[0]];
        cartaParaMostrar.style.height="160px";
        cartaParaMostrar.style.width="100px";
        document.getElementById(turno).appendChild(cartaParaMostrar);
        //suma la puntuacion al jugador o maquina y la muestra
        if(turno=="player"){
            playerScore=playerScore+carta[1];
            document.getElementById("puntos").innerHTML="<h4 class='center-align'>Tus puntos: "+playerScore+"</h4>";
            if(playerScore==puntuacionMaxima){
                plantarse();
            }else if(playerScore>puntuacionMaxima){
                puntuacion();
            }
        }else{
            machineScore=machineScore+carta[1];
            document.getElementById("puntosBanca").innerHTML="<h4 class='center-align'>Puntos de la banca: "+machineScore+"</h4>";
        }
    }//if
}//mostrarCarta()

//devuelve un array que contendra el numero aleatorio[0] y el valor que corresponde a la carta[1] cardsArray[numeroAleatorio] =  ruta de la carta
function pedirCarta(){
    var carta = Math.floor((Math.random() * 40) + 0);
    //comprueba que el numero aleatorio no se encuentra entre las cartas que ya se han visto
    for(var i=0;i<seenCards.length;i++){
        if(carta==seenCards[i]){
            //si la carta ha salido la funcion se vuelve a llamar
            return pedirCarta();
        }//if
    }//for
    //si no habia salido, se añade la carta al array de cartas vistas
    seenCards[nextIndex++]=carta;
    var cartaValor=[];
    cartaValor[0]=carta;
    cartaValor[1]=valorCarta(carta);
    return cartaValor;
}//pedirCarta()

//funcion que determinara el valor de la carta obtenida
function valorCarta(carta){
    var valorCarta;
    switch(carta){
        case 0:case 10:case 20:case 30:valorCarta=1;break;
        case 1:case 11:case 21:case 31:valorCarta=2;break;
        case 2:case 12:case 22:case 32:valorCarta=3;break;
        case 3:case 13:case 23:case 33:valorCarta=4;break;
        case 4:case 14:case 24:case 34:valorCarta=5;break;
        case 5:case 15:case 25:case 35:valorCarta=6;break;
        case 6:case 16:case 26:case 36:valorCarta=7;break;
        default:valorCarta=0.5;
    }//switch
    return valorCarta;
}//valorCarta()
            
//deshabilita los botones pedir y plantarse, y saca las cartas de la banca
function plantarse(){
    disableButtons();
    turno="machine";
    mostrarCarta();
    if(machineScore<playerScore&&machineScore<puntuacionMaxima){
        setTimeout(plantarse, 1000);
    }else{
        puntuacion();
    }
    
    
}//plantarse()
            
//evalua la puntuacion de jugador y maquina, decide quien ha ganado.
function puntuacion(){
    disableButtons();
    var andTheWinnerIs;
    if(playerScore>puntuacionMaxima){
        andTheWinnerIs = "machine";
    }else if(machineScore==puntuacionMaxima){
        andTheWinnerIs = "machine";
    }else if(machineScore>puntuacionMaxima){
        andTheWinnerIs = "player";
    }else if(playerScore>machineScore){
        andTheWinnerIs = "player";
    }else if(machineScore>=playerScore){
        andTheWinnerIs = "machine";
    }

    if(andTheWinnerIs=="player"){
        document.getElementById("ganador").innerHTML="<h4 class='center-align'>¡HAS GANADO!</h4>";
        Materialize.toast('¡Has ganado!', 4000);
        
    }else{
        document.getElementById("ganador").innerHTML="<h4 class='center-align'>Gana la banca</h4>";
        Materialize.toast('Gana la banca...', 4000);
    }
}//puntuacion

//devuelve la puntuacion del jugador o la maquina depende de quien este jugando, usada en mostrarCarta()
function getTurno(){
    if(turno=="player"){
        return playerScore;
    }else{
        return machineScore;
    }
}//getTurno()
//deshabilita los botones pedir y plantarse
function disableButtons(){
    document.getElementById("pedir").setAttribute("disabled","disabled");
    document.getElementById("plantarse").setAttribute("disabled","disabled");
}//disableButtons()

//devuelve el juego a su estado inicial
function nuevaPartida(){
    turno="player";
    playerScore=0;
    
    document.getElementById("player").innerHTML="";
    document.getElementById("machine").innerHTML="";
        
    document.getElementById("puntos").innerHTML="<h4 class='center-align'>Tus puntos: "+playerScore+"</h4>";
    
    machineScore=0;
    document.getElementById("puntosBanca").innerHTML="<h4 class='center-align'>Puntos de la banca: "+machineScore+"</h4>";
    document.getElementById("ganador").innerHTML="<h4 class='center-align'>SUERTE</h4>";
    
    nextIndex=0;
    seenCards=[];
    
    document.getElementById("pedir").removeAttribute("disabled");
}