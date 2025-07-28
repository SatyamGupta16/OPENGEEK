/**
 * User utility functions for handling user creation and username generation
 */

/**
 * Ensure user exists in database with unique username
 * @param {Object} client - Database client
 * @param {string} userId - User ID from Clerk
 * @param {Object} userInfo - User information from Clerk
 * @returns {Promise<string>} - Final username assigned to user
 */
async function ensureUserExists(client, userId, userInfo) {
  if (!userInfo) {
    throw new Error('User information is required');
  }

  // Generate unique username
  let finalUsername = userInfo.username;
  let usernameAttempt = 1;
  
  // Check if username already exists and generate a unique one if needed
  while (true) {
    const existingUserCheck = await client.query(
      'SELECT id FROM users WHERE username = $1 AND id != $2',
      [finalUsername, userId]
    );
    
    if (existingUserCheck.rows.length === 0) {
      break; // Username is available
    }
    
    // Generate a new username with a number suffix
    finalUsername = userInfo.username + usernameAttempt;
    usernameAttempt++;
    
    // Prevent infinite loop
    if (usernameAttempt > 100) {
      finalUsername = userInfo.username + Math.random().toString(36).substr(2, 4);
      break;
    }
  }

  // Upsert user with unique username
  const userUpsertQuery = `
    INSERT INTO users (id, email, username, first_name, last_name, full_name, image_url)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT (id) DO UPDATE SET
      email = EXCLUDED.email,
      username = CASE 
        WHEN users.username IS NULL OR users.username = '' 
        THEN EXCLUDED.username 
        ELSE users.username 
      END,
      first_name = COALESCE(EXCLUDED.first_name, users.first_name),
      last_name = COALESCE(EXCLUDED.last_name, users.last_name),
      full_name = COALESCE(EXCLUDED.full_name, users.full_name),
      image_url = COALESCE(EXCLUDED.image_url, users.image_url),
      updated_at = CURRENT_TIMESTAMP
  `;

  await client.query(userUpsertQuery, [
    userId,
    userInfo.email || '',
    finalUsername,
    userInfo.firstName || '',
    userInfo.lastName || '',
    userInfo.fullName || finalUsername || 'User',
    userInfo.imageUrl || ''
  ]);

  return finalUsername;
}

module.exports = {
  ensureUserExists
};