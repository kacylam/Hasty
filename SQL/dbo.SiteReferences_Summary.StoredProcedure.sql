USE [Hasty]
GO
/****** Object:  StoredProcedure [dbo].[SiteReferences_Summary]    Script Date: 2/28/2023 12:32:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Kacy Lam>
-- Create date: <02-15-2023>
-- Description: SiteReferences Summary
-- Code Reviewer: Eugene Kim
-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc	[dbo].[SiteReferences_Summary]

/* -------- Test Code --------

	Execute dbo.SiteReferences_Summary

---------- Test Code -------*/
as

BEGIN

	SELECT		sr.ReferenceTypeId
				,rt.Name
				,COUNT(*) as TotalCount
				
				

	FROM		dbo.SiteReferences as sr
	INNER JOIN	dbo.ReferenceTypes as rt on rt.Id = sr.ReferenceTypeId

	GROUP BY	sr.ReferenceTypeId, rt.Name
	ORDER BY	sr.ReferenceTypeId

END
GO
