// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://yimnqfhetkkxipssigwc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpbW5xZmhldGtreGlwc3NpZ3djIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5OTYxNTgsImV4cCI6MjA2MzU3MjE1OH0.2wTOzSet7A8jJv253cZ30U-9kWKWkgND2Dp-ZX8owIY";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);