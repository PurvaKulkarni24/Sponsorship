using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
namespace sponsorshipAPI.Models
{
    public class Sponsorship
    {
        public class Payment
        {
            public int ContractID { get; set; }
            public DateTime PaymentDate { get; set; }
            public decimal AmountPaid { get; set; }
            public string PaymentStatus { get; set; }
        }
        public class SponsorDetails
        {
            public int SponsorID { get; set; }
            public string SponsorName { get; set; }
            public string IndustryType { get; set; }
            public string ContactEmail { get; set; }
            public string Phone { get; set; }
            public decimal TotalPayments { get; set; }
            public int NumberOfPayments { get; set; }
            public DateTime? LatestPaymentDate { get; set; }
        }
        public class MatchDetails
        {
            public int MatchID { get; set; }
            public string MatchName { get; set; }
            public DateTime MatchDate { get; set; }
            public string Location { get; set; }
            public decimal TotalPayments { get; set; }
        }
        public class SponsorMatchCount
        {
            public int SponsorID { get; set; }
            public string SponsorName { get; set; }
            public int NumberOfMatches { get; set; }
        }
    }
}
