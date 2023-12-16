using Backend.Core.Enums;

namespace Backend.Core.DTOs.Job
{
    public class JobCreateDTO
    {
        public string Title { get; set; }

        public JobLevel Level { get; set; }

        public long CompanyId { get; set; }
    }
}
