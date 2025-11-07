const cacheName = 'ai-tutor-cache-v9'; // <<< IMPORTANT: Increment this version for updates

// List of files required for the application to run offline
const assetsToCache = [
    '/',
    'index.html',
    'main.js',
    'style.css',
    // You should also include 'background.jpg' here if you use the background image:
    // 'background.jpg', 
    
    // --- Model Papers ---
    'model1.pdf',
    'model2.pdf',
    'model3.pdf',
    
    // --- Competitive Exam Papers (Examples) ---
    'ntse_paper1.pdf',
    'ntse_paper2.pdf',
    'ntse_paper3.pdf',
    'olympiads_paper1.pdf',
    'olympiads_paper2.pdf',
    'olympiads_paper3.pdf',
    'scholarship_paper1.pdf',
    'scholarship_paper2.pdf',
    'scholarship_paper3.pdf',

    // --- Textbook Files (9 files required for Class 6, 7, 8: Math, Science, English) ---
    'class6_math_textbook.pdf',
    'class6_science_textbook.pdf',
    'class6_english_textbook.pdf',
    'class7_math_textbook.pdf',
    'class7_science_textbook.pdf',
    'class7_english_textbook.pdf',
    'class8_math_textbook.pdf',
    'class8_science_textbook.pdf',
    'class8_english_textbook.pdf',
    
    // --- Sample Video Files (You need 10 per subject/class, or include a few for testing) ---
    // Example: You would need class6_math_unit1.mp4 through class6_math_unit10.mp4, etc.
    'class6_math_unit1.mp4', 
    'class6_math_unit2.mp4',
    // ... add all 90 video files (3 classes * 3 subjects * 10 units) here for full offline coverage
];

// 1. Install Event: Caching the necessary static assets
self.addEventListener('install', event => {
    console.log('Service Worker: Installing and Caching Assets');
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(assetsToCache).catch(error => {
                    console.error('Failed to cache some assets:', error);
                    // Continue even if some optional assets fail to load (like videos)
                });
            })
    );
});

// 2. Activate Event: Cleaning up old caches
self.addEventListener('activate', event => {
    console.log('Service Worker: Activating and Cleaning Old Caches');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Service Worker: Deleting old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// 3. Fetch Event: Serving files from cache first, then falling back to network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // If file is in cache, return it
                if (response) {
                    return response;
                }
                // If file not in cache, fetch from network
                return fetch(event.request);
            })
    );
});