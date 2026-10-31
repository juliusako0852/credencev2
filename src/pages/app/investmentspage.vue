<template>
  <q-page>
    <div class="investment-page" style="width: 100%; height: 100%; width: 100%">
      <div class="page-title-text"> Investments </div>
      <div
        class="basic-info"
        style="
          background-color: white;
          min-height: 130px;
          width: auto;
          border-radius: 10px;
          margin: 10pt;
          padding: 10pt;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
          display: flex;
        "
        v-for="entry in current_user_investment"
        key="entry.id"
      >
        <div
          style="width: 100%; color: teal; font-size: medium; font-weight: bold"
        >
          <details>
            <summary>
              <div>Name of Investment:</div>
              <div style="font-weight: normal; color: black">{{
                entry?.investment_provider_name
              }}</div>
              <div>Type:</div>
              <div style="font-weight: normal; color: black">{{
                entry?.investment_type
              }}</div>
              <div>Minimum Capital:</div>
              <div style="font-weight: normal; color: black">{{
                entry?.minimum_capital
              }}</div>
              <div>Return:</div>
              <div style="font-weight: normal; color: black">{{
                entry?.return1
              }}</div></summary
            >
            <div>Month to Date (MTD) Performance:</div>
            <div style="font-weight: normal; color: black">{{
              entry?.mtd
            }}</div>
            <div>Year to Date (YTD) Performance:</div>
            <div style="font-weight: normal; color: black">{{
              entry?.ytd
            }}</div>
            <div>Net Asset Value (NAV):</div>
            <div style="font-weight: normal; color: black">{{
              entry?.nav
            }}</div>
            <div>Net Asset Value per Share (NAVPS):</div>
            <div style="font-weight: normal; color: black">{{
              entry?.navps
            }}</div>
            <div>Return since inception:</div>
            <div style="font-weight: normal; color: black">{{
              entry?.rsi
            }}</div>
          </details>
        </div>
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

interface InvestmentRecord {
  investment_provider_name: string;
  investment_type: string;
  date_availed: Date;
  minimum_capital: number;
  return1: number;
  mtd: number;
  ytd: number;
  nav: number;
  navps: number;
  rsi: number;
}

const current_user = ref<CurrentUser | null>(null);
const current_user_investment = ref<InvestmentRecord[]>([]);

async function fetchUser() {
  loading.value = true;
  errorMessage.value = "";

  try {
    const response = await api.get<CurrentUser>("users/me/");

    current_user.value = response.data;

    console.log("Logged-in user ID:", current_user.value.id);

    const response2 = await api.get<InvestmentRecord[]>(
      `api/investmentinfo/list/${current_user.value.id}/`
    );
    console.log("API Loan Response:", response2.data);
    current_user_investment.value = response2.data;
    console.log("Assigned Loan Records:", current_user_investment.value);
    //current_user_loan.value = response2.data;
    //user.value = { ...data };
    //originalUser.value = { ...data };
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
