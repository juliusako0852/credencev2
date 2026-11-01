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

// Register Chart.js components
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
// USER HEALTH SCORE API
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

const current_user = ref<CurrentUser | null>(null);
const current_user_hs = ref<UserHealthScore>();

async function fetchUser() {
  loading.value = true;
  errorMessage.value = "";

  try {
    const response = await api.get<CurrentUser>("users/me/");

    current_user.value = response.data;

    console.log("Logged-in user ID:", current_user.value.id);

    const response2 = await api.get<UserHealthScore>(
      `api/uhs/update/${current_user.value.id}/`
    );

    console.log("API UHS Response:", response2.data);

    current_user_hs.value = response2.data;

    console.log("Assigned UHS Records:", current_user_hs.value);
  } catch (error: any) {
    console.error("Error fetching user:", error.response?.data ?? error);

    errorMessage.value =
      error.response?.data?.detail || "Could not load profile.";
  } finally {
    loading.value = false;
  }
}

onMounted(fetchUser);

// ========================================
// DISTRIBUTION ALGORITHM
// ========================================

// Original income data
const arr: number[] = [
  583.72, 914.35, 467.89, 728.16, 852.43, 641.28, 976.51, 512.67, 793.84,
  438.29, 867.92, 695.41, 554.73, 932.18, 761.56, 489.32, 821.67, 607.94,
  958.23, 713.85, 446.71, 884.59, 672.38, 536.92, 905.14, 748.63, 421.85,
  839.47, 619.26, 781.93
];

const exp_arr: number[] = [
  418.32, 572.14, 349.67, 498.21, 387.45, 531.76, 308.92, 463.51, 579.83,
  421.68, 354.27, 516.39, 475.82, 321.54, 549.63, 402.17, 567.28, 341.95,
  489.36, 372.81, 542.19, 448.63, 314.72, 523.47, 481.26, 361.58, 503.92,
  432.15, 584.67, 395.24
];

// Preserve original values
const arr2: number[] = [...arr];
const exp_arr2: number[] = [...exp_arr];

// Distribution percentages and offsets
const distributions: [number, number][] = [
  [-3, 0.03],
  [-2, 0.05],
  [-1, 0.07],
  [3, 0.03],
  [2, 0.05],
  [1, 0.07]
];

// Initialize distributed array
const distributed: number[] = [...arr];
const distributed_exp: number[] = [...exp_arr];

// Sequential distribution
for (let i = 0; i < distributed.length; i++) {
  const current = [...distributed];
  const current_exp = [...distributed_exp];

  const currentValue = current[i];
  const currentValue2 = current_exp[i];

  if (currentValue === undefined) continue;

  for (const [offset, percentage] of distributions) {
    const targetIndex = i + offset;

    if (targetIndex >= 0 && targetIndex < current.length) {
      const sourceValue = current[i];
      const targetValue = current[targetIndex];
      const sourceValue2 = current_exp[i];
      const targetValue2 = current_exp[targetIndex];

      if (
        sourceValue === undefined ||
        sourceValue2 === undefined ||
        targetValue === undefined ||
        targetValue2 === undefined
      ) {
        continue;
      }

      const amount = sourceValue * percentage;
      const amount2 = sourceValue2 * percentage;

      current[targetIndex] = targetValue + amount;
      current[i] = sourceValue - amount;

      current_exp[targetIndex] = targetValue2 + amount2;
      current_exp[i] = sourceValue2 - amount2;
    }
  }

  distributed.splice(0, distributed.length, ...current);
  distributed_exp.splice(0, distributed_exp.length, ...current_exp);
}

// ========================================
// SMA: WINDOW SIZE = 30
// FORECAST = 3 DAYS
// ========================================

const windowSize = 30;
const forecastDays = 3;

// ----------------------------------------
// 1. HISTORICAL SMA
// ----------------------------------------

const historicalSMA: (number | null)[] = distributed.map((_, index) => {
  const startIndex = Math.max(0, index - windowSize + 1);

  const window = distributed.slice(startIndex, index + 1);

  const sum = window.reduce((total, income) => total + income, 0);

  return sum / window.length;
});

const historicalSMA_exp: (number | null)[] = distributed_exp.map((_, index) => {
  const startIndex = Math.max(0, index - windowSize + 1);

  const window = distributed.slice(startIndex, index + 1);

  const sum_exp = window.reduce((total, expense) => total + expense, 0);

  return sum_exp / window.length;
});

// ----------------------------------------
// 2. NEXT 3-DAY SMA FORECAST
// ----------------------------------------

const sma_var: number[] = [];
const sma_var_exp: number[] = [];

// Copy the historical income values
const rollingWindow = [...distributed];
const rollingWindow_exp = [...distributed_exp];

for (let m = 0; m < forecastDays; m++) {
  // Get the latest 30 values
  const recentWindow = rollingWindow.slice(-windowSize);
  const recentWindow2 = rollingWindow_exp.slice(-windowSize);

  // Calculate SMA
  const sma_sum = recentWindow.reduce((sum, income) => sum + income, 0);
  const sma_sum_exp = recentWindow2.reduce(
    (sum_exp, expense) => sum_exp + expense,
    0
  );

  const sma_average = sma_sum / windowSize;
  const sma_average_exp = sma_sum_exp / windowSize;

  // Store prediction
  sma_var.push(sma_average);
  sma_var_exp.push(sma_average_exp);

  // Remove oldest income
  rollingWindow.shift();
  rollingWindow_exp.shift();

  // Append predicted income
  rollingWindow.push(sma_average);
  rollingWindow_exp.push(sma_average_exp);
}

// ========================================
// CHART DATA
// ========================================

const chartData = computed(() => {
  const labels = [
    ...distributed.map((_, index) => `Day ${index + 1}`),
    "Day 31",
    "Day 32",
    "Day 33"
  ];

  const lastDistributed = distributed[distributed.length - 1] ?? null;
  const lastDistributed_exp =
    distributed_exp[distributed_exp.length - 1] ?? null;

  return {
    labels,

    datasets: [
      {
        label: "Distributed Income",
        data: [...distributed, null, null, null],
        borderColor: "#1A898B",
        backgroundColor: "#1A898B",
        borderWidth: 2,
        pointRadius: 1.5,
        tension: 0.3
      },
      {
        label: "Distributed Expense",
        data: [...distributed_exp, null, null, null],
        borderColor: "red",
        backgroundColor: "red",
        borderWidth: 2,
        pointRadius: 1.5,
        tension: 0.3
      },
      {
        label: "SMA Forecast for Income",
        data: [...Array(29).fill(null), lastDistributed, ...sma_var],
        borderColor: "#1A898B",
        backgroundColor: "#1A898B",
        borderWidth: 2,
        borderDash: [3, 5],
        pointRadius: 1.5,
        pointHoverRadius: 5,
        tension: 0.3,
        spanGaps: false
      },
      {
        label: "SMA Forecast for Expense",
        data: [...Array(29).fill(null), lastDistributed_exp, ...sma_var_exp],
        borderColor: "red",
        backgroundColor: "red",
        borderWidth: 2,
        borderDash: [3, 5],
        pointRadius: 1.5,
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
            value !== null
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
