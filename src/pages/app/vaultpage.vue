<template>
  <q-page>
    <div style="display: none">
      <FinancialChart ref="importedChartData" />
    </div>
    <div class="vault-page" style="width: 100%; height: 100%; width: 100%">
      <div
        style="
          min-height: 32vh;
          width: auto;
          margin: 10pt;
          border-radius: 10px;
          background-color: white;
          color: white;
          text-align: center;
          justify-content: center;
          align-items: center;
        "
      >
        <div
          style="
            color: #0e494a;
            font-size: x-large;
            font-weight: bold;
            height: 40px;
            text-align: center;
            align-items: center;
            align-content: center;
          "
        >
          Vault</div
        >
        <q-card
          style="
            min-height: 130px;
            margin: 5%;
            width: auto;
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
            <div class="balance-text" style="font-size: 12pt; width: 100%"
              >Balance</div
            >
            <div style="display: flex; width: 100%">
              <div
                class="healthscore-text-value"
                style="font-size: 25pt; margin-top: 3pt; width: 100%"
                >PHP {{ current_user_vault?.vault_balance }}
              </div>
            </div>
          </q-card-section>
        </q-card>
        <div style="width: 100%">
          <q-btn
            style="
              background-color: #0e494a;
              color: white;
              font-weight: bold;
              height: 50%;
              width: 60%;
              margin: 5pt;
              border-radius: 10px;

              font-size: small;
              text-align: center;
              justify-content: center;
              align-items: center;
            "
            elevated
            @click="prompt = true"
            label="Emergency Withdrawal"
          />
          <q-dialog v-model="prompt" persistent>
            <q-card
              style="min-width: 350px; border-radius: 10px; color: #0e494a"
            >
              <q-card-section>
                <div class="text-h5" style="font-weight: bold"
                  ><q-icon name="warning" /> Emergency Withdrawal</div
                >
              </q-card-section>
              <q-card-section>
                <div class="text-h6">Enter amount:</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-input
                  dense
                  v-model="emergency_amount"
                  autofocus
                  @keyup.enter="prompt = false"
                />
              </q-card-section>
              <q-card-section>
                <div class="text-h6">Purpose:</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-input
                  dense
                  v-model="emergency_purpose"
                  autofocus
                  @keyup.enter="prompt = false"
                />
              </q-card-section>

              <q-file
                filled
                bottom-slots
                v-model="emergency_file_upload"
                label="Upload Receipt"
                counter
              >
                <template #prepend>
                  <q-icon name="cloud_upload" @click.stop.prevent />
                </template>
                <template #append>
                  <q-icon
                    name="close"
                    @click.stop.prevent="emergency_file_upload = null"
                    class="cursor-pointer"
                  />
                </template>

                <template #hint> PDF, JPEG, and PNG files </template>
              </q-file>

              <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Cancel" v-close-popup />
                <q-btn flat label="Submit " v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <!-- Stash Income Dialog -->

          <q-dialog v-model="prompt2" persistent>
            <q-card
              style="
                min-width: 70vw;
                min-height: 40vh;
                border-radius: 10px;
                color: #0e494a;
                padding: 10pt;
              "
            >
              <q-card-section style="font-size: large; text-align: justify">
                Would you authorize us to automatically
                <b
                  >allocate 30% (PHP
                  {{
                    Number(
                      (
                        (currentDailyIncome - currentDailyExpenses) *
                        0.3
                      ).toFixed(2)
                    )
                  }}) of your calculated surplus</b
                >
                funds to your savings vault? This will help you consistently
                build your savings while ensuring that the remaining 70% remains
                available for your other financial needs and expenses.
              </q-card-section>

              <q-card-section>
                Select a Bank:
                <div
                  class="basic-info"
                  style="
                    background-color: teal;
                    min-height: 50px;
                    width: auto;
                    border-radius: 10px;
                    margin: 5pt;
                    padding: 5pt;
                    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: flex-start;
                    font-size: x-small;
                  "
                  v-for="entry in current_user_connected_bank_list"
                  :key="entry.id"
                >
                  <div
                    style="
                      width: 15%;
                      color: white;
                      font-size: small;
                      font-weight: bold;
                    "
                  >
                    <q-radio
                      v-model="bank_vault_choice"
                      :val="entry?.id"
                      color="white"
                    />
                  </div>
                  <div
                    style="
                      width: 30%;
                      color: white;
                      font-size: small;
                      font-weight: bold;
                    "
                  >
                    <div style="text-align: left">Bank Name:</div>
                    <div style="text-align: left">Balance:</div>
                  </div>
                  <div style="width: 55%; font-size: small; color: white">
                    <div style="text-align: left">{{ entry?.bank_name }}</div>
                    <div style="text-align: left"
                      >PHP {{ entry?.bank_balance }}</div
                    >
                  </div>
                </div>
              </q-card-section>
              <q-card-section>
                Do you consent to this automatic savings allocation?
              </q-card-section>

              <q-card-actions align="center" class="text-primary">
                <q-btn flat label="Cancel" v-close-popup />
                <q-btn flat label="Stash Surplus " v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
      </div>

      <div
        v-if="isHigh == true"
        style="
          min-height: 20vh;
          width: auto;
          margin: 10pt;
          border-radius: 10px;
          background-color: white;
          color: teal;
          text-align: center;
          align-items: center;
          display: flex;
          padding: 15pt;
          font-size: 13pt;
        "
        class="stash_background_positive"
      >
        <div style="width: 60%"
          ><div style="width: 100%; text-align: left; font-weight: bold"
            >We observe that your current income is higher than your current
            average weekly expense.
          </div>
          <div style="width: 100%"
            ><q-btn
              style="
                background-color: #0e494a;
                color: white;
                font-weight: bold;
                height: 50%;
                width: 100%;
                margin-top: 10pt;
                border-radius: 10px;

                font-size: small;
                text-align: center;
                justify-content: center;
                align-items: center;
              "
              elevated
              @click="prompt2 = true"
              label="Stash Surplus"
          /></div>
        </div>
      </div>

      <div v-if="isHigh == false">
        <div
          style="
            min-height: 20vh;
            width: auto;
            margin: 10pt;
            border-radius: 10px;
            background-color: white;
            color: teal;
            text-align: center;
            align-items: center;
            display: flex;
            padding: 15pt;
            font-size: 13pt;
          "
          class="stash_background_negative"
        >
          <div style="width: 60%"
            ><div style="width: 100%; text-align: left; font-weight: bold"
              >We observe that your current income is lower than your current
              average weekly expense.
            </div>
            <q-btn
              style="
                background-color: #0e494a;
                color: white;
                font-weight: bold;
                height: 50%;
                width: 100%;
                margin-top: 10pt;
                border-radius: 10px;

                font-size: small;
                text-align: center;
                justify-content: center;
                align-items: center;
              "
              elevated
              @click="prompt2 = true"
              label="Stash Surplus"
            />
          </div>
        </div>
      </div>

      <div
        style="
          min-height: 20vh;
          width: auto;
          margin: 10pt;
          border-radius: 10px;
          background-color: white;
          padding: 5pt;
          color: white;
          text-align: center;
          justify-content: center;
          align-items: center;
        "
      >
        <div
          style="
            color: #0e494a;
            font-size: x-large;
            font-weight: bold;
            height: 40px;
            text-align: center;
            align-items: center;
            align-content: center;
          "
        >
          Connected Finance Apps</div
        ><div
          class="basic-info"
          style="
            background-color: teal;
            min-height: 50px;
            width: auto;
            border-radius: 10px;
            margin: 10pt;
            padding: 10pt;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: flex-start;
          "
          v-for="entry in current_user_connected_bank_list"
          :key="entry.id"
        >
          <div
            style="
              width: 40%;
              color: white;
              font-size: medium;
              font-weight: bold;
            "
          >
            <div style="text-align: left">Bank Name:</div>
            <div style="text-align: left">Account Type:</div>
            <div style="text-align: left">Balance:</div>
          </div>
          <div style="width: 60%; font-size: medium">
            <div style="text-align: left">{{ entry?.bank_name }}</div>
            <div style="text-align: left">{{ entry?.account_type }}</div>
            <div style="text-align: left">PHP {{ entry?.bank_balance }}</div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from "vue";
import { api } from "../../boot/axios";
import FinancialChart from "./(index).vue";

//choices for banking vault
const bank_vault_choice = ref();

// ========================================
// INTERFACES
// ========================================

interface CurrentUser {
  id: number;
}

interface ConnectedBank {
  id: number;
  bank: number;
  user_account: number;
  bank_name: string;
  account_type: string;
  bank_balance: number;
}

interface UserVault {
  user_account: number;
  vault_type: string;
  vault_balance: number;
}

interface SMAValues {
  historicalSMA_income: (number | null)[];
  historicalSMA7_income: (number | null)[];
  historicalSMA_expenses: (number | null)[];
  historicalSMA7_expenses: (number | null)[];
}

// ========================================
// COMPONENT REFERENCE
// ========================================

const importedChartData = ref<InstanceType<typeof FinancialChart> | null>(null);

// ========================================
// GENERAL STATES
// ========================================

const loading = ref(true);
const saving = ref(false);

const errorMessage = ref("");
const successMessage = ref("");

const isHigh = ref(false);

// ========================================
// USER AND VAULT DATA
// ========================================

const current_user = ref<CurrentUser | null>(null);
const current_user_vault = ref<UserVault | null>(null);

// ========================================
// CONNECTED BANKS DAATA
// ========================================

const current_user_connected_bank_list = ref<ConnectedBank[]>([]);

// ========================================
// HISTORICAL SMA DATA
// ========================================

const smaValues = ref<SMAValues | null>(null);

const smaLoading = ref(false);
const smaError = ref("");

const historicalSMA_income = ref<(number | null)[]>([]);
const historicalSMA7_income = ref<(number | null)[]>([]);

const historicalSMA_expenses = ref<(number | null)[]>([]);
const historicalSMA7_expenses = ref<(number | null)[]>([]);

// ========================================
// CURRENT SMA VALUES
// ========================================

const currentSMA_income = ref<number | null>(null);
const currentSMA7_income = ref<number | null>(null);

const currentSMA_expenses = ref<number | null>(null);
const currentSMA7_expenses = ref<number | null>(0);

// ========================================
// CURRENT DAILY VALUES
// ========================================

const currentDailyIncome = ref<number>(0);
const currentDailyExpenses = ref<number>(0);

const currentDailySurplus = ref<number>(0);

// ========================================
// EMERGENCY WITHDRAWAL STATES
// ========================================

const alert = ref(false);
const confirm = ref(false);
const prompt = ref(false);
const prompt2 = ref(false);

const emergency_file_upload = ref<File | null>(null);
const emergency_amount = ref("");
const emergency_purpose = ref("");

// ========================================
// FETCH USER AND VAULT
// ========================================

async function fetchUser() {
  loading.value = true;
  errorMessage.value = "";

  try {
    // Retrieve authenticated user
    const response = await api.get<CurrentUser>("users/me/");

    current_user.value = response.data;

    console.log("Logged-in user ID:", current_user.value.id);

    // Retrieve user's vault
    const vaultResponse = await api.get<UserVault>(
      `api/vault/update/${current_user.value.id}/`
    );

    // Retrieve connected bank list
    const connectedBankResponseList = await api.get<ConnectedBank[]>(
      `api/connected_bank2/list/${current_user.value.id}/`
    );

    current_user_vault.value = vaultResponse.data;
    current_user_connected_bank_list.value = connectedBankResponseList.data;

    console.log("Vault information:", current_user_vault.value);
  } catch (error: any) {
    console.error(
      "Error fetching user or vault:",
      error.response?.data ?? error
    );

    errorMessage.value =
      error.response?.data?.detail ||
      "Could not load user or vault information.";
  } finally {
    loading.value = false;
  }
}

// ========================================
// FETCH CURRENT AND HISTORICAL SMA VALUES
// ========================================

async function fetchSMAValues() {
  smaLoading.value = true;
  smaError.value = "";

  try {
    await nextTick();

    const chartComponent = importedChartData.value;

    if (!chartComponent) {
      throw new Error("FinancialChart is not mounted.");
    }

    // Wait for the child component's financial data fetching
    const result = await chartComponent.getSMAValues();

    smaValues.value = result;

    // ------------------------------------
    // STORE HISTORICAL SMA ARRAYS
    // ------------------------------------

    historicalSMA_income.value = result.historicalSMA_income;

    historicalSMA7_income.value = result.historicalSMA7_income;

    historicalSMA_expenses.value = result.historicalSMA_expenses;

    historicalSMA7_expenses.value = result.historicalSMA7_expenses;

    // ------------------------------------
    // EXTRACT LATEST SMA VALUES
    // ------------------------------------

    function getLatestValue(values: (number | null)[]): number | null {
      if (values.length === 0) {
        return null;
      }

      return values[values.length - 1] ?? null;
    }

    currentSMA_income.value = getLatestValue(result.historicalSMA_income);

    currentSMA7_income.value = getLatestValue(result.historicalSMA7_income);

    currentSMA_expenses.value = getLatestValue(result.historicalSMA_expenses);

    currentSMA7_expenses.value = getLatestValue(result.historicalSMA7_expenses);

    // ------------------------------------
    // GET LATEST DAILY INCOME AND EXPENSES
    // ------------------------------------

    const dailyIncome = chartComponent.distributed_income ?? [];
    const dailyExpenses = chartComponent.distributed_expenses ?? [];

    currentDailyIncome.value = dailyIncome[dailyIncome.length - 1] ?? 0;

    currentDailyExpenses.value = dailyExpenses[dailyExpenses.length - 1] ?? 0;

    // ------------------------------------
    // CALCULATE CURRENT DAILY SURPLUS
    // ------------------------------------

    currentDailySurplus.value =
      currentDailyIncome.value - currentDailyExpenses.value;

    // ------------------------------------
    // LOG CURRENT VALUES
    // ------------------------------------

    console.log("CURRENT FINANCIAL VALUES:", {
      currentSMA_income: currentSMA_income.value,
      currentSMA7_income: currentSMA7_income.value,

      currentSMA_expenses: currentSMA_expenses.value,
      currentSMA7_expenses: currentSMA7_expenses.value,

      currentDailyIncome: currentDailyIncome.value,
      currentDailyExpenses: currentDailyExpenses.value,

      currentDailySurplus: currentDailySurplus.value
    });

    console.log("Historical SMA values:", smaValues.value);
  } catch (error: any) {
    console.error("Error retrieving SMA values:", error);

    smaError.value =
      error.message || "Could not retrieve financial SMA values.";
  } finally {
    smaLoading.value = false;
  }
}

// ========================================
// CHECK SAVINGS CONDITION
// ========================================

function checkSavingsCondition(): boolean {
  const income7 = historicalSMA7_income.value;
  const income30 = historicalSMA_income.value;
  const expenses30 = historicalSMA_expenses.value;

  const dailyIncome = importedChartData.value?.distributed_income ?? [];

  const dailyExpenses = importedChartData.value?.distributed_expenses ?? [];

  // Require at least 7 consecutive days of data
  if (
    income7.length < 7 ||
    income30.length < 7 ||
    expenses30.length < 7 ||
    dailyIncome.length < 7 ||
    dailyExpenses.length < 7
  ) {
    console.warn("Insufficient data for savings eligibility.");
    return false;
  }

  const startIndex = income7.length - 7;

  // Check the latest 7 consecutive days
  for (let i = startIndex; i < income7.length; i++) {
    const sma7Income = income7[i];
    const sma30Income = income30[i];
    const sma30Expense = expenses30[i];

    const currentIncome = dailyIncome[i];
    const currentExpense = dailyExpenses[i];

    // Validate values
    if (
      sma7Income == null ||
      sma30Income == null ||
      sma30Expense == null ||
      currentIncome == null ||
      currentExpense == null
    ) {
      console.warn(`Missing financial data at index ${i}.`);
      return false;
    }

    // CONDITION 1:
    // 7-day SMA income > 30-day SMA income

    // CONDITION 2:
    // 30-day SMA expenses < 30-day SMA income

    // CONDITION 3:
    // Current daily income > current daily expenses

    if (
      sma7Income <= sma30Income ||
      sma30Expense >= sma30Income ||
      currentIncome <= currentExpense
    ) {
      return false;
    }
  }

  return true;
}

// ========================================
// INITIALIZATION
// ========================================

onMounted(async () => {
  // Fetch authenticated user and vault
  await fetchUser();

  // Retrieve current and historical SMA values
  await fetchSMAValues();

  // Evaluate savings eligibility
  if (smaValues.value) {
    isHigh.value = checkSavingsCondition();
  }
});
</script>
