USE [Hasty]
GO
/****** Object:  StoredProcedure [dbo].[MilitaryProfile_Insert]    Script Date: 2/1/2023 10:27:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Kacy Lam>
-- Create date: <01-28-2023>
-- Description: MilitaryProfile Insert
-- Code Reviewer: 
-- MODIFIED BY: Kacy Lam
-- MODIFIED DATE: <01-31-2023>
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[MilitaryProfile_Insert]
			@UserId int
			,@MonthlyIncome int
			,@MoveInDate datetime2
			,@IsActiveDuty bit
			,@BranchId int
			,@RankId int
			,@HasHousingAllowance bit
			,@Unit nvarchar(200)
			,@NoLaterThanDate datetime2
			,@Id int OUTPUT

/* -------- Test Code --------

	Declare @Id int = 0;

	Declare @UserId int = 10
			,@MonthlyIncome int = 10000
			,@MoveInDate datetime2 = null
			,@IsActiveDuty bit = 1
			,@BranchId int = 4
			,@RankId int = 4
			,@HasHousingAllowance bit = 1
			,@Unit nvarchar(200) = 'UNIT'
			,@NoLaterThanDate datetime2 = null

	Execute dbo.MilitaryProfile_Insert
						@UserId
						,@MonthlyIncome
						,@MoveInDate
						,@IsActiveDuty
						,@BranchId
						,@RankId
						,@HasHousingAllowance
						,@Unit
						,@NoLaterThanDate
						,@Id OUTPUT

	Select	*
	From	dbo.MilitaryProfile
	Where	Id = @Id

*/ -------- Test Code --------

as

BEGIN

	INSERT INTO [dbo].[MilitaryProfile]
			   ([UserId]
				,[MonthlyIncome]
				,[MoveInDate]
				,[IsActiveDuty]
				,[BranchId]
				,[RankId]
				,[HasHousingAllowance]
				,[Unit]
				,[NoLaterThanDate])

		 VALUES
				(@UserId
				,@MonthlyIncome
				,@MoveInDate
				,@IsActiveDuty
				,@BranchId
				,@RankId
				,@HasHousingAllowance 
				,@Unit
				,@NoLaterThanDate)

		SET @Id = SCOPE_IDENTITY()

END
GO
