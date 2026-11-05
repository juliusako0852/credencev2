<template>
  <q-page>
    <div class="home-page" style="height: 100%; width: 100%">
      <div
        class="top-bar2"
        style="
          height: 100%;
          background-color: white;
          min-height: 25vh;
          margin-top: -22px;
          color: white;
          display: flex;
          text-align: center;
          justify-content: center;
          align-items: center;
          border-bottom-left-radius: 7%;
          border-bottom-right-radius: 7%;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
          padding: 2%;
        "
      >
        <q-card
          style="
            height: 100%;
            width: 95%;
            border-radius: 15px;
            background-image: linear-gradient(
              to right,
              black,
              #156c6d,
              #1a898b
            );
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
            text-align: left;
            min-height: 150px;
          "
        >
          <q-card-section style="margin-left: 5%; margin-top: 1%">
            <div
              class="healthscore-text"
              style="font-size: x-large; width: 100%; font-weight: bold"
              >Hello, Shann!</div
            >
            <div style="display: flex; width: 100%; margin-top: 5pt">
              Average Net Income:
            </div>
            <div
              style="
                display: flex;
                width: 100%;
                font-size: x-large;
                font-weight: bold;
              "
            >
              PHP
              {{
                netIncome.toLocaleString("en-PH", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })
              }}
            </div>
            <div style="display: flex; width: 100%">
              Confidence:
              {{
                (
                  ((historicalSMA_expenses[historicalSMA_expenses.length - 1] ??
                    0) /
                    ((latestGasSMA30 ?? 0) +
                      (historicalSMA_expenses[
                        historicalSMA_expenses.length - 1
                      ] ?? 0))) *
                  100
                ).toFixed(2)
              }}%
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div
        class="menu-buttons"
        style="width: 100%; height: 10vh; align-items: center"
      >
        <div
          class="main-menu-button-panel"
          style="
            justify-content: center;
            align-self: center;
            align-content: center;
            height: 100%;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
            color: #1a898b;
          "
        >
          <q-btn
            stack
            flat
            dense
            aria-label="vault"
            size="8pt"
            to="/app/vaultpage"
          >
            <q-icon name="savings" size="5vh" />Vault</q-btn
          >

          <q-btn stack flat dense aria-label="digital_diary" size="8pt" to="/">
            <q-icon name="book" size="5vh" />Digital Diary</q-btn
          >

          <q-btn
            stack
            flat
            dense
            aria-label="loans"
            size="8pt"
            to="/app/loanspage"
          >
            <q-icon name="wallet" size="5vh" />Loans</q-btn
          >
        </div>
      </div>
      <div
        class="forecast-text"
        style="
          margin-left: 5%;
          margin-right: 5%;
          margin-top: 10pt;
          color: white;
          font-weight: bold;
          font-size: x-large;
          width: auto;
          display: flex;
          border-color: white;
        "
        >Financial Forecast</div
      >
      <div
        class="forecast"
        style="
          background-color: white;
          width: auto;
          height: 200px;
          margin-left: 5%;
          margin-right: 5%;
          margin-top: 5pt;
          margin-bottom: 10pt;
          padding: 10px;
          border-radius: 10px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
        "
      >
        <Line :data="chartData" :options="chartOptions" />
      </div>

      <div
        class="analytics-text"
        style="
          margin-left: 5%;
          margin-right: 5%;
          margin-top: 10pt;
          color: white;
          font-weight: bold;
          font-size: large;
          width: auto;
          display: flex;
          border-color: white;
          justify-content: space-between;
        "
      >
        <div>Insights</div>
        <div style="width: 30%"
          ><q-btn
            stack
            flat
            dense
            aria-label="insights"
            size="8pt"
            to="/analyticspage"
            style="background-color: #0e494a; width: 100%; border-radius: 10px"
          >
            View Details</q-btn
          ></div
        >
      </div>

      <div
        class="analytics-panel"
        style="
          background-color: white;
          width: auto;
          min-height: 200px;
          margin-left: 5%;
          margin-right: 5%;
          margin-top: 5pt;
          margin-bottom: 10pt;
          border-radius: 10px;
          padding: 10pt;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
          text-align: justify;
        "
      >
        <div v-if="loading"> Loading financial data... </div>

        <div v-else>
          <div v-if="aiLoading">
            <q-spinner color="primary" size="30px" />
            <p>Credence AI is analyzing your financial data...</p>
          </div>

          <div v-else-if="aiError">
            <p>{{ aiError }}</p>
            <q-btn
              label="Retry AI Analysis"
              color="primary"
              @click="generateAIInsights"
            />
          </div>

          <div v-else-if="aiInsights">
            <h5>Credence AI Financial Insights</h5>

            <p>{{ aiInsights.summary }}</p>

            <h6>Income Analysis</h6>
            <p>{{ aiInsights.income_analysis }}</p>

            <h6>Expense Analysis</h6>
            <p>{{ aiInsights.expense_analysis }}</p>

            <h6>Forecast Analysis</h6>
            <p>{{ aiInsights.forecast_analysis }}</p>

            <h6>Financial Risks</h6>
            <ul>
              <li
                v-for="(risk, index) in aiInsights.financial_risks"
                :key="index"
              >
                {{ risk }}
              </li>
            </ul>

            <h6>Recommendations</h6>
            <ul>
              <li
                v-for="(recommendation, index) in aiInsights.recommendations"
                :key="index"
              >
                {{ recommendation }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { api } from "../../boot/axios";
import { Line } from "vue-chartjs";

import {
  analyzeFinances,
  type FinancialInsights
} from "../../services/aiService";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from "chart.js";

// ========================================
// CHART.JS REGISTRATION
// ========================================

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

// ========================================
// INTERFACES
// ========================================

interface CurrentUser {
  id: number;
}

interface Income {
  id: number;
  income_amount: number;
  i_date: string;
  i_time: string | null;
  user_account: number;
  job_info: number;
  income_2_bankacct: number;
}

interface DistanceTravelled {
  id: number;
  user_account: number;
  t_date: string;
  t_time: string;
  start_latitude: number;
  start_longitude: number;
  end_latitude: number;
  end_longitude: number;
  km: number;
  vehicle_type: string;
}

interface Expense {
  id: number;
  expense_amount: number;
  e_date: string;
  e_time: string | null;
  user_account: number;
  expense_2_bankacct: number;
}

interface DailyFinancial {
  date: string;
  total_income: number;
  total_expense: number;
}

interface SMAValues {
  historicalSMA_income: (number | null)[];
  historicalSMA7_income: (number | null)[];
  historicalSMA_expenses: (number | null)[];
  historicalSMA7_expenses: (number | null)[];
  historicalSMA_gas_expenses: (number | null)[];
  latest_gas_sma30: number | null;

  sma_var_income: number[];
  sma_var7_income: number[];
  sma_var_expenses: number[];
  sma_var7_expenses: number[];
}

function getLatestValue2(values: (number | null)[]): number | null {
  if (values.length === 0) {
    return null;
  }

  return values[values.length - 1] ?? null;
}

// ========================================
// LOADING AND STATUS
// ========================================

const loading = ref(true);
const saving = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

// ========================================
// API DATA
// ========================================

const current_user = ref<CurrentUser | null>(null);

const incomeRecords = ref<Income[]>([]);
const expenseRecords = ref<Expense[]>([]);
const distanceRecords = ref<DistanceTravelled[]>([]);

// One value per day, same order/length as dailyFinancialRecords
const gasolineExpenses = ref<number[]>([]);

const dailyFinancialRecords = ref<DailyFinancial[]>([]);

const incomes = ref<number[]>([]);
const expenses = ref<number[]>([]);

// ========================================
// DISTRIBUTED VALUES
// ========================================

const distributed_income = ref<number[]>([]);
const distributed_expenses = ref<number[]>([]);

// ========================================
// DISTRIBUTION SETTINGS
// ========================================

const distributions: [number, number][] = [
  [-3, 0.03],
  [-2, 0.05],
  [-1, 0.07],
  [3, 0.03],
  [2, 0.05],
  [1, 0.07]
];

// ========================================
// GASOLINE SETTINGS
// ========================================

const GAS_PRICE_PER_KM_FACTOR = 89 * 0.025; // = 2.225 pesos per km

// ========================================
// SMA SETTINGS
// ========================================

const windowSize = 30;
const windowSize7 = 7;
const forecastDays = 3;

// ========================================
// HISTORICAL SMA
// ========================================

const historicalSMA_income = ref<(number | null)[]>([]);
const historicalSMA7_income = ref<(number | null)[]>([]);

const historicalSMA_expenses = ref<(number | null)[]>([]);
const historicalSMA7_expenses = ref<(number | null)[]>([]);
const historicalSMA_gas_expenses = ref<(number | null)[]>([]);

// ========================================
// SMA FORECASTS
// ========================================

const sma_var_income = ref<number[]>([]);
const sma_var7_income = ref<number[]>([]);

const sma_var_expenses = ref<number[]>([]);
const sma_var7_expenses = ref<number[]>([]);

// ========================================
// DATE UTILITIES
// ========================================

function parseLocalDate(dateString: string): Date {
  const [year, month, day] = dateString.split("-").map(Number);

  return new Date(year!, month! - 1, day!);
}

function toDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function addDays(dateString: string, days: number): string {
  const date = parseLocalDate(dateString);

  date.setDate(date.getDate() + days);

  return toDateString(date);
}

function formatDate(dateString: string): string {
  const date = parseLocalDate(dateString);

  return date.toLocaleDateString("en-PH", {
    day: "2-digit",
    month: "short"
  });
}

// ========================================
// AGGREGATE FINANCIAL RECORDS
// ========================================

function calculateDailyFinancials(
  incomeData: Income[],
  expenseData: Expense[]
): DailyFinancial[] {
  const incomeTotals = new Map<string, number>();
  const expenseTotals = new Map<string, number>();

  incomeData.forEach(item => {
    const amount = Number(item.income_amount);

    if (!item.i_date || !Number.isFinite(amount)) return;

    incomeTotals.set(
      item.i_date,
      (incomeTotals.get(item.i_date) ?? 0) + amount
    );
  });

  expenseData.forEach(item => {
    const amount = Number(item.expense_amount);

    if (!item.e_date || !Number.isFinite(amount)) return;

    expenseTotals.set(
      item.e_date,
      (expenseTotals.get(item.e_date) ?? 0) + amount
    );
  });

  const allDates = [...incomeTotals.keys(), ...expenseTotals.keys()].sort(
    (a, b) => a.localeCompare(b)
  );

  if (allDates.length === 0) return [];

  const firstDate = allDates[0]!;
  const lastDate = allDates[allDates.length - 1]!;

  const records: DailyFinancial[] = [];

  let currentDate = firstDate;

  while (currentDate <= lastDate) {
    records.push({
      date: currentDate,
      total_income: incomeTotals.get(currentDate) ?? 0,
      total_expense: expenseTotals.get(currentDate) ?? 0
    });

    currentDate = addDays(currentDate, 1);
  }

  return records;
}

// ========================================
// DAILY GASOLINE EXPENSES
// ========================================

function calculateDailyGasoline(
  distanceData: DistanceTravelled[],
  dailyRecords: DailyFinancial[]
): number[] {
  const kmTotals = new Map<string, number>();

  distanceData.forEach(item => {
    const km = Number(item.km);

    if (!item.t_date || !Number.isFinite(km)) return;

    kmTotals.set(item.t_date, (kmTotals.get(item.t_date) ?? 0) + km);
  });

  // km * 89 pesos * 0.025, one value per day in the income/expense range
  return dailyRecords.map(record => {
    const totalKm = kmTotals.get(record.date) ?? 0;

    return totalKm * GAS_PRICE_PER_KM_FACTOR; // km * 89 * 0.025
  });
}

// ========================================
// DISTRIBUTION ALGORITHM
// ========================================

function distributeValues(values: number[]): number[] {
  const result = [...values];

  for (let i = 0; i < result.length; i++) {
    for (const [offset, percentage] of distributions) {
      const targetIndex = i + offset;

      if (targetIndex < 0 || targetIndex >= result.length) {
        continue;
      }

      const sourceValue = result[i];
      const targetValue = result[targetIndex];

      if (
        sourceValue === undefined ||
        targetValue === undefined ||
        !Number.isFinite(sourceValue) ||
        !Number.isFinite(targetValue)
      ) {
        continue;
      }

      const amount = sourceValue * percentage;

      result[targetIndex] = targetValue + amount;
      result[i] = sourceValue - amount;
    }
  }

  return result;
}

// ========================================
// HISTORICAL SMA
// ========================================

function calculateHistoricalSMA(
  values: number[],
  period: number
): (number | null)[] {
  return values.map((_, index) => {
    const startIndex = Math.max(0, index - period + 1);

    const window = values.slice(startIndex, index + 1);

    if (window.length === 0) return null;

    const sum = window.reduce((total, value) => total + value, 0);

    return sum / window.length;
  });
}

// ========================================
// SMA FORECAST
// ========================================

function calculateSMAForecast(values: number[], period: number): number[] {
  const predictions: number[] = [];
  const rollingWindow = [...values];

  if (rollingWindow.length === 0) return predictions;

  for (let m = 0; m < forecastDays; m++) {
    const recentWindow = rollingWindow.slice(-period);

    const sum = recentWindow.reduce((total, value) => total + value, 0);

    const average = sum / recentWindow.length;

    predictions.push(average);

    rollingWindow.shift();
    rollingWindow.push(average);
  }

  return predictions;
}

// ========================================
// CALCULATE ALL ANALYTICS
// ========================================

const netIncome = computed(() => {
  const latestIncome = historicalSMA_income.value.at(-1);
  const latestExpenses = historicalSMA_expenses.value.at(-1);

  if (latestIncome == null || latestExpenses == null) {
    return 0;
  }

  return latestIncome - latestExpenses;
});

const latestGasSMA30 = computed(() =>
  getLatestValue2(historicalSMA_gas_expenses.value)
);

function calculateAnalytics() {
  distributed_income.value = distributeValues(incomes.value);

  distributed_expenses.value = distributeValues(expenses.value);

  // Historical SMA-30
  historicalSMA_income.value = calculateHistoricalSMA(
    distributed_income.value,
    windowSize
  );

  historicalSMA_expenses.value = calculateHistoricalSMA(
    distributed_expenses.value,
    windowSize
  );

  historicalSMA_gas_expenses.value = calculateHistoricalSMA(
    gasolineExpenses.value,
    windowSize
  );

  // Historical SMA-7
  historicalSMA7_income.value = calculateHistoricalSMA(
    distributed_income.value,
    windowSize7
  );

  historicalSMA7_expenses.value = calculateHistoricalSMA(
    distributed_expenses.value,
    windowSize7
  );

  // Forecast SMA-30
  sma_var_income.value = calculateSMAForecast(
    distributed_income.value,
    windowSize
  );

  sma_var_expenses.value = calculateSMAForecast(
    distributed_expenses.value,
    windowSize
  );

  // Forecast SMA-7
  sma_var7_income.value = calculateSMAForecast(
    distributed_income.value,
    windowSize7
  );

  sma_var7_expenses.value = calculateSMAForecast(
    distributed_expenses.value,
    windowSize7
  );
}

// ========================================
// AI FINANCIAL ADVISOR
// ========================================

const aiLoading = ref(false);
const aiError = ref("");
const aiInsights = ref<FinancialInsights | null>(null);

async function generateAIInsights() {
  aiLoading.value = true;
  aiError.value = "";
  aiInsights.value = null;

  try {
    const financialData = {
      income: incomes.value,
      expenses: expenses.value,

      distributed_income: distributed_income.value,
      distributed_expenses: distributed_expenses.value,

      income_forecast: sma_var_income.value,
      income_forecast7: sma_var7_income.value,

      expense_forecast: sma_var_expenses.value,
      expense_forecast7: sma_var7_expenses.value
    };

    aiInsights.value = await analyzeFinances(financialData);

    console.log("AI Financial Insights:", aiInsights.value);
  } catch (error: any) {
    console.error("AI Analysis Error:", error);

    aiError.value = error.message || "Unable to generate financial insights.";
  } finally {
    aiLoading.value = false;
  }
}

// ========================================
// FETCH USER AND FINANCIAL DATA
// ========================================

async function fetchUser() {
  loading.value = true;
  errorMessage.value = "";

  try {
    const response = await api.get<CurrentUser>("users/me/");

    current_user.value = response.data;

    const response3 = await api.get<Income[]>(
      `api/income/list/${current_user.value.id}/`
    );

    const response4 = await api.get<Expense[]>(
      `api/expense/list/${current_user.value.id}/`
    );

    const response5 = await api.get<DistanceTravelled[]>(
      `api/distance_travelled/list/${current_user.value.id}/`
    );

    incomeRecords.value = response3.data;
    expenseRecords.value = response4.data;
    distanceRecords.value = response5.data;

    dailyFinancialRecords.value = calculateDailyFinancials(
      incomeRecords.value,
      expenseRecords.value
    );

    gasolineExpenses.value = calculateDailyGasoline(
      distanceRecords.value,
      dailyFinancialRecords.value
    );

    incomes.value = dailyFinancialRecords.value.map(item => item.total_income);

    expenses.value = dailyFinancialRecords.value.map(
      item => item.total_expense
    );

    if (
      incomes.value.some(value => !Number.isFinite(value)) ||
      expenses.value.some(value => !Number.isFinite(value)) ||
      gasolineExpenses.value.some(value => !Number.isFinite(value))
    ) {
      throw new Error("Invalid financial values received from API.");
    }

    calculateAnalytics();

    await generateAIInsights();

    console.log("Daily Financial Records:", dailyFinancialRecords.value);
  } catch (error: any) {
    console.error("Error fetching user:", error.response?.data ?? error);

    errorMessage.value =
      error.response?.data?.detail ||
      error.message ||
      "Could not load financial data.";
  } finally {
    loading.value = false;
  }
}

// ========================================
// CHART DATA
// ========================================

const incomeData = computed(() => [
  ...distributed_income.value,
  ...Array(forecastDays).fill(null)
]);

const expenseData = computed(() => [
  ...distributed_expenses.value,
  ...Array(forecastDays).fill(null)
]);

const chartData = computed(() => {
  const historicalLabels = dailyFinancialRecords.value.map(item =>
    formatDate(item.date)
  );

  const lastRecord =
    dailyFinancialRecords.value[dailyFinancialRecords.value.length - 1];

  const forecastLabels: string[] = [];

  if (lastRecord) {
    for (let i = 1; i <= forecastDays; i++) {
      forecastLabels.push(formatDate(addDays(lastRecord.date, i)));
    }
  }

  const labels = [...historicalLabels, ...forecastLabels];

  const incomeSMAData = [
    ...historicalSMA_income.value,
    ...sma_var_income.value
  ];

  const incomeSMAData7 = [
    ...historicalSMA7_income.value,
    ...sma_var7_income.value
  ];

  const expenseSMAData = [
    ...historicalSMA_expenses.value,
    ...sma_var_expenses.value
  ];

  const expenseSMAData7 = [
    ...historicalSMA7_expenses.value,
    ...sma_var7_expenses.value
  ];

  return {
    labels,

    datasets: [
      {
        label: "Distributed Daily Income",
        data: incomeData.value,
        borderColor: "#1A898B",
        backgroundColor: "#1A898B",
        borderWidth: 1,
        pointRadius: 1.2,
        tension: 0.3
      },
      {
        label: "Distributed Daily Expense",
        data: expenseData.value,
        borderColor: "red",
        backgroundColor: "red",
        borderWidth: 1,
        pointRadius: 1.2,
        tension: 0.3
      },
      {
        label: "Income SMA (30 Days)",
        data: incomeSMAData,
        borderColor: "#1A898B",
        backgroundColor: "#1A898B",
        borderWidth: 1,
        borderDash: [5, 5],
        pointRadius: 1,
        tension: 0.3,
        spanGaps: false
      },
      {
        label: "Income SMA (7 Days)",
        data: incomeSMAData7,
        borderColor: "green",
        backgroundColor: "green",
        borderWidth: 1,
        borderDash: [5, 5],
        pointRadius: 1,
        tension: 0.3,
        spanGaps: false
      },
      {
        label: "Expense SMA (30 Days)",
        data: expenseSMAData,
        borderColor: "black",
        backgroundColor: "black",
        borderWidth: 1,
        borderDash: [5, 5],
        pointRadius: 1,
        tension: 0.3,
        spanGaps: false
      },
      {
        label: "Expense SMA (7 Days)",
        data: expenseSMAData7,
        borderColor: "orange",
        backgroundColor: "orange",
        borderWidth: 1,
        borderDash: [5, 5],
        pointRadius: 1,
        tension: 0.3,
        spanGaps: false
      }
    ]
  };
});

// ========================================
// CHART OPTIONS
// ========================================

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      display: true,
      position: "top" as const,

      labels: {
        boxWidth: 10,

        font: {
          size: 9
        }
      }
    },

    tooltip: {
      callbacks: {
        label: (context: any) => {
          const value = context.parsed.y;

          return `${context.dataset.label}: ₱${
            value !== null && value !== undefined
              ? value.toLocaleString("en-PH", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })
              : "N/A"
          }`;
        }
      }
    }
  },

  scales: {
    x: {
      ticks: {
        font: {
          size: 8
        }
      }
    },

    y: {
      beginAtZero: true,

      ticks: {
        font: {
          size: 8
        },

        callback: (value: any) => {
          return "₱" + Number(value).toLocaleString("en-PH");
        }
      }
    }
  }
};

// ========================================
// EXPOSE SMA VALUES TO PARENT
// ========================================

let fetchPromise: Promise<void> = Promise.resolve();

async function getSMAValues(): Promise<SMAValues> {
  await fetchPromise;

  if (errorMessage.value) {
    throw new Error(errorMessage.value);
  }

  return {
    historicalSMA_income: [...historicalSMA_income.value],
    historicalSMA7_income: [...historicalSMA7_income.value],

    historicalSMA_expenses: [...historicalSMA_expenses.value],
    historicalSMA7_expenses: [...historicalSMA7_expenses.value],

    sma_var_income: [...sma_var_income.value],
    sma_var7_income: [...sma_var7_income.value],

    sma_var_expenses: [...sma_var_expenses.value],
    sma_var7_expenses: [...sma_var7_expenses.value],

    historicalSMA_gas_expenses: [...historicalSMA_gas_expenses.value],
    latest_gas_sma30: latestGasSMA30.value
  };
}

async function refreshFinancialData() {
  fetchPromise = fetchUser();
  await fetchPromise;
}

defineExpose({
  getSMAValues,
  refreshFinancialData,

  gasolineExpenses,
  distanceRecords,

  incomeData,
  expenseData,
  chartData,

  incomes,
  expenses,

  distributed_income,
  distributed_expenses,

  loading,
  errorMessage,

  aiInsights,
  aiLoading,
  aiError
});

// ========================================
// INITIALIZE
// ========================================

onMounted(() => {
  fetchPromise = fetchUser();
});
</script>
