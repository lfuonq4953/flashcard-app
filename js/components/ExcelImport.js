// js/components/ExcelImport.js
export default class ExcelImport {
  constructor(storageService) {
    this.storageService = storageService;
    this.parsedData = null;
    this.soundFiles = {}; // Lưu sound files theo tên
  }

  render() {
    return `
      <div class="import-container">
        <div class="import-header">
          <button class="btn-back" onclick="app.showDeckList()">← Back</button>
          <h2>📊 Import from Excel</h2>
        </div>

        <div class="import-instructions">
          <h3>📝 Instructions:</h3>
          <ol>
            <li>Prepare Excel file with columns: <strong>English</strong>, <strong>Vietnamese</strong>, <strong>Example</strong> (optional)</li>
            <li>Upload sound files (.wav) named as: <strong>tu_001.wav, tu_002.wav, tu_003.wav...</strong></li>
            <li>Sound files will be matched with words in order</li>
          </ol>
        </div>

        <div class="upload-section">
          <h3>Step 1: Upload Excel File</h3>
          <div class="drop-zone" id="excel-drop-zone">
            <div class="drop-zone-content">
              <span class="drop-icon">📄</span>
              <p>Drag & Drop Excel file here</p>
              <p class="drop-hint">or click to browse</p>
              <input type="file" 
                     id="excel-file-input" 
                     accept=".xlsx,.xls"
                     onchange="excelImport.handleExcelFile(this.files[0])"
                     style="display: none;">
            </div>
          </div>
        </div>

        <div class="upload-section">
          <h3>Step 2: Upload Sound Files (Optional)</h3>
          <div class="drop-zone" id="sound-drop-zone">
            <div class="drop-zone-content">
              <span class="drop-icon">🔊</span>
              <p>Drag & Drop sound files (.wav) here</p>
              <p class="drop-hint">or click to browse (multiple files)</p>
              <input type="file" 
                     id="sound-file-input" 
                     accept=".wav,.mp3"
                     multiple
                     onchange="excelImport.handleSoundFiles(this.files)"
                     style="display: none;">
            </div>
          </div>
          <div id="sound-files-list"></div>
        </div>

        <div id="preview-section" style="display: none;">
          <h3>Preview Import</h3>
          <div id="preview-cards"></div>
          
          <div class="import-form">
            <input type="text" 
                   id="deck-name" 
                   placeholder="Deck Name" 
                   class="form-input">
            <textarea id="deck-description" 
                      placeholder="Description (optional)" 
                      class="form-input"></textarea>
            
            <div class="import-actions">
              <button class="btn-cancel" onclick="excelImport.cancel()">Cancel</button>
              <button class="btn-import" onclick="excelImport.importDeck()">
                ✅ Import <span id="card-count">0</span> Cards
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  setupDropZones() {
    // Excel drop zone
    const excelDropZone = document.getElementById('excel-drop-zone');
    const excelInput = document.getElementById('excel-file-input');
    
    excelDropZone.addEventListener('click', () => excelInput.click());
    excelDropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      excelDropZone.classList.add('drag-over');
    });
    excelDropZone.addEventListener('dragleave', () => {
      excelDropZone.classList.remove('drag-over');
    });
    excelDropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      excelDropZone.classList.remove('drag-over');
      const file = e.dataTransfer.files[0];
      if (file) this.handleExcelFile(file);
    });

    // Sound drop zone
    const soundDropZone = document.getElementById('sound-drop-zone');
    const soundInput = document.getElementById('sound-file-input');
    
    soundDropZone.addEventListener('click', () => soundInput.click());
    soundDropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      soundDropZone.classList.add('drag-over');
    });
    soundDropZone.addEventListener('dragleave', () => {
      soundDropZone.classList.remove('drag-over');
    });
    soundDropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      soundDropZone.classList.remove('drag-over');
      const files = e.dataTransfer.files;
      if (files.length > 0) this.handleSoundFiles(files);
    });
  }

  handleExcelFile(file) {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);
        
        this.parsedData = this.parseExcelData(jsonData);
        this.showPreview();
      } catch (error) {
        alert('Error reading Excel file: ' + error.message);
      }
    };
    reader.readAsArrayBuffer(file);
  }

  handleSoundFiles(files) {
    this.soundFiles = {};
    const fileList = document.getElementById('sound-files-list');
    fileList.innerHTML = '<div class="sound-files-header">Uploaded Sound Files:</div>';
    
    // Đọc và lưu từng file
    Array.from(files).forEach(file => {
      // Lấy số thứ tự từ tên file (tu_001.wav -> 001)
      const match = file.name.match(/tu_(\d+)\./i);
      if (match) {
        const index = parseInt(match[1]);
        
        // Đọc file và chuyển thành base64 để lưu
        const reader = new FileReader();
        reader.onload = (e) => {
          this.soundFiles[index] = {
            name: file.name,
            data: e.target.result, // base64 data URL
            type: file.type
          };
          
          // Hiển thị danh sách file đã upload
          fileList.innerHTML += `
            <div class="sound-file-item">
              <span class="sound-icon">🔊</span>
              <span class="sound-name">${file.name}</span>
              <span class="sound-index">→ Word #${index}</span>
            </div>
          `;
          
          // Update preview nếu đã có data
          if (this.parsedData) {
            this.showPreview();
          }
        };
        reader.readAsDataURL(file);
      } else {
        fileList.innerHTML += `
          <div class="sound-file-item error">
            <span class="sound-icon">⚠️</span>
            <span class="sound-name">${file.name}</span>
            <span class="sound-error">Invalid filename format (should be tu_001.wav)</span>
          </div>
        `;
      }
    });
  }

  parseExcelData(jsonData) {
    const cards = [];
    
    jsonData.forEach((row, index) => {
      // Tìm cột English/Front
      const front = row['English'] || row['english'] || row['EN'] || row['en'] || 
                    row['Front'] || row['front'] || row['Word'] || row['word'];
      
      // Tìm cột Vietnamese/Back
      const back = row['Vietnamese'] || row['vietnamese'] || row['VI'] || row['vi'] || 
                   row['Back'] || row['back'] || row['Meaning'] || row['meaning'];
      
      // Tìm cột Example
      const example = row['Example'] || row['example'] || row['Sentence'] || row['sentence'] || '';
      
      if (front && back) {
        const cardIndex = index + 1;
        const card = {
          id: Date.now() + index,
          front: front.toString().trim(),
          back: back.toString().trim(),
          example: example.toString().trim(),
          mastered: false,
          soundUrl: null, // Sẽ được gán sau
          soundData: null // Lưu base64 data
        };
        
        // Gán sound file nếu có
        if (this.soundFiles[cardIndex]) {
          card.soundUrl = this.soundFiles[cardIndex].name;
          card.soundData = this.soundFiles[cardIndex].data;
        }
        
        cards.push(card);
      }
    });
    
    return cards;
  }

  showPreview() {
    const previewSection = document.getElementById('preview-section');
    const previewCards = document.getElementById('preview-cards');
    const cardCount = document.getElementById('card-count');
    
    previewSection.style.display = 'block';
    cardCount.textContent = this.parsedData.length;
    
    // Re-parse để update sound files
    if (Object.keys(this.soundFiles).length > 0) {
      this.parsedData.forEach((card, index) => {
        const cardIndex = index + 1;
        if (this.soundFiles[cardIndex]) {
          card.soundUrl = this.soundFiles[cardIndex].name;
          card.soundData = this.soundFiles[cardIndex].data;
        }
      });
    }
    
    previewCards.innerHTML = this.parsedData.map((card, index) => `
      <div class="preview-card">
        <div class="preview-card-number">#${index + 1}</div>
        <div class="preview-card-content">
          <div class="preview-front">
            <strong>${card.front}</strong>
            ${card.soundUrl ? `<span class="sound-badge">🔊 ${card.soundUrl}</span>` : ''}
          </div>
          <div class="preview-back">${card.back}</div>
          ${card.example ? `<div class="preview-example">"${card.example}"</div>` : ''}
        </div>
      </div>
    `).join('');
    
    previewSection.scrollIntoView({ behavior: 'smooth' });
  }

  importDeck() {
    const name = document.getElementById('deck-name').value.trim();
    const description = document.getElementById('deck-description').value.trim();
    
    if (!name) {
      alert('Please enter a deck name!');
      return;
    }
    
    if (!this.parsedData || this.parsedData.length === 0) {
      alert('No cards to import!');
      return;
    }
    
    const newDeck = {
      id: Date.now(),
      name: name,
      description: description,
      cards: this.parsedData,
      createdAt: new Date().toISOString()
    };
    
    this.storageService.addDeck(newDeck);
    alert(`Successfully imported ${this.parsedData.length} cards!`);
    window.app.showDeckList();
  }

  cancel() {
    if (confirm('Cancel import? All data will be lost.')) {
      window.app.showDeckList();
    }
  }
}