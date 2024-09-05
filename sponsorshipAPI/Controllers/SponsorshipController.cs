using Microsoft.AspNetCore.Mvc;
using sponsorshipAPI.DAO;
using static sponsorshipAPI.Models.Sponsorship;
using System.Threading.Tasks;

namespace sponsorshipAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SponsorshipController : ControllerBase
    {
        private readonly ISponsorshipDAO _dao;

        public SponsorshipController(ISponsorshipDAO dao)
        {
            _dao = dao;
        }


        [HttpPost("add-payment")]
        public async Task<IActionResult> AddPayment([FromBody] Payment payment)
        {
            if (payment == null)
            {
                return BadRequest("Payment details are required.");
            }

            if (payment.PaymentDate == default || payment.AmountPaid <= 0)
            {
                return BadRequest("Invalid payment details.");
            }

            var contractExists = await _dao.CheckContractExistsAsync(payment.ContractID);
            if (!contractExists)
            {
                return NotFound("Contract not found.");
            }

            var rowsInserted = await _dao.AddPaymentAsync(payment);
            if (rowsInserted > 0)
            {
                return CreatedAtAction(nameof(AddPayment), new { id = payment.ContractID }, payment);
            }

            return StatusCode(500, "Failed to add payment.");
        }


        [HttpGet("sponsors")]
        public async Task<IActionResult> GetSponsorsDetails()
        {
            var sponsorsDetails = await _dao.GetSponsorsDetailsAsync();
            if (sponsorsDetails != null && sponsorsDetails.Count > 0)
            {
                return Ok(sponsorsDetails);
            }
            return NotFound("No sponsors found.");
        }

        
        [HttpGet("matches")]
        public async Task<IActionResult> GetMatchesDetails()
        {
            var matchesDetails = await _dao.GetMatchesDetailsAsync();
            if (matchesDetails != null && matchesDetails.Count > 0)
            {
                return Ok(matchesDetails);
            }
            return NotFound("No matches found.");
        }

        [HttpGet("sponsored-matches")]
        public async Task<IActionResult> GetSponsorsByYear([FromQuery] int year)
        {
            if (year <= 0)
            {
                return BadRequest("Invalid year parameter.");
            }

            var sponsors = await _dao.GetSponsorsByYearAsync(year);
            if (sponsors != null && sponsors.Count > 0)
            {
                return Ok(sponsors);
            }
            return NotFound("No sponsors found for the specified year.");
        }
    }
}
