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
