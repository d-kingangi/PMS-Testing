CREATE OR ALTER PROCEDURE loginuser(@email VARCHAR(255), @password VARCHAR(255))
AS
BEGIN
    SELECT * FROM users WHERE email = @email
END