// ==UserScript==
// @name         TypeRacer Assist
// @namespace    https://www.madcaped.com/
// @version      2.0
// @description  Auto Typing on play.typeracer.com
// @author       Ekky
// @match        https://play.typeracer.com/
// @require https://code.jquery.com/jquery-3.5.1.min.js
// @grant GM_addStyle
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_registerMenuCommand
// @grant GM_listValues
// @grant GM_getResourceText
// @grant GM_getResourceURL
// @grant GM_log
// @grant GM_info
// ==/UserScript==

let content_words = getContent().split(" "),
    words_length = content_words.length,
    input_area = document.getElementsByClassName("txtInput")[0],
    count = 0,
    pause = false;

function getContent() {
    let content = "";
    [].forEach.call(document.querySelectorAll(".inputPanel tbody tr td table tbody tr td div div span"), function(s) {
        content += s.innerHTML;
    });
    return content;
}

function execute(event) {
    let key = event.keyCode | event.which;
    switch (key) {
        case 116: // T (toggle)
            pause = ! pause;
            console.log("Pause now is ", pause);
            break;
        case 114: // R (restart)
            if (! pause) {
                count = 0;
                console.log("Pointer now at beginning");
            }
            break;
        case 112: // P (previous)
            if (! pause) {
                count--;
                if (count === 0) {
                    count = words_length - 1;
                }
            }
            break;
        case 98: // B (behind)
            if (! pause) {
                count++;
                if (count === words_length) {
                    count = 0;
                }
            }
            break;
        case 32: // Space
            if (! pause) {
                if (input_area.value === "" && count < words_length) {
                    event.preventDefault();
                    input_area.value = content_words[count];
                    console.log(content_words[count]);
                    count++;
                }
            }
    }
}

document.onkeypress = execute;
