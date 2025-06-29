import { supabase } from './supabase';
import fs from 'fs';
import path from 'path';

async function setupDatabase() {
  try {
    // Read the SQL file
    const sqlContent = fs.readFileSync(
      path.join(__dirname, '../../supabase/migrations/20240325000000_create_profiles_tables.sql'),
      'utf8'
    );

    // Execute the SQL
    const { error } = await supabase.from('profiles').select('*').limit(1);
    
    if (error?.message.includes('relation "profiles" does not exist')) {
      const { error: migrationError } = await supabase.rpc('exec_sql', {
        sql: sqlContent
      });

      if (migrationError) {
        console.error('Migration failed:', migrationError);
        return;
      }

      console.log('Database migration completed successfully!');
    } else {
      console.log('Tables already exist, skipping migration.');
    }
  } catch (error) {
    console.error('Error setting up database:', error);
  }
}

setupDatabase(); 