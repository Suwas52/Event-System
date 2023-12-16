using AutoMapper;
using Backend.Core.Context;
using Backend.Core.DTOs.Candidate;
using Backend.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidateController : ControllerBase
    {
        private ApplicationDbContext _context { get; }

        private IMapper _mapper { get; }

        public CandidateController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost]

        [Route("Create")]

        public async Task<IActionResult> CreateCandidate([FromForm] CandidateCreateDTO dto, IFormFile pdfFile)
        {
            //First => save pdf to server
            // Then => save url into our entity

            var fiveMegaByte = 5 * 1024 * 1024;

            var pdfMimeType = "application/pdf";

            if (pdfFile.Length > fiveMegaByte || pdfFile.ContentType != pdfMimeType)
            {
                return BadRequest("File is not valid");
            }

            var resumeURL = Guid.NewGuid().ToString() + ".pdf";

            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "documents", "pdfs", resumeURL);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await pdfFile.CopyToAsync(stream);
            }

            var newCandidate = _mapper.Map<Candidate>(dto);

            newCandidate.ResumeUrl = resumeURL;

            await _context.Candidates.AddAsync(newCandidate);

            await _context.SaveChangesAsync();

            return Ok("Candidate Saved Successully");
        }

        [HttpGet]
        [Route("Get")]

        public async Task<ActionResult<IEnumerable<CandidateGetDTO>>> GetCandidates()
        {
            var candidates = await _context.Candidates.Include(c => c.Job).ToListAsync();
            var converted = _mapper.Map<IEnumerable<CandidateGetDTO>>(candidates);

            return Ok(converted);
        }

        [HttpGet]
        [Route("download/{url}")]

        public IActionResult DownloadPdfFile(string url)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "documents", "pdfs", url);

            if (!System.IO.File.Exists(filePath))
            {
                return NotFound("File not found");
            }

            var pdfBytes = System.IO.File.ReadAllBytes(filePath);

            var file = File(pdfBytes, "application/pdf", url);

            return file;
        }


        
       
    }
}
