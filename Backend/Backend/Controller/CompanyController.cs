using Backend.Core.Context;
using Backend.Core.DTOs.Company;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Backend.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private ApplicationDbContext _context { get; }

        private IMapper _mapper { get;  }

        public CompanyController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        //CRUD

        //Create
        [HttpPost]
        [Route("Create")]

        public async Task<IActionResult> CreateCompany(CreateCompanyDTO dto) 
        {
            Company newCompany = _mapper.Map<Company>(dto);

            await _context.AddAsync(newCompany);

            await _context.SaveChangesAsync();
            return Ok("Company Created Successfully");


        }

        //Read
        [HttpGet]
        [Route("get")]
        public async Task<ActionResult<IEnumerable<ReadCompanyDTO>>> GetCompanies() 
        {
            var allCompanies = await _context.Companies.ToListAsync();

            var convertedCopies = _mapper.Map<IEnumerable<ReadCompanyDTO>>(allCompanies);

            return Ok(convertedCopies);
        }
       


        //Update


        //Delete

    }
}
