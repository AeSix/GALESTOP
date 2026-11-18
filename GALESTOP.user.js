// ==UserScript==
// @name         GALESTOP
// @namespace    https://greasyfork.org
// @version      1.0
// @description  Google AI Live Entry Suggestive Text Omitter & Preventer - Hides the inline ghost text in Google AI and Gemini prompt boxes while signed in.
// @author       AeSix (curator)
// @homepagedURL  https://github.com/AeSix/GALESTOP
// @license      BSD 3-Clause w/ AI Attribution
// @match        https://www.google.com/*
// @match        https://gemini.google.com/*
// @grant        none
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
