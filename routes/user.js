// routes/user.js
import express from 'express';
import User from '../models/User.js';
import { protect, admin, superAdmin } from '../middleware/auth.js';
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - mobile
 *       properties:
 *         name:
 *           type: string
 *         dob:
 *           type: string
 *           format: date
 *         gender:
 *           type: string
 *         mobile:
 *           type: string
 *         address:
 *           type: string
 *         samparkKaryakar:
 *           type: string
 *         isKaryakar:
 *           type: boolean
 *         karyakarTypesId:
 *           type: array
 *           items:
 *             type: number
 *         adultMale:
 *           type: number
 *         adultFemale:
 *           type: number
 *         childMale:
 *           type: number
 *         childFemale:
 *           type: number
 *         skillIds:
 *           type: array
 *           items:
 *             type: number
 *         BAPSrelatedInfo:
 *           type: array
 *           items:
 *             type: number
 *         notes:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

// Create (Bulk create users)
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create users in bulk
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The users were successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 */
router.post('/', protect, superAdmin, async (req, res) => {
    try {
        const users = req.body;
        const insertedUsers = await User.insertMany(users);
        res.status(201).json(insertedUsers);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Read (Get all users)
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 */
router.get('/', protect, admin, async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

/**
 * @swagger
 * /users/search:
 *   get:
 *     summary: Search users by name or mobile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: The query string to search by name or mobile
 *     responses:
 *       200:
 *         description: A list of users matching the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 */
router.get('/search', protect, admin, async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ error: 'Query parameter is required' });
        }

        const users = await User.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { mobile: { $regex: query, $options: 'i' } }
            ]
        });

        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

// Read (Get user by ID)
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The user description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 *       400:
 *         description: Bad request
 */
router.get('/:id', protect, admin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 *       400:
 *         description: Bad request
 */
router.put('/:id', protect, superAdmin, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 *       400:
 *         description: Bad request
 */
router.delete('/:id', protect, superAdmin, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
