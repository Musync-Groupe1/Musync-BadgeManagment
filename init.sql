-- Create User table
CREATE TABLE IF NOT EXISTS "User" (
    user_id SERIAL PRIMARY KEY,
    is_certified BOOLEAN DEFAULT FALSE,
    music_sharing_count INTEGER DEFAULT 0,
    playlist_sharing_count INTEGER DEFAULT 0,
    comment_count INTEGER DEFAULT 0
);

-- Create Badge table
CREATE TABLE IF NOT EXISTS "Badge" (
    badge_id SERIAL PRIMARY KEY,
    name VARCHAR(32) NOT NULL
);

-- Create UserBadge table (link table)
CREATE TABLE IF NOT EXISTS "UserBadge" (
    user_id INTEGER,
    badge_id INTEGER,
    PRIMARY KEY (user_id, badge_id),
    FOREIGN KEY (user_id) REFERENCES "User" (user_id) ON DELETE CASCADE,
    FOREIGN KEY (badge_id) REFERENCES "Badge" (badge_id) ON DELETE CASCADE
);
