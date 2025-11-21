export class ExcelImport {
    constructor(container, onImport, onCancel) {
        this.container = container;
        this.onImport = onImport;
        this.onCancel = onCancel;
        this.previewData = null;
    }

    render() {
        this.container.innerHTML = `
            <div class="excel-import-container">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h2 style="color: white;">Import from Excel</h2>
                    <button class="btn" id="cancel-import-btn">❌ Cancel</button>
                </div>

                <div class="excel-template-info">
                    <h4>📋 Excel Format Guide:</h4>
                    <p>Your Excel file should have these columns (in any order):</p>
                    <ul style="margin: 10px 0; padding-left: 20px;">
                        <li><code>English</code> or <code>Front</code> - English word/phrase</li>
                        <li><code>Vietnamese</code> or <code>Back</code> - Vietnamese meaning</li>
                        <li><code>Example</code> (optional) - Example sentence</li>
                    </ul>
                    <p style="margin-top: 10px;"><strong>Example:</strong></p>
                    <table style="background: rgba(0,0,0,0.2); width: 100%; border-radius: 5px; margin-top: 5px;">
                        <tr style="border-bottom: 1px solid rgba(255,255,255,0.2);">
                            <th style="padding: 8px; text-align: left;">English</th>
                            <th style="padding: 8px; text-align: left;">Vietnamese</th>
                            <th style="padding: 8px; text-align: left;">Example</th>
                        </tr>
                        <tr>
                            <td style="padding: 8px;">Hello</td>
                            <td style="padding: 8px;">Xin chào</td>
                            <td style="padding: 8px;">Hello, how are you?</td>
                        </tr>
                    </table>
                </div>

                <div class="file-upload-area" id="upload-area">
                    <input type="file" id="excel-file-input" class="file-input" accept=".xlsx,.xls">
                    <div style="color: white;">
                        <p style="font-size: 3rem; margin-bottom: 10px;">📊</p>
                        <p style="font-size: 1.2rem; margin-bottom: 10px;">Drag & Drop Excel file here</p>
                        <p style="opacity: 0.7;">or</p>
                        <button class="btn" style="margin-top: 10px;" id="browse-btn">Browse Files</button>
                        <p style="opacity: 0.7; margin-top: 10px; font-size: 0.9rem;">Supported: .xlsx, .xls</p>
                    </div>
                </div>

                <div id="preview-container"></div>
            </div>
        `;

        this.attachEventListeners();
    }

    attachEventListeners() {
        const uploadArea = document.getElementById('upload-area');
        const fileInput = document.getElementById('excel-file-input');
        const browseBtn = document.getElementById('browse-btn');

        // Browse button
        browseBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            fileInput?.click();
        });

        // Upload area click
        uploadArea?.addEventListener('click', () => {
            fileInput?.click();
        });

        // File input change
        fileInput?.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.handleFile(file);
            }
        });

        // Drag and drop
        uploadArea?.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea?.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea?.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            const file = e.dataTransfer.files[0];
            if (file) {
                this.handleFile(file);
            }
        });

        // Cancel button
        document.getElementById('cancel-import-btn')?.addEventListener('click', () => {
            this.onCancel();
        });
    }

    async handleFile(file) {
        // Check file type
        const validTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
                           'application/vnd.ms-excel'];
        if (!validTypes.includes(file.type) && !file.name.match(/\.(xlsx|xls)$/)) {
            alert('Please upload a valid Excel file (.xlsx or .xls)');
            return;
        }

        try {
            const data = await this.readExcelFile(file);
            this.showPreview(data);
        } catch (error) {
            alert('Error reading Excel file: ' + error.message);
            console.error(error);
        }
    }

    readExcelFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                try {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });
                    
                    // Get first sheet
                    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                    const jsonData = XLSX.utils.sheet_to_json(firstSheet);
                    
                    // Parse data
                    const cards = this.parseExcelData(jsonData);
                    resolve(cards);
                } catch (error) {
                    reject(error);
                }
            };
            
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsArrayBuffer(file);
        });
    }

    parseExcelData(jsonData) {
        const cards = [];
        
        jsonData.forEach((row, index) => {
            // Find column names (case insensitive, flexible)
            const keys = Object.keys(row);
            const frontKey = keys.find(k => 
                k.toLowerCase().includes('english') || 
                k.toLowerCase().includes('front') ||
                k.toLowerCase() === 'en'
            );
            const backKey = keys.find(k => 
                k.toLowerCase().includes('vietnamese') || 
                k.toLowerCase().includes('back') ||
                k.toLowerCase().includes('vi') ||
                k.toLowerCase().includes('meaning')
            );
            const exampleKey = keys.find(k => 
                k.toLowerCase().includes('example') ||
                k.toLowerCase().includes('sentence')
            );

            if (frontKey && backKey && row[frontKey] && row[backKey]) {
                cards.push({
                    id: Date.now() + index,
                    front: String(row[frontKey]).trim(),
                    back: String(row[backKey]).trim(),
                    example: exampleKey && row[exampleKey] ? String(row[exampleKey]).trim() : '',
                    mastered: false
                });
            }
        });

        return cards;
    }

    showPreview(cards) {
        this.previewData = cards;
        
        const previewContainer = document.getElementById('preview-container');
        previewContainer.innerHTML = `
            <div class="preview-table" style="margin-top: 30px;">
                <h3 style="color: white; margin-bottom: 15px;">
                    Preview: ${cards.length} cards found
                </h3>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>English</th>
                            <th>Vietnamese</th>
                            <th>Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${cards.slice(0, 10).map((card, i) => `
                            <tr>
                                <td>${i + 1}</td>
                                <td><strong>${card.front}</strong></td>
                                <td>${card.back}</td>
                                <td style="font-style: italic; opacity: 0.8;">${card.example || '-'}</td>
                            </tr>
                        `).join('')}
                        ${cards.length > 10 ? `
                            <tr>
                                <td colspan="4" style="text-align: center; opacity: 0.7;">
                                    ... and ${cards.length - 10} more cards
                                </td>
                            </tr>
                        ` : ''}
                    </tbody>
                </table>
            </div>

            <div class="form-group" style="margin-top: 20px;">
                <label>Deck Name</label>
                <input type="text" id="import-deck-name" placeholder="Enter deck name">
            </div>

            <div class="form-group">
                <label>Deck Description</label>
                <input type="text" id="import-deck-description" placeholder="Enter deck description">
            </div>

            <div style="margin-top: 20px;">
                <button class="btn btn-secondary" id="confirm-import-btn" style="font-size: 1.1rem; padding: 15px 30px;">
                    ✅ Import ${cards.length} Cards
                </button>
            </div>
        `;

        // Add confirm button event
        document.getElementById('confirm-import-btn')?.addEventListener('click', () => {
            const name = document.getElementById('import-deck-name').value.trim();
            const description = document.getElementById('import-deck-description').value.trim();

            if (!name) {
                alert('Please enter a deck name');
                return;
            }

            const deck = {
                name,
                description: description || `Imported deck with ${cards.length} cards`,
                cards: this.previewData
            };

            this.onImport(deck);
        });
    }
}