# English Flashcard Learning App

## 📖 Mô tả
Ứng dụng học từ vựng tiếng Anh sử dụng phương pháp flashcard, giúp người dùng học và ghi nhớ từ vựng hiệu quả.

## 🚀 Tính năng
- ✅ Tạo và quản lý nhiều bộ thẻ (decks)
- ✅ Thêm/sửa/xóa flashcards
- ✅ **Import từ vựng từ file Excel** 📊
- ✅ Chế độ học tập với hiệu ứng lật thẻ
- ✅ Đánh dấu từ đã thuộc
- ✅ Theo dõi tiến độ học tập
- ✅ Lưu trữ dữ liệu trên trình duyệt (LocalStorage)

## 📁 Cấu trúc project
\`\`\`
flashcard-app/
├── index.html              # Trang chính
├── styles/
│   └── main.css           # CSS styling
├── js/
│   ├── app.js             # Logic chính của ứng dụng
│   ├── storage.js         # Quản lý LocalStorage
│   ├── data.js            # Dữ liệu mẫu
│   └── components/
│       ├── DeckList.js    # Component danh sách bộ thẻ
│       ├── FlashCard.js   # Component flashcard (tích hợp trong StudyMode)
│       ├── StudyMode.js   # Component chế độ học
│       ├── DeckEditor.js  # Component chỉnh sửa bộ thẻ
│       └── ExcelImport.js # Component import Excel
└── README.md              # Tài liệu hướng dẫn
\`\`\`

## 🛠️ Cài đặt và Sử dụng

### Cách 1: Chạy trực tiếp
1. Tạo thư mục project và copy tất cả các file theo cấu trúc trên
2. Mở file \`index.html\` bằng trình duyệt web

### Cách 2: Sử dụng Live Server (khuyến nghị)
1. Cài đặt extension "Live Server" trong VS Code
2. Right-click vào \`index.html\` → "Open with Live Server"

## 💡 Hướng dẫn sử dụng

### Sử dụng cơ bản
1. **Xem danh sách bộ thẻ**: Màn hình chính hiển thị tất cả bộ thẻ
2. **Học từ**: Click nút "📖 Study" để bắt đầu học
3. **Lật thẻ**: Click vào thẻ để xem nghĩa tiếng Việt
4. **Đánh dấu đã thuộc**: Click "Mark as Mastered" khi đã nhớ từ
5. **Chỉnh sửa**: Click "✏️ Edit" để sửa bộ thẻ
6. **Tạo mới**: Click "➕ Create New Deck" để tạo bộ thẻ mới

### 📊 Import từ Excel

#### Bước 1: Chuẩn bị file Excel
Tạo file Excel với các cột sau (tên cột không phân biệt hoa thường):

| English | Vietnamese | Example |
|---------|-----------|---------|
| Hello | Xin chào | Hello, how are you? |
| Thank you | Cảm ơn | Thank you for your help. |
| Friend | Bạn bè | She is my best friend. |

**Lưu ý:**
- Cột **English** hoặc **Front**: Từ tiếng Anh (bắt buộc)
- Cột **Vietnamese** hoặc **Back** hoặc **Meaning**: Nghĩa tiếng Việt (bắt buộc)
- Cột **Example** hoặc **Sentence**: Câu ví dụ (tùy chọn)
- Tên cột có thể là: `en`, `vi`, `english`, `vietnamese`, v.v.

#### Bước 2: Import vào ứng dụng
1. Click nút **"📊 Import from Excel"** ở trang chủ
2. Kéo thả file Excel vào khung hoặc click **"Browse Files"**
3. Xem preview các flashcard được import
4. Nhập tên và mô tả cho bộ thẻ
5. Click **"✅ Import X Cards"** để hoàn tất

#### Ví dụ file Excel mẫu

**Cách 1: Format chuẩn**
```
| English      | Vietnamese  | Example                        |
|--------------|-------------|--------------------------------|
| Beautiful    | Đẹp         | She is very beautiful.         |
| Important    | Quan trọng  | This is an important meeting.  |
| Delicious    | Ngon        | The food is delicious.         |
```

**Cách 2: Format tùy chỉnh**
```
| EN    | VI          | Sentence                  |
|-------|-------------|---------------------------|
| Happy | Vui vẻ      | I am very happy today.    |
| Sad   | Buồn        | Why are you so sad?       |
```

Cả hai format đều hoạt động tốt!

## 🎨 Công nghệ sử dụng
- HTML5
- CSS3 (Flexbox, Grid, Animations)
- Vanilla JavaScript (ES6 Modules)
- LocalStorage API

## 📝 Ghi chú
- Dữ liệu được lưu trữ trên trình duyệt (LocalStorage)
- Hỗ trợ responsive trên mobile và desktop
- Không cần cài đặt thêm thư viện nào

## 🔧 Tùy chỉnh
Bạn có thể tùy chỉnh:
- Màu sắc: Sửa trong \`styles/main.css\`
- Dữ liệu mẫu: Sửa trong \`js/data.js\`
- Thêm tính năng: Mở rộng trong các component

## 📧 Liên hệ
Nếu có thắc mắc hoặc đề xuất, vui lòng tạo issue hoặc liên hệ trực tiếp.

---
Made with ❤️ for English learners
\`\`\`

## 📦 Chi tiết các file

### 1. index.html
File HTML chính, chứa cấu trúc DOM cơ bản với 3 container chính:
- \`deck-list\`: Hiển thị danh sách bộ thẻ
- \`study-mode\`: Chế độ học tập
- \`deck-editor\`: Chế độ chỉnh sửa

### 2. styles/main.css
CSS styling cho toàn bộ ứng dụng với:
- Responsive design
- Animation cho flashcard flip
- Gradient backgrounds
- Button styles và hover effects

### 3. js/data.js
Chứa dữ liệu mẫu ban đầu với 3 bộ thẻ:
- Basic Vocabulary (5 cards)
- Travel Phrases (3 cards)
- Business English (2 cards)

### 4. js/storage.js
Service quản lý LocalStorage:
- \`getDecks()\`: Lấy tất cả bộ thẻ
- \`saveDecks()\`: Lưu bộ thẻ
- \`addDeck()\`: Thêm bộ thẻ mới
- \`updateDeck()\`: Cập nhật bộ thẻ
- \`deleteDeck()\`: Xóa bộ thẻ
- \`updateCardMastery()\`: Cập nhật trạng thái "đã thuộc"

### 5. js/components/DeckList.js
Component hiển thị danh sách bộ thẻ:
- Render grid layout
- Hiển thị thống kê (số thẻ, % đã thuộc)
- Xử lý sự kiện Study và Edit

### 6. js/components/StudyMode.js
Component chế độ học tập:
- Hiển thị flashcard với hiệu ứng flip
- Navigation (Previous/Next)
- Progress bar
- Đánh dấu thẻ đã thuộc

### 7. js/components/DeckEditor.js
Component chỉnh sửa bộ thẻ:
- Form thêm/sửa thông tin deck
- Quản lý danh sách cards
- Thêm/xóa cards
- Lưu và xóa deck

### 8. js/components/ExcelImport.js
Component import từ Excel:
- Drag & drop file upload
- Parse Excel file với SheetJS
- Preview dữ liệu trước khi import
- Tự động nhận diện cột (flexible column names)
- Validation và error handling

### 9. js/app.js
File chính điều phối ứng dụng:
- Khởi tạo app
- Quản lý navigation giữa các view
- Kết nối components với storage service

## 🎯 Workflow

\`\`\`
User opens app
    ↓
DeckList renders all decks
    ↓
User clicks "Study" → StudyMode
    ↓
User flips cards, marks mastered
    ↓
Data saved to LocalStorage
    ↓
User clicks "Back" → DeckList
    ↓
User clicks "Edit" → DeckEditor
    ↓
User adds/edits/deletes cards
    ↓
User saves → Data updated → DeckList
\`\`\`

## 🔐 LocalStorage Structure

\`\`\`javascript
{
  "flashcard_decks": [
    {
      "id": 1,
      "name": "Basic Vocabulary",
      "description": "Essential words for beginners",
      "cards": [
        {
          "id": 1,
          "front": "Hello",
          "back": "Xin chào",
          "example": "Hello, how are you?",
          "mastered": false
        }
      ]
    }
  ]
}
\`\`\`

## 🚀 Mở rộng tính năng

Bạn có thể thêm các tính năng sau:
- [ ] Tìm kiếm và lọc bộ thẻ
- [ ] Chế độ quiz/test
- [ ] Xuất/nhập dữ liệu (JSON/CSV)
- [ ] Thống kê chi tiết
- [ ] Âm thanh phát âm (Text-to-Speech)
- [ ] Hệ thống spaced repetition
- [ ] Dark mode
- [ ] Multi-language support
- [ ] Sync với cloud (Firebase, etc.)

## 📱 Browser Support
- Chrome ✅
- Firefox ✅
- Safari ✅
- Edge ✅
- Opera ✅

## ⚠️ Lưu ý
- LocalStorage có giới hạn 5-10MB tùy trình duyệt
- Dữ liệu sẽ mất khi clear browser cache
- Không hỗ trợ Internet Explorer