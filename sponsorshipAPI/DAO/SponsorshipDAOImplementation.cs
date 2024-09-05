using Npgsql;
using static sponsorshipAPI.Models.Sponsorship;
using System.Data.Common;
using System.Data;

namespace sponsorshipAPI.DAO
{
    public class SponsorshipDAOImplementation : ISponsorshipDAO
    {
        private readonly NpgsqlConnection _connection;
        public SponsorshipDAOImplementation(NpgsqlConnection connection)
        {
            _connection = connection;
        }
        public async Task<int> AddPaymentAsync(Payment payment)
        {
            int rowsInserted = 0;
            string insertQuery = @"INSERT INTO chess.payments (contract_id, payment_date, amount_paid, payment_status)
                           VALUES (@ContractID, @PaymentDate, @AmountPaid, @PaymentStatus)";

            try
            {
                if (_connection.State != ConnectionState.Open)
                {
                    await _connection.OpenAsync();
                }

                using (var command = new NpgsqlCommand(insertQuery, _connection))
                {
                    command.CommandType = CommandType.Text;
                    command.Parameters.AddWithValue("@ContractID", payment.ContractID);
                    command.Parameters.AddWithValue("@PaymentDate", payment.PaymentDate);
                    command.Parameters.AddWithValue("@AmountPaid", payment.AmountPaid);
                    command.Parameters.AddWithValue("@PaymentStatus", payment.PaymentStatus);

                    rowsInserted = await command.ExecuteNonQueryAsync();
                }
            }
            catch (NpgsqlException e)
            {
                throw; 
            }
            finally
            {
                if (_connection.State != ConnectionState.Closed)
                {
                    await _connection.CloseAsync();
                }
            }

            return rowsInserted;
        }

        public async Task<List<SponsorDetails>> GetSponsorsDetailsAsync()
        {
            var sponsorDetailsList = new List<SponsorDetails>();
            string query = @" SELECT s.SponsorID, s.SponsorName, s.IndustryType, s.ContactEmail, s.Phone,
                              COALESCE(SUM(p.AmountPaid), 0) AS TotalPayments, COUNT(p.PaymentID) AS NumberOfPayments,
                              MAX(p.PaymentDate) AS LatestPaymentDate FROM sponsorship.Sponsors s LEFT JOIN sponsorship.Contracts c ON s.SponsorID = c.SponsorID
                              LEFT JOIN sponsorship.Payments p ON c.ContractID = p.ContractID GROUP BY s.SponsorID, s.SponsorName, s.IndustryType, s.ContactEmail, s.Phone";
            try
            {
                await _connection.OpenAsync();
                using var command = new NpgsqlCommand(query, _connection);
                using var reader = await command.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    var sponsorDetail = new SponsorDetails
                    {
                        SponsorID = reader.GetInt32(0),
                        SponsorName = reader.GetString(1),
                        IndustryType = reader.GetString(2),
                        ContactEmail = reader.GetString(3),
                        Phone = reader.GetString(4),
                        TotalPayments = reader.GetDecimal(5),
                        NumberOfPayments = reader.GetInt32(6),
                        LatestPaymentDate = reader.IsDBNull(7) ? (DateTime?)null : reader.GetDateTime(7)
                    };

                    sponsorDetailsList.Add(sponsorDetail);
                }
            }
            catch (NpgsqlException e)
            {
                Console.WriteLine("--------Exception-------- " + e.Message);
                throw;
            }
            finally
            {
                await _connection.CloseAsync();
            }

            return sponsorDetailsList;
        }

        public async Task<List<MatchDetails>> GetMatchesDetailsAsync()
        {
            var matchDetailsList = new List<MatchDetails>();
            string query = @" SELECT m.MatchID, m.MatchName, m.MatchDate, m.Location,
                              COALESCE(SUM(p.AmountPaid), 0) AS TotalPayments FROM sponsorship.Matches m LEFT JOIN 
                              sponsorship.Contracts c ON m.MatchID = c.MatchID LEFT JOIN sponsorship.Payments p ON c.ContractID = p.ContractID
                              GROUP BY m.MatchID, m.MatchName, m.MatchDate, m.Location";
            try
            {
                await _connection.OpenAsync();
                using var command = new NpgsqlCommand(query, _connection);
                using var reader = await command.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    var matchDetail = new MatchDetails
                    {
                        MatchID = reader.GetInt32(0),
                        MatchName = reader.GetString(1),
                        MatchDate = reader.GetDateTime(2),
                        Location = reader.GetString(3),
                        TotalPayments = reader.GetDecimal(4)
                    };

                    matchDetailsList.Add(matchDetail);
                }
            }
            catch (NpgsqlException e)
            {
                Console.WriteLine("--------Exception-------- " + e.Message);
                throw;
            }
            finally
            {
                await _connection.CloseAsync();
            }

            return matchDetailsList;
        }
        public async Task<List<SponsorMatchCount>> GetSponsorsByYearAsync(int year)
        {
            var sponsorList = new List<SponsorMatchCount>();
            string query = @" SELECT s.SponsorID, s.SponsorName, COUNT(c.MatchID) AS NumberOfMatches
                              FROM sponsorship.Sponsors s LEFT JOIN sponsorship.Contracts c ON s.SponsorID = c.SponsorID
                              LEFT JOIN sponsorship.Matches m ON c.MatchID = m.MatchID WHERE EXTRACT(YEAR FROM m.MatchDate) = @year
                              GROUP BY s.SponsorID, s.SponsorName";

            try
            {
                await _connection.OpenAsync();
                using var command = new NpgsqlCommand(query, _connection);
                command.Parameters.AddWithValue("@year", year);
                using var reader = await command.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    var sponsor = new SponsorMatchCount
                    {
                        SponsorID = reader.GetInt32(0),
                        SponsorName = reader.GetString(1),
                        NumberOfMatches = reader.GetInt32(2)
                    };

                    sponsorList.Add(sponsor);
                }
            }
            catch (NpgsqlException e)
            {
                Console.WriteLine("--------Exception-------- " + e.Message);
                throw;
            }
            finally
            {
                await _connection.CloseAsync();
            }

            return sponsorList;
        }
        public async Task<bool> CheckContractExistsAsync(int contractId)
        {
            bool exists = false;
            string query = @"SELECT COUNT(1) FROM sponsorship.Contracts WHERE contract_id = @ContractID";

            try
            {
                await _connection.OpenAsync();
                using (var command = new NpgsqlCommand(query, _connection))
                {
                    command.Parameters.AddWithValue("@ContractID", contractId);
                    var count = (long)await command.ExecuteScalarAsync();
                    exists = count > 0;
                }
            }
            catch (NpgsqlException e)
            {
                Console.WriteLine("--------Exception-------- " + e.Message);
            }
            finally
            {
                await _connection.CloseAsync();
            }

            return exists;
        }
    }
}
