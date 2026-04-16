export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { firstName, email, phone, stage } = req.body;
  if (!firstName || !email) return res.status(400).json({ error: 'Name and email required.' });

  const SUPABASE_URL = 'https://vvkdnzqgtajeouxlliuk.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2a2RuenFndGFqZW91eGxsaXVrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTAwOTE4NiwiZXhwIjoyMDg2NTg1MTg2fQ.Q61WGhT0KHUbrVc3FiRzQN-vhmy53dEqaad4w4c_Z9o';

  const response = await fetch(`${SUPABASE_URL}/rest/v1/cb_leads`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
    },
    body: JSON.stringify({
      name: firstName,
      email: email,
      phone: phone || '',
      company_name: 'Individual Borrower',
      product_type: 'Buyers Guide',
      target_audience: 'Home Buyer',
      primary_cta: 'Download Guide',
      credential: 'buyers.huit.ai',
      authority_signal: 'Derek Huit — Alaska Mortgage Advisor',
      compliance_domain: 'Mortgage',
      budget_range: 'TBD',
      timeline: stage || 'Not specified',
      notes: 'Source: buyers.huit.ai — Down Payment & Closing Cost Guide download',
      status: 'new',
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    console.error('Supabase error:', err);
    return res.status(500).json({ error: 'Failed to save lead.' });
  }

  return res.status(200).json({ success: true });
}
