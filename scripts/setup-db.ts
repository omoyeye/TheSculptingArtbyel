
import { readFileSync } from 'fs';
import { join } from 'path';
import { pool } from '../server/db';

async function setupDatabase() {
  try {
    console.log('Setting up database...');
    
    // Read and execute the migration file
    const migrationPath = join(__dirname, '../migrations/0001_initial.sql');
    const migrationSQL = readFileSync(migrationPath, 'utf8');
    
    // Execute the migration
    await pool.query(migrationSQL);
    
    console.log('Database setup completed successfully!');
    
    // Close the connection pool
    await pool.end();
    
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase();
