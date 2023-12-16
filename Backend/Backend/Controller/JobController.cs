using AutoMapper;
using Backend.Core.Context;
using Backend.Core.DTOs.Job;
using Backend.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobController : ControllerBase
    {
        private ApplicationDbContext _context { get; }

        private IMapper _mapper;
        
        public JobController(ApplicationDbContext context, IMapper mapper) {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost]

        [Route("Create")]

        public async Task<IActionResult> CreateJob(JobCreateDTO dto)
        {
            if (dto == null)
            {
                return NotFound("Not Found");
            }

            var newJob = _mapper.Map<Job>(dto);

            await _context.Jobs.AddAsync(newJob);

            await _context.SaveChangesAsync();  

            return Ok("Job Create Successfully");
        }

        [HttpGet]

        [Route("Get")]

        public async Task<ActionResult<IEnumerable<JobReadDTO>>> GetJobs()
        {
            var allJobs = await _context.Jobs.Include(job=> job.Company).ToListAsync();

            var jobs = _mapper.Map<IEnumerable<JobReadDTO>>(allJobs);

            return Ok(jobs);
        }

    } 
}
