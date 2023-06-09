USE [Hasty]
GO
/****** Object:  StoredProcedure [dbo].[SiteReferences_Insert]    Script Date: 2/15/2023 10:27:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Kacy Lam>
-- Create date: <02-14-2023>
-- Description: SiteReferences Insert
-- Code Reviewer: Daniel
-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[SiteReferences_Insert]
			@UserId int
			,@ReferenceTypeId int

/* -------- Test Code --------

	Declare		@UserId int = 10
				,@ReferenceTypeId int = 3

	Execute		dbo.SiteReferences_Insert
						@UserId
						,@ReferenceTypeId

	Select	*
	From	dbo.SiteReferences
	Where	UserId = @UserId

*/ -------- Test Code --------

as

BEGIN

	INSERT INTO [dbo].[SiteReferences]
			   ([UserId]
			   ,[ReferenceTypeId])

		 VALUES
				(@UserId
				,@ReferenceTypeId)

END
GO
