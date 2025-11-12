# 🚀 Hướng Dẫn Đẩy GitHub - Bước Cuối Cùng

## ✅ Bạn Đã Hoàn Thành:

- ✅ Cấu hình Git: `user.name=lfuonq4953`, `user.email=lfuoq4953@gmail.com`
- ✅ Commit lần đầu: "Initial commit: Quiz Mode and AI Vocabulary Generator"
- ✅ 30 files đã được lưu trong Git

---

## 🎯 Tiếp Theo: Đẩy Lên GitHub

### Bước 1: Tạo Repository Trên GitHub

**1.1 - Truy Cập GitHub**
- Vào https://github.com
- Đăng nhập với tài khoản của bạn (nếu chưa có thì tạo)

**1.2 - Tạo Repository Mới**
- Click avatar (góc phải trên) → "Your repositories"
- Click nút "New" (xanh, bên trái)

**1.3 - Điền Thông Tin**

```
Repository name:  flashcard-app
Description:      English Flashcard Learning App with Quiz Mode and AI Vocabulary
Public/Private:   Public (để mọi người có thể xem)
Add README:       NO (vì đã có sẵn)
Add .gitignore:   NO (đã tạo)
License:          MIT (tùy chọn)
```

- Click "Create repository"

**1.4 - Sao Chép URL**

Sau khi tạo, bạn sẽ thấy một URL giống như:
```
https://github.com/lfuonq4953/flashcard-app.git
```

**💾 Lưu URL này - dùng ở bước tiếp theo!**

---

### Bước 2: Kết Nối Với GitHub

Chạy lệnh này (thay `lfuonq4953` bằng username của bạn nếu khác):

```powershell
cd e:\Web\flashcard-app
git remote add origin https://github.com/lfuonq4953/flashcard-app.git
```

**Kiểm tra**:
```powershell
git remote -v
```

**Kết quả sẽ hiển thị**:
```
origin  https://github.com/lfuonq4953/flashcard-app.git (fetch)
origin  https://github.com/lfuonq4953/flashcard-app.git (push)
```

---

### Bước 3: Đẩy Code Lên GitHub

```powershell
cd e:\Web\flashcard-app
git push -u origin master
```

**Nếu được hỏi username/password**:
- Username: `lfuonq4953`
- Password: **Personal Access Token** (xem hướng dẫn dưới)

---

## ⚠️ Nếu Bị Lỗi Auth (Authentication)

GitHub yêu cầu **Personal Access Token** thay vì password:

### Tạo Token:

1. Đăng nhập GitHub
2. Click avatar → "Settings"
3. Click "Developer settings" (cuối menu bên trái)
4. Click "Personal access tokens" → "Tokens (classic)"
5. Click "Generate new token" (classic)
6. Điền:
   - **Note**: `flashcard-app`
   - **Expiration**: 90 days
   - **Scopes**: Chọn `repo` (full control of repositories)
7. Click "Generate token"
8. **Copy token vừa tạo** (không thể xem lại, nên copy ngay)

### Dùng Token:

Khi `git push` hỏi password, hãy dán token vừa tạo:
```
Username: lfuonq4953
Password: (dán token vừa tạo)
```

---

## 🚀 Lệnh Hoàn Chỉnh (Copy & Paste)

Chạy tuần tự:

```powershell
# 1. Vào folder
cd e:\Web\flashcard-app

# 2. Kiểm tra status
git status

# 3. Kết nối với GitHub (nếu chưa kết nối)
git remote add origin https://github.com/lfuonq4953/flashcard-app.git

# 4. Kiểm tra remote
git remote -v

# 5. Đẩy lên GitHub
git push -u origin master

# 6. Kiểm tra kết quả
git remote show origin
```

---

## ✅ Nếu Thành Công

Bạn sẽ thấy kết quả như thế này:

```
Enumerating objects: 31, done.
Counting objects: 100% (31/31), done.
Delta compression using up to 8 threads
Compressing objects: 100% (28/28), done.
Writing objects: 100% (31/31), 95.23 KiB | 1.23 MiB/s, done.
Total 31 (delta 0), reused 0 (delta 0), pack-reused 0
To https://github.com/lfuonq4953/flashcard-app.git
 * [new branch]      master -> master
Branch 'master' set up to track remote branch 'master' from 'origin'.
```

---

## 🎉 Sau Khi Upload Xong

### URL GitHub Của Bạn:
```
https://github.com/lfuonq4953/flashcard-app
```

### Để Deploy Lên Web (GitHub Pages - FREE):

1. Trên GitHub, vào repository
2. Click "Settings" (tab bên phải)
3. Click "Pages" (menu bên trái)
4. Chọn:
   - Source: `master` branch
   - Folder: `/ (root)`
5. Click Save

**Sau 1-2 phút, URL live sẽ là**:
```
https://lfuonq4953.github.io/flashcard-app/
```

---

## 📝 Troubleshooting

### ❌ "fatal: not a git repository"
```powershell
# Solution: Chạy git init trước
git init
```

### ❌ "fatal: remote origin already exists"
```powershell
# Solution: Xóa remote cũ
git remote remove origin
# Rồi thêm lại
git remote add origin https://github.com/lfuonq4953/flashcard-app.git
```

### ❌ "fatal: Authentication failed"
- Dùng Personal Access Token (không phải password)
- Token phải có scope `repo`
- Token không hết hạn

### ❌ GitHub Pages không hoạt động
- Chờ 2-3 phút
- Clear browser cache (Ctrl+Shift+Delete)
- Kiểm tra Settings → Pages: branch phải là `master`

---

## 🔄 Lần Sau Cập Nhật Code

Bất kỳ khi nào bạn update code:

```powershell
cd e:\Web\flashcard-app

# Xem thay đổi
git status

# Thêm files
git add .

# Commit
git commit -m "Update: Thêm tính năng X"

# Đẩy lên GitHub (lần này không cần `-u origin`)
git push
```

---

## ✨ Kết Quả Cuối Cùng

### 📌 Code Trên GitHub:
```
https://github.com/lfuonq4953/flashcard-app
```

### 🌐 Live Web App:
```
https://lfuonq4953.github.io/flashcard-app/
```

**🎊 Xong! App của bạn giờ đã online rồi!**

Bạn có thể chia sẻ link với bạn bè để demo! 🎓

---

## ❓ Cần Giúp?

Xem file: `GITHUB_DEPLOY_GUIDE.md` (hướng dẫn chi tiết)

Hoặc xem: [GitHub Docs](https://docs.github.com)
