DROP DATABASE CustomerAppDb;
GO

CREATE DATABASE [CustomerAppDb];
GO

USE [CustomerAppDb];
GO

CREATE TABLE [Customers] (
	[CstId] INT NOT NULL IDENTITY,
	[CustomerId] nvarchar(50) NOT NULL,
	[CustomerName] nvarchar(50) NOT NULL,
	CONSTRAINT [PK_CstId] PRIMARY KEY ([CstId])

);
GO

CREATE TABLE [CustomerActions] (
	[ActId] INT NOT NULL IDENTITY,
	[CstId] INT NOT NULL,
	[CustomerAction] nvarchar(100),
	[Timestamp] DATETIME,
	[Completed] BIT,
	CONSTRAINT [PK_ActId] PRIMARY KEY ([ActId]),
	CONSTRAINT [FK_Action_Customer_CstId] FOREIGN KEY ([CstId]) REFERENCES [Customers] ([CstId]) ON DELETE CASCADE
);
GO

INSERT INTO [Customers] (CustomerId, CustomerName) VALUES
(123456, 'Frodo'),
(654321, 'Aragorn'),
(123654, 'Legolas'),
(456123, 'Gimli'),
(321456, 'Gandalf')
GO

INSERT INTO [CustomerActions] (CstId, CustomerAction, Timestamp, Completed) VALUES
((SELECT CstId FROM Customers WHERE CustomerId = 123456), 'Processing', CURRENT_TIMESTAMP, 0),
((SELECT CstId FROM Customers WHERE CustomerId = 654321), 'Processing', CURRENT_TIMESTAMP, 1),
((SELECT CstId FROM Customers WHERE CustomerId = 123654), 'Analysing', CURRENT_TIMESTAMP, 1),
((SELECT CstId FROM Customers WHERE CustomerId = 123456), 'Analysing', CURRENT_TIMESTAMP, 1)
GO