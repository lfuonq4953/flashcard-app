import { StorageService } from './storage.js';
import { Login } from './components/Login.js';
import { DeckList } from './components/DeckList.js';
import { StudyMode } from './components/StudyMode.js';
import { QuizMode } from './components/QuizMode.js';
import { DeckEditor } from './components/DeckEditor.js';
import { ExcelImport } from './components/ExcelImport.js';
import { AdminDashboard } from './components/AdminDashboard.js';

class FlashcardApp {
    constructor() {
        this.loginContainer = document.getElementById('login');
        this.deckListContainer = document.getElementById('deck-list');
        this.studyModeContainer = document.getElementById('study-mode');
        this.quizModeContainer = document.getElementById('quiz-mode');
        this.editorContainer = document.getElementById('deck-editor');
        this.excelImportContainer = document.getElementById('excel-import');
        this.adminContainer = document.getElementById('admin');
        this.headerContainer = document.querySelector('.header');
        
        this.currentView = 'login';
        this.currentUser = null;
        this.init();
    }

    init() {
        // Check if user already logged in
        const user = StorageService.getCurrentUser();
        if (user) {
            this.currentUser = user;
            this.showDeckList();
        } else {
            this.showLogin();
        }
    }

    showLogin() {
        this.hideAllViews();
        this.loginContainer.classList.remove('hidden');
        this.headerContainer.classList.add('hidden');
        this.currentView = 'login';

        const login = new Login(
            this.loginContainer,
            (username, password, isRegister, isAdmin) => this.handleLogin(username, password, isRegister, isAdmin)
        );
        login.render();
    }

    handleLogin(username, password, isRegister = false, isAdmin = false) {
        try {
            const users = StorageService.getAllUsers();
            const userExists = users.find(u => u.username === username);

            if (userExists && isRegister) {
                alert('Username already exists');
                return;
            }

            if (!userExists && !isRegister) {
                alert('User not found. Please register first');
                return;
            }

            if (!userExists) {
                // Register new user - check if it's the special admin account
                const isAdminAccount = username === 'admin-laiphuong4953';
                StorageService.registerUser(username, password, isAdminAccount);
                const user = StorageService.loginUser(username, password);
                this.currentUser = user;
                
                if (isAdminAccount) {
                    alert(`Welcome Admin! Account "${username}" has admin privileges.`);
                } else {
                    alert(`Account created! Welcome, ${username}!`);
                }
            } else {
                // Login existing user
                const user = StorageService.loginUser(username, password);
                this.currentUser = user;
                alert(`Welcome back, ${username}!`);
            }

            // Route to appropriate dashboard
            if (this.currentUser.role === 'admin') {
                this.showAdmin();
            } else {
                this.showDeckList();
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    }

    showDeckList() {
        this.hideAllViews();
        this.deckListContainer.classList.remove('hidden');
        this.headerContainer.classList.remove('hidden');
        this.currentView = 'deck-list';

        const decks = StorageService.getDecks();
        const isAdmin = this.currentUser?.role === 'admin';
        
        const deckList = new DeckList(
            this.deckListContainer,
            (deckId) => this.showStudyMode(deckId),
            (deckId) => this.showEditor(deckId),
            () => this.showExcelImport(),
            () => this.logout(),
            isAdmin ? () => this.showAdmin() : null
        );
        deckList.render(decks, this.currentUser?.username, isAdmin);
    }

    showStudyMode(deckId) {
        const deck = StorageService.getDeckById(deckId);
        if (!deck || deck.cards.length === 0) {
            alert('This deck has no cards!');
            return;
        }

        this.hideAllViews();
        this.studyModeContainer.classList.remove('hidden');
        this.currentView = 'study-mode';

        const studyMode = new StudyMode(
            this.studyModeContainer,
            deck,
            () => this.showDeckList(),
            (deckId, cardId, mastered) => {
                StorageService.updateCardMastery(deckId, cardId, mastered);
            },
            () => this.showQuizMode(deckId)
        );
        studyMode.render();
    }

    showQuizMode(deckId) {
        const deck = StorageService.getDeckById(deckId);
        if (!deck || deck.cards.length === 0) {
            alert('This deck has no cards!');
            return;
        }

        this.hideAllViews();
        this.quizModeContainer.classList.remove('hidden');
        this.currentView = 'quiz-mode';

        const quizMode = new QuizMode(
            this.quizModeContainer,
            deck,
            () => this.showStudyMode(deckId),
            (deckId, cardId, mastered) => {
                StorageService.updateCardMastery(deckId, cardId, mastered);
            }
        );
        quizMode.render();
    }

    showEditor(deckId) {
        this.hideAllViews();
        this.editorContainer.classList.remove('hidden');
        this.currentView = 'editor';

        const deck = deckId ? StorageService.getDeckById(deckId) : null;
        const editor = new DeckEditor(
            this.editorContainer,
            deck,
            (updatedDeck) => {
                if (updatedDeck.id) {
                    StorageService.updateDeck(updatedDeck.id, updatedDeck);
                } else {
                    StorageService.addDeck(updatedDeck);
                }
                this.showDeckList();
            },
            () => this.showDeckList(),
            (deckId) => {
                StorageService.deleteDeck(deckId);
                this.showDeckList();
            }
        );
        editor.render();
    }

    showExcelImport() {
        this.hideAllViews();
        this.excelImportContainer.classList.remove('hidden');
        this.currentView = 'excel-import';

        const excelImport = new ExcelImport(
            this.excelImportContainer,
            (deck) => {
                StorageService.addDeck(deck);
                alert(`Successfully imported ${deck.cards.length} cards!`);
                this.showDeckList();
            },
            () => this.showDeckList()
        );
        excelImport.render();
    }

    logout() {
        StorageService.logoutUser();
        this.currentUser = null;
        this.showLogin();
    }

    showAdmin() {
        this.hideAllViews();
        this.adminContainer.classList.remove('hidden');
        this.headerContainer.classList.remove('hidden');
        this.currentView = 'admin';

        const admin = new AdminDashboard(
            this.adminContainer,
            () => this.logout(),
            (username, role) => this.handleRoleChange(username, role),
            (username) => this.handleDeleteUser(username),
            (username, deckId) => this.handleManageDeck(username, deckId)
        );
        admin.render();
    }

    handleRoleChange(username, newRole) {
        try {
            StorageService.updateUserRole(username, newRole);
            alert(`${username}'s role updated to ${newRole}`);
            this.showAdmin();
        } catch (error) {
            alert('Error: ' + error.message);
        }
    }

    handleDeleteUser(username) {
        if (confirm(`Are you sure you want to delete ${username} and all their data?`)) {
            try {
                StorageService.deleteUser(username);
                alert(`${username} has been deleted`);
                this.showAdmin();
            } catch (error) {
                alert('Error: ' + error.message);
            }
        }
    }

    handleManageDeck(username, deckId) {
        // For future implementation - manage specific user's decks
        alert('Deck management for: ' + username);
    }

    hideAllViews() {
        this.loginContainer.classList.add('hidden');
        this.deckListContainer.classList.add('hidden');
        this.studyModeContainer.classList.add('hidden');
        this.quizModeContainer.classList.add('hidden');
        this.editorContainer.classList.add('hidden');
        this.excelImportContainer.classList.add('hidden');
        this.adminContainer.classList.add('hidden');
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FlashcardApp();
});