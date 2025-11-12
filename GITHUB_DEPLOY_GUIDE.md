# 🚀 Hướng Dẫn Đẩy GitHub & Deploy Lên Web

## 📋 Mục Lục
1. [Khởi Tạo Git Locally](#1-khởi-tạo-git-locally)
2. [Tạo Repository Trên GitHub](#2-tạo-repository-trên-github)
3. [Đẩy Code Lên GitHub](#3-đẩy-code-lên-github)
4. [Deploy Lên Web](#4-deploy-lên-web)

---

## 1️⃣ Khởi Tạo Git Locally

### Bước 1: Kiểm Tra Git Đã Cài Chưa

```powershell
git --version
```

**Nếu chưa cài**: Tải từ [git-scm.com](https://git-scm.com/)

### Bước 2: Cấu Hình Git

```powershell
# Nhập tên và email của bạn
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Kiểm tra cấu hình
git config --global --list
```

### Bước 3: Khởi Tạo Repository Locally

```powershell
cd e:\Web\flashcard-app

# Khởi tạo git
git init

# Xem status
git status
```

### Bước 4: Tạo File `.gitignore`

Tạo file `e:\Web\flashcard-app\.gitignore`:

```
# Dependencies
node_modules/
npm-debug.log
yarn-error.log

# Environment
.env
.env.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Build/Dist
dist/
build/
```

### Bước 5: Thêm & Commit Files

```powershell
# Thêm tất cả files
git add .

# Kiểm tra files sẽ commit
git status

# Commit lần đầu
git commit -m "Initial commit: Quiz Mode and AI Vocabulary Generator"

# Kiểm tra commit
git log --oneline
```

---

## 2️⃣ Tạo Repository Trên GitHub

### Bước 1: Tạo Tài Khoản GitHub (Nếu chưa có)

1. Truy cập [github.com](https://github.com)
2. Click "Sign Up"
3. Điền email, password, username
4. Xác nhận email

### Bước 2: Tạo Repository Mới

1. Click avatar → "Your repositories"
2. Click "New" button
3. Điền thông tin:

```
Repository name: flashcard-app
Description: English Flashcard Learning App with Quiz Mode and AI Vocabulary
Public/Private: Public (để demo) hoặc Private
Add README: NO (vì đã có)
Add .gitignore: NO (đã tạo)
License: MIT (nếu muốn)
```

4. Click "Create repository"

### Bước 3: Copy Repository URL

Sau khi tạo, bạn sẽ thấy URL giống như:
```
https://github.com/YOUR_USERNAME/flashcard-app.git
```

---

## 3️⃣ Đẩy Code Lên GitHub

### Bước 1: Thêm Remote Repository

```powershell
git remote add origin https://github.com/YOUR_USERNAME/flashcard-app.git
```

**Thay `YOUR_USERNAME` bằng username GitHub của bạn**

### Bước 2: Rename Branch (Nếu cần)

```powershell
# Xem branch hiện tại
git branch

# Nếu là "master", đổi thành "main"
git branch -M main
```

### Bước 3: Đẩy Code Lên

```powershell
# Lần đầu tiên (cần nhập GitHub credentials)
git push -u origin main

# Nếu được hỏi, nhập:
# Username: YOUR_GITHUB_USERNAME
# Password: Tạo Personal Access Token (xem bên dưới)
```

### ⚠️ Nếu Bị Lỗi Auth

GitHub yêu cầu Personal Access Token (không dùng password):

1. **Tạo Token**:
   - Đi [github.com/settings/tokens](https://github.com/settings/tokens)
   - Click "Generate new token"
   - Chọn scopes: `repo`, `workflow`
   - Copy token

2. **Dùng Token**:
   ```powershell
   # Khi được hỏi password, dán token token bạn vừa tạo
   git push -u origin main
   ```

### Bước 4: Xác Nhận Upload

```powershell
# Kiểm tra remote
git remote -v

# Kiểm tra branch
git branch -a
```

✅ **Nếu thành công**: Truy cập `github.com/YOUR_USERNAME/flashcard-app` để xem code!

---

## 4️⃣ Deploy Lên Web

### 🌟 Option 1: GitHub Pages (FREE, TỐT NHẤT!)

#### Bước 1: Bật GitHub Pages

1. Đi GitHub repository → Settings
2. Tìm "Pages" ở menu bên trái
3. Chọn:
   - Source: `main` branch
   - Folder: `/ (root)`
4. Click Save

#### Bước 2: Chờ Deploy

- GitHub sẽ tự động deploy
- Sau 1-2 phút, sẽ thấy URL:
  ```
  https://YOUR_USERNAME.github.io/flashcard-app/
  ```

#### Bước 3: Test

- Truy cập URL vừa tạo
- App sẽ chạy trực tiếp!

**Ưu điểm**:
- ✅ Hoàn toàn FREE
- ✅ Tự động deploy khi push code
- ✅ HTTPS có sẵn
- ✅ Không cần cấu hình phức tạp

---

### 🚀 Option 2: Netlify (FREE, DỄ HƠN)

#### Bước 1: Đăng Ký Netlify

1. Truy cập [netlify.com](https://netlify.com)
2. Click "Sign up"
3. Chọn "Sign up with GitHub"
4. Authorize Netlify

#### Bước 2: Deploy

1. Click "New site from Git"
2. Chọn "GitHub"
3. Tìm & chọn `flashcard-app` repository
4. Build settings:
   - Build command: (để trống)
   - Publish directory: `.` (root folder)
5. Click "Deploy site"

#### Bước 3: Đợi Deploy

- Netlify sẽ deploy từ GitHub
- Sau 1 phút, sẽ được URL như:
  ```
  https://YOUR_SITE_NAME.netlify.app/
  ```

**Ưu điểm**:
- ✅ Dễ cấu hình
- ✅ Tự động deploy khi push
- ✅ Performance tốt
- ✅ Hỗ trợ custom domain

---

### 🎯 Option 3: Vercel (FREE, PERFORMANCE TỐT)

#### Bước 1: Đăng Ký Vercel

1. Truy cập [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Chọn "Continue with GitHub"
4. Authorize Vercel

#### Bước 2: Import Project

1. Click "New Project"
2. Chọn `flashcard-app` repository
3. Vercel sẽ tự động detect cấu hình
4. Click "Deploy"

#### Bước 3: Lấy URL

```
https://flashcard-app-YOUR_USERNAME.vercel.app/
```

**Ưu điểm**:
- ✅ Performance cực tốt
- ✅ Tự động optimize
- ✅ Custom domain dễ
- ✅ Hỗ trợ API routes

---

### 💻 Option 4: Hosting Truyền Thống (Có Phí)

#### Các Tùy Chọn:
- **Bluehost/Hostinger** (~$3-5/tháng)
- **Cpanel Hosting** (~$5-10/tháng)
- **AWS S3 + CloudFront** (~$1-5/tháng)

#### Cách Deploy (Bluehost):
1. Upload files qua FTP
2. Trỏ domain về hosting
3. Xong!

---

## 📊 So Sánh Các Option

| Feature | GitHub Pages | Netlify | Vercel | Hosting |
|---------|-------------|---------|--------|---------|
| **Giá** | FREE | FREE | FREE | $3-10 |
| **Setup** | Dễ | Dễ | Dễ | Phức Tạp |
| **Deploy Tự Động** | ✅ | ✅ | ✅ | ❌ |
| **HTTPS** | ✅ | ✅ | ✅ | ✅ |
| **Performance** | Tốt | Tốt | Rất Tốt | Tùy |
| **Custom Domain** | ✅ | ✅ | ✅ | ✅ |

**🎯 KHUYẾN NGHỊ**: Dùng **GitHub Pages** nếu đơn giản, hoặc **Netlify** nếu cần nhiều tính năng!

---

## 📝 Quy Trình Làm Việc Hàng Ngày

Sau khi setup xong, mỗi khi update code:

```powershell
# 1. Xem thay đổi
git status

# 2. Thêm files
git add .

# 3. Commit
git commit -m "Description of changes"

# 4. Đẩy lên GitHub
git push origin main

# Xong! Deploy sẽ tự động nếu dùng GitHub Pages/Netlify
```

---

## 🎓 Git Lệnh Cơ Bản

```powershell
# Xem lịch sử commit
git log --oneline

# Xem thay đổi (trước khi add)
git diff

# Hoàn tác thay đổi
git checkout -- FILE_NAME

# Xóa file khỏi git
git rm --cached FILE_NAME

# Rename branch
git branch -m OLD_NAME NEW_NAME

# Tạo branch mới
git checkout -b FEATURE_NAME

# Merge branch
git merge FEATURE_NAME
```

---

## ✅ Checklist Deploy

- [ ] Cài đặt Git
- [ ] Cấu hình Git (name, email)
- [ ] Khởi tạo Git locally (`git init`)
- [ ] Tạo `.gitignore`
- [ ] Commit lần đầu
- [ ] Tạo GitHub repository
- [ ] Thêm remote (`git remote add origin ...`)
- [ ] Đẩy code lên GitHub (`git push -u origin main`)
- [ ] Bật GitHub Pages hoặc dùng Netlify
- [ ] Test URL live
- [ ] ✅ Xong!

---

## 🎉 Khi Deploy Thành Công

### URL Live của Bạn:

**GitHub Pages**:
```
https://YOUR_USERNAME.github.io/flashcard-app/
```

**Netlify**:
```
https://YOUR_SITE_NAME.netlify.app/
```

**Vercel**:
```
https://flashcard-app-YOUR_USERNAME.vercel.app/
```

---

## 🚨 Troubleshooting

### Problem: "fatal: not a git repository"
```powershell
# Solution: Chạy git init trước
git init
```

### Problem: "remote already exists"
```powershell
# Solution: Xóa remote cũ
git remote remove origin
# Rồi thêm lại
git remote add origin ...
```

### Problem: GitHub Pages không hiển thị
- Chờ 2-3 phút
- Clear browser cache (Ctrl+Shift+Delete)
- Kiểm tra repo settings → Pages

### Problem: Deploy chậm
- Netlify/Vercel có thể mất 1-2 phút lần đầu
- Lần sau sẽ nhanh hơn

---

## 📞 Cần Giúp?

Xem thêm:
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com)
- [Netlify Docs](https://docs.netlify.com)
- [Vercel Docs](https://vercel.com/docs)

---

**🎊 Xong! Code của bạn giờ đã online rồi!**

Link GitHub: `https://github.com/YOUR_USERNAME/flashcard-app`
Link Live: `https://YOUR_USERNAME.github.io/flashcard-app/`

🚀 **Chia sẻ link với bạn bè để demo app!**
