// ==UserScript==
// @name         YTS.mx - Magnet Link Enhancer
// @namespace    https://github.com/Horyzontalhoror/yts_copymagnet
// @version      2.0
// @description  Ubah semua tautan download menjadi magnet dan tambahkan tombol salin di YTS.mx
// @author       Horyzontalhoror
// @license      MIT
// @match        https://yts.mx/movies/*
// @grant        GM_setClipboard
// @icon         https://raw.githubusercontent.com/Horyzontalhoror/yts_copymagnet/main/icon.png
// ==/UserScript==

(function () {
    'use strict';

    // Membuat magnet link dari hash dan judul
    function magnetify(hashkey, titlekey) {
        return `magnet:?xt=urn:btih:${hashkey}&dn=${titlekey}&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2710%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.ch%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce&tr=http%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Fopen.tracker.cl%3A1337%2Fannounce`;
    }

    // Menampilkan notifikasi toast
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

    // Jalankan saat halaman sudah siap
    window.addEventListener('load', () => {
        setTimeout(() => {
            const tLinks = Array.from(document.querySelectorAll("a[href*='torrent/download/']"));

            tLinks.forEach(link => {
                const tHash = link.href.split("/").pop();
                const tTitle = encodeURIComponent(
                    link.getAttribute("title").replace(/^Download\s/, "").replace(/\sTorrent$/, "")
                );
                const magnet = magnetify(tHash, tTitle);

                // Ganti href ke magnet
                link.href = magnet;
                link.title += " (magnet)";

                // Hindari duplikasi tombol
                if (link.nextSibling && link.nextSibling.classList?.contains('copy-magnet-btn')) return;

                // Buat tombol salin magnet
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
                    borderRadius: "5px",
                    fontFamily: "inherit"
                });

                copyBtn.addEventListener("click", (e) => {
                    e.preventDefault();
                    if (typeof GM_setClipboard === "function") {
                        GM_setClipboard(magnet);
                        showToast("Magnet link copied!", "📎");
                    } else {
                        showToast("Clipboard copy failed!", "❌");
                    }
                });

                link.parentNode.insertBefore(copyBtn, link.nextSibling);
            });
        }, 1000);
    });
})();
