// js/components/StudyMode.js
export default class StudyMode {
  constructor(storageService) {
    this.storageService = storageService;
    this.currentDeck = null;
    this.currentCardIndex = 0;
    this.isFlipped = false;
    this.audioPlayer = new Audio(); // Audio player
    this.autoPlay = false;
  }

  render(deckId) {
    const decks = this.storageService.getDecks();
    this.currentDeck = decks.find(d => d.id === deckId);
    
    if (!this.currentDeck || this.currentDeck.cards.length === 0) {
      return '<div class="empty-state">No cards to study!</div>';
    }

    this.currentCardIndex = 0;
    this.isFlipped = false;
    
    return this.renderCard();
  }

  renderCard() {
    const card = this.currentDeck.cards[this.currentCardIndex];
    const progress = ((this.currentCardIndex + 1) / this.currentDeck.cards.length) * 100;
    const masteredCount = this.currentDeck.cards.filter(c => c.mastered).length;
    
    // Kiểm tra có sound không
    const hasSound = card.soundData || card.soundUrl;
    
    return `
      <div class="study-container">
        <div class="study-header">
          <button class="btn-back" onclick="app.showDeckList()">← Back</button>
          <h2>${this.currentDeck.name}</h2>
          <div class="study-stats">
            <span>${this.currentCardIndex + 1} / ${this.currentDeck.cards.length}</span>
            <span>✓ ${masteredCount} mastered</span>
          </div>
        </div>
        
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${progress}%"></div>
        </div>
        
        <div class="flashcard-wrapper">
          <div class="flashcard ${this.isFlipped ? 'flipped' : ''}" 
               onclick="studyMode.flip()">
            <div class="flashcard-front">
              <div class="card-content">
                <div class="card-word-container">
                  <h3 class="card-word">${card.front}</h3>
                  ${hasSound ? `
                    <button class="btn-sound-inline" 
                            onclick="event.stopPropagation(); studyMode.playSound();"
                            title="Play pronunciation">
                      🔊
                    </button>
                  ` : ''}
                </div>
                ${card.example ? `<p class="card-example">"${card.example}"</p>` : ''}
              </div>
              <div class="flip-hint">Click to see meaning</div>
            </div>
            
            <div class="flashcard-back">
              <div class="card-content">
                <div class="card-word-container">
                  <h3 class="card-translation">${card.back}</h3>
                  ${hasSound ? `
                    <button class="btn-sound-inline" 
                            onclick="event.stopPropagation(); studyMode.playSound();"
                            title="Play pronunciation">
                      🔊
                    </button>
                  ` : ''}
                </div>
                ${card.example ? `<p class="card-example">"${card.example}"</p>` : ''}
              </div>
              <div class="flip-hint">Click to hide</div>
            </div>
          </div>
        </div>
        
        <div class="study-controls">
          <button class="btn-nav" 
                  onclick="studyMode.previousCard()"
                  ${this.currentCardIndex === 0 ? 'disabled' : ''}>
            ← Previous
          </button>
          
          <button class="btn-mastered ${card.mastered ? 'mastered' : ''}"
                  onclick="studyMode.toggleMastered()">
            ${card.mastered ? '✓ Mastered' : 'Mark as Mastered'}
          </button>
          
          <button class="btn-nav" 
                  onclick="studyMode.nextCard()"
                  ${this.currentCardIndex === this.currentDeck.cards.length - 1 ? 'disabled' : ''}>
            Next →
          </button>
        </div>
        
        ${hasSound ? `
          <div class="study-options">
            <label class="checkbox-label">
              <input type="checkbox" 
                     id="autoplay-sound" 
                     ${this.autoPlay ? 'checked' : ''}
                     onchange="studyMode.toggleAutoPlay(this.checked)">
              <span>🔊 Auto-play pronunciation</span>
            </label>
          </div>
        ` : ''}
      </div>
    `;
  }

  flip() {
    this.isFlipped = !this.isFlipped;
    document.querySelector('.flashcard').classList.toggle('flipped');
  }

  nextCard() {
    if (this.currentCardIndex < this.currentDeck.cards.length - 1) {
      this.currentCardIndex++;
      this.isFlipped = false;
      this.updateView();
      
      // Auto-play nếu được bật
      if (this.autoPlay) {
        setTimeout(() => this.playSound(), 300);
      }
    }
  }

  previousCard() {
    if (this.currentCardIndex > 0) {
      this.currentCardIndex--;
      this.isFlipped = false;
      this.updateView();
      
      // Auto-play nếu được bật
      if (this.autoPlay) {
        setTimeout(() => this.playSound(), 300);
      }
    }
  }

  toggleMastered() {
    const card = this.currentDeck.cards[this.currentCardIndex];
    card.mastered = !card.mastered;
    
    this.storageService.updateCardMastery(
      this.currentDeck.id,
      card.id,
      card.mastered
    );
    
    this.updateView();
  }

  toggleAutoPlay(checked) {
    this.autoPlay = checked;
    if (checked) {
      this.playSound();
    }
  }

  // PHÁT SOUND
  playSound() {
    const card = this.currentDeck.cards[this.currentCardIndex];
    
    if (!card.soundData && !card.soundUrl) {
      console.log('No sound available for this card');
      return;
    }
    
    try {
      // Dừng audio đang phát
      this.audioPlayer.pause();
      this.audioPlayer.currentTime = 0;
      
      // Phát sound từ base64 data
      if (card.soundData) {
        this.audioPlayer.src = card.soundData;
      } 
      // Hoặc từ URL (nếu lưu file riêng)
      else if (card.soundUrl) {
        this.audioPlayer.src = `sounds/${card.soundUrl}`;
      }
      
      // Phát âm thanh
      this.audioPlayer.play().catch(error => {
        console.error('Error playing sound:', error);
      });
      
      // Highlight button khi đang phát
      const soundBtns = document.querySelectorAll('.btn-sound-inline');
      soundBtns.forEach(btn => btn.classList.add('playing'));
      
      this.audioPlayer.onended = () => {
        soundBtns.forEach(btn => btn.classList.remove('playing'));
      };
      
    } catch (error) {
      console.error('Error playing sound:', error);
      alert('Cannot play sound file!');
    }
  }

  updateView() {
    const container = document.getElementById('study-mode');
    container.innerHTML = this.renderCard();
  }
}