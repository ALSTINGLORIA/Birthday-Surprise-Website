document.addEventListener('DOMContentLoaded', function() {
    // Initialize the birthday experience
    init();
});

function init() {
    createConfetti();
    setupMusicControl();
    setupWelcomeSection();
    setupCakeSection();
    setupPresentsSection();
    setupModal();
}

// Create confetti animation
function createConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confettiContainer.appendChild(confetti);
    }
}

// Setup music control
function setupMusicControl() {
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    let isPlaying = false;
    
    // Create a simple birthday tune using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    function playBirthdayTune() {
        if (!isPlaying) return;
        
        // Simple birthday melody notes (simplified)
        const notes = [
            { freq: 261.63, duration: 500 }, // C
            { freq: 261.63, duration: 500 }, // C
            { freq: 293.66, duration: 1000 }, // D
            { freq: 261.63, duration: 1000 }, // C
            { freq: 349.23, duration: 1000 }, // F
            { freq: 329.63, duration: 2000 }, // E
        ];
        
        let currentTime = audioContext.currentTime;
        
        notes.forEach(note => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = note.freq;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + note.duration / 1000);
            
            oscillator.start(currentTime);
            oscillator.stop(currentTime + note.duration / 1000);
            
            currentTime += note.duration / 1000;
        });
        
        // Repeat the melody
        setTimeout(() => {
            if (isPlaying) playBirthdayTune();
        }, 8000);
    }
    
    musicToggle.addEventListener('click', function() {
        if (isPlaying) {
            isPlaying = false;
            musicToggle.textContent = '🎵 Music';
            musicToggle.style.opacity = '0.7';
        } else {
            isPlaying = true;
            musicToggle.textContent = '🔇 Music';
            musicToggle.style.opacity = '1';
            playBirthdayTune();
        }
    });
}

// Setup welcome section
function setupWelcomeSection() {
    const startButton = document.getElementById('start-button');
    const welcomeSection = document.getElementById('welcome-section');
    const cakeSection = document.getElementById('cake-section');
    
    startButton.addEventListener('click', function() {
        welcomeSection.classList.remove('active');
        setTimeout(() => {
            welcomeSection.style.display = 'none';
            cakeSection.style.display = 'flex';
            setTimeout(() => {
                cakeSection.classList.add('active');
            }, 100);
        }, 800);
    });
}

// Setup cake cutting section
function setupCakeSection() {
    const cake = document.getElementById('cake');
    const cakeSlice = document.getElementById('cake-slice');
    const cakeSection = document.getElementById('cake-section');
    const presentsSection = document.getElementById('presents-section');
    
    let isDragging = false;
    let cakeClicks = 0;
    
    cake.addEventListener('mousedown', function(e) {
        isDragging = true;
        cakeClicks++;
        
        // Add cutting effect
        const crumb = document.createElement('div');
        crumb.style.position = 'absolute';
        crumb.style.left = e.clientX + 'px';
        crumb.style.top = e.clientY + 'px';
        crumb.style.width = '5px';
        crumb.style.height = '5px';
        crumb.style.background = '#FFB6C1';
        crumb.style.borderRadius = '50%';
        crumb.style.pointerEvents = 'none';
        crumb.style.zIndex = '1000';
        document.body.appendChild(crumb);
        
        // Animate crumb
        crumb.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: 'translate(' + (Math.random() * 100 - 50) + 'px, ' + (Math.random() * 100 + 50) + 'px) scale(0)', opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = () => crumb.remove();
    });
    
    cake.addEventListener('mousemove', function(e) {
        if (isDragging) {
            // Add more cutting effects
            if (Math.random() > 0.7) {
                const crumb = document.createElement('div');
                crumb.style.position = 'absolute';
                crumb.style.left = e.clientX + 'px';
                crumb.style.top = e.clientY + 'px';
                crumb.style.width = '3px';
                crumb.style.height = '3px';
                crumb.style.background = '#FF69B4';
                crumb.style.borderRadius = '50%';
                crumb.style.pointerEvents = 'none';
                crumb.style.zIndex = '1000';
                document.body.appendChild(crumb);
                
                setTimeout(() => crumb.remove(), 1000);
            }
        }
    });
    
    cake.addEventListener('mouseup', function() {
        isDragging = false;
        
        if (cakeClicks >= 3) {
            // Show cake slice
            cakeSlice.classList.add('visible');
            
            // Move to presents section after a delay
            setTimeout(() => {
                cakeSection.classList.remove('active');
                setTimeout(() => {
                    cakeSection.style.display = 'none';
                    presentsSection.style.display = 'flex';
                    setTimeout(() => {
                        presentsSection.classList.add('active');
                    }, 100);
                }, 800);
            }, 2000);
        }
    });
}

// Setup presents section
function setupPresentsSection() {
    const presents = document.querySelectorAll('.present');
    
    presents.forEach(present => {
        present.addEventListener('click', function() {
            const giftType = this.dataset.gift;
            this.classList.add('opened');
            
            // Add sparkle effect
            createSparkles(this);
            
            // Show gift modal after animation
            setTimeout(() => {
                showGiftModal(giftType);
            }, 800);
        });
    });
}

// Create sparkle effect
function createSparkles(element) {
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
        sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
        sparkle.style.fontSize = '12px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1000';
        document.body.appendChild(sparkle);
        
        sparkle.animate([
            { transform: 'translateY(0) scale(0)', opacity: 0 },
            { transform: 'translateY(-30px) scale(1)', opacity: 1 },
            { transform: 'translateY(-60px) scale(0)', opacity: 0 }
        ], {
            duration: 1500,
            easing: 'ease-out'
        }).onfinish = () => sparkle.remove();
    }
}

// Setup modal
function setupModal() {
    const modal = document.getElementById('gift-modal');
    const closeBtn = document.querySelector('.close');
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Show gift modal
function showGiftModal(giftType) {
    const modal = document.getElementById('gift-modal');
    const giftContent = document.getElementById('gift-content');
    const template = document.getElementById(giftType + '-template');
    
    if (template) {
        giftContent.innerHTML = template.innerHTML;
        modal.style.display = 'block';
    }
}

// Touch support for mobile
document.addEventListener('touchstart', function(e) {
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    e.target.dispatchEvent(mouseEvent);
});

document.addEventListener('touchmove', function(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    e.target.dispatchEvent(mouseEvent);
});

document.addEventListener('touchend', function(e) {
    const mouseEvent = new MouseEvent('mouseup', {});
    e.target.dispatchEvent(mouseEvent);
});