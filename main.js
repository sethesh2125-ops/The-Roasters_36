// main.js - Complete Corrected Script

// Register offline service worker
if ('serviceWorker' in navigator) {
    // Note: The 'service-worker.js' file must exist for this to work offline.
    navigator.serviceWorker.register('service-worker.js');
}

// References
const content = document.getElementById('content');
const audio = document.getElementById('audioPlayer');
const homePage = document.getElementById('homePage');
const pageTitle = document.querySelector('h1'); // Reference to the main title

// --- Core Navigation ---

/**
 * Resets the view back to the main home page buttons.
 */
function goHome() {
    homePage.style.display = 'flex'; // Show the home buttons
    content.innerHTML = '';          // Clear the content area
    audio.style.display = 'none';    // Hide the audio player
    audio.pause();                   // Pause any running audio
    pageTitle.innerHTML = '🎓 Offline AI Tutor'; // Reset the main title
}

// --- Main Menu Functions (These correspond to the initial HTML buttons) ---

function goToClasses() {
    homePage.style.display = 'none';
    pageTitle.innerHTML = '📚 Select Your Class';
    content.innerHTML = `
        <h2>📚 Select Your Class</h2>
        <div class="button-container" style="gap:15px;">
            <button onclick="goToSubjects(6)">Class 6</button>
            <button onclick="goToSubjects(7)">Class 7</button>
            <button onclick="goToSubjects(8)">Class 8</button>
        </div>
        <br><br>
        <button onclick="goHome()">🏠 Back Home</button>
    `;
    audio.style.display = 'none';
}

function goToPapers() {
    homePage.style.display = 'none';
    audio.style.display = 'none';
    pageTitle.innerHTML = '📄 Model Question Papers';

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

function goToProgress() {
    homePage.style.display = 'none';
    audio.style.display = 'none';
    pageTitle.innerHTML = '📊 Your Progress';

    // Get all items marked as "done" from local storage
    let completed = Object.keys(localStorage).filter(k => localStorage.getItem(k) === "done");
    
    let progressHTML = `
        <h2>📊 Your Progress</h2>
        <div style="background: rgba(255, 255, 255, 0.9); color: #333; padding: 20px; border-radius: 12px; margin: 20px 0; max-width: 500px;">
            <h3>Completed Units & Lessons:</h3>
            <p>Total Completed: <strong>${completed.length}</strong></p>
            <ul style="text-align: left; list-style-type: disc; padding-left: 20px;">
                ${completed.length > 0 ? completed.map(item => `<li>${item}</li>`).join('') : '<li>No lessons or units completed yet.</li>'}
            </ul>
        </div>
        <button onclick="goHome()">🏠 Back Home</button>
    `;
    
    content.innerHTML = progressHTML;
}

function goToAbout() {
    homePage.style.display = 'none';
    pageTitle.innerHTML = '💡 About This Tutor';
    content.innerHTML = `
        <h2>💡 About</h2>
        <p>
            This Offline AI Tutor helps students learn using simple lessons, quizzes, and audio support — 
            even without internet connectivity! It works entirely on your device, keeping your data private and secure.
        </p>

        <h3>📘 How to Use the App</h3>
        <ul style="text-align:left; max-width:600px; margin:auto; list-style-type: circle;">
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


// --- Class System Functions ---

function goToSubjects(classNum) {
    pageTitle.innerHTML = `📖 Class ${classNum} Subjects`;
    content.innerHTML = `
        <h2>📖 Class ${classNum} Subjects</h2>
        <div class="button-container" style="gap:15px;">
            <button onclick="goToUnits(${classNum}, 'Math')">🧮 Mathematics</button>
            <button onclick="goToUnits(${classNum}, 'Science')">🔬 Science</button>
            <button onclick="goToUnits(${classNum}, 'English')">📘 English</button>
        </div>
        <br><br>
        <button onclick="goToClasses()">⬅ Back to Classes</button>
    `;
}

function goToUnits(classNum, subject) {
    pageTitle.innerHTML = `${subject} — Class ${classNum}`;
    let unitButtons = '';
    for (let i = 1; i <= 10; i++) {
        const unitKey = `class${classNum}_${subject}_unit${i}`;
        const isDone = localStorage.getItem(unitKey) === "done";
        unitButtons += `<button onclick="openUnit(${classNum}, '${subject}', ${i})">Unit ${i} ${isDone ? '✅' : ' '}</button>`;
    }

    content.innerHTML = `
        <h2>${subject} — Class ${classNum}</h2>
        <p>Select a unit to start learning:</p>
        <div class="button-container" style="gap:10px;">
            ${unitButtons}
        </div>
        <br>
        <button onclick="goToSubjects(${classNum})">⬅ Back to Subjects</button>
    `;
}

function openUnit(classNum, subject, unitNum) {
    const audioFile = `class${classNum}_${subject.toLowerCase()}_unit${unitNum}.mp3`;
    pageTitle.innerHTML = `${subject} - Unit ${unitNum}`;

    content.innerHTML = `
        <h2>${subject} - Class ${classNum}</h2>
        <h3>Unit ${unitNum}</h3>
        <p>This unit explains important concepts in ${subject}. Listen to the audio or take a quick quiz.</p>
        <button onclick="answerUnitQuestion('class${classNum}_${subject}_unit${unitNum}')">Start Quiz</button>
        <br><br>
        <button onclick="goToUnits(${classNum}, '${subject}')">⬅ Back to Units</button>
    `;

    audio.src = audioFile;
    audio.style.display = 'block';
    audio.play().catch(error => {
        console.error('Audio playback failed (usually because file is missing):', error);
        // Note: For a real offline app, ensure all audio files are in the cache via service-worker.
        alert('Audio lesson not available offline. Please download content or check file name first.');
    });
}

/**
 * Handles the generic Unit completion quiz logic.
 */
function answerUnitQuestion(unitKey) {
    // We'll use a specific fixed answer for simplicity, but you can expand this later.
    const correctAnswer = 'ok'; 
    let ans = prompt(`To complete this unit, type '${correctAnswer}' (for now):`);
    
    if (ans && ans.toLowerCase() === correctAnswer) {
        alert("✅ Unit Complete!");
        localStorage.setItem(unitKey, "done");
        
        // Refresh the unit view to show the ✅
        const parts = unitKey.split('_');
        const classNum = parts[0].replace('class', '');
        const subject = parts[1];
        goToUnits(classNum, subject);

    } else {
        alert("❌ Try again!");
    }
}


// --- Audio Error Handling ---
audio.onerror = function() {
    console.error('Error loading audio file:', audio.src);
    // You could also update the UI here to show a broken audio icon
};

audio.onloadeddata = function() {
    console.log('Audio file loaded successfully:', audio.src);
};
