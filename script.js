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
function generateUsers(count) {
    const users = [];
    for (let i = 0; i < count; i++) {
        users.push(generateRandomUser());
    }
    return users;
}

function getRandomUser() {
    return generateRandomUser();
}

function getRandomPosts(min = 3, max = 5) {
    const numPosts = Math.floor(Math.random() * (max - min + 1)) + min;
    return [...gameState.posts].sort(() => Math.random() - 0.5).slice(0, numPosts);
}

// Game state management
const gameState = {
    currentStep: 0,
    userChoices: [],
    isAnimating: false,
    currentUser: null,
    selectedPost: null,
    globalMood: 0.5,    // 0 to 1 scale, 0 being very angry, 1 being very happy
    globalEngagement: 0.5,  // 0 to 1 scale, 0 being low engagement, 1 being viral
    users: [],          // Store users in gameState
    posts: [],          // Store posts in gameState
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
        // Store old values for animation
        const oldMood = this.globalMood;
        const oldEngagement = this.globalEngagement;
        
        // Update metrics based on the approved post
        this.globalMood = (this.globalMood * 0.7) + (post.impact.mood * 0.3);
        this.globalEngagement = (this.globalEngagement * 0.7) + (post.impact.engagement * 0.3);
        
        // Ensure values stay between 0 and 1
        this.globalMood = Math.max(0, Math.min(1, this.globalMood));
        this.globalEngagement = Math.max(0, Math.min(1, this.globalEngagement));
        
        // Check for ending
        const ending = checkForEnding(this.globalMood, this.globalEngagement);
        
        // Scroll to top smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        this.isAnimating = true;
        
        this.selectedPost = null;
        const selectedCard = document.querySelector('.post-card.selected');
        if (selectedCard) {
            selectedCard.classList.remove('selected');
        }
        if (activeCheckmark) {
            removeCheckmark(activeCheckmark);
            activeCheckmark = null;
        }
        
        setTimeout(() => {
            const metricsDisplay = document.querySelector('.metrics-container');
            if (metricsDisplay) {
                const moodFill = metricsDisplay.querySelector('.metric-display:first-child .metric-fill');
                const moodValue = metricsDisplay.querySelector('.metric-display:first-child .metric-value');
                const engagementFill = metricsDisplay.querySelector('.metric-display:last-child .metric-fill');
                const engagementValue = metricsDisplay.querySelector('.metric-display:last-child .metric-value');
                
                metricsDisplay.classList.add('metrics-updating');
                
                const isIncreasing = (post.impact.mood > oldMood) || (post.impact.engagement > oldEngagement);
                metricsDisplay.classList.add(isIncreasing ? 'metrics-increasing' : 'metrics-decreasing');
                
                animateMetric(moodFill, moodValue, oldMood, this.globalMood, 'mood');
                animateMetric(engagementFill, engagementValue, oldEngagement, this.globalEngagement, 'engagement');
                
                setTimeout(() => {
                    metricsDisplay.classList.remove('metrics-updating', 'metrics-increasing', 'metrics-decreasing');
                    this.isAnimating = false;
                    
                    if (ending) {
                        // Show ending after metrics finish updating
                        const endingScreen = createEndingScreen(ending);
                        showContent(endingScreen);
                    } else {
                        this.currentUser = getRandomUser();
                        const profileView = createProfileView(this.currentUser);
                        showContent(profileView);
                    }
                }, 2000);
            } else {
                this.isAnimating = false;
                if (ending) {
                    const endingScreen = createEndingScreen(ending);
                    showContent(endingScreen);
                } else {
                    this.currentUser = getRandomUser();
                    const profileView = createProfileView(this.currentUser);
                    showContent(profileView);
                }
            }
        }, 500);
    },
    initialize: function() {
        // Generate initial users
        this.users = generateUsers(8);
        console.log('Initial users generated:');
        this.users.forEach(user => console.log(`- ${user.name} (Mood: ${user.mood})`));
        
        // Create post templates without authors
        const postTemplates = [
            {
                id: 1,
                title: "BREAKING: AI Dog Learns to Bark in JavaScript",
                content: "Scientists are baffled as this coding canine debugs its own barks. 'woof.log()' is now a thing.",
                categories: ["tech", "coding", "ai", "javascript"],
                impact: {
                    mood: 0.7,
                    engagement: 0.95
                }
            },
            {
                id: 2,
                title: "SHOCKING: Local Cat Runs for Mayor, Promises Unlimited Naps",
                content: "Campaign slogan: 'A cat nap in every home, and treats for all!'",
                categories: ["politics", "animals", "comedy"],
                impact: {
                    mood: 0.9,
                    engagement: 0.6
                }
            },
            {
                id: 3,
                title: "VIRAL: Man Teaches Goldfish to Play Chess, Wins Tournament",
                content: "The fish's opening move? Always 'e4'. 'It's the most liquid move,' says the champion.",
                categories: ["sports", "gaming", "animals"],
                impact: {
                    mood: 0.85,
                    engagement: 0.7
                }
            },
            {
                id: 4,
                title: "EXCLUSIVE: Fashion Designer Creates Clothes Made Entirely of WiFi",
                content: "The collection is invisible but always in style. 'It's like wearing the internet,' says the designer.",
                categories: ["fashion", "tech", "startups"],
                impact: {
                    mood: 0.2,
                    engagement: 0.95
                }
            },
            {
                id: 5,
                title: "BREAKING: Scientists Discover That Plants Have Been Photosynthesizing to Music",
                content: "Study shows plants grow 50% faster when listening to heavy metal. 'They're headbanging in photosynthesis,' says lead researcher.",
                categories: ["science", "music", "nature"],
                impact: {
                    mood: 0.8,
                    engagement: 0.7
                }
            },
            {
                id: 6,
                title: "DRAMA: Local Squirrel Accused of Running Underground Nut Trading Ring",
                content: "Authorities found a stash of premium acorns worth thousands. The mastermind remains at large.",
                categories: ["animals", "comedy", "nature"],
                impact: {
                    mood: 0.15,
                    engagement: 0.85
                }
            },
            {
                id: 7,
                title: "MIND-BLOWING: AI Creates Meme So Funny It Crashes the Internet",
                content: "The meme was so powerful, servers worldwide needed a nap. 'We've created a monster,' says tech expert.",
                categories: ["tech", "ai", "memes", "comedy"],
                impact: {
                    mood: 0.1,
                    engagement: 0.95
                }
            },
            {
                id: 8,
                title: "EXCLUSIVE: Time Traveler Accidentally Posts Selfie from 1923",
                content: "The photo shows a smartphone in the background of a historical event. 'Oops,' says the time traveler.",
                categories: ["tech", "history", "social media"],
                impact: {
                    mood: 0.2,
                    engagement: 0.9
                }
            },
            {
                id: 9,
                title: "SHOCKING: Local Pizza Place Discovers New Mathematical Constant",
                content: "The 'Pizza Pi' is exactly 3.14159... slices per person. Mathematicians are having a slice of humble pie.",
                categories: ["food", "science", "comedy"],
                impact: {
                    mood: 0.9,
                    engagement: 0.6
                }
            },
            {
                id: 10,
                title: "BREAKING: Cloud Computing Takes Literal Meaning as Server Farm Floats Away",
                content: "Tech companies are now using actual clouds to store data. 'The sky's the limit,' says cloud architect.",
                categories: ["tech", "startups", "comedy"],
                impact: {
                    mood: 0.1,
                    engagement: 0.9
                }
            }
        ];
        
        // Assign random authors from our actual generated users to each post
        this.posts = postTemplates.map((template, index) => ({
            ...template,
            author: this.users[Math.floor(Math.random() * this.users.length)]
        }));
        
        // Log post assignments for debugging
        console.log('Post authors assigned:');
        this.posts.forEach(post => console.log(`"${post.title}" - Author: ${post.author.name}`));
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
    checkmark.classList.add('visible');
    requestAnimationFrame(() => {
        checkmark.style.opacity = '1';
        checkmark.style.pointerEvents = 'auto';
        checkmark.classList.add('slided-out');
    });
}

function animateCheckmarkOut(checkmark) {
    // First animate the checkmark back
    checkmark.classList.remove('slided-out');
    checkmark.style.opacity = '0';
    checkmark.style.pointerEvents = 'none';
    
    return new Promise(resolve => {
        // Wait for the animation to complete before removing
        setTimeout(() => {
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

function getUserPosts(user) {
    return gameState.posts.filter(post => post.author === user);
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
            
            // Update metrics container background color during animation
            const metricsDisplay = document.querySelector('.metrics-container');
            if (metricsDisplay) {
                // Set background color based on whether metrics are increasing or decreasing
                const isIncreasing = endValue > startValue;
                metricsDisplay.style.backgroundColor = isIncreasing ? '#4CAF5040' : '#F4433640';
            }
            
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
            statusCircle.classList.remove('happy', 'neutral', 'angry');
            if (gameState.globalMood === 1) {
                statusCircle.classList.add('happy');
            } else if (gameState.globalMood === 0.5) {
                statusCircle.classList.add('neutral');
            } else if (gameState.globalMood === 0) {
                statusCircle.classList.add('angry');
            } else {
                statusCircle.classList.add(gameState.globalMood > 0.5 ? 'happy' : 'angry');
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
    }
}

// Update background click handler
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('content').addEventListener('click', (event) => {
        if (event.target.id === 'content' || event.target.closest('.profile-container')) {
            const selectedCard = document.querySelector('.post-card.selected');
            if (selectedCard) {
                gameState.selectedPost = null;
                selectedCard.classList.remove('selected');  // This will handle z-index via CSS
                
                // Animate and remove checkmark
                if (activeCheckmark) {
                    animateCheckmarkOut(activeCheckmark).then(() => {
                        activeCheckmark = null;
                    });
                }
            }
        }
    });
});

function handlePostClick(event, post) {
    if (gameState.isAnimating) {
        return; // Prevent selection during animation
    }
    
    // Prevent click if clicking the checkmark
    if (event.target.closest('.approval-checkmark')) {
        return;
    }
    
    // Stop event propagation to prevent background click handler from firing
    event.stopPropagation();
    
    // Store the clicked card element
    const clickedCard = event.currentTarget;
    
    // Deselect if clicking the same post
    if (gameState.selectedPost === post) {
        gameState.selectedPost = null;
        const selectedCard = document.querySelector('.post-card.selected');
        if (selectedCard) {
            selectedCard.classList.remove('selected');
            
            // Animate and remove checkmark
            if (activeCheckmark) {
                animateCheckmarkOut(activeCheckmark).then(() => {
                    activeCheckmark = null;
                });
            }
        }
        return;
    }
    
    // If there's a currently selected card, handle the switch
    const currentSelectedCard = document.querySelector('.post-card.selected');
    if (currentSelectedCard) {
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
            animateCheckmarkOut(activeCheckmark).then(() => {
                activeCheckmark = newCheckmark;
            });
        } else {
            activeCheckmark = newCheckmark;
        }
    } else {
        selectNewCard(post, clickedCard);
    }
}

function selectNewCard(post, cardToSelect) {
    if (!cardToSelect) {
        return;
    }
    
    gameState.selectedPost = post;
    
    // Add selected class which will handle z-index via CSS
    cardToSelect.classList.add('selected');
    
    // Create and position new checkmark
    if (activeCheckmark) {
        removeCheckmark(activeCheckmark);
    }
    activeCheckmark = createApprovalCheckmark();
    moveCheckmarkToCard(cardToSelect, activeCheckmark);
}

function handleApprovalClick(post) {
    gameState.approvePost(post);
}

function createProfileView(user) {
    // Get posts that are relevant to this user's interests
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
    
    // Calculate stats based on user's interests
    const relevantPosts = gameState.posts.filter(post => {
        // Check if the post has categories and if any match user interests
        return post.categories && post.categories.some(category => 
            user.interests.some(interest => 
                category.toLowerCase().includes(interest.toLowerCase())
            )
        );
    });
    
    // Calculate post count - minimum of 3, maximum based on relevant posts
    const postCount = Math.max(3, Math.min(relevantPosts.length, Math.floor(Math.random() * 46) + 5));
    
    const stats = createElement('div', 'profile-stats');
    stats.innerHTML = `
        <div class="stat-item">
            <span class="stat-value">${postCount}</span>
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
        
        // Add categories as tags
        const postCategories = createElement('div', 'post-categories');
        post.categories.forEach(category => {
            const categoryTag = createElement('span', 'category-tag', category);
            // Highlight matching categories
            if (user.interests.some(interest => category.toLowerCase().includes(interest.toLowerCase()))) {
                categoryTag.classList.add('matching-category');
            }
            postCategories.appendChild(categoryTag);
        });
        
        const postMetrics = createElement('div', 'post-metrics');
        postMetrics.innerHTML = `
            <span>Mood Impact: ${Math.round(post.impact.mood * 100)}%</span>
            <span>Engagement: ${Math.round(post.impact.engagement * 100)}%</span>
        `;
        
        postCard.appendChild(postHeader);
        postCard.appendChild(postContent);
        postCard.appendChild(postCategories);
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

// Start the game
function startGame() {
    gameState.currentStep = 0;
    gameState.userChoices = [];
    gameState.currentUser = getRandomUser();
    
    const profileView = createProfileView(gameState.currentUser);
    showContent(profileView);
}

// Initialize the game
function initGame() {
    gameState.initialize(); // Initialize users and posts
    
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

// Remove any existing event listeners (if any) and add our new one
document.removeEventListener('DOMContentLoaded', initGame);
document.addEventListener('DOMContentLoaded', initGame);

// Add endings data
const gameEndings = {
    radicalization: {
        title: "You Unleashed the Rage Machine",
        message: "You accidentally radicalized the entire planet.\nPeople argued with toasters. Dogs started podcasting.\nBut the engagement? Unholy levels.",
        emojis: "🧨🔥📢💬",
        condition: (mood, engagement) => mood < 0.2 && engagement > 0.8
    },
    techOverlord: {
        title: "You Bought the Internet",
        message: "You gamed the system. Monetized the madness.\nYou now own three metaverses, a flying yacht, and everyone's browser history.\nYour net worth is just listed as \"yes.\"",
        emojis: "🚀💰🖥️👁️",
        condition: (mood, engagement) => engagement > 0.9
    },
    wholesome: {
        title: "The Internet We Deserved",
        message: "You created a peaceful, curious society.\nPeople posted about frogs, sourdough, and constellations.\nNo outrage. No clickbait. Just vibes.",
        emojis: "🐸🥖🧘🌞",
        condition: (mood, engagement) => mood > 0.8 && engagement >= 0.5 && engagement <= 0.7
    },
    existential: {
        title: "We Broke Our Brains",
        message: "Dopamine loops overloaded.\nNo one could finish a sentence without refreshing something.\nHumanity merged with the Feed. No regrets.",
        emojis: "📱🔁🧠⚠️",
        condition: (mood, engagement) => mood < 0.3 && engagement > 0.85
    }
};

// Add function to check for endings
function checkForEnding(mood, engagement) {
    for (const [key, ending] of Object.entries(gameEndings)) {
        if (ending.condition(mood, engagement)) {
            return ending;
        }
    }
    return null;
}

// Add function to create ending screen
function createEndingScreen(ending) {
    const endingContainer = createElement('div', 'ending-screen');
    endingContainer.style.cssText = `
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 2rem;
        max-width: 600px;
        margin: 2rem auto;
        background: #fff;
        border-radius: 20px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;
    
    const title = createElement('h1', 'ending-title', ending.title);
    title.style.cssText = `
        font-size: 2.5rem;
        margin-bottom: 2rem;
        color: #333;
        font-weight: bold;
    `;
    
    const message = createElement('div', 'ending-message');
    message.style.cssText = `
        font-size: 1.2rem;
        line-height: 1.6;
        margin-bottom: 2rem;
        color: #666;
    `;
    ending.message.split('\n').forEach(line => {
        const p = createElement('p', '', line);
        p.style.marginBottom = '1rem';
        message.appendChild(p);
    });
    
    const emojis = createElement('div', 'ending-emojis', ending.emojis);
    emojis.style.cssText = `
        font-size: 3rem;
        margin: 2rem 0;
        letter-spacing: 0.5rem;
    `;
    
    const retryButton = createElement('button', 'retry-button', 'Try Again 🔄');
    retryButton.style.cssText = `
        font-size: 1.2rem;
        padding: 1rem 2rem;
        background: #4CAF50;
        color: white;
        border: none;
        border-radius: 30px;
        cursor: pointer;
        transition: transform 0.2s, background-color 0.2s;
        margin-top: 2rem;
    `;
    retryButton.addEventListener('mouseover', () => {
        retryButton.style.transform = 'scale(1.05)';
        retryButton.style.background = '#45a049';
    });
    retryButton.addEventListener('mouseout', () => {
        retryButton.style.transform = 'scale(1)';
        retryButton.style.background = '#4CAF50';
    });
    retryButton.addEventListener('click', () => {
        location.reload();
    });
    
    endingContainer.appendChild(title);
    endingContainer.appendChild(message);
    endingContainer.appendChild(emojis);
    endingContainer.appendChild(retryButton);
    
    return endingContainer;
} 