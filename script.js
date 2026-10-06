let level = Number(localStorage.getItem("verseLevel")) || 1;
let xp = Number(localStorage.getItem("verseXP")) || 0;

let questionCorrect = false;
let studyCompleted = false;

const verses = {
  "john-3-16": {
    text: "For God so loved the world that he gave his one and only Son.",
    reference: "John 3:16"
  },

  "psalm-23-1": {
    text: "The Lord is my shepherd; I shall not want.",
    reference: "Psalm 23:1"
  },

  "philippians-4-13": {
    text: "I can do all things through Christ who strengthens me.",
    reference: "Philippians 4:13"
  },

  "jeremiah-29-11": {
    text: "For I know the plans I have for you, declares the Lord.",
    reference: "Jeremiah 29:11"
  },

  "proverbs-3-5": {
    text: "Trust in the Lord with all your heart and lean not on your own understanding.",
    reference: "Proverbs 3:5"
  }
};


// PAGE SWITCHING
function showPage(pageName) {

  const pages = document.querySelectorAll(".page");

  pages.forEach(page => {
    page.classList.remove("active");
  });

  document.getElementById(pageName).classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// QUESTION
function answerQuestion(button, correct) {

  const buttons = document.querySelectorAll(".answer");

  buttons.forEach(btn => {
    btn.disabled = true;
  });

  if (correct) {

    button.classList.add("correct");

    document.getElementById("questionResult").textContent =
      "✅ Correct! Great job studying God's Word.";

    document.getElementById("questionResult").style.color =
      "#55e68a";

    questionCorrect = true;

    document.getElementById("completeButton").disabled = false;

  } else {

    button.classList.add("wrong");

    document.getElementById("questionResult").textContent =
      "❌ Not quite. Try reviewing the verse.";

    document.getElementById("questionResult").style.color =
      "#ff7777";
  }
}


// COMPLETE STUDY
function completeStudy() {

  if (!questionCorrect || studyCompleted) {
    return;
  }

  studyCompleted = true;

  xp += 100;

  if (xp >= 100) {
    level++;
    xp = 0;
  }

  localStorage.setItem("verseLevel", level);
  localStorage.setItem("verseXP", xp);

  updateStats();

  document.getElementById("completeButton").textContent =
    "✅ STUDY COMPLETED";

  document.getElementById("completeButton").style.background =
    "#16803c";

  document.getElementById("reviewContent").innerHTML = `
    <div class="lesson">
      <h3>⭐ Today's Review</h3>

      <p>
        <strong>Verse:</strong>
        Psalm 23:1
      </p>

      <p>
        <strong>What you learned:</strong>
        God cares for His people and provides what they need.
      </p>

      <p>
        <strong>Result:</strong>
        ✅ Study completed successfully!
      </p>

      <p>
        <strong>XP earned:</strong>
        +100 XP
      </p>
    </div>
  `;

  alert("🎉 Study complete! You earned 100 XP!");
}


// UPDATE LEVEL
function updateStats() {

  document.getElementById("level").textContent = level;
  document.getElementById("xp").textContent = xp;
}


// VERSE LOOKUP
function lookupVerse() {

  const book =
    document.getElementById("bookInput").value
      .trim()
      .toLowerCase();

  const chapter =
    document.getElementById("chapterInput").value;

  const verse =
    document.getElementById("verseInput").value;

  const key = `${book}-${chapter}-${verse}`;

  const result = document.getElementById("lookupResult");

  if (verses[key]) {

    result.innerHTML = `
      <h3>${verses[key].reference}</h3>
      <p>"${verses[key].text}"</p>
      <p>✅ Verse found in the Verse Up One library.</p>
    `;

  } else {

    result.innerHTML = `
      <h3>Verse not found</h3>
      <p>
        We don't have that verse in the current offline library yet.
      </p>
      <p>
        Try John 3:16, Psalm 23:1, Philippians 4:13,
        Jeremiah 29:11, or Proverbs 3:5.
      </p>
    `;
  }
}


// STARTUP
updateStats();
