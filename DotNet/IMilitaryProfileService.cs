using Sabio.Models;
using Sabio.Models.Domain.MilitaryProfile;
using Sabio.Models.Requests.MilitaryProfiles;

namespace Sabio.Services.Interfaces
{
    public interface IMilitaryProfileService
    {
        int Add(MilitaryProfileAddRequest model, int userId);
        void Delete(int Id);
        MilitaryProfile Get(int id);
        Paged<MilitaryProfile> GetByPage(int pageIndex, int pageSize);
        Paged<MilitaryProfile> SearchPaginated(int pageIndex, int pageSize, string query);
        void Update(MilitaryProfileUpdateRequest model, int userId);
    }
}