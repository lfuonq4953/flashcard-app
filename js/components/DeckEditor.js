export class DeckEditor {
    constructor(container, deck, onSave, onCancel, onDelete) {
        this.container = container;
        this.deck = deck || { name: '', description: '', cards: [] };
        this.onSave = onSave;
        this.onCancel = onCancel;
        this.onDelete = onDelete;
    }

    render() {
        const isNewDeck = !this.deck.id;

        this.container.innerHTML = `
            <div class="editor-header">
                <h2 style="color: white;">${isNewDeck ? 'Create New Deck' : 'Edit Deck'}</h2>
            </div>

            <div style="background: rgba(255,255,255,0.1); padding: 30px; border-radius: 15px; margin-top: 20px;">
                <div class="form-group">
                    <label>Deck Name</label>
                    <input type="text" id="deck-name" value="${this.deck.name}" placeholder="e.g., Daily Vocabulary">
                </div>

                <div class="form-group">
                    <label>Description</label>
                    <input type="text" id="deck-description" value="${this.deck.description}" placeholder="Brief description">
                </div>

                <h3 style="color: white; margin: 30px 0 15px;">Cards</h3>
                <div id="cards-list" class="card-list">
                    ${this.deck.cards.map((card, index) => this.renderCardItem(card, index)).join('')}
                </div>

                <button class="btn btn-secondary" id="add-card-btn">➕ Add Card</button>

                <div style="margin-top: 30px; display: flex; gap: 10px; justify-content: space-between;">
                    <div>
                        <button class="btn" id="save-deck-btn">💾 Save Deck</button>
                        <button class="btn" id="cancel-edit-btn">❌ Cancel</button>
                    </div>
                    ${!isNewDeck ? '<button class="btn btn-danger" id="delete-deck-btn">🗑️ Delete Deck</button>' : ''}
                </div>
            </div>
        `;

        this.attachEventListeners();
    }

    renderCardItem(card, index) {
        return `
            <div class="card-item">
                <div style="flex: 1;">
                    <strong>${card.front}</strong> → ${card.back}
                    ${card.example ? `<br><small style="opacity: 0.7;">"${card.example}"</small>` : ''}
                </div>
                <button class="btn btn-danger" data-index="${index}">🗑️</button>
            </div>
        `;
    }

    attachEventListeners() {
        document.getElementById('add-card-btn')?.addEventListener('click', () => {
            const front = prompt('English word:');
            const back = prompt('Vietnamese meaning:');
            const example = prompt('Example sentence (optional):');
            
            if (front && back) {
                this.deck.cards.push({
                    id: Date.now(),
                    front,
                    back,
                    example: example || '',
                    mastered: false
                });
                this.render();
            }
        });

        document.querySelectorAll('.card-item .btn-danger').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.dataset.index);
                this.deck.cards.splice(index, 1);
                this.render();
            });
        });

        document.getElementById('save-deck-btn')?.addEventListener('click', () => {
            const name = document.getElementById('deck-name').value.trim();
            const description = document.getElementById('deck-description').value.trim();

            if (!name) {
                alert('Please enter a deck name');
                return;
            }

            if (this.deck.cards.length === 0) {
                alert('Please add at least one card');
                return;
            }

            this.deck.name = name;
            this.deck.description = description;
            this.onSave(this.deck);
        });

        document.getElementById('cancel-edit-btn')?.addEventListener('click', () => this.onCancel());
        
        document.getElementById('delete-deck-btn')?.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this deck?')) {
                this.onDelete(this.deck.id);
            }
        });
    }
}