using System;
using System.Collections.Generic;

namespace CustomerActionApp.Models
{
    public partial class Customers
    {
        public Customers()
        {
            CustomerActions = new HashSet<CustomerActions>();
        }

        public int CstId { get; set; }
        public string CustomerId { get; set; }
        public string CustomerName { get; set; }

        public ICollection<CustomerActions> CustomerActions { get; set; }
    }
}
