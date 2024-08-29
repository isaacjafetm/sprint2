import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://jmboqwetorebeqvvadyj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptYm9xd2V0b3JlYmVxdnZhZHlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcwMDM5MjEsImV4cCI6MjAzMjU3OTkyMX0.T8_tvBtMdNyt8TdoiyUanQFuqL16PK48kjJJt-ALrIw'
const supabaseServiceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptYm9xd2V0b3JlYmVxdnZhZHlqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNzAwMzkyMSwiZXhwIjoyMDMyNTc5OTIxfQ.C1YxswysmpW69VIQ8fSLbNgHsIzZVdOJYLE5Tjh_nWs';
const supabase = createClient(supabaseUrl, supabaseKey);
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);
export { supabase, supabaseAdmin };