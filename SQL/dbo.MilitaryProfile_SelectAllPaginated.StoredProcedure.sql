USE [Hasty]
GO
/****** Object:  StoredProcedure [dbo].[MilitaryProfile_SelectAllPaginated]    Script Date: 2/2/2023 11:46:06 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Kacy Lam>
-- Create date: <01-30-2023>
-- Description: MilitaryProfile SelectAllPaginated
-- Code Reviewer: Kevin Chang
-- MODIFIED BY: Kacy Lam
-- MODIFIED DATE: <02-01-2023>
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[MilitaryProfile_SelectAllPaginated]
						@PageIndex int
						,@PageSize int

/* -------- Test Code --------

	DECLARE @PageIndex int = 0
	DECLARE @PageSize int = 3

	Execute	dbo.MilitaryProfile_SelectAllPaginated
						@PageIndex, @PageSize

*/ -------- Test Code --------

as

BEGIN

	DECLARE		@offset int = @PageIndex * @PageSize

	SELECT		mp.Id
				,mp.UserId
				,u.FirstName
				,u.LastName
				,u.Mi
				,u.AvatarUrl
				,u.Email
				,mr.Id as RankId
				,mr.Name as RankName
				,b.Id as BranchId
				,b.Name as BranchName
				,mp.MonthlyIncome
				,mp.MoveInDate
				,mp.IsActiveDuty
				,mp.HasHousingAllowance
				,mp.Unit
				,mp.NoLaterThanDate
				,mp.DateCreated
				,mp.DateModified
				,mp.IsDeleted
				,TotalCount = COUNT(1) OVER()

	FROM		dbo.MilitaryProfile as mp 
	INNER JOIN	dbo.Users as u ON mp.UserId = u.Id
	INNER JOIN	dbo.MilitaryRanks as mr ON mr.Id = mp.RankId
	INNER JOIN	dbo.Branches as b ON b.Id = mp.BranchId

	ORDER BY	mp.Id

	OFFSET @offSet Rows
	Fetch Next @PageSize Rows ONLY

END
GO
