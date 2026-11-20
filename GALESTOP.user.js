// ==UserScript==
// @name          GALESTOP
// @namespace     https://greasyfork.org
// @version       1.2
// @description   Google AI Live Entry Suggestive Text Omitter & Preventer - Hides the inline ghost text in Google AI and Gemini prompt boxes while signed in.
// @author        AeSix (curator)
// @contributor   AI Attribution (see https://github.com/AeSix/GALESTOP/blob/main/AI-Attribution.md)
// @homepageURL   https://github.com
// @supportURL    https://github.com/issues
// @downloadURL   https://raw.githubusercontent.com/AeSix/GALESTOP/refs/heads/main/GALESTOP.user.js
// @updateURL     https://raw.githubusercontent.com/AeSix/GALESTOP/refs/heads/main/GALESTOP.user.js
// @icon          data:image/svg+xml;utf8,<svg xmlns="http://w3.org" viewBox="0 0 64 64"><polygon points="20,4 44,4 60,20 60,44 44,60 20,60 4,44 4,20" fill="%23d93025" stroke="%23ffffff" stroke-width="3"/><path d="M16 26h24a4 4 0 1 0-4-4M14 34h30a4 4 0 1 1-4 4M20 42h16" fill="none" stroke="%23ffffff" stroke-width="4" stroke-linecap="round"/></svg>
// @license       BSD-3-Clause
// @match         https://google.com*
// @match         https://google.com*
// @exclude-match https://google.commaps/*
// @run-at        document-start
// @noframes
// @grant         none
// ==/UserScript==

(function() {
    'use strict';

    // 1. Hide any positioned/non-interactive mirror overlay sharing the textarea's wrapper
    const style = document.createElement('style');
    style.textContent = `
        textarea.ITIRGe ~ div,
        textarea.ITIRGe ~ span,
        div:has(> textarea.ITIRGe) > div:not(:has(button)):not(:has(textarea)),
        div:has(> textarea.ITIRGe) > span {
            display: none !important;
            opacity: 0 !important;
            visibility: hidden !important;
            color: transparent !important;
        }
    `;
    (document.head || document.documentElement).appendChild(style);

    // 2. Strip aria-autocomplete and hide any sibling mirror node placed before or after the textarea
    const cleanAutocomplete = () => {
        const box = document.querySelector('textarea.ITIRGe');
        if (!box) return;

        if (box.getAttribute('aria-autocomplete')) {
            box.removeAttribute('aria-autocomplete');
        }

        if (box.parentElement) {
            Array.from(box.parentElement.children).forEach(sibling => {
                if (sibling !== box && !sibling.querySelector('button, svg, input')) {
                    sibling.style.setProperty('display', 'none', 'important');
                    sibling.style.setProperty('opacity', '0', 'important');
                }
            });
        }
    };

    cleanAutocomplete();
    const observer = new MutationObserver(cleanAutocomplete);
    observer.observe(document.documentElement, { childList: true, subtree: true });
})();
