using AutoMapper;
using Backend.Core.DTOs.Company;
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


            //Candidate
        }
    }
}
