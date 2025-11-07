// main.js - Final Script with All Features

// Register offline service worker
if ('serviceWorker' in navigator) {
    // You should also have a service-worker.js file for true offline functionality
    navigator.serviceWorker.register('service-worker.js'); 
}

// References
const content = document.getElementById('content');
const video = document.getElementById('videoPlayer'); 
const homePage = document.getElementById('homePage');
const pageTitle = document.querySelector('h1');

// --- Core Navigation ---

function goHome() {
    homePage.style.display = 'flex';
    content.innerHTML = '';
    video.style.display = 'none';
    video.pause();
    pageTitle.innerHTML = '🎓 Offline AI Tutor';
}

// --- Main Menu Functions ---

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
    video.style.display = 'none';
}

function goToCompetitiveExams() {
    homePage.style.display = 'none';
    video.style.display = 'none';
    pageTitle.innerHTML = '🏅 Competitive Exam Prep';

    content.innerHTML = `
        <h2>🏅 Competitive Exam Prep</h2>
        <p>Select an exam type to access sample papers and practice questions. All resources are available offline!</p>

        <div class="button-container" style="gap:15px;">
            <button onclick="showExamResources('NTSE')">🏆 NTSE (National Talent Search Exam)</button>
            <button onclick="showExamResources('Olympiads')">⚛️ Science & Math Olympiads</button>
            <button onclick="showExamResources('Scholarship')">💰 State Scholarship Exams</button>
        </div>
        
        <br><br>
        <button onclick="goHome()">🏠 Back Home</button>
    `;
}

function showExamResources(examName) {
    pageTitle.innerHTML = `${examName} Resources`;
    let paperLinks;

    // Correctly displays NTSE files (ntse_paperX.pdf)
    if (examName === 'NTSE') {
        paperLinks = `
            <a href="ntse_paper1.pdf" target="_blank">📄 NTSE Paper 1 (SAT)</a>
            <a href="ntse_paper2.pdf" target="_blank">⏱️ NTSE Paper 2 (MAT)</a>
            <a href="ntse_paper3.pdf" target="_blank">📄 NTSE Paper 3 (Mock Test)</a>
        `;
    } else {
        // Default structure for other exams
        paperLinks = `
            <a href="${examName.toLowerCase()}_paper1.pdf" target="_blank">📄 Paper 1 (Year 2023)</a>
            <a href="${examName.toLowerCase()}_paper2.pdf" target="_blank">⏱️ Mock Test 1 (Timed)</a>
            <a href="${examName.toLowerCase()}_paper3.pdf" target="_blank">📄 Paper 2 (Year 2022)</a>
        `;
    }

    content.innerHTML = `
        <h2>${examName} Practice Materials</h2>
        <p>Download previous year papers and timed mock tests for **${examName}**.</p>
        
        <div style="display:flex; flex-direction:column; align-items:center; gap:15px; margin-top:20px;">
            ${paperLinks}
        </div>
        
        <br><br>
        <button onclick="goToCompetitiveExams()">⬅ Back to Exam List</button>
    `;
}

function goToPapers() {
    homePage.style.display = 'none';
    video.style.display = 'none';
    pageTitle.innerHTML = '📄 Model Question Papers';

    // Correctly displays model files (modelX.pdf)
    content.innerHTML = `
        <h2>📄 School Model Question Papers</h2>
        <p>Select any paper to open it. (Make sure it’s downloaded once for offline viewing.)</p>

        <div style="display:flex; flex-direction:column; align-items:center; gap:15px; margin-top:20px;">
            <a href="model1.pdf" target="_blank">🧮 Math Model Paper</a>
            <a href="model2.pdf" target="_blank">🔬 Science Model Paper</a>
            <a href="model3.pdf" target="_blank">📘 English Model Paper</a>
        </div>

        <br><br>
        <button onclick="goHome()">🏠 Back Home</button>
    `;
}

function goToProgress() {
    homePage.style.display = 'none';
    video.style.display = 'none'; 
    pageTitle.innerHTML = '📊 Your Progress';

    let completed = Object.keys(localStorage).filter(k => localStorage.getItem(k) === "done");
    
    let progressHTML = `
        <h2>📊 Your Progress</h2>
        <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 12px; margin: 20px 0; max-width: 500px;">
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
            This Offline AI Tutor helps students learn using simple lessons, quizzes, and video support — 
            even without internet connectivity!
        </p>

        <h3>📘 Features</h3>
        <ul style="text-align:left; max-width:600px; margin:auto; list-style-type: circle;">
            <li>🔹 **Classes:** Structured learning by class, subject, and unit.</li>
            <li>🔹 **Competitive Exams:** Dedicated resources for NTSE, Olympiads, and other exams.</li>
            <li>🔹 **Papers:** Access school model question papers for practice.</li>
            <li>🔹 **Progress:** Track your quiz completion history.</li>
        </ul>

        <br>
        <button onclick="goHome()">🏠 Back Home</button>
    `;
}

// --- Class System Functions (Video Integration) ---

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
    
    // Logic to create the textbook file name (e.g., class6_math_textbook.pdf)
    const subjectLower = subject.toLowerCase();
    const textbookFile = `class${classNum}_${subjectLower}_textbook.pdf`; 
    
    for (let i = 1; i <= 10; i++) {
        const unitKey = `class${classNum}_${subject}_unit${i}`;
        const isDone = localStorage.getItem(unitKey) === "done";
        unitButtons += `<button onclick="openUnit(${classNum}, '${subject}', ${i})">Unit ${i} ${isDone ? '✅' : ' '}</button>`;
    }

    content.innerHTML = `
        <h2>${subject} — Class ${classNum}</h2>
        <p>Select a unit to start learning or view the full textbook:</p>
        
        <div class="button-container" style="gap:10px;">
            <a href="${textbookFile}" target="_blank" class="textbook-link">
                📘 View Full Textbook
            </a>
            ${unitButtons}
        </div>
        <br>
        <button onclick="goToSubjects(${classNum})">⬅ Back to Subjects</button>
    `;
}

function openUnit(classNum, subject, unitNum) {
    const videoFile = `class${classNum}_${subject.toLowerCase()}_unit${unitNum}.mp4`;
    pageTitle.innerHTML = `${subject} - Unit ${unitNum}`;

    content.innerHTML = `
        <h2>${subject} - Class ${classNum}</h2>
        <h3>Unit ${unitNum}</h3>
        <p>This unit explains important concepts in ${subject}. Watch the video lesson below and take a quick quiz.</p>
        <button onclick="answerUnitQuestion('class${classNum}_${subject}_unit${unitNum}')">Start Quiz</button>
        <br><br>
        <button onclick="goToUnits(${classNum}, '${subject}')">⬅ Back to Units</button>
    `;

    video.src = videoFile;
    video.style.display = 'block';
    video.play().catch(error => {
        console.error('Video playback failed (File missing or browser blocked autoplay):', error);
        alert('Video lesson not available offline. Please download content or check file name first.');
    });
}

function answerUnitQuestion(unitKey) {
    // Basic placeholder quiz functionality
    const correctAnswer = 'ok'; 
    let ans = prompt(`To complete this unit, type '${correctAnswer}' (for now):`);
    
    if (ans && ans.toLowerCase() === correctAnswer) {
        alert("✅ Unit Complete!");
        localStorage.setItem(unitKey, "done");
        
        const parts = unitKey.split('_');
        const classNum = parts[0].replace('class', '');
        const subject = parts[1];
        goToUnits(classNum, subject);

    } else {
        alert("❌ Try again!");
    }
}

// --- Video Error Handling ---
video.onerror = function() {
    console.error('Error loading video file:', video.src);
};

video.onloadeddata = function() {
    console.log('Video file loaded successfully:', video.src);
};