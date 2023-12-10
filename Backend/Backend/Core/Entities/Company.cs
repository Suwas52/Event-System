using Backend.Core.Enums;

namespace Backend.Core.Entities
{
    public class Company : BaseEntity
    {
        public string Name { get; set; }

        public CompanySize Size { get; set; } 


         
    }
}
