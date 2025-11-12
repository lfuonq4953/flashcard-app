import { Celebration } from './Celebration.js';

export class QuizMode {
    constructor(container, deck, onExit, onUpdateCard) {
        this.container = container;
        this.deck = deck;
        this.onExit = onExit;
        this.onUpdateCard = onUpdateCard;
        this.currentIndex = 0;
        this.score = 0;
        this.totalAnswered = 0;
    }

    render() {
        const card = this.deck.cards[this.currentIndex];
        const progress = ((this.currentIndex + 1) / this.deck.cards.length) * 100;
        
        // Generate 4 options: 1 correct + 3 random wrong answers
        const options = this.generateOptions(card);

        this.container.innerHTML = `
            <div class="study-header">
                <button class="btn" id="exit-quiz">⬅️ Back to Decks</button>
                <h2 style="color: white;">📝 Quiz Mode</h2>
                <div style="color: rgba(255,255,255,0.7);">Score: ${this.score}/${this.totalAnswered}</div>
            </div>
            
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progress}%"></div>
            </div>
            
            <p style="color: white; text-align: center;">Question ${this.currentIndex + 1} of ${this.deck.cards.length}</p>

            <div class="quiz-container">
                <div class="quiz-question">
                    <h3 style="color: white; margin-bottom: 30px; font-size: 1.8rem;">
                        What does "<strong>${card.front}</strong>" mean?
                    </h3>

                    <div class="quiz-options">
                        ${options.map((option, index) => `
                            <button class="quiz-option" data-index="${index}" data-correct="${option.correct}">
                                <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                                <span class="option-text">${option.text}</span>
                            </button>
                        `).join('')}
                    </div>

                    ${card.example ? `
                        <div class="quiz-example" style="margin-top: 30px; padding: 15px; background: rgba(255,255,255,0.1); border-radius: 8px; border-left: 4px solid #667eea;">
                            <p style="color: rgba(255,255,255,0.8); margin: 0; font-size: 0.9rem;">
                                <strong>Example:</strong> "${card.example}"
                            </p>
                        </div>
                    ` : ''}
                </div>
            </div>

            <div class="quiz-controls">
                <button class="btn" id="skip-question" style="background: #667eea;">⏭️ Skip</button>
            </div>
        `;

        this.attachEventListeners();
    }

    generateOptions(card) {
        const correctAnswer = {
            text: card.back,
            correct: true
        };

        // Get wrong answers from other cards
        const wrongAnswers = this.deck.cards
            .filter(c => c.id !== card.id)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map(c => ({
                text: c.back,
                correct: false
            }));

        // Combine and shuffle
        const options = [correctAnswer, ...wrongAnswers]
            .sort(() => Math.random() - 0.5);

        return options;
    }

    attachEventListeners() {
        // Exit quiz
        document.getElementById('exit-quiz')?.addEventListener('click', () => {
            if (confirm('Are you sure you want to exit? Your progress will not be saved.')) {
                this.onExit();
            }
        });

        // Quiz options
        document.querySelectorAll('.quiz-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const isCorrect = e.currentTarget.dataset.correct === 'true';
                const allButtons = document.querySelectorAll('.quiz-option');
                
                // Disable all buttons
                allButtons.forEach(b => b.disabled = true);

                // Show correct/wrong answer
                if (isCorrect) {
                    e.currentTarget.classList.add('correct-answer');
                    this.score++;
                    Celebration.celebrate();
                    Celebration.celebrateWithEmojis();
                } else {
                    e.currentTarget.classList.add('wrong-answer');
                    // Show correct answer
                    allButtons.forEach(b => {
                        if (b.dataset.correct === 'true') {
                            b.classList.add('correct-answer');
                        }
                    });
                }

                this.totalAnswered++;

                // Next question after delay
                setTimeout(() => {
                    if (this.currentIndex < this.deck.cards.length - 1) {
                        this.currentIndex++;
                        this.render();
                    } else {
                        this.showResults();
                    }
                }, 1500);
            });
        });

        // Skip question
        document.getElementById('skip-question')?.addEventListener('click', () => {
            this.totalAnswered++;
            if (this.currentIndex < this.deck.cards.length - 1) {
                this.currentIndex++;
                this.render();
            } else {
                this.showResults();
            }
        });
    }

    showResults() {
        const percentage = Math.round((this.score / this.totalAnswered) * 100);
        const grade = percentage >= 80 ? '🌟 Excellent' : 
                     percentage >= 60 ? '👍 Good' : 
                     percentage >= 40 ? '😊 Fair' : '📚 Keep Learning';

        this.container.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <h2 style="color: white; font-size: 2.5rem; margin-bottom: 20px;">Quiz Completed! 🎉</h2>
                
                <div style="background: rgba(102, 126, 234, 0.2); border: 2px solid rgba(102, 126, 234, 0.5); padding: 40px; border-radius: 15px; margin: 30px 0;">
                    <div style="color: #667eea; font-size: 3.5rem; font-weight: bold; margin-bottom: 15px;">
                        ${this.score}/${this.totalAnswered}
                    </div>
                    <div style="color: white; font-size: 1.5rem; margin-bottom: 15px;">
                        ${percentage}%
                    </div>
                    <div style="color: rgba(255,255,255,0.8); font-size: 1.2rem;">
                        ${grade}
                    </div>
                </div>

                <p style="color: rgba(255,255,255,0.7); margin: 30px 0;">
                    You answered ${this.score} out of ${this.totalAnswered} questions correctly.
                </p>

                <div style="display: flex; gap: 15px; justify-content: center; margin-top: 30px;">
                    <button class="btn" id="retry-quiz">🔄 Retry Quiz</button>
                    <button class="btn btn-secondary" id="back-to-deck">📚 Back to Deck</button>
                </div>
            </div>
        `;

        document.getElementById('retry-quiz')?.addEventListener('click', () => {
            this.currentIndex = 0;
            this.score = 0;
            this.totalAnswered = 0;
            this.render();
        });

        document.getElementById('back-to-deck')?.addEventListener('click', () => {
            this.onExit();
        });
    }
}
