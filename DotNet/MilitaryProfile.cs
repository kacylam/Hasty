using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.MilitaryProfile
{
    public class MilitaryProfile
    {
        public int Id { get; set; }
        public BaseUser User { get; set; }
        public string Email { get; set; }
        public int MonthlyIncome { get; set; }
        public DateTime MoveInDate { get; set; }
        public bool IsActiveDuty { get; set; }
        public LookUp Branch { get; set; }
        public LookUp Rank { get; set; }
        public bool HasHousingAllowance { get; set; }
        public string Unit { get; set; }
        public DateTime NoLaterThanDate { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public bool IsDeleted { get; set; }
    }
}
