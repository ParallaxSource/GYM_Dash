import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lfoccfxkvmxldsuetqtq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxmb2NjZnhrdm14bGRzdWV0cXRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMwMTk1MzQsImV4cCI6MTk4ODU5NTUzNH0.svdZ0gaA3h4nEZx71pboNhQQCNfFM8V0p-gQ9XTRscQ';

//const supabase = createClient(supabaseUrl, supabaseKey);

export const supabase = createClient(supabaseUrl, supabaseKey);
