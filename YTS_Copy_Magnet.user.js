// ==UserScript==
// @name         YTS.mx - Copy Magnet Button
// @namespace    https://github.com/Horyzontalhoror/yts_copymagnet
// @version      1.0
// @description  Adds a "Copy Magnet" button to every movie quality on YTS.mx for easy access.
// @author       Horyzontalhoror
// @license      MIT
// @match        https://yts.mx/movies/*
// @grant        GM_setClipboard
// @icon         https://raw.githubusercontent.com/Horyzontalhoror/yts_copymagnet/main/icon.png
// @name:id      YTS.mx - Tombol Salin Magnet
// @description:id Menambahkan tombol "Salin Magnet" di setiap kualitas film YTS.mx untuk menyalin tautan magnet dengan mudah.
// @tags         YTS.mx, magnet, torrent
// ==/UserScript==

(function () {
    'use strict';

    // Function to display toast with icon
    function showToast(message, icon = "🎉") {
        const toast = document.createElement('div');
        toast.innerHTML = `<span style="margin-right: 8px;">${icon}</span>${message}`;
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.right = '20px';
        toast.style.padding = '10px 15px';
        toast.style.background = '#00e054';
        toast.style.color = 'white';
        toast.style.borderRadius = '5px';
        toast.style.fontWeight = 'bold';
        toast.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
        toast.style.zIndex = 10000;
        toast.style.opacity = '1';
        toast.style.display = 'flex';
        toast.style.alignItems = 'center';
        toast.style.transition = 'opacity 0.5s ease';

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                toast.remove();
            }, 500);
        }, 3000);
    }

    window.addEventListener('load', function () {
        setTimeout(() => {
            const magnetLinks = document.querySelectorAll('a[href^="magnet:?"]');

            magnetLinks.forEach(link => {
                if (link.nextSibling && link.nextSibling.classList && link.nextSibling.classList.contains('copy-magnet-btn')) {
                    return;
                }

                const copyBtn = document.createElement("button");
                copyBtn.textContent = "Copy Magnet";
                copyBtn.className = "copy-magnet-btn";
                copyBtn.style.marginLeft = "10px";
                copyBtn.style.padding = "5px 10px";
                copyBtn.style.border = "none";
                copyBtn.style.background = "#00e054";
                copyBtn.style.color = "white";
                copyBtn.style.fontWeight = "bold";
                copyBtn.style.cursor = "pointer";
                copyBtn.style.borderRadius = "5px";

                copyBtn.addEventListener("click", (e) => {
                    e.preventDefault();
                    GM_setClipboard(link.href);
                    showToast("Magnet link copied!", "📎");
                });

                link.parentNode.insertBefore(copyBtn, link.nextSibling);
            });

        }, 1000);
    });
})();
