using Sabio.Models;
using Sabio.Models.Domain.SiteReferences;
using Sabio.Models.Requests.SiteReference;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface ISiteReferenceService
    {
        void Add(SiteReferenceAddRequest model);
        Paged<SiteReference> GetAll(int pageIndex, int pageSize);
        List<SiteReferenceSummary> GetSummary();
    }
}