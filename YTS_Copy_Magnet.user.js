// ==UserScript==
// @name         YTS.mx - Convert to Magnet & Copy Button
// @namespace    https://github.com/Horyzontalhoror/yts_copymagnet
// @version      1.1
// @description  Converts YTS download links to magnet links and adds a "Copy Magnet" button for each.
// @author       Horyzontalhoror
// @license      MIT
// @match        https://yts.mx/movies/*
// @grant        GM_setClipboard
// @icon         https://raw.githubusercontent.com/Horyzontalhoror/yts_copymagnet/main/icon.png
// ==/UserScript==

(function () {
    'use strict';

    // Fungsi pembuat tautan magnet
    function magnetify(hashkey, titlekey) {
        return `magnet:?xt=urn:btih:${hashkey}` +
            `&dn=${encodeURIComponent(titlekey)}` +
            `&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce` +
            `&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce` +
            `&tr=udp%3A%2F%2F9.rarbg.to%3A2710%2Fannounce` +
            `&tr=udp%3A%2F%2Fp4p.arenabg.ch%3A1337%2Fannounce` +
            `&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce` +
            `&tr=http%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce` +
            `&tr=udp%3A%2F%2Fopen.tracker.cl%3A1337%2Fannounce`;
    }

    // Fungsi menampilkan toast notifikasi
    function showToast(message, icon = "📎") {
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
            display: 'flex',
            alignItems: 'center',
            transition: 'opacity 0.5s ease',
            opacity: '1',
        });
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }

    // Eksekusi saat halaman siap
    document.addEventListener('DOMContentLoaded', function () {
        setTimeout(() => {
            const tLinks = document.querySelectorAll("a[href*='torrent/download/']");

            tLinks.forEach(link => {
                const tHash = link.href.split('download/')[1];
                const tTitle = link.getAttribute("title")
                    .replace(/^Download\s+/, "")
                    .replace(/\s+Torrent$/, "");

                const magnetLink = magnetify(tHash, tTitle);
                link.href = magnetLink;

                // Cegah duplikat tombol
                if (link.parentNode.querySelector('.copy-magnet-btn')) return;

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
                    GM_setClipboard(magnetLink);
                    showToast("Magnet link copied!");
                });

                link.parentNode.insertBefore(copyBtn, link.nextSibling);
            });
        }, 500);
    });
})();
