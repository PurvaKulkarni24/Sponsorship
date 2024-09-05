using static sponsorshipAPI.Models.Sponsorship;

namespace sponsorshipAPI.DAO
{
    public interface ISponsorshipDAO
    {
        Task<int> AddPaymentAsync(Payment payment);
        Task<List<SponsorDetails>> GetSponsorsDetailsAsync();
        Task<List<MatchDetails>> GetMatchesDetailsAsync();
        Task<List<SponsorMatchCount>> GetSponsorsByYearAsync(int year);
        Task<bool> CheckContractExistsAsync(int contractId);
    }
}
