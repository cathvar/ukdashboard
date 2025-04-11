import React, { useState, useEffect } from 'react';
import { fetchDebtData } from '../services/onsApi';
import './DebtClock.css';

function DebtClock() {
  const [metrics, setMetrics] = useState({
    totalDebt: 0,
    debtPerPerson: 0,
    gdp: 0,
    debtToGdpRatio: 0,
    taxRevenue: 0,
    govSpending: 0,
    deficit: 0,
    deficitPerSecond: 0,
    totalInterest: 0,
    inflationRate: 0,
    goldPrice: 0,
    population: 0,
    retiredPopulation: 0,
    workingPopulation: 0,
    unemployedPopulation: 0,
    gdpPerPerson: 0,
    moneySupply: 0,
    nationalInsurance: 0,
    vatRevenue: 0,
    nhsSpending: 0,
    educationSpending: 0,
    defenseSpending: 0,
    welfareSpending: 0,
    workingAgePopulation: 0,
    inactivePopulation: 0,
    studentsInactive: 0,
    longTermSickInactive: 0,
    caringDutiesInactive: 0,
    otherInactive: 0,
    totalMortgageDebt: 0,
    averageMortgageDebt: 0,
    totalHouseholds: 0,
    homeOwnership: 0,
    mortgagedHomes: 0,
    privateRental: 0,
    socialHousing: 0,
    averageHousePrice: 0,
    housePriceToEarnings: 0,
    mortgageInterestRate: 0,
    rentInflation: 0,
    netMigration: 0,
    immigrationTotal: 0,
    emigrationTotal: 0,
    workVisas: 0,
    studentVisas: 0,
    familyVisas: 0,
    otherVisas: 0,
    asylumApplications: 0,
    asylumBacklog: 0,
    asylumGrantRate: 0,
    birthRate: 0,
    annualBirths: 0,
    averageMotherAge: 0,
    firstTimeMumAge: 0,
    marriageRate: 0,
    annualMarriages: 0,
    divorceRate: 0,
    annualDivorces: 0,
    averageMarriageAge: 0,
    singleParentFamilies: 0,
    marriedCoupleFamilies: 0,
    cohabitingFamilies: 0,
    singlePersonHouseholds: 0,
    childrenInPoverty: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDebtData();
        setMetrics(data);
      } catch (error) {
        console.error('Error fetching debt data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (number, multiplier = 1, alreadyInMillions = false) => {
    if (number === undefined || number === null) return '0';
    const value = alreadyInMillions ? number : number * multiplier;
    return value.toLocaleString();
  };

  const formatPopulation = (number) => {
    if (number === undefined || number === null) return '0';
    return (number * 1000000).toLocaleString();
  };

  const formatRate = (number, decimals = 1) => {
    if (number === undefined || number === null) return '0';
    return number.toFixed(decimals);
  };

  return (
    <div className="dashboard">
      <section className="metric-section debt-section">
        <h2 className="section-title">National Debt</h2>
        <div className="metric-group">
          <div className="metric-card large">
            <h3 className="metric-title">Total National Debt</h3>
            <div className="metric-value">£{formatNumber(metrics.totalDebt, 1000000)}M</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">Debt per Person</h3>
            <div className="metric-value">£{formatNumber(metrics.debtPerPerson, 1000000)}</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">Debt to GDP Ratio</h3>
            <div className="metric-value">{formatRate(metrics.debtToGdpRatio, 1)}%</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">Total Interest Payments</h3>
            <div className="metric-value">£{formatNumber(metrics.totalInterest, 1000000)}M</div>
          </div>
        </div>
      </section>

      <section className="metric-section economy-section">
        <h2 className="section-title">Economy</h2>
        <div className="metric-group">
          <div className="metric-card large">
            <h3 className="metric-title">GDP</h3>
            <div className="metric-value gdp">£{formatNumber(metrics.gdp, 1000000)}M</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">GDP Per Person</h3>
            <div className="metric-value gdp">£{formatNumber(metrics.gdpPerPerson, 1000000)}</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">Money Supply M2</h3>
            <div className="metric-value">£{formatNumber(metrics.moneySupply, 1000000)}M</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">Inflation Rate</h3>
            <div className="metric-value">{formatRate(metrics.inflationRate)}%</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">Gold Price (oz)</h3>
            <div className="metric-value">£{formatNumber(metrics.goldPrice)}</div>
          </div>
        </div>
      </section>

      <section className="metric-section population-section">
        <h2 className="section-title">Population</h2>
        <div className="metric-group">
          <div className="metric-card large">
            <h3 className="metric-title">Total Population</h3>
            <div className="metric-value">{formatPopulation(metrics.population)}</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">Working Age Population</h3>
            <div className="metric-value">{(formatNumber(metrics.workingAgePopulation) * 1000000).toLocaleString()}</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">Employed</h3>
            <div className="metric-value employed">{(formatNumber(metrics.workingPopulation) * 1000000).toLocaleString()}</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">Unemployed (Seeking Work)</h3>
            <div className="metric-value unemployed">{(formatNumber(metrics.unemployedPopulation) * 1000000).toLocaleString()}</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">Economically Inactive</h3>
            <div className="metric-value inactive">{(formatNumber(metrics.inactivePopulation) * 1000000).toLocaleString()}</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">Retired</h3>
            <div className="metric-value retired">{(formatNumber(metrics.retiredPopulation) * 1000000).toLocaleString()}</div>
          </div>
        </div>
        
        <h3 className="subsection-title">Economically Inactive Breakdown</h3>
        <div className="metric-group">
          <div className="metric-card">
            <h3 className="metric-title">Students</h3>
            <div className="metric-value inactive">{(formatNumber(metrics.studentsInactive) * 1000000).toLocaleString()}</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">Long-term Sick</h3>
            <div className="metric-value inactive">{(formatNumber(metrics.longTermSickInactive) * 1000000).toLocaleString()}</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">Caring Duties</h3>
            <div className="metric-value inactive">{(formatNumber(metrics.caringDutiesInactive) * 1000000).toLocaleString()}</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">Other Inactive</h3>
            <div className="metric-value inactive">{(formatNumber(metrics.otherInactive) * 1000000).toLocaleString()}</div>
          </div>
        </div>
      </section>

      <section className="metric-section fiscal-section">
        <h2 className="section-title">Government Finances</h2>
        <div className="metric-group">
          <div className="metric-card">
            <h3 className="metric-title">Annual Tax Revenue</h3>
            <div className="metric-value revenue">£{formatNumber(metrics.taxRevenue, 1000000)}M</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">Annual Spending</h3>
            <div className="metric-value spending">£{formatNumber(metrics.govSpending, 1000000)}M</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">National Insurance</h3>
            <div className="metric-value revenue">£{formatNumber(metrics.nationalInsurance, 1000000)}M</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">VAT Revenue</h3>
            <div className="metric-value revenue">£{formatNumber(metrics.vatRevenue, 1000000)}M</div>
          </div>
        </div>
      </section>

      <section className="metric-section spending-section">
        <h2 className="section-title">Public Services</h2>
        <div className="metric-group">
          <div className="metric-card">
            <h3 className="metric-title">NHS Spending</h3>
            <div className="metric-value spending">£{formatNumber(metrics.nhsSpending, 1000000)}M</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">Education</h3>
            <div className="metric-value spending">£{formatNumber(metrics.educationSpending, 1000000)}M</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">Defense</h3>
            <div className="metric-value spending">£{formatNumber(metrics.defenseSpending, 1000000)}M</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">Welfare</h3>
            <div className="metric-value spending">£{formatNumber(metrics.welfareSpending, 1000000)}M</div>
          </div>
        </div>
      </section>

      <section className="metric-section housing-section">
        <h2 className="section-title">Housing</h2>
        <div className="metric-group">
          <div className="metric-card large">
            <h3 className="metric-title">Total Mortgage Debt</h3>
            <div className="metric-value mortgage">£{formatNumber(metrics.totalMortgageDebt, 1000000)}M</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">Average Mortgage</h3>
            <div className="metric-value mortgage">£{formatNumber(metrics.averageMortgageDebt)}</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">Average House Price</h3>
            <div className="metric-value house">£{formatNumber(metrics.averageHousePrice)}</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">House Price to Earnings</h3>
            <div className="metric-value house">{formatRate(metrics.housePriceToEarnings, 1)}x</div>
          </div>
        </div>

        <h3 className="subsection-title">Housing Tenure</h3>
        <div className="metric-group">
          <div className="metric-card">
            <h3 className="metric-title">Total Households</h3>
            <div className="metric-value">{(formatNumber(metrics.totalHouseholds) * 1000000).toLocaleString()}</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">Owned Outright</h3>
            <div className="metric-value owned">{(formatNumber(metrics.homeOwnership) * 1000000).toLocaleString()}</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">Mortgaged</h3>
            <div className="metric-value mortgage">{(formatNumber(metrics.mortgagedHomes) * 1000000).toLocaleString()}</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">Private Rental</h3>
            <div className="metric-value rental">{(formatNumber(metrics.privateRental) * 1000000).toLocaleString()}</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">Social Housing</h3>
            <div className="metric-value social">{(formatNumber(metrics.socialHousing) * 1000000).toLocaleString()}</div>
          </div>
        </div>

        <h3 className="subsection-title">Market Indicators</h3>
        <div className="metric-group">
          <div className="metric-card">
            <h3 className="metric-title">Average Mortgage Rate</h3>
            <div className="metric-value mortgage">{formatRate(metrics.mortgageInterestRate)}%</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">Rental Price Inflation</h3>
            <div className="metric-value rental">{formatRate(metrics.rentInflation)}%</div>
          </div>
        </div>
      </section>

      <section className="metric-section immigration-section">
        <h2 className="section-title">Immigration</h2>
        <div className="metric-group">
          <div className="metric-card large">
            <h3 className="metric-title">Net Migration (Annual)</h3>
            <div className="metric-value migration">{(formatNumber(metrics.netMigration) * 1000000).toLocaleString()}</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">Immigration</h3>
            <div className="metric-value immigration">{(formatNumber(metrics.immigrationTotal) * 1000000).toLocaleString()}</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">Emigration</h3>
            <div className="metric-value emigration">{(formatNumber(metrics.emigrationTotal) * 1000000).toLocaleString()}</div>
          </div>
        </div>

        <h3 className="subsection-title">Visa Types</h3>
        <div className="metric-group">
          <div className="metric-card">
            <h3 className="metric-title">Work Visas</h3>
            <div className="metric-value work-visa">{(formatNumber(metrics.workVisas) * 1000000).toLocaleString()}</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">Student Visas</h3>
            <div className="metric-value student-visa">{(formatNumber(metrics.studentVisas) * 1000000).toLocaleString()}</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">Family Visas</h3>
            <div className="metric-value family-visa">{(formatNumber(metrics.familyVisas) * 1000000).toLocaleString()}</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">Other Visas</h3>
            <div className="metric-value other-visa">{(formatNumber(metrics.otherVisas) * 1000000).toLocaleString()}</div>
          </div>
        </div>

        <h3 className="subsection-title">Asylum</h3>
        <div className="metric-group">
          <div className="metric-card">
            <h3 className="metric-title">Asylum Applications</h3>
            <div className="metric-value asylum">{(formatNumber(metrics.asylumApplications) * 1000000).toLocaleString()}</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">Pending Cases</h3>
            <div className="metric-value asylum-backlog">{(formatNumber(metrics.asylumBacklog) * 1000000).toLocaleString()}</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">Grant Rate</h3>
            <div className="metric-value asylum">{formatRate(metrics.asylumGrantRate)}%</div>
          </div>
        </div>
      </section>

      <section className="metric-section family-section">
        <h2 className="section-title">Family Formation</h2>
        <div className="metric-group">
          <div className="metric-card large">
            <h3 className="metric-title">Annual Births</h3>
            <div className="metric-value births">{formatNumber(metrics.annualBirths, 1000000)}</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">Birth Rate</h3>
            <div className="metric-value births">{formatRate(metrics.birthRate, 2)} per woman</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">Average Mother Age</h3>
            <div className="metric-value births">{formatRate(metrics.averageMotherAge)} years</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">First Time Mother Age</h3>
            <div className="metric-value births">{formatRate(metrics.firstTimeMumAge)} years</div>
          </div>
        </div>

        <h3 className="subsection-title">Marriage & Divorce</h3>
        <div className="metric-group">
          <div className="metric-card">
            <h3 className="metric-title">Annual Marriages</h3>
            <div className="metric-value marriage">{(formatNumber(metrics.annualMarriages) * 1000000).toLocaleString()}</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">Marriage Rate</h3>
            <div className="metric-value marriage">{formatRate(metrics.marriageRate)} per 1000</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">Annual Divorces</h3>
            <div className="metric-value divorce">{(formatNumber(metrics.annualDivorces) * 1000000).toLocaleString()}</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">Divorce Rate</h3>
            <div className="metric-value divorce">{formatRate(metrics.divorceRate)} per 1000</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">Average Marriage Age</h3>
            <div className="metric-value marriage">{formatRate(metrics.averageMarriageAge)} years</div>
          </div>
        </div>

        <h3 className="subsection-title">Household Types</h3>
        <div className="metric-group">
          <div className="metric-card">
            <h3 className="metric-title">Married Couples</h3>
            <div className="metric-value marriage">{(formatNumber(metrics.marriedCoupleFamilies) * 1000000).toLocaleString()}</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">Cohabiting Couples</h3>
            <div className="metric-value cohabiting">{(formatNumber(metrics.cohabitingFamilies) * 1000000).toLocaleString()}</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">Single Parents</h3>
            <div className="metric-value single-parent">{(formatNumber(metrics.singleParentFamilies) * 1000000).toLocaleString()}</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">Single Person Households</h3>
            <div className="metric-value single">{(formatNumber(metrics.singlePersonHouseholds) * 1000000).toLocaleString()}</div>
          </div>
          <div className="metric-card">
            <h3 className="metric-title">Children in Poverty</h3>
            <div className="metric-value poverty">{(formatNumber(metrics.childrenInPoverty) * 1000000).toLocaleString()}</div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DebtClock; 