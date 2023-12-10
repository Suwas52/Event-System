using Backend.Core.Enums;

namespace Backend.Core.DTOs.Company
{
    public class ReadCompanyDTO
    {
        public long ID { get; set; }

        public string Name { get; set; }

        public CompanySize Size { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
