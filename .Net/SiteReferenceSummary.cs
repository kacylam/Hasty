using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.SiteReferences
{
    public class SiteReferenceSummary
    {
        public LookUp ReferenceType { get; set; }
        public int TotalCount { get; set; }
    }
}
