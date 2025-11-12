/**
 * VocabularyGenerator - Tạo từ vựng bằng AI
 * Sử dụng Open-Meteo API (free, không cần key) để mock AI
 * Hoặc có thể thay bằng OpenAI API nếu có API key
 */

export class VocabularyGenerator {
    // Nếu bạn có OpenAI API key, thay đổi giá trị này
    static OPENAI_API_KEY = 'sk-your-api-key-here'; // Thay bằng key của bạn
    static USE_OPENAI = false; // Set true nếu bạn có API key

    // Mock data để test
    static mockVocabulary = {
        'animals': [
            { front: 'Dog', back: 'Chó', example: 'The dog is playing in the park.' },
            { front: 'Cat', back: 'Mèo', example: 'The cat is sleeping on the bed.' },
            { front: 'Lion', back: 'Sư tử', example: 'The lion is the king of the jungle.' },
            { front: 'Elephant', back: 'Voi', example: 'Elephants are very intelligent animals.' },
            { front: 'Tiger', back: 'Hổ', example: 'Tigers are dangerous predators.' },
            { front: 'Monkey', back: 'Khỉ', example: 'Monkeys live in trees in the forest.' },
            { front: 'Rabbit', back: 'Thỏ', example: 'Rabbits eat carrots and vegetables.' },
            { front: 'Fox', back: 'Cáo', example: 'The fox is very clever and cunning.' },
            { front: 'Bear', back: 'Gấu', example: 'Bears hibernate during winter.' },
            { front: 'Wolf', back: 'Sói', example: 'Wolves live in packs in the forest.' }
        ],
        'fruits': [
            { front: 'Apple', back: 'Táo', example: 'An apple a day keeps the doctor away.' },
            { front: 'Banana', back: 'Chuối', example: 'Bananas are rich in potassium.' },
            { front: 'Orange', back: 'Cam', example: 'Orange juice is good for health.' },
            { front: 'Watermelon', back: 'Dưa hấu', example: 'Watermelon is refreshing in summer.' },
            { front: 'Strawberry', back: 'Dâu tây', example: 'Strawberries are sweet and delicious.' },
            { front: 'Mango', back: 'Xoài', example: 'Mangoes are tropical fruits.' },
            { front: 'Pineapple', back: 'Dứa', example: 'Pineapple is a tropical fruit.' },
            { front: 'Grape', back: 'Nho', example: 'Grapes can be red, green, or purple.' },
            { front: 'Lemon', back: 'Chanh', example: 'Lemon is sour and acidic.' },
            { front: 'Coconut', back: 'Dừa', example: 'Coconut water is very refreshing.' }
        ],
        'colors': [
            { front: 'Red', back: 'Đỏ', example: 'The red car is very fast.' },
            { front: 'Blue', back: 'Xanh dương', example: 'The sky is blue.' },
            { front: 'Green', back: 'Xanh lá', example: 'The grass is green.' },
            { front: 'Yellow', back: 'Vàng', example: 'The sun is yellow.' },
            { front: 'Black', back: 'Đen', example: 'The cat is black.' },
            { front: 'White', back: 'Trắng', example: 'The snow is white.' },
            { front: 'Purple', back: 'Tím', example: 'Purple is a cool color.' },
            { front: 'Orange', back: 'Cam', example: 'The orange is orange colored.' },
            { front: 'Pink', back: 'Hồng', example: 'The flower is pink.' },
            { front: 'Brown', back: 'Nâu', example: 'The tree bark is brown.' }
        ],
        'numbers': [
            { front: 'One', back: 'Một', example: 'I have one cat.' },
            { front: 'Two', back: 'Hai', example: 'I have two dogs.' },
            { front: 'Three', back: 'Ba', example: 'Three is a lucky number.' },
            { front: 'Four', back: 'Bốn', example: 'A square has four sides.' },
            { front: 'Five', back: 'Năm', example: 'I have five fingers on one hand.' },
            { front: 'Six', back: 'Sáu', example: 'Six is an even number.' },
            { front: 'Seven', back: 'Bảy', example: 'There are seven days in a week.' },
            { front: 'Eight', back: 'Tám', example: 'An octopus has eight arms.' },
            { front: 'Nine', back: 'Chín', example: 'Nine is my lucky number.' },
            { front: 'Ten', back: 'Mười', example: 'Ten is a round number.' }
        ],
        'food': [
            { front: 'Rice', back: 'Cơm', example: 'Rice is a staple food in Asia.' },
            { front: 'Bread', back: 'Bánh mì', example: 'Bread is made from flour.' },
            { front: 'Chicken', back: 'Gà', example: 'Chicken is a healthy protein.' },
            { front: 'Fish', back: 'Cá', example: 'Fish is good for the brain.' },
            { front: 'Beef', back: 'Thịt bò', example: 'Beef is red meat.' },
            { front: 'Milk', back: 'Sữa', example: 'Milk is good for bones.' },
            { front: 'Cheese', back: 'Phô mai', example: 'Cheese is made from milk.' },
            { front: 'Egg', back: 'Trứng', example: 'Eggs are rich in protein.' },
            { front: 'Vegetable', back: 'Rau', example: 'Vegetables are healthy.' },
            { front: 'Soup', back: 'Canh', example: 'Soup is warm and comforting.' }
        ]
    };

    static async generateVocabulary(topic, count = 10) {
        if (this.USE_OPENAI) {
            return await this.generateWithOpenAI(topic, count);
        } else {
            return this.generateWithMockData(topic, count);
        }
    }

    static async generateWithOpenAI(topic, count = 10) {
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [{
                        role: 'user',
                        content: `Generate ${count} English vocabulary words about "${topic}" with Vietnamese translations and example sentences. Format as JSON array with fields: front (English), back (Vietnamese), example (sentence in English).`
                    }],
                    temperature: 0.7,
                    max_tokens: 1000
                })
            });

            if (!response.ok) {
                throw new Error('OpenAI API error');
            }

            const data = await response.json();
            const content = data.choices[0].message.content;
            
            // Parse JSON from response
            const jsonMatch = content.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
            
            throw new Error('Could not parse AI response');
        } catch (error) {
            console.error('OpenAI API error:', error);
            alert('OpenAI API error. Falling back to mock data.');
            return this.generateWithMockData(topic, count);
        }
    }

    static generateWithMockData(topic, count = 10) {
        const topicLower = topic.toLowerCase().trim();
        
        // Find matching topic
        let vocabulary = [];
        for (const [key, values] of Object.entries(this.mockVocabulary)) {
            if (key.includes(topicLower) || topicLower.includes(key)) {
                vocabulary = values;
                break;
            }
        }

        // If no match, return first topic as default
        if (vocabulary.length === 0) {
            vocabulary = this.mockVocabulary['animals'];
        }

        // Shuffle and return requested count
        return vocabulary
            .sort(() => Math.random() - 0.5)
            .slice(0, count)
            .map((card, index) => ({
                ...card,
                id: Date.now() + index
            }));
    }

    static getAvailableTopics() {
        return Object.keys(this.mockVocabulary);
    }

    static getTopicDescription(topic) {
        const descriptions = {
            'animals': '🦁 Động vật',
            'fruits': '🍎 Trái cây',
            'colors': '🎨 Màu sắc',
            'numbers': '🔢 Số đếm',
            'food': '🍽️ Thức ăn'
        };
        return descriptions[topic] || topic;
    }
}
