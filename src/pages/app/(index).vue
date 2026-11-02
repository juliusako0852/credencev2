<template>
  <q-page>
    <div class="home-page" style="height: 100%; width: 100%">
      <div
        class="q-pt-none"
        style="height: 170px; width: 100%; margin-top: -22px"
      >
        <div
          class="top-bar2"
          style="
            height: 100%;
            background-color: white;
            color: white;
            display: flex;
            text-align: center;
            justify-content: center;
            align-items: center;
            border-bottom-left-radius: 7%;
            border-bottom-right-radius: 7%;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
          "
        >
          <q-card
            style="
              height: 85%;
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
            "
          >
            <q-card-section style="margin-left: 5%; margin-top: 1%">
              <div class="healthscore-text" style="font-size: 12pt; width: 100%"
                >Health Score</div
              >
              <div style="display: flex; width: 100%">
                <div
                  class="healthscore-text-value"
                  style="font-size: 45pt; margin-top: 2pt; width: 50%"
                  >{{ current_user_hs?.uh_score }}
                </div>
                <div
                  style="
                    margin-top: px;
                    height: auto;
                    width: 50%;
                    display: flex;
                    color: white;
                    text-align: center;
                    justify-content: center;
                    align-items: center;
                  "
                >
                  <q-btn
                    style="
                      background-color: #0e494a;
                      color: white;
                      font-weight: bold;
                      height: 50%;
                      width: 100%;
                      border-radius: 10px;
                      font-size: small;
                      text-align: center;
                      justify-content: center;
                      align-items: center;
                    "
                    elevated
                    to="/loginpage"
                    label="Generate Report"
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div
        class="menu-buttons"
        style="
          width: 100%;
          height: 25vh;

          align-items: center;
        "
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
            aria-label="send"
            size="8pt"
            to="../signuppage"
          >
            <q-icon name="swap_horiz" size="5vh" />Transfer</q-btn
          >
          <q-btn stack flat dense aria-label="bills" size="8pt" to="/">
            <q-icon name="payments" size="5vh" />Bills</q-btn
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

          <q-btn
            stack
            flat
            dense
            aria-label="credit-passport"
            size="8pt"
            to="/"
          >
            <q-icon name="book" size="5vh" />Credit Passport</q-btn
          >
          <q-btn stack flat dense aria-label="connect" size="8pt" to="/">
            <q-icon name="smartphone" size="5vh" />Load</q-btn
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
          <q-btn
            stack
            flat
            dense
            aria-label="investment"
            size="8pt"
            to="/app/investmentspage"
          >
            <q-icon name="percent" size="5vh" />Investments</q-btn
          >
          <q-btn
            stack
            flat
            dense
            aria-label="insurance"
            size="8pt"
            to="/app/insurancespage"
          >
            <q-icon name="shield" size="5vh" />Insurances</q-btn
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
          height: 200px;
          margin-left: 5%;
          margin-right: 5%;
          margin-top: 5pt;
          margin-bottom: 10pt;
          border-radius: 10px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
        "
      >
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { api } from "../../boot/axios";
import { Line } from "vue-chartjs";

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
// API AND INTERFACES
// ========================================

const loading = ref(true);
const saving = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

interface CurrentUser {
  id: number;
}

interface UserHealthScore {
  user_account: number;
  uh_score: number;
}

interface Income {
  id: number;
  income_amount: number;
  i_date: string;
  user_account: number;
  job_info: number;
  income_2_bankacct: number;
}

interface Expense {
  id: number;
  expense_amount: number;
  e_date: string;
  user_account: number;
  expense_2_bankacct: number;
}

const current_user = ref<CurrentUser | null>(null);
const current_user_hs = ref<UserHealthScore>();

const incomes = ref<number[]>([]);
const expenses = ref<number[]>([]);
const distributed_income = ref<number[]>([]);
const distributed_expenses = ref<number[]>([]);

// ========================================
// ORIGINAL EXPENSE DATA
// ========================================

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
// SMA SETTINGS
// ========================================

const windowSize = 30;
const forecastDays = 3;

// ========================================
// SMA RESULTS
// ========================================

const historicalSMA = ref<(number | null)[]>([]);
const historicalSMA_exp = ref<(number | null)[]>([]);

const sma_var = ref<number[]>([]);
const sma_var_exp = ref<number[]>([]);

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
// HISTORICAL SMA (DAYS 1-30)
// ========================================

function calculateHistoricalSMA(values: number[]): (number | null)[] {
  return values.map((_, index) => {
    const startIndex = Math.max(0, index - windowSize + 1);

    const window = values.slice(startIndex, index + 1);

    if (window.length === 0) {
      return null;
    }

    const sum = window.reduce((total, value) => total + value, 0);

    return sum / window.length;
  });
}

// ========================================
// SMA FORECAST (DAYS 31-33)
// ========================================

function calculateSMAForecast(values: number[]): number[] {
  const predictions: number[] = [];
  const rollingWindow = [...values];

  if (rollingWindow.length === 0) {
    return predictions;
  }

  for (let m = 0; m < forecastDays; m++) {
    const recentWindow = rollingWindow.slice(-windowSize);

    const sum = recentWindow.reduce((total, value) => total + value, 0);

    const average = sum / recentWindow.length;

    predictions.push(average);

    // Update rolling window for the next prediction
    rollingWindow.shift();
    rollingWindow.push(average);
  }

  return predictions;
}

// ========================================
// PROCESS INCOME AND EXPENSE DATA
// ========================================

function calculateAnalytics() {
  // 1. Distribute income and expense
  distributed_income.value = distributeValues(incomes.value);

  distributed_expenses.value = distributeValues(expenses.value);

  // 2. Calculate historical SMA (Days 1-30)
  historicalSMA.value = calculateHistoricalSMA(distributed_income.value);

  historicalSMA_exp.value = calculateHistoricalSMA(distributed_expenses.value);

  // 3. Calculate next 3-day SMA forecast (Days 31-33)
  sma_var.value = calculateSMAForecast(distributed_income.value);

  sma_var_exp.value = calculateSMAForecast(distributed_expenses.value);

  // 4. Debugging
  console.log("Original Income:", incomes.value);
  console.log("Distributed Income:", distributed_income.value);

  console.log("Distributed Expense:", distributed_expenses.value);

  console.log("Historical Income SMA:", historicalSMA.value);
  console.log("Historical Expense SMA:", historicalSMA_exp.value);

  console.log("3-Day Income Forecast:", sma_var.value);
  console.log("3-Day Expense Forecast:", sma_var_exp.value);

  console.log("Complete Income SMA (33 Days):", [
    ...historicalSMA.value,
    ...sma_var.value
  ]);

  console.log("Complete Expense SMA (33 Days):", [
    ...historicalSMA_exp.value,
    ...sma_var_exp.value
  ]);
}

// ========================================
// FETCH USER AND INCOME DATA
// ========================================

async function fetchUser() {
  loading.value = true;
  errorMessage.value = "";

  try {
    // Get authenticated user
    const response = await api.get<CurrentUser>("users/me/");

    current_user.value = response.data;

    // Get user health score
    const response2 = await api.get<UserHealthScore>(
      `api/uhs/update/${current_user.value.id}/`
    );

    current_user_hs.value = response2.data;

    // Get user income records
    const response3 = await api.get<Income[]>(
      `api/income/list/${current_user.value.id}/`
    );
    const response4 = await api.get<Expense[]>(
      `api/expense/list/${current_user.value.id}/`
    );

    const incomeData = response3.data;
    const expenseData = response4.data;

    // Convert API income values into numbers
    incomes.value = incomeData.map(item => Number(item.income_amount));
    expenses.value = expenseData.map(item => Number(item.expense_amount));

    // Validate API values
    if (incomes.value.some(value => !Number.isFinite(value))) {
      throw new Error("Invalid income values received from API.");
    }
    if (expenses.value.some(value => !Number.isFinite(value))) {
      throw new Error("Invalid income values received from API.");
    }

    // Calculate distribution and SMA
    calculateAnalytics();

    console.log("API UHS Response:", current_user_hs.value);
    console.log("API Income Records:", incomeData);
  } catch (error: any) {
    console.error("Error fetching user:", error.response?.data ?? error);

    errorMessage.value =
      error.response?.data?.detail ||
      error.message ||
      "Could not load profile.";
  } finally {
    loading.value = false;
  }
}

onMounted(fetchUser);

// ========================================
// CHART DATA
// ========================================

const chartData = computed(() => {
  const incomeLength = distributed_income.value.length;
  const expenseLength = distributed_expenses.value.length;

  const historyLength = Math.max(incomeLength, expenseLength);

  const totalLength = historyLength + forecastDays;

  // Generate 33-day labels
  const labels = Array.from(
    { length: totalLength },
    (_, index) => `Day ${index + 1}`
  );

  // ========================================
  // COMPLETE SMA DATA (HISTORICAL + FORECAST)
  // ========================================

  const incomeSMAData = [...historicalSMA.value, ...sma_var.value];

  const expenseSMAData = [...historicalSMA_exp.value, ...sma_var_exp.value];

  // ========================================
  // DISTRIBUTED INCOME AND EXPENSE
  // ========================================

  const incomeData = [
    ...distributed_income.value,
    ...Array(Math.max(0, totalLength - incomeLength)).fill(null)
  ];

  const expenseData = [
    ...distributed_expenses.value,
    ...Array(Math.max(0, totalLength - expenseLength)).fill(null)
  ];

  return {
    labels,

    datasets: [
      // ========================================
      // DISTRIBUTED INCOME
      // ========================================

      {
        label: "Distributed Income",
        data: incomeData,
        borderColor: "#1A898B",
        backgroundColor: "#1A898B",
        borderWidth: 1,
        pointRadius: 1.2,
        tension: 0.3
      },

      // ========================================
      // DISTRIBUTED EXPENSE
      // ========================================

      {
        label: "Distributed Expense",
        data: expenseData,
        borderColor: "red",
        backgroundColor: "red",
        borderWidth: 1,
        pointRadius: 1.2,
        tension: 0.3
      },

      // ========================================
      // INCOME SMA (ALL 33 DAYS)
      // ========================================

      {
        label: "Income SMA (33 Days)",
        data: incomeSMAData,
        borderColor: "#1A898B",
        backgroundColor: "#1A898B",
        borderWidth: 1,
        borderDash: [5, 5],
        pointRadius: 1,
        pointHoverRadius: 5,
        tension: 0.3,
        spanGaps: false
      },

      // ========================================
      // EXPENSE SMA (ALL 33 DAYS)
      // ========================================

      {
        label: "Expense SMA (33 Days)",
        data: expenseSMAData,
        borderColor: "red",
        backgroundColor: "red",
        borderWidth: 1,
        borderDash: [5, 5],
        pointRadius: 1,
        pointHoverRadius: 5,
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
</script>
