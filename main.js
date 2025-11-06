// Register offline service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
// References
const content = document.getElementById('content');
const audio = document.getElementById('audioPlayer');
const homePage = document.getElementById('homePage');
// --- Navigation ---
function goToLessons() {
  homePage.style.display = 'none';
  content.innerHTML = `
    <h2>📘 Lessons</h2>
    <button onclick="showLesson(1)">Lesson 1: What is a Fraction?</button>
    <button onclick="showLesson(2)">Lesson 2: Numerator & Denominator</button>
    <button onclick="showLesson(3)">Lesson 3: Adding Fractions</button>
    <button onclick="showLesson(4)">Lesson 4: Subtracting Fractions</button>
    <br><br>
    <button onclick="goHome()">🏠 Back Home</button>
  `;
  audio.style.display = 'block';
}
function goToPapers() {
  homePage.style.display = 'none';
  audio.style.display = 'none';

  content.innerHTML = `
    <h2>📄 Model Question Papers</h2>
    <p>Select any paper to open it. (Make sure it’s downloaded once for offline viewing.)</p>

    <div style="display:flex; flex-direction:column; align-items:center; gap:15px; margin-top:20px;">
      <a href="model1.pdf" target="_blank" style="color:white; text-decoration:none; background:#2193b0; padding:10px 20px; border-radius:8px;">🧮 Math Model Paper</a>
      <a href="model2.pdf" target="_blank" style="color:white; text-decoration:none; background:#2193b0; padding:10px 20px; border-radius:8px;">🔬 Science Model Paper</a>
      <a href="model3.pdf" target="_blank" style="color:white; text-decoration:none; background:#2193b0; padding:10px 20px; border-radius:8px;">📘 English Model Paper</a>
    </div>

    <br><br>
    <button onclick="goHome()">🏠 Back Home</button>
  `;
}
// ------------------ CLASS SYSTEM ------------------
function goToClasses() {
  homePage.style.display = 'none';
  content.innerHTML = `
    <h2>📚 Select Your Class</h2>
    <button onclick="goToSubjects(6)">Class 6</button>
    <button onclick="goToSubjects(7)">Class 7</button>
    <button onclick="goToSubjects(8)">Class 8</button>
    <br><br>
    <button onclick="goHome()">🏠 Back Home</button>
  `;
  audio.style.display = 'none';
}

function goToSubjects(classNum) {
  content.innerHTML = `
    <h2>📖 Class ${classNum} Subjects</h2>
    <button onclick="goToUnits(${classNum}, 'Math')">🧮 Mathematics</button>
    <button onclick="goToUnits(${classNum}, 'Science')">🔬 Science</button>
    <button onclick="goToUnits(${classNum}, 'English')">📘 English</button>
    <br><br>
    <button onclick="goToClasses()">⬅ Back to Classes</button>
  `;
}

function goToUnits(classNum, subject) {
  let unitButtons = '';
  for (let i = 1; i <= 10; i++) {
    unitButtons += `<button onclick="openUnit(${classNum}, '${subject}', ${i})">Unit ${i}</button>`;
  }

  content.innerHTML = `
    <h2>${subject} — Class ${classNum}</h2>
    <p>Select a unit to start learning:</p>
    <div style="display:flex; flex-direction:column; align-items:center; gap:10px;">
      ${unitButtons}
    </div>
    <br>
    <button onclick="goToSubjects(${classNum})">⬅ Back to Subjects</button>
  `;
}

function openUnit(classNum, subject, unitNum) {
  let audioFile = `class${classNum}_${subject.toLowerCase()}_unit${unitNum}.mp3`;

  content.innerHTML = `
    <h2>${subject} - Class ${classNum}</h2>
    <h3>Unit ${unitNum}</h3>
    <p>This unit explains important concepts in ${subject}. Listen to the audio or take a quick quiz.</p>
    <button onclick="answerQuestion('${classNum}_${subject}_${unitNum}', 'ok')">Start Quiz</button>
    <br><br>
    <button onclick="goToUnits(${classNum}, '${subject}')">⬅ Back to Units</button>
  `;

  audio.src = audioFile;
  audio.style.display = 'block';
  audio.play().catch(error => {
    console.error('Audio playback failed:', error);
    alert('Audio lesson not available offline. Please download content first.');
  });
}
// Reuse your old quiz function
function answerQuestion(unitKey, correctAnswer) {
  let ans = prompt("Type 'ok' to pass this unit quiz:");
  if (ans === correctAnswer) {
    alert("✅ Unit Complete!");
    localStorage.setItem(unitKey, "done");
  } else {
    alert("❌ Try again!");
  }
}
// Update progress to include unit tracking
function goToProgress() {
  homePage.style.display = 'none';
  audio.style.display = 'none';

  let completed = Object.keys(localStorage).filter(k => localStorage.getItem(k) === "done");
  let progressHTML = `
    <h2>📊 Your Progress</h2>
    <div style="background: rgba(255, 255, 255, 0.9); color: #333; padding: 20px; border-radius: 12px; margin: 20px 0;">
      <p>Completed Lessons: ${completed.length}</p>
      <ul style="text-align: left;">
        ${completed.map(item => `<li>${item}</li>`).join('')}
      </ul>
    </div>
    <button onclick="goHome()">🏠 Back Home</button>
  `;
  
  content.innerHTML = progressHTML;
}
function showLesson(num) {
  let lessonText = '';
  let quizText = '';
  let correctAnswer = '';
  let audioFile = '';

  switch (num) {
    case 1:
      lessonText = 'A fraction represents a part of a whole. For example, if we cut a pizza into 4 equal pieces and take 1 piece, we have 1/4 of the pizza.';
      quizText = 'What does 1/4 mean? (answer: part)';
      correctAnswer = 'part';
      audioFile = 'lesson1.mp3';
      break;
    case 2:
      lessonText = 'In a fraction like 3/4, the top number (3) is called the numerator, and the bottom number (4) is called the denominator.';
      quizText = 'What is the bottom number called? (answer: denominator)';
      correctAnswer = 'denominator';
      audioFile = 'lesson2.mp3';
      break;
    case 3:
      lessonText = 'When adding fractions with the same denominator, we keep the denominator the same and add the numerators.';
      quizText = 'Do we add denominators? (answer: no)';
      correctAnswer = 'no';
      audioFile = 'lesson3.mp3';
      break;
    case 4:
      lessonText = 'When subtracting fractions with the same denominator, we keep the denominator the same and subtract the numerators.';
      quizText = 'Do we keep the same denominator? (answer: yes)';
      correctAnswer = 'yes';
      audioFile = 'lesson4.mp3';
      break;
  }

  content.innerHTML = `
    <h2>Lesson ${num}</h2>
    <div style="background: rgba(255, 255, 255, 0.9); color: #333; padding: 20px; border-radius: 12px; margin: 20px 0;">
      <p>${lessonText}</p>
    </div>
    <button onclick="answerQuestion(${num}, '${correctAnswer}')">Quiz: ${quizText}</button>
    <br><br>
    <button onclick="goToLessons()">⬅ Back to Lessons</button>
  `;

  audio.src = audioFile;
  audio.style.display = 'block';
  audio.play().catch(error => {
    console.error('Audio playback failed:', error);
    alert('Audio lesson not available offline. Please download content first.');
  });
}

function answerQuestion(lesson, correctAnswer) {
  let userAnswer = prompt("Enter your answer:");
  if (userAnswer === correctAnswer) {
    alert("✅ Correct!");
    localStorage.setItem("lesson" + lesson, "done");
  } else {
    alert("❌ Try again!");
  }
}

function goToProgress() {
  homePage.style.display = 'none';
  audio.style.display = 'none';

  let progressHtml = '<h2>📊 Your Progress</h2>';
  for (let i = 1; i <= 4; i++) {
    const done = localStorage.getItem("lesson" + i) === "done" ? "✅ Done" : "❌ Not done";
    progressHtml += `<p>Lesson ${i}: ${done}</p>`;
  }

  progressHtml += `<br><button onclick="goHome()">🏠 Back Home</button>`;
  content.innerHTML = progressHtml;
}
function goToAbout() {
  homePage.style.display = 'none';
  content.innerHTML = `
    <h2>💡 About</h2>
    <p>
      This Offline AI Tutor helps students learn using simple lessons, quizzes, and audio support — 
      even without internet connectivity! It works entirely on your device, keeping your data private and secure.
    </p>

    <h3>📘 How to Use the App</h3>
    <ul style="text-align:left; max-width:600px; margin:auto;">
      <li>🔹 Go to <b>Classes</b> to choose your class level (e.g., Class 6, 7, 8).</li>
      <li>🔹 Select a <b>Subject</b> such as Math, Science, or English.</li>
      <li>🔹 Pick a <b>Unit (1–10)</b> to study lessons and listen to audio explanations.</li>
      <li>🔹 After each lesson, take a short quiz to check your understanding.</li>
      <li>🔹 View your learning progress anytime in the <b>Progress</b> section.</li>
      <li>🔹 Access <b>Model Question Papers</b> for exam preparation and practice.</li>
      <li>🔹 You can use all features <b>completely offline</b> once installed.</li>
    </ul>

    <h3>🔒 Privacy & Data</h3>
    <p>
      Your progress and learning data are stored only on your device. 
      Nothing is uploaded online unless you manually enable sync in future versions.
    </p>

    <br>
    <button onclick="goHome()">🏠 Back Home</button>
  `;
}
function goHome() {
  homePage.style.display = 'flex';
  content.innerHTML = '';
  audio.style.display = 'none';
  audio.pause();
}

// Add this error handling to your showLesson function in main.js
audio.onerror = function() {
  console.error('Error loading audio file:', audio.src);
};

audio.onloadeddata = function() {
  console.log('Audio file loaded successfully:', audio.src);
};
