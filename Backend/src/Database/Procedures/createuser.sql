CREATE OR ALTER PROCEDURE createuser(
    @userId VARCHAR(255),
    @firstname VARCHAR(255),
    @lastname VARCHAR(255),
    @email VARCHAR(255),
    @password VARCHAR(255)
)
AS
BEGIN
    INSERT INTO users(userId, firstname, lastname, email, password)
    VALUES(@userId, @firstname, @lastname, @email, @password)
END
