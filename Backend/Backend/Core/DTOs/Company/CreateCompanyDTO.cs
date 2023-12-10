using Backend.Core.Enums;

namespace Backend.Core.DTOs.Company
{
    public class CreateCompanyDTO
    {
        public string Name { get; set; }

        public CompanySize Size { get; set; }
    }
}
