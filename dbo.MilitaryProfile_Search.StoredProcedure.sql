USE [Hasty]
GO
/****** Object:  StoredProcedure [dbo].[MilitaryProfile_Search]    Script Date: 2/14/2023 9:49:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Kacy Lam>
-- Create date: <02-13-2023>
-- Description: MilitaryProfile Search
-- Code Reviewer: Jesse
-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[MilitaryProfile_Search]
						@PageIndex int
						,@PageSize int
						,@Query nvarchar(50)

/* -------- Test Code --------

	DECLARE @PageIndex int = 0
			,@PageSize int = 5
			,@Query nvarchar(50) = 'e2'


	Execute	dbo.MilitaryProfile_Search
						@PageIndex, @PageSize, @Query

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

	WHERE		(mr.Name LIKE '%' + @Query + '%')
				or
				(b.Name LIKE '%' + @Query + '%')
				or
				(u.FirstName LIKE '%' + @Query + '%')
				or
				(u.LastName LIKE '%' + @Query + '%')
			
	ORDER BY	mp.Id

	OFFSET @offSet Rows
	Fetch Next @PageSize Rows ONLY

END
GO
