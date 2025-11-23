import { Router } from 'express';
import { supabase } from '../lib/supabase';

const router = Router();

// Get all resources (public, no auth required)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;

    let query = supabase.from('resources').select('*').order('created_at', { ascending: false });

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching resources:', error);
      return res.status(500).json({ error: 'Failed to fetch resources' });
    }

    res.json(data || []);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
