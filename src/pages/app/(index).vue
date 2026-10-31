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
          border-radius: 10px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
        "
      >
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
//
import { onMounted, ref } from "vue";
import { api } from "../../boot/axios";

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
    console.error("Error fetching user:", error.response2?.data ?? error);
    errorMessage.value =
      error.response?.data?.detail || "Could not load profile.";
  } finally {
    loading.value = false;
  }
}

onMounted(fetchUser);
</script>
