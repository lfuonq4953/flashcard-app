import { Celebration } from './Celebration.js';

export class StudyMode {
    constructor(container, deck, onExit, onUpdateCard, onShowQuizMode) {
        this.container = container;
        this.deck = deck;
        this.onExit = onExit;
        this.onUpdateCard = onUpdateCard;
        this.onShowQuizMode = onShowQuizMode;
        this.currentIndex = 0;
        this.isFlipped = false;
    }

    render() {
        const card = this.deck.cards[this.currentIndex];
        const progress = ((this.currentIndex + 1) / this.deck.cards.length) * 100;

        this.container.innerHTML = `
            <div class="study-header">
                <button class="btn" id="exit-study">⬅️ Back to Decks</button>
                <h2 style="color: white;">${this.deck.name}</h2>
                <button class="btn" id="switch-quiz-mode" style="margin-left: auto;">❓ Quiz Mode</button>
            </div>
            
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progress}%"></div>
            </div>
            
            <p style="color: white; text-align: center;">Card ${this.currentIndex + 1} of ${this.deck.cards.length}</p>

            <div class="flashcard-container">
                <div class="flashcard" id="flashcard">
                    <div class="card-face card-front">
                        <div class="card-word">${card.front}</div>
                        <p style="opacity: 0.8;">Click to flip</p>
                    </div>
                    <div class="card-face card-back">
                        <div class="card-word">${card.back}</div>
                        ${card.example ? `<div class="card-example">"${card.example}"</div>` : ''}
                    </div>
                </div>
            </div>

            <div class="study-controls">
                <button class="btn" id="prev-card" ${this.currentIndex === 0 ? 'disabled' : ''}>⬅️ Previous</button>
                <button class="btn ${card.mastered ? 'btn-secondary' : ''}" id="toggle-mastered">
                    ${card.mastered ? '✅ Mastered' : '📝 Mark as Mastered'}
                </button>
                <button class="btn" id="next-card" ${this.currentIndex === this.deck.cards.length - 1 ? 'disabled' : ''}>Next ➡️</button>
            </div>
        `;

        this.attachEventListeners();
    }

    attachEventListeners() {
        const flashcard = document.getElementById('flashcard');
        flashcard.addEventListener('click', () => {
            this.isFlipped = !this.isFlipped;
            flashcard.classList.toggle('flipped');
        });

        document.getElementById('exit-study')?.addEventListener('click', () => this.onExit());
        
        document.getElementById('switch-quiz-mode')?.addEventListener('click', () => {
            if (this.onShowQuizMode) {
                this.onShowQuizMode();
            }
        });
        
        document.getElementById('prev-card')?.addEventListener('click', () => {
            if (this.currentIndex > 0) {
                this.currentIndex--;
                this.isFlipped = false;
                this.render();
            }
        });

        document.getElementById('next-card')?.addEventListener('click', () => {
            if (this.currentIndex < this.deck.cards.length - 1) {
                this.currentIndex++;
                this.isFlipped = false;
                this.render();
            }
        });

        document.getElementById('toggle-mastered')?.addEventListener('click', () => {
            const card = this.deck.cards[this.currentIndex];
            const wasNotMastered = !card.mastered;
            
            card.mastered = !card.mastered;
            this.onUpdateCard(this.deck.id, card.id, card.mastered);
            
            // Trigger celebration only when marking as mastered (not when unmarking)
            if (wasNotMastered) {
                Celebration.celebrate();
                Celebration.celebrateWithEmojis();
            }
            
            this.render();
        });
    }
}