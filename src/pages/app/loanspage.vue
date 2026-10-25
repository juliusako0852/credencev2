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
          padding: 5pt;
          display: flex;
        "
        v-for="entry in credit_histories"
        key="entry.loan_id"
      >
        <div
          style="width: 50%; min-height: 130px; color: teal; font-size: medium"
        >
          <div style="font-weight: bold">Lender:</div>
          <div style="font-weight: bold">Disbursement Date:</div>
          <div style="font-weight: bold">Loan Amount:</div>
          <div style="font-weight: bold">Daily Amount:</div>
          <div style="font-weight: bold">Loan Term:</div>
          <div style="font-weight: bold">Daily Payment Amount:</div>
          <div style="font-weight: bold">Total Repayment:</div>
          <div style="font-weight: bold">Total Interest Rate:</div>
        </div>
        <div style="width: 50%; min-height: 130px; font-size: medium">
          <div style="font-weight: bold">{{ entry.lender }}</div>
          <div style="font-weight: bold">{{ entry.disbursement_date }}</div>
          <div style="font-weight: bold">{{ entry.loan_amount }}</div>
          <div style="font-weight: bold">{{ entry.daily_amount }}</div>
          <div style="font-weight: bold">{{ entry.loan_term }}</div>
          <div style="font-weight: bold">{{ entry.daily_payment_amount }}</div>
          <div style="font-weight: bold">{{ entry.total_repayment }}</div>
          <div style="font-weight: bold">{{ entry.total_interest_rate }}</div>
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
