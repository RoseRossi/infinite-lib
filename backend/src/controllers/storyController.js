const groqInstance = require('../config/groqcloud');  
const Story = require('../models/Story');

exports.generateStory = async (req, res) => {
    const { title, prompt, genre, theme, characters, length } = req.body;

    try {
        const data = {
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            model: "llama3-8b-8192",  // Cambiar el modelo si es necesario
            max_tokens: length || 1000,
            temperature: 0.7,
            top_p: 0.9
        };

        // Realizar la solicitud a la API de GroqCloud
        const response = await groqInstance.post('/chat/completions', data);

        const generatedText = response.data.choices[0].message.content;

        // Crear una nueva historia con el contenido generado
        const newStory = new Story({
            title,
            content: generatedText,
            genre,
            theme,
            characters,
            versiones: [{ content: generatedText }],
            author: req.user.id
        });

        await newStory.save();
        res.status(201).json(newStory);

    } catch (error) {
        console.error('Error al generar la historia con GroqCloud:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Error al generar la historia', error: error.response ? error.response.data : error.message });
    }
};


// Función para crear historias manualmente
exports.createStory = async (req, res) => {
    const { title, content, genre, theme, characters } = req.body;

    try {
        const story = new Story({
            title,
            content,
            genre,
            theme,
            characters,
            author: req.user.id  // Asociar la historia con el usuario autenticado
        });

        await story.save();
        res.status(201).json(story);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Función para obtener todas las historias
exports.getStories = async (req, res) => {
    try {
        const stories = await Story.find().populate('author', 'username');
        res.json(stories);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Función para obtener una historia por ID
exports.getStoryById = async (req, res) => {
    try {
        const story = await Story.findById(req.params.id).populate('author', 'username');

        if (!story) {
            return res.status(404).json({ message: 'Story not found' });
        }

        res.json(story);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


exports.continueStory = async (req, res) => {
    const { storyId, continuationPrompt } = req.body;

    try {
        const story = await Story.findById(storyId);

        if (!story) {
            return res.status(404).json({ message: 'Story not found' });
        }

        const response = await huggingFace.post('EleutherAI/gpt-neo-2.7B', {
            inputs: `${story.content} ${continuationPrompt}`,
            options: { 
                max_length: 150,
                temperature: 0.7,
                top_p: 0.9,
                top_k: 50 
            }
        });

        const continuation = response.data[0].generated_text;

        story.content += continuation;
        story.versiones.push({ content: continuation });
        await story.save();

        res.status(200).json(story);
    } catch (error) {
        console.error('Error al continuar la historia:', error);
        res.status(500).json({ message: 'Error al continuar la historia' });
    }
};
