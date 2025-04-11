import axios from 'axios';

const ONS_API_BASE_URL = 'https://api.ons.gov.uk/timeseries';
const ONS_API_KEY = process.env.REACT_APP_ONS_API_KEY;

const MOCK_DATA = {
  // Debt Metrics
  totalDebt: 2223000, // £2.223 trillion in millions
  debtPerPerson: 33024, // £33,024 per person
  debtToGdpRatio: 95.4, // 95.4%
  
  // Economic Metrics
  gdp: 2330000, // £2.33 trillion
  gdpPerPerson: 34600, // £34,600 per person
  moneySupply: 3100000, // M2 Money Supply
  totalInterest: 87500, // Annual interest payments
  inflationRate: 4.2, // Current inflation rate
  goldPrice: 1580, // Price per ounce in GBP
  
  // Population Metrics
  population: 67.33, // 67.33 million
  workingAgePopulation: 41.9, // 41.9 million (16-64)
  workingPopulation: 32.7, // 32.7 million (economically active)
  unemployedPopulation: 1.5, // 1.5 million (seeking work)
  inactivePopulation: 8.7, // 8.7 million (not seeking work)
  retiredPopulation: 12.8, // 12.8 million (65+)
  
  // Inactivity Breakdown
  studentsInactive: 2.3, // 2.3 million
  longTermSickInactive: 2.8, // 2.8 million
  caringDutiesInactive: 1.9, // 1.9 million
  otherInactive: 1.7, // 1.7 million
  
  // Government Finances
  taxRevenue: 1044000, // Annual tax revenue
  govSpending: 1189000, // Annual spending
  nationalInsurance: 189000, // NI contributions
  vatRevenue: 178000, // VAT revenue
  
  // Public Services
  nhsSpending: 180000, // NHS annual budget
  educationSpending: 102000, // Education spending
  defenseSpending: 55000, // Defense budget
  welfareSpending: 240000, // Welfare spending

  // Housing Metrics
  totalMortgageDebt: 1580000, // £1.58 trillion in millions
  averageMortgageDebt: 236000, // £236,000 per mortgage
  totalHouseholds: 28.1, // 28.1 million households
  homeOwnership: 15.8, // 15.8 million households
  mortgagedHomes: 6.8, // 6.8 million households
  privateRental: 4.6, // 4.6 million households
  socialHousing: 4.4, // 4.4 million households
  averageHousePrice: 288000, // £288,000
  housePriceToEarnings: 8.3, // Ratio
  mortgageInterestRate: 4.8, // Average rate %
  rentInflation: 6.2, // Annual increase %

  // Immigration Metrics
  netMigration: 0.745, // 745,000 net migration (year to June 2023)
  immigrationTotal: 1.279, // 1.279 million immigrants
  emigrationTotal: 0.534, // 534,000 emigrants
  
  // Immigration Breakdown
  workVisas: 0.394, // 394,000 work visas
  studentVisas: 0.486, // 486,000 student visas
  familyVisas: 0.157, // 157,000 family visas
  otherVisas: 0.242, // 242,000 other visas
  
  // Asylum
  asylumApplications: 0.089, // 89,000 applications
  asylumBacklog: 0.175, // 175,000 pending cases
  asylumGrantRate: 67, // 67% grant rate

  // Family Formation Metrics
  birthRate: 1.61, // Total fertility rate (births per woman)
  annualBirths: 0.605, // 605,000 births per year
  averageMotherAge: 30.9, // Average age of mother at birth
  firstTimeMumAge: 29.1, // Average age of first time mothers
  
  // Marriage and Divorce
  marriageRate: 4.2, // Per 1000 population
  annualMarriages: 0.267, // 267,000 marriages per year
  divorceRate: 1.7, // Per 1000 population
  annualDivorces: 0.113, // 113,000 divorces per year
  averageMarriageAge: 35.7, // Average age at marriage
  
  // Household Composition
  singleParentFamilies: 2.9, // 2.9 million
  marriedCoupleFamilies: 12.3, // 12.3 million
  cohabitingFamilies: 3.6, // 3.6 million
  singlePersonHouseholds: 8.3, // 8.3 million
  childrenInPoverty: 4.2, // 4.2 million (relative poverty)
};

// Real ONS time series IDs
const ENDPOINTS = {
  // Public Sector Net Debt (£ million)
  PUBLIC_SECTOR_NET_DEBT: 'RUTH',
  // GDP Current Prices (£ million)
  GDP: 'BKTL',
  // UK Population estimate
  POPULATION: 'UKPOP',
  // Public sector current receipts
  TAX_REVENUE: 'MF6U',
  // Total managed expenditure
  GOV_SPENDING: 'MF6V',
  // Housing related endpoints
  MORTGAGE_DEBT: 'VTXC', // Total mortgage debt
  HOUSE_PRICES: 'HPIU', // House price index
  RENTAL_INDEX: 'D7G7', // Private rental price index
  
  // Immigration endpoints
  NET_MIGRATION: 'LTIM',
  IMMIGRATION: 'MN1A',
  EMIGRATION: 'MN1B',

  // Family Formation endpoints
  BIRTHS: 'VSFS',
  MARRIAGES: 'NMAR',
  DIVORCES: 'NDIV',
};

const onsClient = axios.create({
  baseURL: ONS_API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${ONS_API_KEY}`,
  }
});

export async function fetchDebtData() {
  if (!ONS_API_KEY || process.env.REACT_APP_USE_MOCK_DATA === 'true') {
    const randomVariation = () => (Math.random() - 0.5) * 0.001;
    
    // Apply random variations to all metrics
    const metrics = {};
    Object.entries(MOCK_DATA).forEach(([key, value]) => {
      metrics[key] = value * (1 + randomVariation());
    });
    
    return {
      // Debt metrics
      totalDebt: metrics.totalDebt * 1000000,
      debtPerPerson: metrics.debtPerPerson,
      debtToGdpRatio: metrics.debtToGdpRatio,
      totalInterest: metrics.totalInterest,
      
      // Economic metrics
      gdp: metrics.gdp * 1000000,
      gdpPerPerson: metrics.gdpPerPerson,
      moneySupply: metrics.moneySupply,
      inflationRate: metrics.inflationRate,
      goldPrice: metrics.goldPrice,
      
      // Population metrics
      population: metrics.population,
      workingAgePopulation: metrics.workingAgePopulation,
      workingPopulation: metrics.workingPopulation,
      unemployedPopulation: metrics.unemployedPopulation,
      inactivePopulation: metrics.inactivePopulation,
      retiredPopulation: metrics.retiredPopulation,
      
      // Inactivity Breakdown
      studentsInactive: metrics.studentsInactive,
      longTermSickInactive: metrics.longTermSickInactive,
      caringDutiesInactive: metrics.caringDutiesInactive,
      otherInactive: metrics.otherInactive,
      
      // Government finances
      taxRevenue: metrics.taxRevenue,
      govSpending: metrics.govSpending,
      nationalInsurance: metrics.nationalInsurance,
      vatRevenue: metrics.vatRevenue,
      
      // Public services
      nhsSpending: metrics.nhsSpending,
      educationSpending: metrics.educationSpending,
      defenseSpending: metrics.defenseSpending,
      welfareSpending: metrics.welfareSpending,
      
      // Calculated metrics
      deficit: (metrics.govSpending - metrics.taxRevenue),
      deficitPerSecond: ((metrics.govSpending - metrics.taxRevenue) * 1000000) / (365 * 24 * 60 * 60),

      // Housing metrics
      totalMortgageDebt: metrics.totalMortgageDebt,
      averageMortgageDebt: metrics.averageMortgageDebt,
      totalHouseholds: metrics.totalHouseholds,
      homeOwnership: metrics.homeOwnership,
      mortgagedHomes: metrics.mortgagedHomes,
      privateRental: metrics.privateRental,
      socialHousing: metrics.socialHousing,
      averageHousePrice: metrics.averageHousePrice,
      housePriceToEarnings: metrics.housePriceToEarnings,
      mortgageInterestRate: metrics.mortgageInterestRate,
      rentInflation: metrics.rentInflation,

      // Immigration metrics
      netMigration: metrics.netMigration,
      immigrationTotal: metrics.immigrationTotal,
      emigrationTotal: metrics.emigrationTotal,
      
      // Immigration breakdown
      workVisas: metrics.workVisas,
      studentVisas: metrics.studentVisas,
      familyVisas: metrics.familyVisas,
      otherVisas: metrics.otherVisas,
      
      // Asylum
      asylumApplications: metrics.asylumApplications,
      asylumBacklog: metrics.asylumBacklog,
      asylumGrantRate: metrics.asylumGrantRate,

      // Family Formation metrics
      birthRate: metrics.birthRate,
      annualBirths: metrics.annualBirths,
      averageMotherAge: metrics.averageMotherAge,
      firstTimeMumAge: metrics.firstTimeMumAge,
      
      // Marriage and Divorce
      marriageRate: metrics.marriageRate,
      annualMarriages: metrics.annualMarriages,
      divorceRate: metrics.divorceRate,
      annualDivorces: metrics.annualDivorces,
      averageMarriageAge: metrics.averageMarriageAge,
      
      // Household Composition
      singleParentFamilies: metrics.singleParentFamilies,
      marriedCoupleFamilies: metrics.marriedCoupleFamilies,
      cohabitingFamilies: metrics.cohabitingFamilies,
      singlePersonHouseholds: metrics.singlePersonHouseholds,
      childrenInPoverty: metrics.childrenInPoverty,
    };
  }

  try {
    // Fetch the latest data from ONS API
    const [debtResponse, gdpResponse, populationResponse, taxRevenueResponse, govSpendingResponse] = await Promise.all([
      onsClient.get(`/${ENDPOINTS.PUBLIC_SECTOR_NET_DEBT}/data`),
      onsClient.get(`/${ENDPOINTS.GDP}/data`),
      onsClient.get(`/${ENDPOINTS.POPULATION}/data`),
      onsClient.get(`/${ENDPOINTS.TAX_REVENUE}/data`),
      onsClient.get(`/${ENDPOINTS.GOV_SPENDING}/data`),
    ]);

    // Extract the latest values from the responses
    const totalDebt = parseFloat(debtResponse.data.observations[0].observation);
    const gdp = parseFloat(gdpResponse.data.observations[0].observation);
    const population = parseFloat(populationResponse.data.observations[0].observation);
    const taxRevenue = parseFloat(taxRevenueResponse.data.observations[0].observation);
    const govSpending = parseFloat(govSpendingResponse.data.observations[0].observation);

    // Calculate derived metrics
    const debtPerPerson = totalDebt / population;
    const debtToGdpRatio = (totalDebt / gdp) * 100;
    const deficit = (govSpending - taxRevenue) * 1000000;
    const deficitPerSecond = (deficit * 1000000) / (365 * 24 * 60 * 60);

    return {
      totalDebt: totalDebt * 1000000,
      debtPerPerson: debtPerPerson * 1000000,
      debtToGdpRatio: debtToGdpRatio,
      totalInterest: MOCK_DATA.totalInterest,
      gdp: gdp * 1000000,
      gdpPerPerson: MOCK_DATA.gdpPerPerson,
      moneySupply: MOCK_DATA.moneySupply,
      inflationRate: MOCK_DATA.inflationRate,
      goldPrice: MOCK_DATA.goldPrice,
      population: population,
      workingAgePopulation: MOCK_DATA.workingAgePopulation,
      workingPopulation: MOCK_DATA.workingPopulation,
      unemployedPopulation: MOCK_DATA.unemployedPopulation,
      inactivePopulation: MOCK_DATA.inactivePopulation,
      retiredPopulation: MOCK_DATA.retiredPopulation,
      taxRevenue: taxRevenue,
      govSpending: govSpending,
      nationalInsurance: MOCK_DATA.nationalInsurance,
      vatRevenue: MOCK_DATA.vatRevenue,
      nhsSpending: MOCK_DATA.nhsSpending,
      educationSpending: MOCK_DATA.educationSpending,
      defenseSpending: MOCK_DATA.defenseSpending,
      welfareSpending: MOCK_DATA.welfareSpending,
      deficit: deficit,
      deficitPerSecond: deficitPerSecond,

      // Housing metrics
      totalMortgageDebt: MOCK_DATA.totalMortgageDebt,
      averageMortgageDebt: MOCK_DATA.averageMortgageDebt,
      totalHouseholds: MOCK_DATA.totalHouseholds,
      homeOwnership: MOCK_DATA.homeOwnership,
      mortgagedHomes: MOCK_DATA.mortgagedHomes,
      privateRental: MOCK_DATA.privateRental,
      socialHousing: MOCK_DATA.socialHousing,
      averageHousePrice: MOCK_DATA.averageHousePrice,
      housePriceToEarnings: MOCK_DATA.housePriceToEarnings,
      mortgageInterestRate: MOCK_DATA.mortgageInterestRate,
      rentInflation: MOCK_DATA.rentInflation,

      // Immigration metrics
      netMigration: MOCK_DATA.netMigration,
      immigrationTotal: MOCK_DATA.immigrationTotal,
      emigrationTotal: MOCK_DATA.emigrationTotal,
      
      // Immigration breakdown
      workVisas: MOCK_DATA.workVisas,
      studentVisas: MOCK_DATA.studentVisas,
      familyVisas: MOCK_DATA.familyVisas,
      otherVisas: MOCK_DATA.otherVisas,
      
      // Asylum
      asylumApplications: MOCK_DATA.asylumApplications,
      asylumBacklog: MOCK_DATA.asylumBacklog,
      asylumGrantRate: MOCK_DATA.asylumGrantRate,

      // Family Formation metrics
      birthRate: MOCK_DATA.birthRate,
      annualBirths: MOCK_DATA.annualBirths,
      averageMotherAge: MOCK_DATA.averageMotherAge,
      firstTimeMumAge: MOCK_DATA.firstTimeMumAge,
      
      // Marriage and Divorce
      marriageRate: MOCK_DATA.marriageRate,
      annualMarriages: MOCK_DATA.annualMarriages,
      divorceRate: MOCK_DATA.divorceRate,
      annualDivorces: MOCK_DATA.annualDivorces,
      averageMarriageAge: MOCK_DATA.averageMarriageAge,
      
      // Household Composition
      singleParentFamilies: MOCK_DATA.singleParentFamilies,
      marriedCoupleFamilies: MOCK_DATA.marriedCoupleFamilies,
      cohabitingFamilies: MOCK_DATA.cohabitingFamilies,
      singlePersonHouseholds: MOCK_DATA.singlePersonHouseholds,
      childrenInPoverty: MOCK_DATA.childrenInPoverty,
    };
  } catch (error) {
    console.error('Error fetching ONS data:', error);
    // Return all metrics as 0
    return {
      totalDebt: 0,
      debtPerPerson: 0,
      debtToGdpRatio: 0,
      totalInterest: 0,
      gdp: 0,
      gdpPerPerson: 0,
      moneySupply: 0,
      inflationRate: 0,
      goldPrice: 0,
      population: 0,
      workingAgePopulation: 0,
      workingPopulation: 0,
      unemployedPopulation: 0,
      inactivePopulation: 0,
      retiredPopulation: 0,
      taxRevenue: 0,
      govSpending: 0,
      nationalInsurance: 0,
      vatRevenue: 0,
      nhsSpending: 0,
      educationSpending: 0,
      defenseSpending: 0,
      welfareSpending: 0,
      deficit: 0,
      deficitPerSecond: 0,

      // Housing metrics
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

      // Immigration metrics
      netMigration: 0,
      immigrationTotal: 0,
      emigrationTotal: 0,
      
      // Immigration breakdown
      workVisas: 0,
      studentVisas: 0,
      familyVisas: 0,
      otherVisas: 0,
      
      // Asylum
      asylumApplications: 0,
      asylumBacklog: 0,
      asylumGrantRate: 0,

      // Family Formation metrics
      birthRate: 0,
      annualBirths: 0,
      averageMotherAge: 0,
      firstTimeMumAge: 0,
      
      // Marriage and Divorce
      marriageRate: 0,
      annualMarriages: 0,
      divorceRate: 0,
      annualDivorces: 0,
      averageMarriageAge: 0,
      
      // Household Composition
      singleParentFamilies: 0,
      marriedCoupleFamilies: 0,
      cohabitingFamilies: 0,
      singlePersonHouseholds: 0,
      childrenInPoverty: 0,
    };
  }
} 