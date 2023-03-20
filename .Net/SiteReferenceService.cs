using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models.Domain.MilitaryProfile;
using Sabio.Models;
using Sabio.Models.Domain.SiteReferences;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Models.Domain;
using Sabio.Models.Requests.MilitaryProfiles;
using Sabio.Models.Requests.SiteReference;
using System.Collections;

namespace Sabio.Services
{
    public class SiteReferenceService : ISiteReferenceService
    {
        IDataProvider _data = null;
        static IBaseUserMapper _baseUserMapper = null;

        public SiteReferenceService(IDataProvider data, IBaseUserMapper baseUserMapper)
        {
            _data = data;
            _baseUserMapper = baseUserMapper;
        }

        public Paged<SiteReference> GetAll(int pageIndex, int pageSize)
        {
            Paged<SiteReference> pagedList = null;
            List<SiteReference> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(
                "[dbo].[SiteReferences_SelectAll]",
                (param) =>
                {
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    SiteReference reference = MapSingleReference(reader, ref startingIndex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }

                    if (list == null)
                    {
                        list = new List<SiteReference>();
                    }

                    list.Add(reference);
                });
            if (list != null)
            {
                pagedList = new Paged<SiteReference>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;
        }

        public void Add(SiteReferenceAddRequest model)
        {
            string procName = "[dbo].[SiteReferences_Insert]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@ReferenceTypeId", model.ReferenceTypeId);
                col.AddWithValue("@email", model.Email);

            }, returnParameters: null);

        }

        public List<SiteReferenceSummary> GetSummary()
        {
            List<SiteReferenceSummary> list = null;

            string procName = "[dbo].[SiteReferences_Summary]";

            _data.ExecuteCmd(procName, 
                inputParamMapper: null,
            singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                SiteReferenceSummary reference = MapSingleSummary(reader, ref startingIndex);

                if (list == null)
                {
                    list = new List<SiteReferenceSummary>();
                }

                list.Add(reference);

            });

            return list;
        }
        private static SiteReference MapSingleReference(IDataReader reader, ref int startingIndex)
        {
            SiteReference aReference = new SiteReference();

            aReference.ReferenceTypeId = new LookUp();
            aReference.ReferenceTypeId.Id = reader.GetInt32(startingIndex++);
            aReference.ReferenceTypeId.Name = reader.GetSafeString(startingIndex++);
            aReference.UserId = reader.GetSafeInt32(startingIndex++);

            return aReference;
        }

        private static SiteReferenceSummary MapSingleSummary(IDataReader reader, ref int startingIndex)
        {
            SiteReferenceSummary aReference = new SiteReferenceSummary();

            aReference.ReferenceType = new LookUp();
            aReference.ReferenceType.Id = reader.GetInt32(startingIndex++);
            aReference.ReferenceType.Name = reader.GetSafeString(startingIndex++);
            aReference.TotalCount = reader.GetSafeInt32(startingIndex++);

            return aReference;
        }
    }
}