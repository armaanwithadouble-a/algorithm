// Random data arrays for generating usernames and user properties
const adjectives = [
    "swift", "clever", "bright", "wild", "gentle", "fierce", "sneaky", "happy", 
    "brave", "quiet", "loud", "tiny", "giant", "smooth", "rough", "wise", 
    "silly", "crazy", "calm", "energetic", "lazy", "busy", "sleepy", "alert",
    "funny", "serious", "cool", "warm", "cold", "hot", "fresh", "old",
    "young", "fast", "slow", "strong", "weak", "smart", "curious", "mysterious"
];

const animals = [
    "cat", "dog", "fox", "wolf", "bear", "lion", "tiger", "eagle", "owl", "hawk",
    "dolphin", "whale", "shark", "turtle", "penguin", "panda", "koala", "kangaroo",
    "rabbit", "squirrel", "hedgehog", "raccoon", "otter", "seal", "deer", "elk",
    "moose", "horse", "zebra", "giraffe", "elephant", "rhino", "hippo", "monkey",
    "gorilla", "chimpanzee", "lemur", "sloth", "armadillo", "platypus"
];

const moods = ["happy", "angry", "bored", "excited", "neutral", "sad", "confused", "energetic"];

const interestCategories = [
    ["memes", "gaming", "tech"],
    ["politics", "news", "environment"],
    ["sports", "fitness", "food"],
    ["fashion", "travel", "photography"],
    ["music", "art", "books"],
    ["movies", "animals", "cooking"],
    ["science", "space", "history"],
    ["dance", "fashion", "social media"],
    ["coding", "startups", "ai"],
    ["nature", "hiking", "camping"],
    ["cars", "motorcycles", "racing"],
    ["comedy", "memes", "viral videos"]
];

const avatars = [
    "👨‍💻", "👩‍💼", "🏋️‍♂️", "👗", "🎨", "🍳", "🔬", "💃", "🚀", "🌟",
    "🦊", "🐱", "🐶", "🐺", "🦅", "🐧", "🐼", "🦘", "🐰", "🦔",
    "🌮", "🍕", "☕", "🎮", "📱", "💻", "🎵", "📚", "🎭", "🏆",
    "🌈", "⚡", "🔥", "❄️", "🌊", "🌙", "☀️", "🎯", "🎪", "🎨"
];

// Function to generate random username
function generateRandomUsername() {
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const animal = animals[Math.floor(Math.random() * animals.length)];
    return `@${adjective}_${animal}`;
}

// Function to generate random user
function generateRandomUser() {
    const username = generateRandomUsername();
    const mood = moods[Math.floor(Math.random() * moods.length)];
    const interests = interestCategories[Math.floor(Math.random() * interestCategories.length)];
    const avatar = avatars[Math.floor(Math.random() * avatars.length)];
    
    return {
        name: username,
        mood: mood,
        interests: interests,
        avatar: avatar
    };
}

// Generate random users
const users = Array.from({ length: 8 }, () => generateRandomUser());

// Fake posts data
const posts = [
    {
        id: 1,
        title: "BREAKING: AI Dog Learns to Bark in JavaScript",
        content: "Scientists are baffled as this coding canine debugs its own barks. 'woof.log()' is now a thing.",
        category: "tech",
        impact: {
            mood: 0.8,    // 0 to 1 scale, how much it affects user mood
            engagement: 0.9  // 0 to 1 scale, how likely to drive engagement
        },
        author: generateRandomUser()
    },
    {
        id: 2,
        title: "SHOCKING: Local Cat Runs for Mayor, Promises Unlimited Naps",
        content: "Campaign slogan: 'A cat nap in every home, and treats for all!'",
        category: "politics",
        impact: {
            mood: 0.7,
            engagement: 0.85
        },
        author: generateRandomUser()
    },
    {
        id: 3,
        title: "VIRAL: Man Teaches Goldfish to Play Chess, Wins Tournament",
        content: "The fish's opening move? Always 'e4'. 'It's the most liquid move,' says the champion.",
        category: "sports",
        impact: {
            mood: 0.9,
            engagement: 0.95
        },
        author: generateRandomUser()
    },
    {
        id: 4,
        title: "EXCLUSIVE: Fashion Designer Creates Clothes Made Entirely of WiFi",
        content: "The collection is invisible but always in style. 'It's like wearing the internet,' says the designer.",
        category: "fashion",
        impact: {
            mood: 0.6,
            engagement: 0.75
        },
        author: generateRandomUser()
    },
    {
        id: 5,
        title: "BREAKING: Scientists Discover That Plants Have Been Photosynthesizing to Music",
        content: "Study shows plants grow 50% faster when listening to heavy metal. 'They're headbanging in photosynthesis,' says lead researcher.",
        category: "science",
        impact: {
            mood: 0.8,
            engagement: 0.85
        },
        author: generateRandomUser()
    },
    {
        id: 6,
        title: "DRAMA: Local Squirrel Accused of Running Underground Nut Trading Ring",
        content: "Authorities found a stash of premium acorns worth thousands. The mastermind remains at large.",
        category: "drama",
        impact: {
            mood: 0.7,
            engagement: 0.8
        },
        author: generateRandomUser()
    },
    {
        id: 7,
        title: "MIND-BLOWING: AI Creates Meme So Funny It Crashes the Internet",
        content: "The meme was so powerful, servers worldwide needed a nap. 'We've created a monster,' says tech expert.",
        category: "memes",
        impact: {
            mood: 0.95,
            engagement: 1.0
        },
        author: generateRandomUser()
    },
    {
        id: 8,
        title: "EXCLUSIVE: Time Traveler Accidentally Posts Selfie from 1923",
        content: "The photo shows a smartphone in the background of a historical event. 'Oops,' says the time traveler.",
        category: "news",
        impact: {
            mood: 0.85,
            engagement: 0.9
        },
        author: generateRandomUser()
    },
    {
        id: 9,
        title: "SHOCKING: Local Pizza Place Discovers New Mathematical Constant",
        content: "The 'Pizza Pi' is exactly 3.14159... slices per person. Mathematicians are having a slice of humble pie.",
        category: "food",
        impact: {
            mood: 0.75,
            engagement: 0.8
        },
        author: generateRandomUser()
    },
    {
        id: 10,
        title: "BREAKING: Cloud Computing Takes Literal Meaning as Server Farm Floats Away",
        content: "Tech companies are now using actual clouds to store data. 'The sky's the limit,' says cloud architect.",
        category: "tech",
        impact: {
            mood: 0.8,
            engagement: 0.85
        },
        author: generateRandomUser()
    }
];

// Game state management
const gameState = {
    currentStep: 0,
    userChoices: [],
    isAnimating: false,
    currentUser: null,
    selectedPost: null,
    globalMood: 0.5,    // 0 to 1 scale, 0 being very angry, 1 being very happy
    globalEngagement: 0.5,  // 0 to 1 scale, 0 being low engagement, 1 being viral
    updateMetrics: function(posts) {
        // Calculate average mood impact from posts
        const moodSum = posts.reduce((sum, post) => sum + post.impact.mood, 0);
        const engagementSum = posts.reduce((sum, post) => sum + post.impact.engagement, 0);
        
        // Update global metrics with weighted average (70% current, 30% new)
        this.globalMood = (this.globalMood * 0.7) + ((moodSum / posts.length) * 0.3);
        this.globalEngagement = (this.globalEngagement * 0.7) + ((engagementSum / posts.length) * 0.3);
        
        // Ensure values stay between 0 and 1
        this.globalMood = Math.max(0, Math.min(1, this.globalMood));
        this.globalEngagement = Math.max(0, Math.min(1, this.globalEngagement));
    },
    approvePost: function(post) {
        // Update metrics based on the approved post
        const oldMood = this.globalMood;
        const oldEngagement = this.globalEngagement;
        
        this.globalMood = (this.globalMood * 0.7) + (post.impact.mood * 0.3);
        this.globalEngagement = (this.globalEngagement * 0.7) + (post.impact.engagement * 0.3);
        
        // Ensure values stay between 0 and 1
        this.globalMood = Math.max(0, Math.min(1, this.globalMood));
        this.globalEngagement = Math.max(0, Math.min(1, this.globalEngagement));
        
        // Scroll to top smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Prevent post selection during animation
        this.isAnimating = true;
        
        // Deselect the post after submission
        this.selectedPost = null;
        const selectedCard = document.querySelector('.post-card.selected');
        if (selectedCard) {
            selectedCard.classList.remove('selected');
        }
        if (activeCheckmark) {
            removeCheckmark(activeCheckmark);
            activeCheckmark = null;
        }
        
        // Wait for scroll to complete before starting metrics animation
        setTimeout(() => {
            // Animate the metrics
            const metricsDisplay = document.querySelector('.metrics-container');
            if (metricsDisplay) {
                const moodFill = metricsDisplay.querySelector('.metric-display:first-child .metric-fill');
                const moodValue = metricsDisplay.querySelector('.metric-display:first-child .metric-value');
                const engagementFill = metricsDisplay.querySelector('.metric-display:last-child .metric-fill');
                const engagementValue = metricsDisplay.querySelector('.metric-display:last-child .metric-value');
                
                // Add animation class to metrics container
                metricsDisplay.classList.add('metrics-updating');
                
                // Add increasing/decreasing class based on the overall change
                const isIncreasing = (post.impact.mood > oldMood) || (post.impact.engagement > oldEngagement);
                metricsDisplay.classList.add(isIncreasing ? 'metrics-increasing' : 'metrics-decreasing');
                
                // Animate the bars and numbers
                animateMetric(moodFill, moodValue, oldMood, this.globalMood, 'mood');
                animateMetric(engagementFill, engagementValue, oldEngagement, this.globalEngagement, 'engagement');
                
                // Wait for animations to complete before loading new user
                setTimeout(() => {
                    metricsDisplay.classList.remove('metrics-updating', 'metrics-increasing', 'metrics-decreasing');
                    this.isAnimating = false;
                    // Move to next user
                    this.currentUser = getRandomUser();
                    const profileView = createProfileView(this.currentUser);
                    showContent(profileView);
                }, 2000); // Wait 2 seconds for animations to complete
            } else {
                // If metrics display isn't found, just move to next user
                this.isAnimating = false;
                this.currentUser = getRandomUser();
                const profileView = createProfileView(this.currentUser);
                showContent(profileView);
            }
        }, 500); // Wait for scroll to complete
    }
};

// Remove the global approvalCheckmark variable since we'll create/remove as needed
let activeCheckmark = null;

function createApprovalCheckmark() {
    const checkmark = createElement('div', 'approval-checkmark', '✓');
    checkmark.addEventListener('click', (e) => {
        e.stopPropagation();
        if (gameState.selectedPost) {
            handleApprovalClick(gameState.selectedPost);
        }
    });
    document.body.appendChild(checkmark);
    return checkmark;
}

function removeCheckmark(checkmark) {
    if (checkmark && checkmark.parentNode) {
        // Move checkmark back to body before removing
        document.body.appendChild(checkmark);
        checkmark.parentNode.removeChild(checkmark);
    }
}

function moveCheckmarkToCard(targetCard, checkmark) {
    const postTitle = targetCard.querySelector('.post-title').textContent;
    console.log(`[Checkmark] Positioning checkmark for post: "${postTitle}"`);
    
    // Reset checkmark state
    checkmark.classList.remove('slided-out');
    checkmark.style.opacity = '0';
    checkmark.style.pointerEvents = 'none';
    
    // Position the checkmark relative to the card
    targetCard.style.position = 'relative';  // Ensure card has relative positioning
    targetCard.appendChild(checkmark);  // Move checkmark inside the card
    checkmark.style.top = '50%';  // Center vertically
    
    // Force a reflow to ensure the position is set
    checkmark.offsetHeight;
    
    // Make it visible and slide out
    console.log(`[Checkmark] Animating checkmark in for post: "${postTitle}"`);
    checkmark.classList.add('visible');
    requestAnimationFrame(() => {
        checkmark.style.opacity = '1';
        checkmark.style.pointerEvents = 'auto';
        checkmark.classList.add('slided-out');
    });
}

function animateCheckmarkOut(checkmark, postTitle) {
    console.log(`[Checkmark] Starting checkmark animation out for post: "${postTitle}"`);
    
    // First animate the checkmark back
    checkmark.classList.remove('slided-out');
    checkmark.style.opacity = '0';
    checkmark.style.pointerEvents = 'none';
    
    return new Promise(resolve => {
        // Wait for the animation to complete before removing
        setTimeout(() => {
            console.log(`[Checkmark] Checkmark animation out complete for post: "${postTitle}"`);
            // Only remove after animation is done
            removeCheckmark(checkmark);
            resolve();
        }, 300);
    });
}

// DOM elements
const content = document.getElementById('content');

// Utility functions
function createElement(type, className, text = '') {
    const element = document.createElement(type);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
}

function showContent(element) {
    content.innerHTML = '';
    content.appendChild(element);
    element.classList.add('fade-in');
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomUser() {
    return users[Math.floor(Math.random() * users.length)];
}

function getUserPosts(user) {
    return posts.filter(post => post.author === user);
}

function getRandomPosts(min = 3, max = 5) {
    // Determine how many posts to show (random between min and max)
    const numPosts = Math.floor(Math.random() * (max - min + 1)) + min;
    
    // Shuffle all posts and take the first numPosts
    const shuffled = [...posts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numPosts);
}

// Add color gradient calculation functions
function calculateMoodColor(value) {
    // Define color stops for mood gradient
    const colors = {
        0: { r: 244, g: 67, b: 54 },    // Red (#F44336)
        0.5: { r: 255, g: 193, b: 7 },  // Yellow (#FFC107)
        1: { r: 76, g: 175, b: 80 }     // Green (#4CAF50)
    };
    
    // Find the two closest color stops
    let lowerStop = 0;
    let upperStop = 1;
    
    if (value <= 0.5) {
        lowerStop = 0;
        upperStop = 0.5;
    } else {
        lowerStop = 0.5;
        upperStop = 1;
    }
    
    // Calculate the interpolation factor
    const factor = (value - lowerStop) / (upperStop - lowerStop);
    
    // Interpolate between the two colors
    const lowerColor = colors[lowerStop];
    const upperColor = colors[upperStop];
    
    const r = Math.round(lowerColor.r + (upperColor.r - lowerColor.r) * factor);
    const g = Math.round(lowerColor.g + (upperColor.g - lowerColor.g) * factor);
    const b = Math.round(lowerColor.b + (upperColor.b - lowerColor.b) * factor);
    
    return `rgb(${r}, ${g}, ${b})`;
}

function calculateEngagementColor(value) {
    // Define color stops for engagement gradient (blue shades)
    const colors = {
        0: { r: 33, g: 150, b: 243 },   // Light Blue (#2196F3)
        0.5: { r: 25, g: 118, b: 210 }, // Medium Blue (#1976D2)
        1: { r: 13, g: 71, b: 161 }     // Dark Blue (#0D47A1)
    };
    
    // Find the two closest color stops
    let lowerStop = 0;
    let upperStop = 1;
    
    if (value <= 0.5) {
        lowerStop = 0;
        upperStop = 0.5;
    } else {
        lowerStop = 0.5;
        upperStop = 1;
    }
    
    // Calculate the interpolation factor
    const factor = (value - lowerStop) / (upperStop - lowerStop);
    
    // Interpolate between the two colors
    const lowerColor = colors[lowerStop];
    const upperColor = colors[upperStop];
    
    const r = Math.round(lowerColor.r + (upperColor.r - lowerColor.r) * factor);
    const g = Math.round(lowerColor.g + (upperColor.g - lowerColor.g) * factor);
    const b = Math.round(lowerColor.b + (upperColor.b - lowerColor.b) * factor);
    
    return `rgb(${r}, ${g}, ${b})`;
}

function createMetricsDisplay() {
    const metricsContainer = document.createElement('div');
    metricsContainer.className = 'metrics-container';

    // Create mood metric display
    const moodDisplay = document.createElement('div');
    moodDisplay.className = 'metric-display';
    
    const moodLabel = document.createElement('div');
    moodLabel.className = 'metric-label';
    moodLabel.textContent = 'Global Mood';
    
    // Create mood status circle with eyes
    const moodStatusCircle = document.createElement('div');
    moodStatusCircle.className = 'mood-status-circle';
    
    // Add eyes
    const eyesContainer = document.createElement('div');
    eyesContainer.className = 'mood-eyes';
    const leftEye = document.createElement('div');
    leftEye.className = 'mood-eye';
    const rightEye = document.createElement('div');
    rightEye.className = 'mood-eye';
    eyesContainer.appendChild(leftEye);
    eyesContainer.appendChild(rightEye);
    moodStatusCircle.appendChild(eyesContainer);
    
    moodLabel.appendChild(moodStatusCircle);
    
    const moodValue = document.createElement('div');
    moodValue.className = 'metric-value';
    moodValue.textContent = `${Math.round(gameState.globalMood * 100)}%`;
    
    const moodBar = document.createElement('div');
    moodBar.className = 'metric-bar';
    const moodFill = document.createElement('div');
    moodFill.className = 'metric-fill';
    moodBar.appendChild(moodFill);
    
    // Set initial mood color using gradient
    const moodColor = calculateMoodColor(gameState.globalMood);
    moodFill.style.backgroundColor = moodColor;
    moodStatusCircle.style.backgroundColor = moodColor;
    
    // Set initial expression
    if (gameState.globalMood === 1) {
        moodStatusCircle.classList.add('happy');
    } else if (gameState.globalMood === 0.5) {
        moodStatusCircle.classList.add('neutral');
    } else if (gameState.globalMood === 0) {
        moodStatusCircle.classList.add('angry');
    } else {
        moodStatusCircle.classList.add(gameState.globalMood > 0.5 ? 'happy' : 'angry');
    }
    
    moodFill.style.width = `${gameState.globalMood * 100}%`;
    
    moodDisplay.appendChild(moodLabel);
    moodDisplay.appendChild(moodValue);
    moodDisplay.appendChild(moodBar);
    
    const engagementDisplay = document.createElement('div');
    engagementDisplay.className = 'metric-display';
    
    const engagementLabel = document.createElement('div');
    engagementLabel.className = 'metric-label';
    engagementLabel.textContent = 'Global Engagement';
    
    // Add phone-like rectangle as a separate element
    const phoneRectangle = document.createElement('div');
    phoneRectangle.className = 'phone-rectangle';
    // Set initial magenta beam opacity based on engagement
    phoneRectangle.style.setProperty('--beam-opacity', gameState.globalEngagement);
    engagementDisplay.appendChild(phoneRectangle);  // Add to display instead of label
    
    const engagementValue = document.createElement('div');
    engagementValue.className = 'metric-value';
    engagementValue.textContent = `${Math.round(gameState.globalEngagement * 100)}%`;
    
    const engagementBar = document.createElement('div');
    engagementBar.className = 'metric-bar';
    const engagementFill = document.createElement('div');
    engagementFill.className = 'metric-fill';
    
    // Set initial engagement color using gradient
    const engagementColor = calculateEngagementColor(gameState.globalEngagement);
    engagementFill.style.backgroundColor = engagementColor;
    engagementFill.style.width = `${gameState.globalEngagement * 100}%`;
    
    engagementBar.appendChild(engagementFill);
    engagementDisplay.appendChild(engagementLabel);
    engagementDisplay.appendChild(engagementValue);
    engagementDisplay.appendChild(engagementBar);
    
    metricsContainer.appendChild(moodDisplay);
    metricsContainer.appendChild(engagementDisplay);
    
    return metricsContainer;
}

function updateMetricsDisplay() {
    const metricsDisplay = document.querySelector('.metrics-container');
    if (metricsDisplay) {
        const moodFill = metricsDisplay.querySelector('.metric-display:first-child .metric-fill');
        const moodValue = metricsDisplay.querySelector('.metric-display:first-child .metric-value');
        const engagementFill = metricsDisplay.querySelector('.metric-display:last-child .metric-fill');
        const engagementValue = metricsDisplay.querySelector('.metric-display:last-child .metric-value');
        const statusCircle = metricsDisplay.querySelector('.mood-status-circle');
        
        // Update mood with gradient color
        const moodColor = calculateMoodColor(gameState.globalMood);
        moodFill.style.width = `${gameState.globalMood * 100}%`;
        moodFill.style.backgroundColor = moodColor;
        moodValue.textContent = `${Math.round(gameState.globalMood * 100)}%`;
        
        // Update mood status circle
        if (statusCircle) {
            statusCircle.style.backgroundColor = moodColor;
            // Remove any inline styles from eyes to ensure they stay white
            const eyes = statusCircle.querySelectorAll('.mood-eye');
            eyes.forEach(eye => {
                eye.style.backgroundColor = '';
                // Calculate eye expression based on exact mood
                const mood = gameState.globalMood;
                
                // Calculate how far we are from neutral (0.5)
                const distanceFromNeutral = Math.abs(mood - 0.5);
                // Calculate the transition factor (0 to 1) based on distance from neutral
                const transitionFactor = Math.min(distanceFromNeutral * 4, 1); // Full transition by 0.25 away from neutral
                
                // Scale increases gradually from 1 to 0.7 as we move away from neutral
                const scale = 1 - (transitionFactor * 0.3);
                
                // Border radius transitions gradually from 50% to 100% as we move away from neutral
                const borderRadius = 50 + (transitionFactor * 50);
                
                // Calculate rotation based on mood
                // At 0.5: 0 degrees (neutral)
                // At 0.0: 180 degrees (angry)
                // At 1.0: 0 degrees (happy)
                const rotation = mood < 0.5 ? (0.5 - mood) * 360 : 0;
                
                if (mood === 0.5) {
                    // Neutral at exactly 50%
                    eye.style.transform = 'none';
                    eye.style.borderRadius = '50%';
                } else if (mood > 0.5) {
                    // Happy: top rounded
                    eye.style.transform = `scaleY(${scale})`;
                    eye.style.borderRadius = `${borderRadius}% ${borderRadius}% 0 0`;
                    eye.style.borderBottomLeftRadius = '0';
                    eye.style.borderBottomRightRadius = '0';
                } else {
                    // Angry: bottom rounded (no rotation needed)
                    eye.style.transform = `scaleY(${scale})`;
                    eye.style.borderRadius = `0 0 ${borderRadius}% ${borderRadius}%`;
                    eye.style.borderTopLeftRadius = '0';
                    eye.style.borderTopRightRadius = '0';
                }
            });

            // Update eye container position
            const eyesContainer = statusCircle.querySelector('.mood-eyes');
            if (eyesContainer) {
                const mood = gameState.globalMood;
                if (mood === 0.5) {
                    eyesContainer.style.transform = 'none';
                } else if (mood > 0.5) {
                    // Move up more as mood increases
                    const translateY = -2 * (mood - 0.5) * 2; // Maps 0.5-1.0 to 0 to -2
                    eyesContainer.style.transform = `translateY(${translateY}px)`;
                } else {
                    // Move down more as mood decreases
                    const translateY = 2 * (0.5 - mood) * 2; // Maps 0.5-0.0 to 0 to 2
                    eyesContainer.style.transform = `translateY(${translateY}px)`;
                }
            }
        }
        
        // Update engagement with gradient color
        const engagementColor = calculateEngagementColor(gameState.globalEngagement);
        engagementFill.style.width = `${gameState.globalEngagement * 100}%`;
        engagementFill.style.backgroundColor = engagementColor;
        engagementValue.textContent = `${Math.round(gameState.globalEngagement * 100)}%`;
        
        // Set magenta beam opacity based on engagement
        const phoneRectangle = metricsDisplay.querySelector('.phone-rectangle');
        if (phoneRectangle) {
            phoneRectangle.style.setProperty('--beam-opacity', gameState.globalEngagement);
        }
        
        // Update debug panel values if they exist
        const moodDebugValue = document.querySelector('.debug-control:first-child .debug-value');
        const engagementDebugValue = document.querySelector('.debug-control:last-child .debug-value');
        if (moodDebugValue) {
            moodDebugValue.textContent = `${Math.round(gameState.globalMood * 100)}%`;
            document.querySelector('.debug-control:first-child input').value = gameState.globalMood * 100;
        }
        if (engagementDebugValue) {
            engagementDebugValue.textContent = `${Math.round(gameState.globalEngagement * 100)}%`;
            document.querySelector('.debug-control:last-child input').value = gameState.globalEngagement * 100;
        }
    }
}

// Update background click handler
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('content').addEventListener('click', (event) => {
        if (event.target.id === 'content' || event.target.closest('.profile-container')) {
            console.log('[Background Click] Clicked on background area');
            const selectedCard = document.querySelector('.post-card.selected');
            if (selectedCard) {
                const postTitle = selectedCard.querySelector('.post-title').textContent;
                console.log(`[Background Click] Starting deselection for post: "${postTitle}"`);
                gameState.selectedPost = null;
                selectedCard.classList.remove('selected');  // This will handle z-index via CSS
                
                // Animate and remove checkmark
                if (activeCheckmark) {
                    animateCheckmarkOut(activeCheckmark, postTitle).then(() => {
                        activeCheckmark = null;
                    });
                }
            } else {
                console.log('[Background Click] No card was selected, nothing to deselect');
            }
        }
    });
});

function handlePostClick(event, post) {
    if (gameState.isAnimating) {
        return; // Prevent selection during animation
    }
    console.log(`[Card Click] Post clicked: "${post.title}" (ID: ${post.id})`);
    
    // Prevent click if clicking the checkmark
    if (event.target.closest('.approval-checkmark')) {
        console.log('[Card Click] Click prevented - clicked on checkmark');
        return;
    }
    
    // Stop event propagation to prevent background click handler from firing
    event.stopPropagation();
    
    // Store the clicked card element
    const clickedCard = event.currentTarget;
    
    // Deselect if clicking the same post
    if (gameState.selectedPost === post) {
        console.log(`[Card Click] Deselecting currently selected post: "${post.title}"`);
        gameState.selectedPost = null;
        const selectedCard = document.querySelector('.post-card.selected');
        if (selectedCard) {
            console.log(`[Card Click] Starting deselection for post: "${post.title}"`);
            selectedCard.classList.remove('selected');
            
            // Animate and remove checkmark
            if (activeCheckmark) {
                animateCheckmarkOut(activeCheckmark, post.title).then(() => {
                    console.log(`[Card Click] Checkmark removed for post: "${post.title}"`);
                    activeCheckmark = null;
                });
            }
        }
        return;
    }
    
    // If there's a currently selected card, handle the switch
    const currentSelectedCard = document.querySelector('.post-card.selected');
    if (currentSelectedCard) {
        const currentPostTitle = currentSelectedCard.querySelector('.post-title').textContent;
        console.log(`[Card Click] Switching selection from "${currentPostTitle}" to "${post.title}"`);
        
        // Start deselection animation of old card
        currentSelectedCard.classList.remove('selected');
        
        // Start selection of new card immediately
        gameState.selectedPost = post;
        clickedCard.classList.add('selected');  // This will set the z-index via CSS
        
        // Create new checkmark and position it
        const newCheckmark = createApprovalCheckmark();
        moveCheckmarkToCard(clickedCard, newCheckmark);
        
        // Animate out old checkmark
        if (activeCheckmark) {
            animateCheckmarkOut(activeCheckmark, currentPostTitle).then(() => {
                console.log(`[Card Click] Previous checkmark removed for post: "${currentPostTitle}"`);
                activeCheckmark = newCheckmark;
            });
        } else {
            activeCheckmark = newCheckmark;
        }
    } else {
        console.log(`[Card Click] No card currently selected, selecting: "${post.title}"`);
        selectNewCard(post, clickedCard);
    }
}

function selectNewCard(post, cardToSelect) {
    if (!cardToSelect) {
        console.error('[Selection] Error: Card element is null');
        return;
    }
    
    console.log(`[Selection] Starting selection of post: "${post.title}"`);
    gameState.selectedPost = post;
    
    // Add selected class which will handle z-index via CSS
    cardToSelect.classList.add('selected');
    
    // Create and position new checkmark
    console.log(`[Selection] Creating new checkmark for post: "${post.title}"`);
    if (activeCheckmark) {
        console.log(`[Selection] Removing existing checkmark before creating new one for post: "${post.title}"`);
        removeCheckmark(activeCheckmark);
    }
    activeCheckmark = createApprovalCheckmark();
    moveCheckmarkToCard(cardToSelect, activeCheckmark);
}

function handleApprovalClick(post) {
    gameState.approvePost(post);
}

function createProfileView(user) {
    // Get random posts from all posts, regardless of author
    const randomPosts = getRandomPosts();
    
    const profileContainer = createElement('div', 'profile-container');
    
    // Add metrics display at the top
    const metricsDisplay = createMetricsDisplay();
    profileContainer.appendChild(metricsDisplay);
    
    // Profile Header
    const profileHeader = createElement('div', 'profile-header');
    
    const avatar = createElement('div', 'profile-avatar');
    avatar.textContent = user.avatar;
    
    const profileInfo = createElement('div', 'profile-info');
    
    const name = createElement('h1', 'profile-name', user.name);
    
    const stats = createElement('div', 'profile-stats');
    stats.innerHTML = `
        <div class="stat-item">
            <span class="stat-value">${Math.floor(Math.random() * 46) + 5}</span>
            <span class="stat-label">Posts</span>
        </div>
        <div class="stat-item">
            <span class="stat-value">${Math.floor(Math.random() * 1000)}</span>
            <span class="stat-label">Followers</span>
        </div>
        <div class="stat-item">
            <span class="stat-value">${Math.floor(Math.random() * 500)}</span>
            <span class="stat-label">Following</span>
        </div>
    `;
    
    const mood = createElement('div', 'profile-mood', `Current Mood: ${user.mood}`);
    
    const interests = createElement('div', 'profile-interests');
    user.interests.forEach(interest => {
        const tag = createElement('span', 'interest-tag', interest);
        interests.appendChild(tag);
    });
    
    profileInfo.appendChild(name);
    profileInfo.appendChild(stats);
    profileInfo.appendChild(mood);
    profileInfo.appendChild(interests);
    
    profileHeader.appendChild(avatar);
    profileHeader.appendChild(profileInfo);
    
    // Posts Grid
    const postsGrid = createElement('div', 'posts-grid');
    
    randomPosts.forEach(post => {
        const postCard = createElement('div', 'post-card');
        postCard.addEventListener('click', (e) => handlePostClick(e, post));
        
        const postHeader = createElement('div', 'post-header');
        // Add author info to the post header
        const postAuthor = createElement('div', 'post-author', `${post.author.avatar} ${post.author.name}`);
        const postTitle = createElement('div', 'post-title', post.title);
        postHeader.appendChild(postAuthor);
        postHeader.appendChild(postTitle);
        
        const postContent = createElement('div', 'post-content', post.content);
        
        const postMetrics = createElement('div', 'post-metrics');
        postMetrics.innerHTML = `
            <span>Mood Impact: ${Math.round(post.impact.mood * 100)}%</span>
            <span>Engagement: ${Math.round(post.impact.engagement * 100)}%</span>
        `;
        
        postCard.appendChild(postHeader);
        postCard.appendChild(postContent);
        postCard.appendChild(postMetrics);
        
        postsGrid.appendChild(postCard);
    });
    
    // Create the checkmark if it doesn't exist
    createApprovalCheckmark();
    
    profileContainer.appendChild(profileHeader);
    profileContainer.appendChild(postsGrid);
    
    return profileContainer;
}

// Add debug panel functionality
function createDebugPanel() {
    // Create debug toggle button
    const debugToggle = document.createElement('button');
    debugToggle.className = 'debug-toggle';
    debugToggle.textContent = 'Debug';
    document.body.appendChild(debugToggle);

    // Create debug panel
    const debugPanel = document.createElement('div');
    debugPanel.className = 'debug-panel';
    debugPanel.style.display = 'none';
    
    // Add title
    const title = document.createElement('h3');
    title.textContent = 'Debug Controls';
    debugPanel.appendChild(title);
    
    // Create mood control
    const moodControl = document.createElement('div');
    moodControl.className = 'debug-control';
    moodControl.innerHTML = `
        <label>Mood: <span class="debug-value">${Math.round(gameState.globalMood * 100)}%</span></label>
        <input type="range" min="0" max="100" value="${gameState.globalMood * 100}" step="1">
    `;
    
    // Create engagement control
    const engagementControl = document.createElement('div');
    engagementControl.className = 'debug-control';
    engagementControl.innerHTML = `
        <label>Engagement: <span class="debug-value">${Math.round(gameState.globalEngagement * 100)}%</span></label>
        <input type="range" min="0" max="100" value="${gameState.globalEngagement * 100}" step="1">
    `;
    
    debugPanel.appendChild(moodControl);
    debugPanel.appendChild(engagementControl);
    document.body.appendChild(debugPanel);
    
    // Add event listeners
    debugToggle.addEventListener('click', () => {
        const isVisible = debugPanel.style.display !== 'none';
        debugPanel.style.display = isVisible ? 'none' : 'block';
        debugToggle.classList.toggle('active');
    });
    
    // Handle mood slider changes
    const moodSlider = moodControl.querySelector('input');
    const moodValue = moodControl.querySelector('.debug-value');
    moodSlider.addEventListener('input', (e) => {
        const value = e.target.value / 100;
        gameState.globalMood = value;
        moodValue.textContent = `${e.target.value}%`;
        updateMetricsDisplay();
    });
    
    // Handle engagement slider changes
    const engagementSlider = engagementControl.querySelector('input');
    const engagementValue = engagementControl.querySelector('.debug-value');
    engagementSlider.addEventListener('input', (e) => {
        const value = e.target.value / 100;
        gameState.globalEngagement = value;
        engagementValue.textContent = `${e.target.value}%`;
        updateMetricsDisplay();
    });
}

// Update the initGame function to create the debug panel
function initGame() {
    const startScreen = createElement('div', 'start-screen');
    const title = createElement('h1', 'game-title', 'You Are The Algorithm');
    const startButton = createElement('button', 'start-button', 'Begin');
    
    startButton.addEventListener('click', () => {
        startGame();
    });
    
    startScreen.appendChild(title);
    startScreen.appendChild(startButton);
    showContent(startScreen);
    
    // Create debug panel
    createDebugPanel();
}

// Start the game
async function startGame() {
    gameState.currentStep = 0;
    gameState.userChoices = [];
    gameState.currentUser = getRandomUser();
    
    const profileView = createProfileView(gameState.currentUser);
    showContent(profileView);
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', initGame); 
document.addEventListener('DOMContentLoaded', initGame); 

// Update animateMetric function
function animateMetric(fillElement, valueElement, startValue, endValue, type) {
    const duration = 1500;
    const startTime = performance.now();
    const startPercent = startValue * 100;
    const endPercent = endValue * 100;
    
    function updateMetric(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentPercent = startPercent + (endPercent - startPercent) * easeProgress;
        const currentValue = startValue + (endValue - startValue) * easeProgress;
        
        fillElement.style.width = `${currentPercent}%`;
        
        if (type === 'mood') {
            const color = calculateMoodColor(currentValue);
            fillElement.style.backgroundColor = color;
            
            // Update status circle color and expression
            const statusCircle = document.querySelector('.mood-status-circle');
            if (statusCircle) {
                statusCircle.style.backgroundColor = color;
                statusCircle.classList.remove('happy', 'neutral', 'angry');
                if (currentValue === 1) {
                    statusCircle.classList.add('happy');
                } else if (currentValue === 0.5) {
                    statusCircle.classList.add('neutral');
                } else if (currentValue === 0) {
                    statusCircle.classList.add('angry');
                } else {
                    statusCircle.classList.add(currentValue > 0.5 ? 'happy' : 'angry');
                }
                // Update eyes expression
                const eyes = statusCircle.querySelectorAll('.mood-eye');
                eyes.forEach(eye => {
                    eye.style.backgroundColor = '';
                    // Calculate eye expression based on exact mood
                    const mood = currentValue;
                    const distanceFromNeutral = Math.abs(mood - 0.5);
                    const transitionFactor = Math.min(distanceFromNeutral * 4, 1);
                    const scale = 1 - (transitionFactor * 0.3);
                    const borderRadius = 50 + (transitionFactor * 50);
                    if (mood === 0.5) {
                        eye.style.transform = 'none';
                        eye.style.borderRadius = '50%';
                    } else if (mood > 0.5) {
                        eye.style.transform = `scaleY(${scale})`;
                        eye.style.borderRadius = `${borderRadius}% ${borderRadius}% 0 0`;
                        eye.style.borderBottomLeftRadius = '0';
                        eye.style.borderBottomRightRadius = '0';
                    } else {
                        eye.style.transform = `scaleY(${scale})`;
                        eye.style.borderRadius = `0 0 ${borderRadius}% ${borderRadius}%`;
                        eye.style.borderTopLeftRadius = '0';
                        eye.style.borderTopRightRadius = '0';
                    }
                });
                // Update eye container position
                const eyesContainer = statusCircle.querySelector('.mood-eyes');
                if (eyesContainer) {
                    const mood = currentValue;
                    if (mood === 0.5) {
                        eyesContainer.style.transform = 'none';
                    } else if (mood > 0.5) {
                        const translateY = -2 * (mood - 0.5) * 2;
                        eyesContainer.style.transform = `translateY(${translateY}px)`;
                    } else {
                        const translateY = 2 * (0.5 - mood) * 2;
                        eyesContainer.style.transform = `translateY(${translateY}px)`;
                    }
                }
            }
        } else {
            // Use gradient for engagement
            const color = calculateEngagementColor(currentValue);
            fillElement.style.backgroundColor = color;
            // Update magenta beam opacity
            const phoneRectangle = document.querySelector('.phone-rectangle');
            if (phoneRectangle) {
                phoneRectangle.style.setProperty('--beam-opacity', currentValue);
            }
        }
        
        valueElement.textContent = `${Math.round(currentValue * 100)}%`;
        
        if (progress < 1) {
            requestAnimationFrame(updateMetric);
        }
    }
    
    requestAnimationFrame(updateMetric);
} 