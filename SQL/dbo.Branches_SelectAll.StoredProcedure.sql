USE [Hasty]
GO
/****** Object:  StoredProcedure [dbo].[Branches_SelectAll]    Script Date: 1/31/2023 2:59:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Kacy Lam>
-- Create date: <01-28-2023>
-- Description: Branches SelectAll
-- Code Reviewer: 
-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc	[dbo].[Branches_SelectAll]

/* -------- Test Code --------

	Execute dbo.Branches_SelectAll

---------- Test Code -------*/
as

BEGIN

	SELECT	[Id]
			,[Name]
			,[Logo]

	FROM	[dbo].[Branches]

END

GO
