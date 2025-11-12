export class Login {
    constructor(container, onLogin) {
        this.container = container;
        this.onLogin = onLogin;
        
        // Admin credentials (fixed)
        this.ADMIN_USERNAME = 'admin-laiphuong4953';
        this.ADMIN_PASSWORD = 'laiphuong4953';
    }

    render() {
        this.container.innerHTML = `
            <div class="login-container">
                <div class="login-box">
                    <h1 style="color: white; text-align: center; margin-bottom: 30px;">📚 English Flashcard</h1>
                    
                    <!-- Login Form Only (No Register) -->
                    <form id="login-form">
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input type="text" id="username" placeholder="admin-laiphuong4953" required>
                        </div>

                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" id="password" placeholder="laiphuong4953" required>
                        </div>

                        <button type="submit" class="btn" style="width: 100%; margin-top: 20px;">
                            🔓 Login
                        </button>
                    </form>

                    <div style="margin-top: 20px; text-align: center; color: rgba(255,255,255,0.7);">
                        <p style="font-size: 0.9rem;">🔑 Admin Account Only</p>
                    </div>
                </div>
            </div>
        `;

        this.attachEventListeners();
    }

    attachEventListeners() {
        // Login form
        document.getElementById('login-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            // Validate with admin credentials
            if (username === this.ADMIN_USERNAME && password === this.ADMIN_PASSWORD) {
                this.onLogin(username, password, false);
            } else {
                alert('❌ Invalid credentials!\n\nUsername: admin-laiphuong4953\nPassword: laiphuong4953');
            }
        });
    }

    switchTab(tab) {
        // Tab switching removed - no longer needed
    }
}
