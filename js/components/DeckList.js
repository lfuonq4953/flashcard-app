export class DeckList {
    constructor(container, onSelectDeck, onEditDeck, onImportExcel, onLogout, onShowAdmin = null) {
        this.container = container;
        this.onSelectDeck = onSelectDeck;
        this.onEditDeck = onEditDeck;
        this.onImportExcel = onImportExcel;
        this.onLogout = onLogout;
        this.onShowAdmin = onShowAdmin;
    }

    render(decks, username, isAdmin = false) {
        this.container.innerHTML = `
            <div class="deck-header">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <h2 style="color: white; margin-bottom: 5px;">Your Decks</h2>
                        <p style="color: rgba(255,255,255,0.7); margin: 0;">
                            Logged in as: <strong>${username}</strong>
                            ${isAdmin ? '<span style="background: #667eea; margin-left: 10px; padding: 4px 12px; border-radius: 20px;">👨‍💼 Admin</span>' : ''}
                        </p>
                    </div>
                    <div>
                        ${isAdmin ? '<button class="btn btn-info" id="admin-btn">👨‍💼 Admin Panel</button>' : ''}
                        <button class="btn btn-danger" id="logout-btn">🔓 Logout</button>
                    </div>
                </div>
                <div style="margin-top: 15px;">
                    <button class="btn btn-secondary" id="import-excel-btn">📊 Import from Excel</button>
                    <button class="btn" id="add-deck-btn">➕ Create New Deck</button>
                </div>
            </div>
            <div class="deck-grid">
                ${decks.map(deck => this.renderDeckCard(deck)).join('')}
            </div>
        `;

        this.attachEventListeners(decks, isAdmin);
    }

    renderDeckCard(deck) {
        const masteredCount = deck.cards.filter(c => c.mastered).length;
        const totalCards = deck.cards.length;
        const progress = totalCards > 0 ? Math.round((masteredCount / totalCards) * 100) : 0;

        return `
            <div class="deck-card" data-deck-id="${deck.id}">
                <h3>${deck.name}</h3>
                <p>${deck.description}</p>
                <div class="deck-stats">
                    <span>📝 ${totalCards} cards</span>
                    <span>✅ ${progress}% mastered</span>
                </div>
                <div style="margin-top: 15px;">
                    <button class="btn btn-study" data-deck-id="${deck.id}">📖 Study</button>
                    <button class="btn btn-secondary btn-edit" data-deck-id="${deck.id}">✏️ Edit</button>
                </div>
            </div>
        `;
    }

    attachEventListeners(decks, isAdmin = false) {
        document.querySelectorAll('.btn-study').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const deckId = parseInt(btn.dataset.deckId);
                this.onSelectDeck(deckId);
            });
        });

        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const deckId = parseInt(btn.dataset.deckId);
                this.onEditDeck(deckId);
            });
        });

        document.getElementById('add-deck-btn')?.addEventListener('click', () => {
            this.onEditDeck(null);
        });

        document.getElementById('import-excel-btn')?.addEventListener('click', () => {
            this.onImportExcel();
        });

        document.getElementById('logout-btn')?.addEventListener('click', () => {
            if (confirm('Are you sure you want to logout?')) {
                this.onLogout();
            }
        });

        if (isAdmin && this.onShowAdmin) {
            document.getElementById('admin-btn')?.addEventListener('click', () => {
                this.onShowAdmin();
            });
        }
    }
}