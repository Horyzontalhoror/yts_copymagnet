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
    
    function showToast(message, icon = "🎉") {
        const toast = document.createElement('div');
        toast.innerHTML = `<span style="margin-right: 8px;">${icon}</span>${message}`;
        Object.assign(toast.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '10px 15px',
            background: '#00e054',
            color: 'white',
            borderRadius: '5px',
            fontWeight: 'bold',
            boxShadow: '0 0 10px rgba(0,0,0,0.3)',
            zIndex: 10000,
            opacity: '1',
            display: 'flex',
            alignItems: 'center',
            transition: 'opacity 0.5s ease'
        });

        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }

    document.addEventListener('DOMContentLoaded', function () {
        setTimeout(() => {
            const magnetLinks = document.querySelectorAll('a[href^="magnet:?"]');

            magnetLinks.forEach(link => {
                const container = link.parentNode;
                if (container.querySelector('.copy-magnet-btn')) return;

                const copyBtn = document.createElement("button");
                copyBtn.textContent = "Copy Magnet";
                copyBtn.className = "copy-magnet-btn";
                Object.assign(copyBtn.style, {
                    marginLeft: "10px",
                    padding: "5px 10px",
                    border: "none",
                    background: "#00e054",
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer",
                    borderRadius: "5px"
                });

                copyBtn.addEventListener("click", (e) => {
                    e.preventDefault();
                    GM_setClipboard(link.href);
                    showToast("Magnet link copied!", "📎");
                });

                container.insertBefore(copyBtn, link.nextSibling);
            });
        }, 500);
    });
})();

