USE [Hasty]
GO
/****** Object:  StoredProcedure [dbo].[SiteReferences_SelectAll]    Script Date: 2/15/2023 3:57:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Kacy Lam>
-- Create date: <02-14-2023>
-- Description: SiteReferences SelectAll
-- Code Reviewer: Daniel
-- MODIFIED BY: Kacy Lam
-- MODIFIED DATE: 2-15-2023
-- Code Reviewer: Jaison
-- Note:
-- =============================================

CREATE proc	[dbo].[SiteReferences_SelectAll]
						@PageIndex int
						,@PageSize int

/* -------- Test Code --------

	DECLARE @PageIndex int = 0
			,@PageSize int = 10

	Execute dbo.SiteReferences_SelectAll
					@PageIndex, @PageSize

---------- Test Code -------*/
as

BEGIN

	DECLARE		@offset int = @PageIndex * @PageSize

	SELECT		sr.ReferenceTypeId
				,rt.Name
				,u.Id as UserId
				,TotalCount = COUNT(1) OVER()

	FROM		dbo.SiteReferences as sr
	INNER JOIN	dbo.Users as u on u.Id = sr.UserId
	INNER JOIN	dbo.ReferenceTypes as rt on rt.Id = sr.ReferenceTypeId

	ORDER BY	u.Id
	
	OFFSET @offSet Rows
	Fetch Next @PageSize Rows ONLY

END
GO
