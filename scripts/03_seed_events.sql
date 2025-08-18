-- Adding upcoming chess club events
INSERT INTO events (title, description, event_date, location, event_type, status, max_participants, current_participants, created_by) VALUES
('Monthly Blitz Tournament', 'Fast-paced 5-minute games with prizes for top 3 finishers', '2024-02-15 18:00:00', 'Main Hall', 'tournament', 'upcoming', 32, 18, 1),
('Beginner Chess Workshop', 'Learn the basics of chess strategy and tactics', '2024-02-20 14:00:00', 'Training Room A', 'workshop', 'upcoming', 20, 12, 3),
('Grandmaster Simultaneous Exhibition', 'Play against a Grandmaster in a simultaneous display', '2024-02-25 16:00:00', 'Exhibition Hall', 'exhibition', 'upcoming', 50, 35, 4),
('Chess Puzzle Championship', 'Solve tactical puzzles faster than your opponents', '2024-03-01 19:00:00', 'Main Hall', 'competition', 'upcoming', 24, 8, 2),
('Youth Chess Camp', 'Intensive training program for players under 18', '2024-03-05 09:00:00', 'Training Center', 'camp', 'upcoming', 16, 14, 6),
('Classical Tournament', 'Long time control games for serious competition', '2024-03-10 10:00:00', 'Tournament Hall', 'tournament', 'upcoming', 40, 22, 1),
('Chess & Coffee Social', 'Casual games and networking with fellow members', '2024-03-15 15:00:00', 'Lounge Area', 'social', 'upcoming', 30, 25, 7),
('Endgame Masterclass', 'Advanced endgame techniques with IM Anna Rudolf', '2024-03-20 17:00:00', 'Lecture Hall', 'masterclass', 'upcoming', 25, 19, 5);
