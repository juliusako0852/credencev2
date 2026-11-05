<template>
  <q-page>
    <div class="loans-page" style="width: 100%; height: 100%; width: 100%">
      <div class="page-title-text"> Loans </div>
      <div
        style="
          background-color: white;
          min-height: 100px;
          width: auto;
          border-radius: 10px;
          margin: 10pt;
          padding: 10pt;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
          display: flex;
        "
        v-for="entry in current_user_loan"
        :key="entry.id"
      >
        <div
          style="
            width: 60%;
            min-height: 130px;
            color: teal;
            font-size: medium;
            font-weight: bold;
          "
        >
          <div>Lender:</div>
          <div>Disbursement Date:</div>
          <div>Loan Amount:</div>
          <div>Loan Type:</div>
          <div>Loan Term:</div>
          <div>Total Repayment:</div>
          <div>Interest Rate:</div>
          <div>Start Date:</div>
          <div>End Date:</div>
        </div>
        <div style="width: 40%; min-height: 130px; font-size: medium">
          <div>{{ entry?.lender_name }}</div>
          <div>{{ entry?.disbursement_date }}</div>
          <div>{{ entry?.loan_amount }}</div>
          <div>{{ entry?.loan_type }}</div>
          <div>{{ entry?.no_of_terms }}</div>
          <div>{{ entry?.payment_amount }}</div>
          <div>{{ entry?.interest_rate * 100 }}%</div>
          <div>{{ entry?.start_date }}</div>
          <div>{{ entry?.end_date }}</div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { api } from "../../boot/axios";

const loading = ref(true);
const saving = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

interface CurrentUser {
  id: number;
}

interface LoanRecord {
  id: number;
  lender: string;
  lender_name: string;
  loan_type: string;
  loan_amount: number;
  no_of_terms: number;
  interest_rate: number;
  payment_amount: number;
  disbursement_date: Date;
  start_date: Date;
  end_date: Date;
  user_account: number;
}

const current_user = ref<CurrentUser | null>(null);
const current_user_loan = ref<LoanRecord[]>([]);

async function fetchUser() {
  loading.value = true;
  errorMessage.value = "";

  try {
    const response = await api.get<CurrentUser>("users/me/");

    current_user.value = response.data;

    console.log("Logged-in user ID:", current_user.value.id);

    const response2 = await api.get<LoanRecord[]>(
      `api/loaninfo/list/${current_user.value.id}/`
    );
    console.log("API Loan Response:", response2.data);
    current_user_loan.value = response2.data;
    console.log("Assigned Loan Records:", current_user_loan.value);
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
