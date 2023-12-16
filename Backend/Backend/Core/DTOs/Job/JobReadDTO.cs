using Backend.Core.Entities;
using Backend.Core.Enums;

namespace Backend.Core.DTOs.Job
{
    public class JobReadDTO
    {

        public long ID { get; set; }

        public string Title { get; set; }

        public JobLevel Level { get; set; }

        public long CompanyId { get; set; }

        public string CompanyName { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
