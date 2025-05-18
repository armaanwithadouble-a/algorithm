// Fake users data
const users = [
    {
        name: "Alex Thompson",
        mood: "happy",
        interests: ["memes", "gaming", "tech"],
        avatar: "👨‍💻"
    },
    {
        name: "Sarah Chen",
        mood: "angry",
        interests: ["politics", "news", "environment"],
        avatar: "👩‍💼"
    },
    {
        name: "Marcus Johnson",
        mood: "bored",
        interests: ["sports", "fitness", "food"],
        avatar: "🏋️‍♂️"
    },
    {
        name: "Priya Patel",
        mood: "excited",
        interests: ["fashion", "travel", "photography"],
        avatar: "👗"
    },
    {
        name: "Jordan Lee",
        mood: "neutral",
        interests: ["music", "art", "books"],
        avatar: "🎨"
    },
    {
        name: "Emma Wilson",
        mood: "sad",
        interests: ["movies", "animals", "cooking"],
        avatar: "🍳"
    },
    {
        name: "Carlos Rodriguez",
        mood: "confused",
        interests: ["science", "space", "history"],
        avatar: "🔬"
    },
    {
        name: "Zoe Kim",
        mood: "energetic",
        interests: ["dance", "fashion", "social media"],
        avatar: "💃"
    }
];

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
        author: users[0]
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
        author: users[1]
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
        author: users[2]
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
        author: users[3]
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
        author: users[4]
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
        author: users[5]
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
        author: users[6]
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
        author: users[7]
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
        author: users[0]
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
        author: users[1]
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
        this.globalMood = (this.globalMood * 0.7) + (post.impact.mood * 0.3);
        this.globalEngagement = (this.globalEngagement * 0.7) + (post.impact.engagement * 0.3);
        
        // Ensure values stay between 0 and 1
        this.globalMood = Math.max(0, Math.min(1, this.globalMood));
        this.globalEngagement = Math.max(0, Math.min(1, this.globalEngagement));
        
        // Update the metrics display
        updateMetricsDisplay();
        
        // Immediately move to next user
        this.currentUser = getRandomUser();
        const profileView = createProfileView(this.currentUser);
        showContent(profileView);
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
        checkmark.parentNode.removeChild(checkmark);
    }
}

function moveCheckmarkToCard(targetCard, checkmark) {
    const postTitle = targetCard.querySelector('.post-title').textContent;
    console.log(`[Checkmark] Positioning checkmark for post: "${postTitle}"`);
    const rect = targetCard.getBoundingClientRect();
    
    // Reset checkmark state
    checkmark.style.transform = 'translateY(-50%) translateX(0) translateZ(0)';
    checkmark.style.opacity = '0';
    checkmark.style.pointerEvents = 'none';
    
    // Position the checkmark at the card's location
    checkmark.style.right = `${window.innerWidth - rect.right - 12}px`;
    checkmark.style.top = `${rect.top + (rect.height / 2) - 16}px`;
    
    // Force a reflow to ensure the position is set
    checkmark.offsetHeight;
    
    // Make it visible and slide out
    console.log(`[Checkmark] Animating checkmark in for post: "${postTitle}"`);
    checkmark.classList.add('visible');
    requestAnimationFrame(() => {
        checkmark.style.opacity = '1';
        checkmark.style.pointerEvents = 'auto';
        checkmark.style.transform = 'translateY(-50%) translateX(50px) translateZ(0)';
    });
}

function animateCheckmarkOut(checkmark, postTitle) {
    console.log(`[Checkmark] Starting checkmark animation out for post: "${postTitle}"`);
    checkmark.style.transform = 'translateY(-50%) translateX(0) translateZ(0)';
    checkmark.style.opacity = '0';
    checkmark.style.pointerEvents = 'none';
    
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`[Checkmark] Checkmark animation out complete for post: "${postTitle}"`);
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

function createMetricsDisplay() {
    const metricsContainer = createElement('div', 'metrics-container');
    
    const moodDisplay = createElement('div', 'metric-display');
    const moodLabel = createElement('div', 'metric-label', 'Global Mood');
    const moodValue = createElement('div', 'metric-value');
    const moodBar = createElement('div', 'metric-bar');
    const moodFill = createElement('div', 'metric-fill');
    
    // Set mood bar color based on value
    const moodColor = gameState.globalMood > 0.5 ? 
        `hsl(${120 * gameState.globalMood}, 70%, 50%)` : 
        `hsl(${0}, 70%, ${50 + (gameState.globalMood * 30)}%)`;
    moodFill.style.width = `${gameState.globalMood * 100}%`;
    moodFill.style.backgroundColor = moodColor;
    moodValue.textContent = `${Math.round(gameState.globalMood * 100)}%`;
    
    moodBar.appendChild(moodFill);
    moodDisplay.appendChild(moodLabel);
    moodDisplay.appendChild(moodValue);
    moodDisplay.appendChild(moodBar);
    
    const engagementDisplay = createElement('div', 'metric-display');
    const engagementLabel = createElement('div', 'metric-label', 'Global Engagement');
    const engagementValue = createElement('div', 'metric-value');
    const engagementBar = createElement('div', 'metric-bar');
    const engagementFill = createElement('div', 'metric-fill');
    
    // Set engagement bar color (blue gradient)
    engagementFill.style.width = `${gameState.globalEngagement * 100}%`;
    engagementFill.style.backgroundColor = `hsl(${200 + (gameState.globalEngagement * 40)}, 70%, 50%)`;
    engagementValue.textContent = `${Math.round(gameState.globalEngagement * 100)}%`;
    
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
        
        // Update mood
        const moodColor = gameState.globalMood > 0.5 ? 
            `hsl(${120 * gameState.globalMood}, 70%, 50%)` : 
            `hsl(${0}, 70%, ${50 + (gameState.globalMood * 30)}%)`;
        moodFill.style.width = `${gameState.globalMood * 100}%`;
        moodFill.style.backgroundColor = moodColor;
        moodValue.textContent = `${Math.round(gameState.globalMood * 100)}%`;
        
        // Update engagement
        engagementFill.style.width = `${gameState.globalEngagement * 100}%`;
        engagementFill.style.backgroundColor = `hsl(${200 + (gameState.globalEngagement * 40)}, 70%, 50%)`;
        engagementValue.textContent = `${Math.round(gameState.globalEngagement * 100)}%`;
    }
}

// Add this after the gameState object
document.addEventListener('DOMContentLoaded', () => {
    // Add click handler to the content area to handle background clicks
    document.getElementById('content').addEventListener('click', (event) => {
        if (event.target.id === 'content' || event.target.closest('.profile-container')) {
            console.log('[Background Click] Clicked on background area');
            const selectedCard = document.querySelector('.post-card.selected');
            if (selectedCard) {
                const postTitle = selectedCard.querySelector('.post-title').textContent;
                console.log(`[Background Click] Starting deselection for post: "${postTitle}"`);
                gameState.selectedPost = null;
                selectedCard.classList.remove('selected');
                
                // Animate and remove checkmark
                if (activeCheckmark) {
                    animateCheckmarkOut(activeCheckmark, postTitle).then(() => {
                        activeCheckmark = null;
                    });
                }
                
                setTimeout(() => {
                    console.log(`[Background Click] Card deselection complete for post: "${postTitle}"`);
                    selectedCard.style.zIndex = '1';
                }, 300);
            } else {
                console.log('[Background Click] No card was selected, nothing to deselect');
            }
        }
    });
});

function handlePostClick(event, post) {
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
            
            setTimeout(() => {
                console.log(`[Card Click] Card deselection complete for post: "${post.title}"`);
                selectedCard.style.zIndex = '1';
            }, 300);
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
        clickedCard.style.zIndex = '3';
        clickedCard.classList.add('selected');
        
        // Create new checkmark and position it
        const newCheckmark = createApprovalCheckmark();
        moveCheckmarkToCard(clickedCard, newCheckmark);
        
        // Animate out old checkmark
        if (activeCheckmark) {
            // Start animating out the old checkmark
            activeCheckmark.style.transform = 'translateY(-50%) translateX(0) translateZ(0)';
            activeCheckmark.style.opacity = '0';
            activeCheckmark.style.pointerEvents = 'none';
            
            setTimeout(() => {
                console.log(`[Card Click] Previous checkmark removed for post: "${currentPostTitle}"`);
                removeCheckmark(activeCheckmark);
                activeCheckmark = newCheckmark; // Update active checkmark reference
            }, 300);
        } else {
            activeCheckmark = newCheckmark;
        }
        
        // Reset z-index of deselected card after animation
        setTimeout(() => {
            console.log(`[Card Click] Previous card deselection complete for post: "${currentPostTitle}"`);
            currentSelectedCard.style.zIndex = '1';
        }, 300);
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
    
    // Set z-index and add selected class immediately
    console.log(`[Selection] Setting z-index to 3 for post: "${post.title}"`);
    cardToSelect.style.zIndex = '3';
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
    
    // Update global metrics based on the new posts
    gameState.updateMetrics(randomPosts);
    
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
            <span class="stat-value">${randomPosts.length}</span>
            <span class="stat-label">Feed Posts</span>
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

// Game initialization
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