export class Celebration {
    static playCompletionSound() {
        // Tạo sound bằng Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Tiếng "ding" hoàn thành
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(audioContext.destination);
        
        // Tần số
        osc.frequency.value = 800;
        osc.type = 'sine';
        
        // Fade in/out
        gain.gain.setValueAtTime(0.3, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        osc.start(audioContext.currentTime);
        osc.stop(audioContext.currentTime + 0.5);
    }

    static createConfetti() {
        const container = document.body;
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Random properties
            const size = Math.random() * 10 + 5;
            const left = Math.random() * 100;
            const delay = Math.random() * 0.2;
            const duration = Math.random() * 2 + 2;
            const rotation = Math.random() * 360;
            
            confetti.style.width = size + 'px';
            confetti.style.height = size + 'px';
            confetti.style.left = left + '%';
            confetti.style.top = '-10px';
            confetti.style.backgroundColor = this.getRandomColor();
            confetti.style.position = 'fixed';
            confetti.style.pointerEvents = 'none';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.zIndex = '9999';
            confetti.style.animation = `fall ${duration}s linear ${delay}s forwards`;
            confetti.style.transform = `rotate(${rotation}deg)`;
            
            container.appendChild(confetti);
            
            // Remove after animation
            setTimeout(() => {
                confetti.remove();
            }, (duration + delay) * 1000);
        }
    }

    static getRandomColor() {
        const colors = [
            '#FF6B6B', // Red
            '#4ECDC4', // Teal
            '#45B7D1', // Blue
            '#FFA07A', // Orange
            '#98D8C8', // Mint
            '#F7DC6F', // Yellow
            '#BB8FCE', // Purple
            '#85C1E2', // Sky Blue
            '#F8B88B', // Peach
            '#A8E6CF'  // Light Green
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    static celebrate() {
        // Play sound
        this.playCompletionSound();
        
        // Create confetti
        this.createConfetti();
        
        // Visual feedback - pulse effect
        const button = document.getElementById('toggle-mastered');
        if (button) {
            button.style.animation = 'pulse-success 0.6s ease-out';
            setTimeout(() => {
                button.style.animation = '';
            }, 600);
        }
    }

    static addCelebrationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fall {
                to {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }

            @keyframes pulse-success {
                0% {
                    transform: scale(1);
                    box-shadow: 0 0 0 0 rgba(72, 187, 120, 0.7);
                }
                50% {
                    transform: scale(1.05);
                    box-shadow: 0 0 0 10px rgba(72, 187, 120, 0);
                }
                100% {
                    transform: scale(1);
                    box-shadow: 0 0 0 0 rgba(72, 187, 120, 0);
                }
            }

            @keyframes pop-balloon {
                0% {
                    transform: scale(0) rotate(0deg);
                    opacity: 1;
                }
                50% {
                    transform: scale(1.2) rotate(10deg);
                    opacity: 1;
                }
                100% {
                    transform: scale(0) rotate(20deg);
                    opacity: 0;
                }
            }

            .celebration-emoji {
                position: fixed;
                font-size: 3rem;
                pointer-events: none;
                z-index: 9999;
                animation: pop-balloon 1s ease-out forwards;
            }
        `;
        document.head.appendChild(style);
    }

    static celebrateWithEmojis() {
        const emojis = ['🎉', '✨', '🎊', '⭐', '🌟', '💫', '🎈'];
        
        for (let i = 0; i < 8; i++) {
            const emoji = document.createElement('div');
            emoji.className = 'celebration-emoji';
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            
            const randomX = Math.random() * window.innerWidth;
            const randomY = Math.random() * window.innerHeight * 0.5;
            
            emoji.style.left = randomX + 'px';
            emoji.style.top = randomY + 'px';
            
            document.body.appendChild(emoji);
            
            setTimeout(() => emoji.remove(), 1000);
        }
    }
}

// Initialize styles when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        Celebration.addCelebrationStyles();
    });
} else {
    Celebration.addCelebrationStyles();
}
