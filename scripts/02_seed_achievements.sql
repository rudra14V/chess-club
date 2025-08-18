-- Adding chess club achievements system
INSERT INTO achievements (title, description, points, requirements, icon_url, achievement_type, is_active) VALUES
('First Victory', 'Win your first rated game in the club', 10, 'Win 1 rated game', '🏆', 'milestone', true),
('Rising Knight', 'Achieve a rating of 1200 or higher', 25, 'Reach 1200+ rating', '♞', 'rating', true),
('Tournament Warrior', 'Participate in 5 club tournaments', 50, 'Join 5 tournaments', '⚔️', 'participation', true),
('Speed Demon', 'Win 10 blitz games in a row', 75, 'Win 10 consecutive blitz games', '⚡', 'streak', true),
('Chess Scholar', 'Complete all beginner training modules', 30, 'Finish beginner course', '📚', 'education', true),
('Master Tactician', 'Solve 100 tactical puzzles', 40, 'Complete 100 puzzles', '🧩', 'training', true),
('Club Champion', 'Win a monthly tournament', 100, 'Win monthly tournament', '👑', 'competition', true),
('Mentor', 'Help train 3 new members', 60, 'Mentor 3 beginners', '🎓', 'community', true),
('Endgame Expert', 'Master all endgame scenarios', 80, 'Complete endgame training', '🏁', 'skill', true),
('Grand Master Path', 'Achieve a rating of 2000 or higher', 200, 'Reach 2000+ rating', '🌟', 'rating', true);
