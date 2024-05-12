import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database

export const supabase = createClient(
    'https://ljuqijutwkctxeradzgx.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqdXFpanV0d2tjdHhlcmFkemd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQzNzk2NjYsImV4cCI6MjAyOTk1NTY2Nn0.1jzhQU01FVS30a7-w_qUp8OIPpdOajZTVdDT5bDGVmg')