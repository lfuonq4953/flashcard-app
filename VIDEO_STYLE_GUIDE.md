# 🎬 HƯỚNG DẪN CHI TIẾT (Step-by-Step Video Style)

## 📺 PHẦN 1: Tạo Repository GitHub (5 Phút)

### Screen 1: Vào github.com/new

```
1. Mở browser
2. Gõ: https://github.com/new
3. Bạn sẽ thấy form "Create a new repository"
```

### Screen 2: Điền Form

```
┌─────────────────────────────────────────────────┐
│ Create a new repository                         │
├─────────────────────────────────────────────────┤
│                                                 │
│ Repository name *                               │
│ ┌─────────────────────────────────────────────┐ │
│ │ flashcard-app                               │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ Description (optional)                          │
│ ┌─────────────────────────────────────────────┐ │
│ │ English Flashcard Learning App with Quiz    │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ ⦿ Public    ○ Private                          │
│                                                 │
│ ☐ Add a README file                             │
│ ☐ Add .gitignore                                │
│ ☐ Choose a license                              │
│                                                 │
│              [Create repository]                │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Screen 3: Repository Được Tạo

```
Bạn sẽ thấy trang như này:

┌──────────────────────────────────────────────┐
│ lfuonq4953 / flashcard-app                   │
├──────────────────────────────────────────────┤
│ Code  Issues  Pull requests  Discussions   │
├──────────────────────────────────────────────┤
│                                              │
│ Or push an existing repository from the      │
│ command line:                                │
│                                              │
│ git remote add origin \                      │
│  https://github.com/lfuonq4953/...          │
│ git branch -M main                           │
│ git push -u origin main                      │
│                                              │
└──────────────────────────────────────────────┘
```

---

## 📺 PHẦN 2: Push Code (5 Phút)

### Screen 1: Mở PowerShell

```powershell
PS C:\Users\YourName> _
```

**Hoặc dùng VS Code**:
- Nhấn Ctrl+` (backtick)
- Chọn PowerShell

### Screen 2: Chạy 2 Lệnh

```powershell
# Đi vào folder project
cd e:\Web\flashcard-app

# Kết nối với GitHub
git remote add origin https://github.com/lfuonq4953/flashcard-app.git

# Đẩy code lên
git push -u origin master
```

**Kết quả hiển thị**:
```powershell
PS E:\Web\flashcard-app> git push -u origin master
Enumerating objects: 31, done.
Counting objects: 100% (31/31), done.
Delta compression using up to 8 threads
Compressing objects: 100% (28/28), done.
Writing objects: 100% (31/31), 95.23 KiB | 1.23 MiB/s, done.
Total 31 (delta 0), reused 0 (delta 0), pack-reused 0
To https://github.com/lfuonq4953/flashcard-app.git
 * [new branch]      master -> master
Branch 'master' set up to track remote branch 'master' from 'origin'.
PS E:\Web\flashcard-app> _
```

✅ **Xong! Code đã lên GitHub!**

---

## 📺 PHẦN 3: Deploy Lên Web (3 Phút)

### Screen 1: Vào Settings

```
1. Vào: https://github.com/lfuonq4953/flashcard-app
2. Click tab "Settings" (bên phải)
3. Click "Pages" ở menu bên trái
```

### Screen 2: Cấu Hình GitHub Pages

```
┌───────────────────────────────────────────┐
│ GitHub Pages                              │
├───────────────────────────────────────────┤
│                                           │
│ Source                                    │
│ ┌──────────────────────────────────────┐  │
│ │ Deploy from a branch       ▼         │  │
│ └──────────────────────────────────────┘  │
│                                           │
│ Branch                                    │
│ ┌──────────────────────────────────────┐  │
│ │ master    ▼              / (root)  ▼│  │
│ └──────────────────────────────────────┘  │
│                                           │
│         [Save]                            │
│                                           │
└───────────────────────────────────────────┘
```

### Screen 3: Chờ Deploy

```
┌─────────────────────────────────────────┐
│ GitHub Pages                            │
├─────────────────────────────────────────┤
│                                         │
│ Your site is live at:                   │
│ https://lfuonq4953.github.io/           │
│     flashcard-app/                      │
│                                         │
│ ✓ Your site is published               │
│                                         │
└─────────────────────────────────────────┘
```

**Chờ 2-3 phút rồi truy cập link!** ✅

---

## 🔑 NẾুُ HỎI MẬT KHẨU

### Screen: Terminal Hỏi

```powershell
Username for 'https://github.com': 
```

**Nhập**:
```
lfuonq4953
```

Khi hỏi password:
```powershell
Password for 'https://github.com': 
```

**KHÔNG nhập GitHub password!**

**Thay vào đó, dùng Personal Access Token**:

1. Vào: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Chọn scope: ✅ `repo`
4. Click "Generate token"
5. Copy token dài dòng
6. **Dán vào PowerShell** rồi Enter

---

## 📊 QUÁ TRÌNH ĐẦY ĐỦ (Diagram)

```
╔════════════════════════════════════════════════════════╗
║ GIT WORKFLOW: Local → GitHub → Web                    ║
╚════════════════════════════════════════════════════════╝

Máy Tính (Local)
├─ Folder: e:\Web\flashcard-app
├─ Git init (✅ đã xong)
├─ Commit (✅ đã xong)
│
│  ↓ git remote add origin
│  ↓ git push -u origin master
│
GitHub (Remote)
├─ Repository: lfuonq4953/flashcard-app
├─ Branch: master
├─ Files: 30+ files uploaded
│
│  ↓ GitHub Pages auto-deploy (2-3 phút)
│
Web (Live)
└─ URL: https://lfuonq4953.github.io/flashcard-app/
   └─ App running online! 🎉
```

---

## 🎯 LỆNH RẤT NGẮN (Copy & Paste)

```powershell
# 1 - Kết nối GitHub
git remote add origin https://github.com/lfuonq4953/flashcard-app.git

# 2 - Đẩy code
git push -u origin master

# 3 - [Xong! Giờ bật GitHub Pages trên web]
```

---

## ✅ CHECKLIST HOÀN THÀNH

- [x] Cấu hình Git locally
- [x] Commit code
- [ ] **Tạo repo GitHub** ← BƯỚC TIẾP THEO
- [ ] **Chạy git push**
- [ ] **Bật GitHub Pages**
- [ ] **Test link live**

---

## 🌟 MỤC ĐÍCH CỦA MỖI BƯỚC

| Bước | Mục Đích | Kết Quả |
|------|----------|---------|
| Git init + Commit | Lưu code cục bộ | Code đã backup |
| Tạo Repo GitHub | Tạo chỗ chứa code trên web | Repo rỗng trên GitHub |
| Git Push | Đẩy code từ máy lên GitHub | Code online |
| GitHub Pages | Publish app thành website | Link live app |

---

## 🎓 GIẢI THÍCH

### Git = Version Control
- Quản lý thay đổi code
- Lưu lịch sử
- Dễ rollback

### GitHub = Nơi Lưu Trữ
- Backup code
- Chia sẻ code
- Quản lý team

### GitHub Pages = Hosting Miễn Phí
- Chuyển folder thành website
- Tự động deploy
- Hoàn toàn FREE

---

## 📸 KHI XONG, BẠN SẼ CÓ

1. **GitHub Profile**:
   ```
   https://github.com/lfuonq4953
   ```

2. **Repository**:
   ```
   https://github.com/lfuonq4953/flashcard-app
   ```

3. **Live App**:
   ```
   https://lfuonq4953.github.io/flashcard-app/
   ```

**Có thể chia sẻ link #3 với bạn bè! 🎓**

---

## 🚨 COMMON MISTAKES

❌ **Nhập GitHub password thay vì token**
→ ✅ Dùng Personal Access Token

❌ **Quên tạo repo GitHub**
→ ✅ Phải vào github.com/new trước

❌ **Repo name sai**
→ ✅ Phải tên: `flashcard-app`

❌ **Quên bật GitHub Pages**
→ ✅ Vào Settings → Pages → Enable

---

## 💡 MẸO

- **Nếu quên token**: Tạo cái mới ở github.com/settings/tokens
- **Nếu quên repo URL**: Vào repo GitHub, click Code (xanh)
- **Nếu push lỗi**: Kiểm tra `git remote -v`
- **Nếu Pages không live**: Chờ 2-3 phút, clear cache

---

**🎬 CHỈ 10 PHÚT LÀ XONG!**

Bạn sẵn sàng chưa? 🚀
