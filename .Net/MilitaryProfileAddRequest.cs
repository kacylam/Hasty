using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.MilitaryProfiles
{
    public class MilitaryProfileAddRequest
    {
        [Required]
        [Range(0, Int32.MaxValue)]
        public int MonthlyIncome { get; set; }

        public DateTime MoveInDate { get; set; }

        [Required]
        public bool IsActiveDuty { get; set; }

        [Range(1, Int32.MaxValue)]
        public int? BranchId { get; set; }

        [Range(1, Int32.MaxValue)]
        public int? RankId { get; set; }

        [Required]
        public bool HasHousingAllowance { get; set; }

        [StringLength(100, MinimumLength = 2)]
        public string Unit { get; set; }

        public DateTime NoLaterThanDate { get; set; }
    }
}
