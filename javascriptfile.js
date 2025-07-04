const moodSelect = document.getElementById("mood");
const suggestionsDiv = document.getElementById("suggestions");
const customMoodContainer = document.getElementById("customMoodContainer");

// songs per mood
const music = {
  happy: [
    { name: "Love you Zindagi", videoId: "49WpR4dnbbM" },
    { name: "Kala Chashma", videoId: "k4yXQkG2s1E" },
    { name: "Sooraj Dooba Hai", videoId: "jp7n5w81WDI" },
    { name: "Kudi Nu Nachne De", videoId: "FRVgLuZHCPY" },
    { name: "Gallan Goodiyan", videoId: "jCEdTq3j-0U" },
    { name: "Zingaat", videoId: "TsLXaOwFsQA" },
    { name: "Badtameez Dil", videoId: "B9CGEsexO24" },
    { name: "London Thumakda", videoId: "udra3Mfw2oo" }
  ],
  sad: [
    { name: "Let Her Go", videoId: "Aj5CmjMC3d4" },
    { name: "Tera Yaar Hoon Main", videoId: "C1DucVoyfwY" },
    { name: "Agar Tum Saath Ho", videoId: "dhY8jRNELUc" },
    { name: "Husn", videoId: "0IIJxkDtkHY" },
    { name: "At My Worst", videoId: "bJZmeIQ9L8A" },
    { name: "Channa Mereya", videoId: "284Ov7ysmfA" },
    { name: "Phir Bhi Tumko Chaahunga", videoId: "zik32kzJBHc" },
    { name: "Tum Hi Ho", videoId: "Umqb9KENgmk" }
  ],
  angry: [
    { name: "Jee Karda", videoId: "VAJK04HOLd0" },
    { name: "Zinda – Bhaag Milkha Bhaag", videoId: "4IIrghqiEPY" },
    { name: "Apna Time Aayega", videoId: "jFGKJBPFdUA" },
    { name: "Breakup Song", videoId: "qdgZU3rktnM" },
    { name: "Ziddi Dil", videoId: "puKD3nkB1h4" },
    { name: "Believer – Imagine Dragons", videoId: "7wtfhZwyrcc" },
    { name: "Lose Yourself – Eminem", videoId: "_Yhyp-_hX2s" },
    { name: "Unstoppable", videoId: "oS07d8Gr4tw" }
  ],
  calm: [
    { name: "Weightless – Marconi Union", videoId: "UfcAVejslrU" },
    { name: "Ocean Sounds", videoId: "1ZYbU82GVz4" },
    { name: "Lo-Fi Hindi Chill", videoId: "XyIA5UTsVCU" },
    { name: "Relaxing Rain & Piano", videoId: "o8GrqUSdzi0" },
    { name: "Night Vibes – Instrumental", videoId: "t8yVk0bm684" },
    { name: "Calm Guitar", videoId: "2OEL4P1Rz04" },
    { name: "Soft Study Lofi", videoId: "5qap5aO4i9A" },
    { name: "Calm Bollywood Chill Mix", videoId: "6p9Il_j0zjc" }
  ]
};


const moodColors = {
  happy: "#fff7b3",
  sad: "#d0e2ff",
  angry: "#ffd6d6",
  calm: "#d9fce1",
  other: "linear-gradient(to right,rgb(252, 195, 236),rgb(252, 221, 142))" // Beautiful gradient
};


window.onload = () => {
  const savedMood = localStorage.getItem("mood");
  if (savedMood) {
    moodSelect.value = savedMood;
    if (music[savedMood]) {
      updateSuggestions(savedMood);
      changeBackground(savedMood);
      customMoodContainer.style.display = "none";
    } else {
      suggestionsDiv.innerHTML = "";
      changeBackground("other");
      customMoodContainer.style.display = "block";
    }
  }
};


moodSelect.addEventListener("change", () => {
  const mood = moodSelect.value;
  localStorage.setItem("mood", mood);

  if (music[mood]) {
    updateSuggestions(mood);
    changeBackground(mood);
    customMoodContainer.style.display = "none";
  } else {
    suggestionsDiv.innerHTML = "";
    changeBackground("other");
    customMoodContainer.style.display = "block";
  }
});


function updateSuggestions(mood) {
  suggestionsDiv.innerHTML = "";

  music[mood].forEach(song => {
    const videoId = song.videoId;
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

    const card = document.createElement("div");
    card.classList.add("card");

    const title = document.createElement("h3");
    title.textContent = song.name;

    const imgContainer = document.createElement("div");
    imgContainer.className = "thumbnail-wrapper";

    const img = document.createElement("img");
    img.src = thumbnailUrl;
    img.alt = song.name;
    img.classList.add("thumbnail");

    const overlay = document.createElement("div");
    overlay.className = "play-overlay";
    imgContainer.appendChild(img);
    imgContainer.appendChild(overlay);

    card.appendChild(title);
    card.appendChild(imgContainer);

    imgContainer.onclick = function () {
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      iframe.frameBorder = 0;
      iframe.width = "100%";
      iframe.height = "170";

      card.replaceChild(iframe, imgContainer);
    };

    suggestionsDiv.appendChild(card);
  });
}


function changeBackground(mood) {
  const bg = moodColors[mood] || "#ffffff";


  if (bg.includes("gradient")) {
    document.body.style.background = bg;
  } else {
    document.body.style.background = "";
    document.body.style.backgroundColor = bg;
  }
}

// 🔍 Search from youtube
function searchMood() {
  const moodInput = document.getElementById("customMood").value.trim().toLowerCase();
  const knownMoods = ["happy", "sad", "angry", "calm"];

  if (!moodInput) {
    alert("Please enter a mood to search.");
    return;
  }

  if (knownMoods.includes(moodInput)) {
    moodSelect.value = moodInput;
    moodSelect.dispatchEvent(new Event("change"));
    return;
  }

  const query = encodeURIComponent(`${moodInput} mood songs`);
  const url = `https://www.youtube.com/results?search_query=${query}`;
  window.open(url, "_blank");
}
