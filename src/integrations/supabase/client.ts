// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ytfixzgmehwxjaazjhzx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0Zml4emdtZWh3eGphYXpqaHp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkzODkwNzYsImV4cCI6MjA1NDk2NTA3Nn0.FZFZZCctsP_qbVjPNLEqVhfhH9IC7dWmWZygl9CPEzU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);