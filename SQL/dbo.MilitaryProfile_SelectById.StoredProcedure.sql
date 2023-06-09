USE [Hasty]
GO
/****** Object:  StoredProcedure [dbo].[MilitaryProfile_SelectById]    Script Date: 2/2/2023 11:46:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Kacy Lam>
-- Create date: <01-30-2023>
-- Description: MilitaryProfile SelectById
-- Code Reviewer: Kevin Chang
-- MODIFIED BY: Kacy Lam
-- MODIFIED DATE: <02-01-2023>
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[MilitaryProfile_SelectById]
			@Id int

/* -------- Test Code --------

	Declare @Id int = 2;

	Execute	dbo.MilitaryProfile_SelectById	@Id

*/ -------- Test Code --------

as

BEGIN

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

	FROM		dbo.MilitaryProfile as mp 
	INNER JOIN	dbo.Users as u ON mp.UserId = u.Id
	INNER JOIN	dbo.MilitaryRanks as mr ON mr.Id = mp.RankId
	INNER JOIN	dbo.Branches as b ON b.Id = mp.BranchId

	WHERE		mp.Id = @Id

END
GO
