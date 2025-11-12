import { StorageService } from '../storage.js';

export class AdminDashboard {
    constructor(container, onLogout, onRoleChange, onDeleteUser, onManageDeck) {
        this.container = container;
        this.onLogout = onLogout;
        this.onRoleChange = onRoleChange;
        this.onDeleteUser = onDeleteUser;
        this.onManageDeck = onManageDeck;
        this.currentTab = 'users';
    }

    render() {
        const users = StorageService.getAllUsersWithStats();
        
        this.container.innerHTML = `
            <div class="admin-header">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <h2 style="color: white; margin-bottom: 5px;">👨‍💼 Admin Dashboard</h2>
                        <p style="color: rgba(255,255,255,0.7); margin: 0;">Manage users and vocabularies</p>
                    </div>
                    <button class="btn btn-danger" id="logout-btn">🔓 Logout</button>
                </div>
            </div>

            <div class="admin-tabs">
                <button class="admin-tab-btn active" data-tab="users">👥 Manage Users</button>
                <button class="admin-tab-btn" data-tab="stats">📊 Statistics</button>
            </div>

            <!-- Users Tab -->
            <div id="users-tab" class="admin-tab-content">
                <div class="users-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Role</th>
                                <th>Decks</th>
                                <th>Total Cards</th>
                                <th>Mastered</th>
                                <th>Registered</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${users.map((user, index) => this.renderUserRow(user, index)).join('')}
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Stats Tab -->
            <div id="stats-tab" class="admin-tab-content hidden">
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-number">${users.length}</div>
                        <div class="stat-label">Total Users</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${users.filter(u => u.role === 'admin').length}</div>
                        <div class="stat-label">Admin Accounts</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${users.reduce((sum, u) => sum + u.stats.totalDecks, 0)}</div>
                        <div class="stat-label">Total Decks</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${users.reduce((sum, u) => sum + u.stats.totalCards, 0)}</div>
                        <div class="stat-label">Total Cards</div>
                    </div>
                </div>

                <h3 style="color: white; margin-top: 40px; margin-bottom: 20px;">User Activity</h3>
                <div class="users-activity">
                    ${users.map(user => `
                        <div class="activity-card">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                                <strong>${user.username}</strong>
                                <span style="background: ${user.role === 'admin' ? '#667eea' : '#48bb78'}; color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.85rem;">
                                    ${(user.role || 'user').toUpperCase()}
                                </span>
                            </div>
                            <div style="color: rgba(255,255,255,0.7); font-size: 0.9rem;">
                                <p>📚 Decks: ${user.stats.totalDecks} | 📝 Cards: ${user.stats.totalCards} | ✅ Mastered: ${user.stats.masteredCards}</p>
                                <p style="opacity: 0.7;">Registered: ${new Date(user.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        this.attachEventListeners();
    }

    renderUserRow(user, index) {
        const date = new Date(user.createdAt).toLocaleDateString();
        const role = user.role || 'user';
        
        return `
            <tr>
                <td><strong>${user.username}</strong></td>
                <td>
                    <select class="role-select" data-username="${user.username}">
                        <option value="user" ${role === 'user' ? 'selected' : ''}>User</option>
                        <option value="admin" ${role === 'admin' ? 'selected' : ''}>Admin</option>
                    </select>
                </td>
                <td>${user.stats.totalDecks}</td>
                <td>${user.stats.totalCards}</td>
                <td>${user.stats.masteredCards}</td>
                <td>${date}</td>
                <td>
                    <button class="btn-small btn-view" data-username="${user.username}">👁️ View</button>
                    <button class="btn-small btn-delete" data-username="${user.username}">🗑️</button>
                </td>
            </tr>
        `;
    }

    attachEventListeners() {
        // Tab switching
        document.querySelectorAll('.admin-tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Logout
        document.getElementById('logout-btn')?.addEventListener('click', () => {
            if (confirm('Are you sure you want to logout?')) {
                this.onLogout();
            }
        });

        // Role change
        document.querySelectorAll('.role-select').forEach(select => {
            select.addEventListener('change', (e) => {
                const username = e.target.dataset.username;
                const newRole = e.target.value;
                this.onRoleChange(username, newRole);
            });
        });

        // Delete user
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const username = e.target.dataset.username;
                this.onDeleteUser(username);
            });
        });

        // View user decks
        document.querySelectorAll('.btn-view').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const username = e.target.dataset.username;
                this.viewUserDecks(username);
            });
        });
    }

    switchTab(tab) {
        document.querySelectorAll('.admin-tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        document.querySelectorAll('.admin-tab-content').forEach(content => {
            content.classList.add('hidden');
        });

        document.querySelector(`[data-tab="${tab}"]`)?.classList.add('active');
        document.getElementById(`${tab}-tab`)?.classList.remove('hidden');
        
        this.currentTab = tab;
    }

    viewUserDecks(username) {
        const decks = StorageService.getUserDecksForAdmin(username);
        
        const message = `
${username}'s Decks:

${decks.map(deck => `
📚 ${deck.name}
   Description: ${deck.description}
   Cards: ${deck.cards.length}
   Mastered: ${deck.cards.filter(c => c.mastered).length}
`).join('\n')}
        `;

        alert(message);
    }
}
