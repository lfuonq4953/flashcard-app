import { DEFAULT_DECKS } from './data.js';

export class StorageService {
    static DECKS_KEY = 'flashcard_decks';
    static USERS_KEY = 'flashcard_users';
    static CURRENT_USER_KEY = 'flashcard_current_user';

    // User Authentication
    static registerUser(username, password, isAdmin = false) {
        const users = this.getAllUsers();
        
        if (users.find(u => u.username === username)) {
            throw new Error('Username already exists');
        }

        const newUser = {
            username,
            password, // Note: In production, hash this!
            role: isAdmin ? 'admin' : 'user',
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
        return newUser;
    }

    static loginUser(username, password) {
        const users = this.getAllUsers();
        const user = users.find(u => u.username === username && u.password === password);

        if (!user) {
            throw new Error('Invalid username or password');
        }

        localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
        return user;
    }

    static getCurrentUser() {
        const user = localStorage.getItem(this.CURRENT_USER_KEY);
        return user ? JSON.parse(user) : null;
    }

    static logoutUser() {
        localStorage.removeItem(this.CURRENT_USER_KEY);
    }

    static getAllUsers() {
        const users = localStorage.getItem(this.USERS_KEY);
        return users ? JSON.parse(users) : [];
    }

    // Deck Management (per user)
    static getUserDecksKey(username) {
        return `${this.DECKS_KEY}_${username}`;
    }

    static getDecks(username = null) {
        const user = username || this.getCurrentUser()?.username;
        if (!user) {
            throw new Error('No user logged in');
        }

        const key = this.getUserDecksKey(user);
        const saved = localStorage.getItem(key);
        
        if (saved) {
            return JSON.parse(saved);
        }

        // Initialize with DEFAULT_DECKS for new user
        this.saveDecks(DEFAULT_DECKS, user);
        return DEFAULT_DECKS;
    }

    static saveDecks(decks, username = null) {
        const user = username || this.getCurrentUser()?.username;
        if (!user) {
            throw new Error('No user logged in');
        }

        const key = this.getUserDecksKey(user);
        localStorage.setItem(key, JSON.stringify(decks));
    }

    static addDeck(deck, username = null) {
        const user = username || this.getCurrentUser()?.username;
        if (!user) {
            throw new Error('No user logged in');
        }

        const decks = this.getDecks(user);
        deck.id = Date.now();
        decks.push(deck);
        this.saveDecks(decks, user);
        return deck;
    }

    static updateDeck(deckId, updates, username = null) {
        const user = username || this.getCurrentUser()?.username;
        if (!user) {
            throw new Error('No user logged in');
        }

        const decks = this.getDecks(user);
        const index = decks.findIndex(d => d.id === deckId);
        if (index !== -1) {
            decks[index] = { ...decks[index], ...updates };
            this.saveDecks(decks, user);
        }
    }

    static deleteDeck(deckId, username = null) {
        const user = username || this.getCurrentUser()?.username;
        if (!user) {
            throw new Error('No user logged in');
        }

        const decks = this.getDecks(user).filter(d => d.id !== deckId);
        this.saveDecks(decks, user);
    }

    static getDeckById(deckId, username = null) {
        const user = username || this.getCurrentUser()?.username;
        if (!user) {
            throw new Error('No user logged in');
        }

        return this.getDecks(user).find(d => d.id === deckId);
    }

    static updateCardMastery(deckId, cardId, mastered, username = null) {
        const user = username || this.getCurrentUser()?.username;
        if (!user) {
            throw new Error('No user logged in');
        }

        const deck = this.getDeckById(deckId, user);
        if (deck) {
            const card = deck.cards.find(c => c.id === cardId);
            if (card) {
                card.mastered = mastered;
                this.updateDeck(deckId, { cards: deck.cards }, user);
            }
        }
    }

    static resetToDefaults(username = null) {
        const user = username || this.getCurrentUser()?.username;
        if (!user) {
            throw new Error('No user logged in');
        }

        const key = this.getUserDecksKey(user);
        localStorage.removeItem(key);
        this.saveDecks(DEFAULT_DECKS, user);
    }

    // Admin Functions
    static isAdmin(username = null) {
        const user = username || this.getCurrentUser();
        return user && user.role === 'admin';
    }

    static getAllUsersWithStats() {
        const users = this.getAllUsers();
        return users.map(user => {
            const decks = this.getDecks(user.username);
            const totalCards = decks.reduce((sum, deck) => sum + deck.cards.length, 0);
            const masteredCards = decks.reduce((sum, deck) => 
                sum + deck.cards.filter(c => c.mastered).length, 0
            );
            
            return {
                ...user,
                stats: {
                    totalDecks: decks.length,
                    totalCards,
                    masteredCards
                }
            };
        });
    }

    static getUserDecksForAdmin(username) {
        return this.getDecks(username);
    }

    static deleteUser(username) {
        const users = this.getAllUsers().filter(u => u.username !== username);
        localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
        
        // Delete user's data
        const key = this.getUserDecksKey(username);
        localStorage.removeItem(key);
    }

    static updateUserRole(username, role) {
        const users = this.getAllUsers();
        const user = users.find(u => u.username === username);
        
        if (user) {
            user.role = role; // 'admin' or 'user'
            localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
        }
    }

    static addDeckForUser(username, deck) {
        const decks = this.getDecks(username);
        deck.id = Date.now();
        decks.push(deck);
        this.saveDecks(decks, username);
        return deck;
    }

    static updateDeckForUser(username, deckId, updates) {
        const decks = this.getDecks(username);
        const index = decks.findIndex(d => d.id === deckId);
        if (index !== -1) {
            decks[index] = { ...decks[index], ...updates };
            this.saveDecks(decks, username);
        }
    }

    static deleteDeckForUser(username, deckId) {
        const decks = this.getDecks(username).filter(d => d.id !== deckId);
        this.saveDecks(decks, username);
    }
}