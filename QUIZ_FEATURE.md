# Quiz Mode & AI Vocabulary Generation Features

## Overview

This document describes the new Quiz Mode and AI Vocabulary Generation features added to the flashcard app.

## 1. Quiz Mode

### What is Quiz Mode?

Quiz Mode transforms your learning experience from simple flashcard flipping to an interactive multiple-choice quiz format. This helps reinforce vocabulary retention through active recall.

### Features

- **Multiple-Choice Format**: Each question presents 4 options (1 correct + 3 random alternatives)
- **Real-time Feedback**: Correct answers highlighted in green, incorrect in red
- **Progress Tracking**: Visual progress bar and question counter
- **Celebration Effects**: Triggers sound + confetti + emoji animations on correct answers
- **Score Tracking**: Displays score as you progress through the quiz
- **Results Screen**: Shows final score, percentage, and grade (Excellent/Good/Fair/Keep Learning)
- **Retry Option**: Retake the quiz to improve your score

### How to Use

1. **Open a Deck**: Click on any deck from the main dashboard
2. **Switch to Quiz Mode**: In Study Mode, click the "❓ Quiz Mode" button in the top-right
3. **Answer Questions**: Select the correct answer from the 4 options
4. **Skip Questions**: Use the "⏭️ Skip" button to move to the next question without answering
5. **View Results**: After completing all questions, see your final score and grade
6. **Retry**: Click "🔄 Retry Quiz" to retake the quiz or "📚 Back to Deck" to return

### Scoring System

- **Grade Ranges**:
  - 80%+ → 🌟 Excellent
  - 60-79% → 👍 Good
  - 40-59% → 😊 Fair
  - Below 40% → 📚 Keep Learning

### Technical Details

**File**: `js/components/QuizMode.js`

**Constructor**: `new QuizMode(container, deck, onExit, onUpdateCard)`

**Key Methods**:
- `render()` - Displays the current question with options
- `generateOptions(card)` - Creates 1 correct + 3 random wrong answers
- `showResults()` - Displays final results and score
- `attachEventListeners()` - Handles button clicks and answer selection

## 2. AI Vocabulary Generation

### What is AI Vocabulary Generation?

This feature allows you to automatically generate vocabulary cards based on predefined topics or through AI (if OpenAI API key is available).

### Features

- **5 Built-in Topics**: Animals, Fruits, Colors, Numbers, Food
- **Mock Data Fallback**: 50+ pre-written vocabulary entries across all topics
- **OpenAI Integration**: Optional - if an API key is configured, generates custom vocabulary through GPT
- **Auto-fallback**: Automatically falls back to mock data if API fails
- **Easy Topic Selection**: Simple dropdown to choose your topic

### Available Topics

Each topic includes 10 predefined vocabulary entries:

1. **Animals** (dog, cat, lion, elephant, etc.)
2. **Fruits** (apple, banana, orange, strawberry, etc.)
3. **Colors** (red, blue, green, yellow, etc.)
4. **Numbers** (one, two, three, four, etc.)
5. **Food** (bread, milk, cheese, rice, etc.)

### How to Use (Future Integration)

The feature is currently implemented but will be integrated into the DeckEditor for creating new decks:

1. Click "✏️ New Deck" or edit an existing deck
2. In DeckEditor, click "🤖 Generate with AI" button
3. Select a topic from the dropdown
4. Specify the number of cards (default: 10)
5. Click "Generate" to create cards automatically
6. Review and edit generated cards before saving

### Technical Details

**File**: `js/components/VocabularyGenerator.js`

**Key Methods**:
- `generateVocabulary(topic, count=10)` - Main method to generate vocabulary
- `generateWithMockData(topic, count)` - Uses predefined mock data
- `generateWithOpenAI(topic, count)` - Calls OpenAI API (if key provided)
- `getAvailableTopics()` - Returns list of available topics

**Configuration**:
```javascript
const USE_OPENAI = false; // Set to true if you have OpenAI API key
const OPENAI_API_KEY = 'your-api-key'; // Add your API key here
```

### Mock Data Structure

Each vocabulary entry includes:
- `front`: English word
- `back`: Vietnamese translation
- `example`: Example sentence in English
- `id`: Unique identifier

Example:
```javascript
{
    front: 'Dog',
    back: 'Chó',
    example: 'The dog is playing in the park.',
    id: 'animal-1'
}
```

## 3. Integration Points

### Quiz Mode Integration

- **File**: `js/app.js`
- **Method**: `showQuizMode(deckId)` - Loads and displays quiz mode
- **Trigger**: Button in StudyMode header or from app routing

### StudyMode Changes

- Added "❓ Quiz Mode" button to switch between learning modes
- Callback support for switching to quiz mode: `onShowQuizMode`

### Index.html Updates

- Added `<div id="quiz-mode">` container for rendering quiz interface

### CSS Styling

**File**: `styles/main.css`

New classes added:
- `.quiz-container` - Main quiz wrapper
- `.quiz-question` - Question display
- `.quiz-options` - Options grid
- `.quiz-option` - Individual option button
- `.quiz-controls` - Control buttons (skip, etc.)
- `.correct-answer` - Styling for correct answers (green highlight)
- `.wrong-answer` - Styling for wrong answers (red highlight)
- `.option-letter` - Letter badge (A, B, C, D)
- `.option-text` - Answer text

## 4. Usage Examples

### Starting a Quiz

```javascript
// From app.js
showQuizMode(deckId) {
    const deck = StorageService.getDeckById(deckId);
    const quizMode = new QuizMode(
        document.getElementById('quiz-mode'),
        deck,
        () => this.showStudyMode(deckId),
        (deckId, cardId, mastered) => {
            StorageService.updateCardMastery(deckId, cardId, mastered);
        }
    );
    quizMode.render();
}
```

### Generating Vocabulary (Future)

```javascript
import { VocabularyGenerator } from './components/VocabularyGenerator.js';

// Generate 10 animal cards
const cards = await VocabularyGenerator.generateVocabulary('animals', 10);

// cards[0] = {
//     front: 'Dog',
//     back: 'Chó',
//     example: 'The dog is playing in the park.',
//     id: 'animal-1'
// }
```

## 5. Future Enhancements

- [ ] Add AI vocabulary generator button to DeckEditor
- [ ] Add difficulty levels for quiz generation
- [ ] Track quiz attempt history
- [ ] Generate quizzes based on user's weak points
- [ ] Spaced repetition system for better learning
- [ ] Export quiz results as PDF
- [ ] Multiplayer quiz mode
- [ ] Time-based challenges

## 6. Browser Compatibility

- Chrome/Chromium: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Edge: ✅ Full support
- Mobile browsers: ✅ Responsive design

## 7. Performance Notes

- Quiz mode runs efficiently even with large decks (100+ cards)
- Option generation uses efficient shuffling algorithm
- Celebration effects are lightweight and GPU-accelerated
- Mock data is cached in memory for instant access
