CREATE TABLE sponsorship.Sponsors (
    SponsorID SERIAL PRIMARY KEY,
    SponsorName VARCHAR(255) NOT NULL,
    IndustryType VARCHAR(255),
    ContactEmail VARCHAR(255) UNIQUE NOT NULL,
    Phone VARCHAR(50) NOT NULL
);

CREATE TABLE sponsorship.Matches (
    MatchID SERIAL PRIMARY KEY,
    MatchName VARCHAR(255) NOT NULL,
    MatchDate DATE NOT NULL,
    Location VARCHAR(255) NOT NULL
);

CREATE TABLE sponsorship.Contracts (
    ContractID SERIAL PRIMARY KEY,
    SponsorID INT,
    MatchID INT,
    ContractDate DATE NOT NULL,
    ContractValue DECIMAL(18,2) NOT NULL,
    FOREIGN KEY (SponsorID) REFERENCES sponsorship.Sponsors(SponsorID),
    FOREIGN KEY (MatchID) REFERENCES sponsorship.Matches(MatchID)
);

CREATE TABLE sponsorship.Payments (
    PaymentID SERIAL PRIMARY KEY,
    ContractID INT,
    PaymentDate DATE NOT NULL,
    AmountPaid DECIMAL(18,2) NOT NULL,
    PaymentStatus VARCHAR(50) CHECK (PaymentStatus IN ('Pending', 'Completed', 'Failed')) NOT NULL,
    FOREIGN KEY (ContractID) REFERENCES sponsorship.Contracts(ContractID)
);

INSERT INTO sponsorship.Sponsors (SponsorName, IndustryType, ContactEmail, Phone)
VALUES
('Global Tech', 'Technology', 'contact@globaltech.com', '555-1234'),
('Sporty Goods', 'Retail', 'info@sportygoods.com', '555-5678'),
('Health Plus', 'Healthcare', 'support@healthplus.com', '555-8765'),
('Auto World', 'Automotive', 'service@autoworld.com', '555-4321');

INSERT INTO sponsorship.Matches (MatchName, MatchDate, Location)
VALUES
('Cricket Super League Final', '2024-09-15', 'Wembley Stadium, London'),
('Champions Cup Semi-Final', '2024-10-01', 'Old Trafford, Manchester'),
('National Football Championship', '2024-11-22', 'Stadium Australia, Sydney'),
('Grand Slam Tennis Open', '2024-12-05', 'Rod Laver Arena, Melbourne');

INSERT INTO sponsorship.Contracts (SponsorID, MatchID, ContractDate, ContractValue)
VALUES
(1, 1, '2024-08-01', 500000.00),
(2, 1, '2024-08-02', 300000.00),
(3, 2, '2024-09-01', 400000.00),
(4, 3, '2024-10-01', 250000.00),
(1, 4, '2024-11-01', 600000.00);

INSERT INTO sponsorship.Payments (ContractID, PaymentDate, AmountPaid, PaymentStatus)
VALUES
(1, '2024-08-10', 250000.00, 'Completed'),
(1, '2024-09-10', 250000.00, 'Completed'),
(2, '2024-08-15', 150000.00, 'Completed'),
(2, '2024-09-15', 150000.00, 'Completed'),
(3, '2024-09-10', 200000.00, 'Completed'),
(3, '2024-10-10', 200000.00, 'Completed'),
(4, '2024-10-15', 125000.00, 'Completed'),
(4, '2024-11-15', 125000.00, 'Completed'),
(5, '2024-11-10', 300000.00, 'Completed'),
(5, '2024-12-10', 300000.00, 'Completed');
