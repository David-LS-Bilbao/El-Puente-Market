import CategoryModel from "../../models/category.Model.js";

const categoryController = {
    list: async (req, res) => {
        try {
            const categories = await CategoryModel.findAll();
            res.json(categories);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener categorías' });
        }
    },
    create: async (req, res) => {
        try { 
            const { id, name } = req.body;
            
            if (!id || !name) {
                return res.status(400).json({ error: 'Faltan campos obligatorios (id, name)' });
            }

            const newCategory = await CategoryModel.create({ id, name });
            
            return res.status(201).json({
                message: 'Categoría creada con éxito',
                data: newCategory
            });
        } catch (error) {
            return res.status(400).json({ 
                error: 'Error al crear la categoría. Quizás el ID ya existe.' 
            });
        }
    }
};

 export default categoryController;