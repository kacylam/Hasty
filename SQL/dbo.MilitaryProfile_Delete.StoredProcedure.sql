USE [Hasty]
GO
/****** Object:  StoredProcedure [dbo].[MilitaryProfile_Delete]    Script Date: 2/1/2023 10:27:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Kacy Lam>
-- Create date: <01-28-2023>
-- Description: MilitaryProfile Delete
-- Code Reviewer: 
-- MODIFIED BY: Kacy Lam
-- MODIFIED DATE: <01-31-2023>
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[MilitaryProfile_Delete]
			@Id int

/* -------- Test Code --------

	Declare @Id int = 1;

	Execute	dbo.MilitaryProfile_Delete
						@Id

	Select	*
	From	dbo.MilitaryProfile
	Where	Id = @Id

*/ -------- Test Code --------

as

BEGIN

	UPDATE		[dbo].[MilitaryProfile]

	SET			[IsDeleted] = 1

	WHERE		Id = @Id

END
GO
