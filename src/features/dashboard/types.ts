/**
 * Dashboard Type Definitions
 * Based on C# backend API responses
 */

// ============================================
// Common Types
// ============================================

export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  fill: boolean;
}

export interface ChartData {
  chartType: string;
  title: string;
  labels: string[];
  datasets: ChartDataset[];
}

// ============================================
// Petugas Dashboard Types
// ============================================

export interface KandangStatus {
  id: string;
  name: string;
  currentAyams: number;
  capacity: number;
  mortalityToday: number;
  mortalityThisWeek: number;
  lastFeedTime: string;
  lastVaccinationTime: string;
  healthStatus: string;
}

export interface DailyTasks {
  pendingFeedings: number;
  pendingVaccinations: number;
  pendingCleanings: number;
  completedTasks: number;
  totalTasks: number;
  completionRate: number;
}

export interface StockItem {
  id: string;
  name: string;
  currentStock: number;
  minimumStock: number;
  status: string;
}

export interface StockAlerts {
  lowStockPakan: StockItem[];
  lowStockVaksin: StockItem[];
  criticalStockCount: number;
  warningStockCount: number;
}

export interface Performance {
  efficiencyScore: number;
  tasksCompletedThisWeek: number;
  tasksCompletedThisMonth: number;
  averageMortalityRate: number;
  kandangsManaged: number;
  performanceLevel: string;
}

export interface Activity {
  activityType: string;
  kandangName: string;
  scheduledTime: string;
  priority: string;
  isOverdue: boolean;
}

export interface UpcomingActivities {
  todayActivities: Activity[];
  tomorrowActivities: Activity[];
  thisWeekActivities: Activity[];
}

export interface PetugasDashboardData {
  myKandangs: KandangStatus[];
  dailyTasks: DailyTasks;
  stockAlerts: StockAlerts;
  myPerformance: Performance;
  upcomingActivities: UpcomingActivities;
}

// ============================================
// Operator Dashboard Types
// ============================================

export interface SystemOverview {
  totalKandangs: number;
  totalAyams: number;
  totalUsers: number;
  activeOperations: number;
  lastUpdated: string;
}

export interface KandangPerformance {
  kandangId: string;
  kandangName: string;
  petugasName: string;
  currentAyams: number;
  capacity: number;
  utilizationPercentage: number;
  mortalityThisMonth: number;
  mortalityRate: number;
  status: string;
}

export interface FinancialSummary {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  profitMargin: number;
  monthlyChange: number;
}

export interface SystemAlert {
  type: string;
  message: string;
  severity: string;
  createdAt: string;
  relatedEntityId: string;
  relatedEntityName: string;
}

export interface ProductivityStats {
  averagePanenWeight: number;
  totalPanenThisMonth: number;
  averageMortalityRate: number;
  feedConversionRatio: number;
  activeKandangs: number;
}

export interface OperatorDashboardData {
  systemOverview: SystemOverview;
  kandangPerformances: KandangPerformance[];
  financialSummary: FinancialSummary;
  systemAlerts: SystemAlert[];
  productivityStats: ProductivityStats;
}

// ============================================
// Pemilik Dashboard Types
// ============================================

export interface BusinessKpi {
  monthlyRevenue: number;
  monthlyProfit: number;
  returnOnInvestment: number;
  totalAyamStock: number;
  averageProductivity: number;
  customerSatisfaction: number;
  marketShare: number;
}

export interface Profitability {
  grossProfit: number;
  netProfit: number;
  operatingExpenses: number;
  costPerKg: number;
  pricePerKg: number;
  profitPerKg: number;
  profitMargin: number;
}

export interface ComparisonPeriod {
  revenueChange: number;
  profitChange: number;
  productivityChange: number;
  mortalityRateChange: number;
  efficiencyChange: number;
}

export interface YearlyComparison {
  revenueGrowth: number;
  profitGrowth: number;
  productivityGrowth: number;
  capacityGrowth: number;
  efficiencyImprovement: number;
}

export interface IndustryBenchmark {
  industryAvgMortalityRate: number;
  yourMortalityRate: number;
  industryAvgProductivity: number;
  yourProductivity: number;
  performanceRating: string;
}

export interface ComparisonAnalysis {
  currentVsPreviousMonth: ComparisonPeriod;
  currentVsPreviousYear: YearlyComparison;
  industryBenchmark: IndustryBenchmark;
}

export interface StrategicInsights {
  recommendations: string[];
  opportunities: string[];
  risks: string[];
  keySuccessFactors: string[];
}

export interface TrendDataPoint {
  month: string;
  value: number;
  percentage: number;
}

export interface MonthlyTrends {
  revenueData: TrendDataPoint[];
  profitData: TrendDataPoint[];
  productivityData: TrendDataPoint[];
  mortalityData: TrendDataPoint[];
}

export interface PemilikDashboardData {
  businessKpi: BusinessKpi;
  profitability: Profitability;
  comparisonAnalysis: ComparisonAnalysis;
  strategicInsights: StrategicInsights;
  monthlyTrends: MonthlyTrends;
}

// ============================================
// Chart Types
// ============================================

export interface RevenueExpenseChartData extends ChartData {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
}

export interface MortalityTrendChartData extends ChartData {
  averageMortalityRate: number;
  highestRate: number;
  lowestRate: number;
  trendDirection: string;
}

export interface ProductionChartData extends ChartData {
  totalProduced: number;
  averageWeight: number;
  productionEfficiency: number;
}

export interface KandangDetail {
  kandangName: string;
  capacity: number;
  current: number;
  utilizationPercentage: number;
  status: string;
}

export interface KandangUtilizationChartData extends ChartData {
  averageUtilization: number;
  totalCapacity: number;
  currentOccupancy: number;
  kandangDetails: KandangDetail[];
}

export interface FeedType {
  feedName: string;
  consumption: number;
  cost: number;
  percentage: number;
}

export interface FeedConsumptionChartData extends ChartData {
  totalConsumption: number;
  averageDaily: number;
  costPerKg: number;
  feedTypes: FeedType[];
}

export interface PerformanceMetric {
  metricName: string;
  currentValue: number;
  previousValue: number;
  changePercentage: number;
  trend: string;
}

export interface FinancialPerformanceChartData extends ChartData {
  metrics: PerformanceMetric[];
  period: string;
}

export interface OperationalActivitiesChartData extends ChartData {
  totalActivities: number;
  completedActivities: number;
  pendingActivities: number;
  completionRate: number;
}

export interface StockItemDetail {
  itemName: string;
  currentStock: number;
  minimumStock: number;
  maximumStock: number;
  status: string;
  category: string;
}

export interface StockLevelsChartData extends ChartData {
  stockItems: StockItemDetail[];
  criticalItems: number;
  warningItems: number;
  goodItems: number;
}

export interface ComparisonMetric {
  metricName: string;
  currentScore: number;
  benchmarkScore: number;
  maxScore: number;
  unit: string;
}

export interface PerformanceComparisonChartData extends ChartData {
  metrics: ComparisonMetric[];
  comparisonPeriod: string;
}

export interface SeasonalDataPoint {
  season: string;
  revenue: number;
  productivity: number;
  mortalityRate: number;
  ayamCount: number;
}

export interface SeasonalTrendsChartData extends ChartData {
  seasonalData: SeasonalDataPoint[];
  bestPerformingSeason: string;
  worstPerformingSeason: string;
}

export interface CostCategory {
  categoryName: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface CostBreakdownChartData extends ChartData {
  totalCosts: number;
  costCategories: CostCategory[];
  largestCostCategory: string;
}
