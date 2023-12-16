using AutoMapper;
using Backend.Core.DTOs.Candidate;
using Backend.Core.DTOs.Company;
using Backend.Core.DTOs.Job;
using Backend.Core.Entities;

namespace Backend.Core.AutoMapperConfig
{
    public class AutoMapperConfigProfile : Profile
    {
        public AutoMapperConfigProfile()
        {
            //Company

            CreateMap<CreateCompanyDTO, Company>();

            CreateMap<Company, ReadCompanyDTO>();

            //Job

            CreateMap<JobCreateDTO,  Job>();

            CreateMap<Job, JobReadDTO>()
                .ForMember(dest => dest.CompanyName, opt => opt.MapFrom(src => src.Company.Name));


            //Candidate

            CreateMap<CandidateCreateDTO, Candidate>();
            CreateMap<Candidate, CandidateGetDTO>()
                .ForMember(dest => dest.JobTitle, opt => opt.MapFrom(src => src.Job.Title));
        }
    }
}
