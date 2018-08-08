// ==UserScript==
// @name        Time Session Intranet
// @namespace   DavidBP.com
// @version     1.0
// @description Controlar el tiempo de sesión para avisar al usuario unos minutos antes
// @author      DavidBP
// @match       http://demo.davidbp.com/*
// @require     https://code.jquery.com/jquery-3.3.1.min.js
// @grant       none
// ==/UserScript==

var $ = window.jQuery;

$(function () {

    $("#usuario").append(contador());

});

function contador() {

    var fecha = new Date();
    var sumarsesion = 5;
    var minutos = fecha.getMinutes();

    fecha.setMinutes(minutos + sumarsesion);
    return minutos + ":" + fecha.getMinutes();

}
