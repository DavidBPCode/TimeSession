// ==UserScript==
// @name        Time Session Intranet
// @namespace   DavidBP.com
// @version     1.0
// @description Controlar el tiempo de sesión para avisar al usuario unos minutos antes
// @author      DavidBP
// @match       https://demo.davidbp.com/*
// @require     https://code.jquery.com/jquery-3.3.1.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js
// @require     https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js
// @grant       none
// ==/UserScript==

var $ = window.jQuery;

$(function () {

    //$("#usuario").append("<p>" + contador() + "</p>");
    $("#usuario").append("<div id='reloj'></div>");
    $("#reloj").append("<div id='contador'><span class='minutos'></span>:<span class='segundos'></span></div></div></div>");

    CuentaAtras();

    $("a").click(function () {
        CuentaAtras();
    });

});

function contador() {

    var fecha = new Date();
    var sumarsesion = 20;
    var minutos = fecha.getMinutes();

    fecha.setMinutes(minutos + sumarsesion);
    return minutos + ":" + fecha.getMinutes();

}

function CuentaAtras() {

    function TiempoRestante(tiempofinal) {

        var t = Date.parse(tiempofinal) - Date.parse(new Date());
        var segundos = Math.floor((t / 1000) % 60);
        var minutos = Math.floor((t / 1000 / 60) % 60);

        return {
            'total': t,
            'minutos': minutos,
            'segundos': segundos
        };

    }

    function InicializarReloj(id, tiempofinal) {

        var reloj = document.getElementById(id);
        var minutoSpan = reloj.querySelector('.minutos');
        var segundoSpan = reloj.querySelector('.segundos');

        function ActualizarReloj() {

            var t = TiempoRestante(tiempofinal);

            minutoSpan.innerHTML = ('0' + t.minutos).slice(-2);
            segundoSpan.innerHTML = ('0' + t.segundos).slice(-2);

            if (t.minutos <= 5) {

                clearInterval(intervalotiempo);
                alert("Quedan 5 minutos para que caduque la sesión.");
                $("#contador").remove();

            }

        }

        ActualizarReloj();

        var intervalotiempo = setInterval(ActualizarReloj, 1000);

    }

    var fintiempo = new Date(Date.parse(new Date()) + 30 * 60 * 1000);

    InicializarReloj('reloj', fintiempo);

}
