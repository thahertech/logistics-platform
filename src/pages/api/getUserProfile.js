import Cors from 'cors';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL, // Ensure you have your database URL in .env
});

// Initialize CORS middleware
const cors = Cors({
    methods: ['GET', 'POST'],
    origin: 'http://localhost:3000', // Change this to your production URL when deployed
});

export default async function handler(req, res) {
    // Run CORS middleware
    await new Promise((resolve, reject) => {
        cors(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }
            resolve();
        });
    });

    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }


    try {
        const result = await pool.query(
            `SELECT
                u.id AS user_id,
                u.username,
                u.full_name,
                u.avatar_url,
                u.website,
                p.updated_at AS profile_updated_at
            FROM
                auth.users u
            JOIN
                public.profiles p ON u.id = p.id
            WHERE
                u.id = $1;`,
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
