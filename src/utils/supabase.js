import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
export const supabase = createClient(
  "https://gqcfopikvkmcvnmlsvnp.supabase.co", // Replace with your Supabase project URL
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxY2ZvcGlrdmttY3ZubWxzdm5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY5OTI1MjUsImV4cCI6MjAzMjU2ODUyNX0.nrTd5mset_uoMC-tGoAu--rlf1vlhkxSHRUmRX_56UM"
);
