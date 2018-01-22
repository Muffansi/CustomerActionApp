using System;
using System.Collections.Generic;

namespace CustomerActionApp.Models
{
    public partial class CustomerActions
    {
        public int ActId { get; set; }
        public int CstId { get; set; }
        public string CustomerAction { get; set; }
        public DateTime? Timestamp { get; set; }
        public bool? Completed { get; set; }

        public Customers Cst { get; set; }
    }
}
