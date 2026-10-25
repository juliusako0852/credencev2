<template>
  <q-page>
    <div class="loans-page" style="width: 100%; height: 100%; width: 100%">
      <div class="page-title-text"> Loans </div>
      <div
        class="basic-info"
        style="
          background-color: white;
          min-height: 200px;
          width: auto;
          border-radius: 10px;
          margin: 10pt;
          padding: 10pt;
          display: flex;
        "
        v-for="entry in credit_histories"
        key="entry.loan_id"
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
          <div>Daily Amount:</div>
          <div>Loan Term:</div>
          <div>Daily Payment Amount:</div>
          <div>Total Repayment:</div>
          <div>Total Interest Rate:</div>
        </div>
        <div style="width: 40%; min-height: 130px; font-size: medium">
          <div>{{ entry.lender }}</div>
          <div>{{ entry.disbursement_date }}</div>
          <div>{{ entry.loan_amount }}</div>
          <div>{{ entry.daily_amount }}</div>
          <div>{{ entry.loan_term }}</div>
          <div>{{ entry.daily_payment_amount }}</div>
          <div>{{ entry.total_repayment }}</div>
          <div>{{ entry.total_interest_rate }}</div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
const credit_histories = ref([
  {
    loan_id: 1,
    lender: "BPI",
    disbursement_date: "2026-10-25",
    loan_amount: 500000,
    daily_amount: 125,
    loan_term: 12,
    daily_payment_amount: 1234,
    total_repayment: 12356,
    total_interest_rate: 0.57
  },
  {
    loan_id: 2,
    lender: "BPI",
    disbursement_date: "2026-10-25",
    loan_amount: 500000,
    daily_amount: 125,
    loan_term: 12,
    daily_payment_amount: 1234,
    total_repayment: 12356,
    total_interest_rate: 0.57
  },
  {
    loan_id: 3,
    lender: "BPI",
    disbursement_date: "2026-10-25",
    loan_amount: 500000,
    daily_amount: 125,
    loan_term: 12,
    daily_payment_amount: 1234,
    total_repayment: 12356,
    total_interest_rate: 0.57
  },
  {
    loan_id: 4,
    lender: "BPI",
    disbursement_date: "2026-10-25",
    loan_amount: 500000,
    daily_amount: 125,
    loan_term: 12,
    daily_payment_amount: 1234,
    total_repayment: 12356,
    total_interest_rate: 0.57
  }
]);
</script>
