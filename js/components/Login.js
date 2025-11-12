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
                    
                    <div class="login-tabs">
                        <button class="tab-btn active" id="login-tab">Login</button>
                        <button class="tab-btn" id="register-tab">Register</button>
                    </div>

                    <!-- Login Form -->
                    <form id="login-form" class="login-tab-content">
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input type="text" id="username" placeholder="Enter your username" required>
                        </div>

                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" id="password" placeholder="Enter your password" required>
                        </div>

                        <button type="submit" class="btn" style="width: 100%; margin-top: 20px;">
                            🔓 Login
                        </button>
                    </form>

                    <!-- Register Form -->
                    <form id="register-form" class="login-tab-content hidden">
                        <div class="form-group">
                            <label for="reg-username">Username</label>
                            <input type="text" id="reg-username" placeholder="Create a username" required>
                        </div>

                        <div class="form-group">
                            <label for="reg-password">Password</label>
                            <input type="password" id="reg-password" placeholder="Create a password" required>
                        </div>

                        <div class="form-group">
                            <label for="reg-confirm-password">Confirm Password</label>
                            <input type="password" id="reg-confirm-password" placeholder="Confirm password" required>
                        </div>

                        <button type="submit" class="btn" style="width: 100%; margin-top: 20px;">
                            ✅ Create Account
                        </button>
                    </form>

                    <div style="margin-top: 20px; text-align: center; color: rgba(255,255,255,0.7);">
                        <p style="font-size: 0.9rem;">💡 Đăng nhập hoặc tạo tài khoản mới</p>
                    </div>
                </div>
            </div>
        `;

        this.attachEventListeners();
    }

    attachEventListeners() {
        // Tab switching
        document.getElementById('login-tab')?.addEventListener('click', () => {
            this.switchTab('login');
        });

        document.getElementById('register-tab')?.addEventListener('click', () => {
            this.switchTab('register');
        });

        // Login form
        document.getElementById('login-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            if (!username || !password) {
                alert('Please enter username and password');
                return;
            }

            this.onLogin(username, password, false);
        });

        // Register form
        document.getElementById('register-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = document.getElementById('reg-username').value.trim();
            const password = document.getElementById('reg-password').value.trim();
            const confirmPassword = document.getElementById('reg-confirm-password').value.trim();

            if (!username || !password) {
                alert('Please fill in all fields');
                return;
            }

            if (username.length < 3) {
                alert('Username must be at least 3 characters');
                return;
            }

            if (password.length < 4) {
                alert('Password must be at least 4 characters');
                return;
            }

            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            this.onLogin(username, password, true, false);
        });
    }

    switchTab(tab) {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        document.querySelectorAll('.login-tab-content').forEach(content => {
            content.classList.add('hidden');
        });

        if (tab === 'login') {
            document.getElementById('login-tab').classList.add('active');
            document.getElementById('login-form').classList.remove('hidden');
        } else {
            document.getElementById('register-tab').classList.add('active');
            document.getElementById('register-form').classList.remove('hidden');
        }
    }
}
