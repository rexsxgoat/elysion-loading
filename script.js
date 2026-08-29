(() => {
  const bar = document.getElementById("bar-fill");
  const status = document.getElementById("status");
  const percent = document.getElementById("percent");

  let total = 0;
  let needed = 0;

  function setProgress(value) {
    value = Math.max(0, Math.min(1, Number(value) || 0));
    const pct = Math.round(value * 100);
    bar.style.width = pct + "%";
    percent.textContent = pct + "%";
  }

  // Garry's Mod callbacks
  window.GameDetails = function(servername, serverurl, mapname, maxplayers, steamid, gamemode) {
    status.textContent = "Connexion à " + (servername || "Elysion Roleplay");
  };

  window.SetFilesTotal = function(n) {
    total = Number(n) || 0;
    update();
  };

  window.SetFilesNeeded = function(n) {
    needed = Number(n) || 0;
    update();
  };

  window.DownloadingFile = function(fileName) {
    if (fileName) {
      status.textContent = "Téléchargement des ressources...";
    }
  };

  window.SetStatusChanged = function(newStatus) {
    if (newStatus) status.textContent = newStatus;
  };

  window.SetPausing = function(paused) {
    if (paused) status.textContent = "Téléchargement en pause...";
  };

  function update() {
    if (total > 0) {
      setProgress((total - needed) / total);
    }
  }

  // Smooth fallback animation while GMod has not sent file totals yet.
  let fallback = 0.03;
  const fallbackTimer = setInterval(() => {
    if (total > 0) {
      clearInterval(fallbackTimer);
      return;
    }
    fallback = Math.min(fallback + 0.004, 0.82);
    setProgress(fallback);
  }, 80);
})();
const music = document.getElementById("music");
const muteBtn = document.getElementById("muteBtn");
const volume = document.getElementById("volume");
const bars = document.querySelector(".music-bars");

// Volume de départ : 25 %
music.volume = 0.25;

// =========================
// AUTOPLAY
// =========================

function startMusic() {
    music.volume = 0.25;

    const promise = music.play();

    if (promise !== undefined) {
        promise
            .then(() => {
                bars.classList.remove("paused");
            })
            .catch(() => {
                // Autoplay bloqué :
                // la musique pourra être lancée par le bouton
                bars.classList.add("paused");
            });
    }
}

startMusic();

// =========================
// MUTE / UNMUTE
// =========================

muteBtn.addEventListener("click", () => {

    if (music.muted) {

        music.muted = false;

        muteBtn.textContent = "🔊";

        bars.classList.remove("paused");

    } else {

        music.muted = true;

        muteBtn.textContent = "🔇";

        bars.classList.add("paused");
    }
});

// =========================
// VOLUME
// =========================

volume.addEventListener("input", () => {

    music.volume = volume.value;

    if (music.volume === 0) {

        music.muted = true;

        muteBtn.textContent = "🔇";

        bars.classList.add("paused");

    } else {

        music.muted = false;

        muteBtn.textContent = "🔊";

        bars.classList.remove("paused");
    }
});
