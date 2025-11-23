import { Router } from 'express';
import { supabase } from '../lib/supabase';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

// Get flagged messages (moderators only)
router.get('/flagged', authenticate, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;

    // Check if user is a moderator
    const { data: volunteer } = await supabase
      .from('volunteers')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .single();

    if (!volunteer) {
      return res.status(403).json({ error: 'Moderator access required' });
    }

    const { data, error } = await supabase
      .from('messages')
      .select('*, profile:profiles(nickname, avatar), room:rooms(name)')
      .in('risk_level', ['high', 'critical'])
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Error fetching flagged messages:', error);
      return res.status(500).json({ error: 'Failed to fetch flagged messages' });
    }

    res.json(data || []);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a report
router.post('/reports', authenticate, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const { messageId, reason } = req.body;

    if (!messageId || !reason) {
      return res.status(400).json({ error: 'Message ID and reason are required' });
    }

    const { data, error } = await supabase
      .from('reports')
      .insert({
        message_id: messageId,
        reported_by: userId,
        reason,
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating report:', error);
      return res.status(500).json({ error: 'Failed to create report' });
    }

    res.status(201).json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all reports (moderators only)
router.get('/reports', authenticate, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;

    // Check if user is a moderator
    const { data: volunteer } = await supabase
      .from('volunteers')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .single();

    if (!volunteer) {
      return res.status(403).json({ error: 'Moderator access required' });
    }

    const { data, error } = await supabase
      .from('reports')
      .select('*, message:messages(content, risk_level), reporter:profiles!reported_by(nickname)')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching reports:', error);
      return res.status(500).json({ error: 'Failed to fetch reports' });
    }

    res.json(data || []);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
