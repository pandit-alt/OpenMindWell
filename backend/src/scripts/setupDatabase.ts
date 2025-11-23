import { supabase } from '../lib/supabase';

/**
 * Helper script to test database connection and setup
 * Run with: npm run setup-db
 */

async function testConnection() {
  console.log('Testing Supabase connection...');

  try {
    const { data, error } = await supabase.from('profiles').select('count').single();

    if (error) {
      console.error('❌ Database connection failed:', error.message);
      console.log('\nMake sure you have:');
      console.log('1. Created a Supabase project');
      console.log('2. Applied the schema.sql file');
      console.log('3. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env');
      process.exit(1);
    }

    console.log('✅ Database connection successful!');
    console.log('\nNext steps:');
    console.log('1. Run: npm run dev');
    console.log('2. Open frontend and create a test user');
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    process.exit(1);
  }
}

testConnection();
