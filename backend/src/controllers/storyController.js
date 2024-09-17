const groqInstance = require('../config/groqcloud');  
const Story = require('../models/Story');

exports.generateStory = async (req, res) => {
    const { title, prompt, genre, theme, characters, length } = req.body;

    // Verifica que el username y el email del usuario estén presentes
    if (!req.user || !req.user.username || !req.user.email) {
        return res.status(400).json({ message: 'User username and email are required.' });
    }

    try {
        const data = {
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            model: "llama3-8b-8192",
            max_tokens: length || 1000,
            temperature: 0.7,
            top_p: 0.9
        };

        console.log('Datos enviados a GroqCloud:', data);

        const response = await groqInstance.post('/chat/completions', data);
        const generatedText = response.data.choices[0].message.content;

        // Crear una nueva historia con el contenido generado
        const newStory = new Story({
            title,
            content: generatedText,
            genre,
            theme,
            characters,
            author: {
                email: req.user.email,   // Garantizamos que el email esté presente
                username: req.user.username  // Aquí usamos username
            }
        });

        await newStory.save();
        res.status(201).json(newStory);
    } catch (error) {
        console.error('Error al generar la historia:', error);
        res.status(500).json({ message: 'Error al generar la historia', error: error.message });
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

// Función para obtener las historias del usuario autenticado
exports.getStories = async (req, res) => {
    try {
        // Verifica si req.user está definido
        console.log('req.user:', req.user);  

        // Verifica si el email del usuario está presente
        if (!req.user || !req.user.email) {
            console.log('El usuario no está autenticado o no tiene email');  // Log para cuando el email no está presente
            return res.status(400).json({ message: 'User not authenticated or missing email.' });
        }

        // Log del email que se está utilizando para buscar las historias
        console.log('Buscando historias para el email:', req.user.email);

        // Buscar las historias asociadas al correo del usuario autenticado
        const stories = await Story.find({ 'author.email': req.user.email });

        // Log de las historias obtenidas
        console.log('Historias encontradas:', stories);

        if (!stories.length) {
            console.log('No se encontraron historias para este usuario');
            return res.status(404).json({ message: 'No stories found.' });
        }

        res.json(stories);
    } catch (error) {
        console.error('Error al obtener las historias:', error);
        res.status(500).json({ message: 'Server error while fetching stories.' });
    }
};


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

// Función para actualizar una historia existente
exports.updateStory = async (req, res) => {
    const { id } = req.params;  // Obtener el ID de la historia de los parámetros de la URL
    const updatedData = req.body;  // Obtener los datos actualizados del cuerpo de la solicitud

    try {
        // Encontrar la historia por su ID y actualizarla con los nuevos datos
        const story = await Story.findByIdAndUpdate(id, updatedData, { new: true });

        if (!story) {
            return res.status(404).json({ message: 'Story not found' });
        }

        // Devolver la historia actualizada
        res.json(story);
    } catch (error) {
        console.error('Error al actualizar la historia:', error);
        res.status(500).json({ message: 'Error al actualizar la historia' });
    }
};
