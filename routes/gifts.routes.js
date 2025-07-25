const express = require('express');
const router = express.Router();
const db = require('../config/db');
const giftSchema = require('../schemas/gift.schema');

// Liste des cadeaux
router.get('/', async (req, res, next) => {
    try {
        const [gifts] = await db.query('SELECT * FROM gifts');
        res.json(gifts);
    } catch (err) {
        next(err);
    }
});

// Ajouter un cadeau
router.post('/', async (req, res, next) => {
    try {
        const { error, value } = giftSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const { title, description, price, reserved = false } = value;
        const [result] = await db.query(
            'INSERT INTO gifts (title, description, price, reserved) VALUES (?, ?, ?, ?)',
            [title, description, price, reserved]
        );
        res.status(201).json({ id: result.insertId, ...value });
    } catch (err) {
        next(err);
    }
});

// Modifier un cadeau
router.patch('/:id', async (req, res, next) => {
    try {
        const { error, value } = giftSchema.validate(req.body, { presence: 'optional' });
        if (error) return res.status(400).json({ error: error.details[0].message });

        const [result] = await db.query('UPDATE gifts SET ? WHERE id = ?', [value, req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Cadeau non trouvé' });
        res.json({ message: 'Cadeau mis à jour' });
    } catch (err) {
        next(err);
    }
});

// Supprimer un cadeau
router.delete('/:id', async (req, res, next) => {
    try {
        const [result] = await db.query('DELETE FROM gifts WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Cadeau non trouvé' });
        res.json({ message: 'Cadeau supprimé' });
    } catch (err) {
        next(err);
    }
});

// Marquer comme réservé
router.patch('/:id/reserve', async (req, res, next) => {
    try {
        const [result] = await db.query('UPDATE gifts SET reserved = TRUE WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Cadeau non trouvé' });
        res.json({ message: 'Cadeau marqué comme réservé' });
    } catch (err) {
        next(err);
    }
});

// Lister uniquement les cadeaux réservés
router.get('/', async (req, res, next) => {
    try {
        const { reserved } = req.query;
        let query = 'SELECT * FROM gifts';
        if (reserved) {
            query += ' WHERE reserved = TRUE';
        }
        const [gifts] = await db.query(query);
        res.json(gifts);
    } catch (err) {
        next(err);
    }
});

// Trier par prix croissant ou décroissant
router.get('/', async (req, res, next) => {
    try {
        const { sort } = req.query;
        let query = 'SELECT * FROM gifts';
        if (sort) {
            query += ` ORDER BY price ${sort === 'asc' ? 'ASC' : 'DESC'}`;
        }
        const [gifts] = await db.query(query);
        res.json(gifts);
    } catch (err) {
        next(err);
    }
});

module.exports = router;

