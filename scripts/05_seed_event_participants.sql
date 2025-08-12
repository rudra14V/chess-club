-- Adding event registrations for players
INSERT INTO event_participants (event_id, player_id, registration_date, status) VALUES
-- Monthly Blitz Tournament participants
(1, 1, '2024-01-20 10:00:00', 'confirmed'),
(1, 2, '2024-01-21 14:30:00', 'confirmed'),
(1, 3, '2024-01-22 09:15:00', 'confirmed'),
(1, 4, '2024-01-23 16:45:00', 'confirmed'),
(1, 5, '2024-01-24 11:20:00', 'confirmed'),

-- Beginner Chess Workshop participants
(2, 6, '2024-01-25 13:00:00', 'confirmed'),
(2, 7, '2024-01-26 15:30:00', 'confirmed'),
(2, 8, '2024-01-27 10:45:00', 'confirmed'),

-- Grandmaster Simultaneous Exhibition participants
(3, 1, '2024-01-28 12:00:00', 'confirmed'),
(3, 2, '2024-01-29 14:15:00', 'confirmed'),
(3, 3, '2024-01-30 16:30:00', 'confirmed'),
(3, 5, '2024-01-31 11:45:00', 'confirmed'),
(3, 6, '2024-02-01 13:20:00', 'confirmed'),

-- Chess Puzzle Championship participants
(4, 2, '2024-02-02 10:30:00', 'confirmed'),
(4, 4, '2024-02-03 15:45:00', 'confirmed'),
(4, 7, '2024-02-04 12:15:00', 'confirmed'),

-- Youth Chess Camp participants
(5, 6, '2024-02-05 09:00:00', 'confirmed'),
(5, 8, '2024-02-06 14:30:00', 'confirmed'),

-- Classical Tournament participants
(6, 1, '2024-02-07 11:00:00', 'confirmed'),
(6, 3, '2024-02-08 16:15:00', 'confirmed'),
(6, 4, '2024-02-09 13:45:00', 'confirmed'),
(6, 5, '2024-02-10 10:20:00', 'confirmed');
