// Theme Manager
export class ThemeManager {
    constructor() {
        this.THEME_KEY = 'flashcard_theme';
        this.DARK_MODE = 'dark';
        this.LIGHT_MODE = 'light';
        this.init();
    }

    init() {
        // Get saved theme or default to light
        const savedTheme = localStorage.getItem(this.THEME_KEY) || this.LIGHT_MODE;
        this.setTheme(savedTheme);
        
        // Attach toggle listener
        this.attachToggleListener();
    }

    setTheme(theme) {
        // Validate theme
        if (theme !== this.DARK_MODE && theme !== this.LIGHT_MODE) {
            theme = this.LIGHT_MODE;
        }

        // Apply theme
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(this.THEME_KEY, theme);

        // Update toggle button icon
        this.updateToggleIcon(theme);
    }

    toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme') || this.LIGHT_MODE;
        const next = current === this.LIGHT_MODE ? this.DARK_MODE : this.LIGHT_MODE;
        this.setTheme(next);
    }

    updateToggleIcon(theme) {
        const button = document.getElementById('theme-toggle');
        if (button) {
            button.textContent = theme === this.LIGHT_MODE ? '🌙' : '☀️';
            button.title = theme === this.LIGHT_MODE ? 'Switch to dark mode' : 'Switch to light mode';
        }
    }

    attachToggleListener() {
        const button = document.getElementById('theme-toggle');
        if (button) {
            button.addEventListener('click', () => this.toggleTheme());
        }
    }

    getCurrentTheme() {
        return document.documentElement.getAttribute('data-theme') || this.LIGHT_MODE;
    }

    isDarkMode() {
        return this.getCurrentTheme() === this.DARK_MODE;
    }
}
