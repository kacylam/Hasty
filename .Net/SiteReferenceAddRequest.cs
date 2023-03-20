using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.SiteReference
{
    public class SiteReferenceAddRequest
    {
        [Required]
        [Range(1, Int32.MaxValue)]
        public int ReferenceTypeId { get; set; }

        [Required]
        public string Email { get; set; }
    }
}
