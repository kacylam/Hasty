using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Listings;
using Sabio.Models.Domain.MilitaryProfile;
using Sabio.Models.Domain.Users;
using Sabio.Models.Requests.MilitaryProfiles;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class MilitaryProfileService : IMilitaryProfileService
    {
        IDataProvider _data = null;
        static IBaseUserMapper _baseUserMapper = null;
        public MilitaryProfileService(IDataProvider data, IBaseUserMapper baseUserMapper)
        {
            _data = data;
            _baseUserMapper = baseUserMapper;
        }

        public MilitaryProfile Get(int id)
        {
            string procName = "[dbo].[MilitaryProfile_SelectById]";

            MilitaryProfile profile = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);

            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                profile = MapSingleProfile(reader, ref startingIndex);
            });

            return profile;
        }

        public Paged<MilitaryProfile> GetByPage(int pageIndex, int pageSize)
        {
            Paged<MilitaryProfile> pagedList = null;
            List<MilitaryProfile> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(
                "[dbo].[MilitaryProfile_SelectAllPaginated]",
                (param) =>
                {
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    MilitaryProfile profile = MapSingleProfile(reader, ref startingIndex);

                    if( totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }
                    
                    if (list == null)
                    {
                        list = new List<MilitaryProfile>();
                    }

                    list.Add(profile);
                });
            if (list != null)
            {
                pagedList = new Paged<MilitaryProfile>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;
        }

        public Paged<MilitaryProfile> SearchPaginated(int pageIndex, int pageSize, string query)
        {
            Paged<MilitaryProfile> pagedList = null;
            List<MilitaryProfile> MilitaryProfilesList = null;
            int totalCount = 0;
            string procName = "[dbo].[MilitaryProfile_Search]";
            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@PageIndex", pageIndex);
                col.AddWithValue("@PageSize", pageSize);
                col.AddWithValue("@Query", query);
            },
            singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                MilitaryProfile MilitaryProfile = MapSingleProfile(reader, ref startingIndex);
                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex++);
                }
                if (MilitaryProfilesList == null)
                {
                    MilitaryProfilesList = new List<MilitaryProfile>();
                }
                MilitaryProfilesList.Add(MilitaryProfile);
            });
            if (MilitaryProfilesList != null)
            {
                pagedList = new Paged<MilitaryProfile>(MilitaryProfilesList, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public int Add(MilitaryProfileAddRequest model, int userId)
        {
            int id = 0;

            string procName = "[dbo].[MilitaryProfile_Insert]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                col.AddWithValue("@UserId", userId);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;

                col.Add(idOut);

            }, returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;

                int.TryParse(oId.ToString(), out id);
            });

            return id;
        }

        public void Delete(int Id)
        {
            string procName = "[dbo].[MilitaryProfile_Delete]";

            _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", Id);

            }, returnParameters: null);
        }

        public void Update(MilitaryProfileUpdateRequest model, int userId)
        {
            string procName = "[dbo].[MilitaryProfile_Update]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                col.AddWithValue("@UserId", userId);
                col.AddWithValue("@Id", model.Id);

            }, returnParameters: null);
        }

        private static void AddCommonParams(MilitaryProfileAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@MonthlyIncome", model.MonthlyIncome);
            col.AddWithValue("@MoveInDate", model.MoveInDate);
            col.AddWithValue("@IsActiveDuty", model.IsActiveDuty);
            col.AddWithValue("@BranchId", model.BranchId);
            col.AddWithValue("@RankId", model.RankId);
            col.AddWithValue("@HasHousingAllowance", model.HasHousingAllowance);
            col.AddWithValue("@Unit", model.Unit);
            col.AddWithValue("@NoLaterThanDate", model.NoLaterThanDate);
        }

        private static MilitaryProfile MapSingleProfile(IDataReader reader, ref int startingIndex)
        {
            MilitaryProfile aProfile = new MilitaryProfile();

            aProfile.Id = reader.GetSafeInt32(startingIndex++);
            aProfile.User = _baseUserMapper.MapBaseUser(reader, ref startingIndex);
            aProfile.Email = reader.GetSafeString(startingIndex++);
            aProfile.Rank = new LookUp();
            aProfile.Rank.Id = reader.GetSafeInt32(startingIndex++);
            aProfile.Rank.Name = reader.GetSafeString(startingIndex++);
            aProfile.Branch = new LookUp();
            aProfile.Branch.Id = reader.GetSafeInt32(startingIndex++);
            aProfile.Branch.Name = reader.GetSafeString(startingIndex++);
            aProfile.MonthlyIncome = reader.GetSafeInt32(startingIndex++);
            aProfile.MoveInDate = reader.GetSafeDateTime(startingIndex++);
            aProfile.IsActiveDuty = reader.GetSafeBool(startingIndex++);
            aProfile.HasHousingAllowance = reader.GetSafeBool(startingIndex++);
            aProfile.Unit = reader.GetSafeString(startingIndex++);
            aProfile.NoLaterThanDate = reader.GetSafeDateTime(startingIndex++);
            aProfile.DateCreated = reader.GetSafeDateTime(startingIndex++);
            aProfile.DateModified = reader.GetSafeDateTime(startingIndex++);
            aProfile.IsDeleted = reader.GetSafeBool(startingIndex++);

            return aProfile;
        }
    }
}