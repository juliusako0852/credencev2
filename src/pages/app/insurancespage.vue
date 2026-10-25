<template>
  <q-page>
    <div class="insurances-page" style="width: 100%; height: 100%; width: 100%">
      <div class="page-title-text"> Insurances </div>
      <div
        class="basic-info"
        style="
          background-color: white;
          min-height: 200px;
          width: auto;
          border-radius: 10px;
          margin: 10pt;
          padding: 10pt;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
          display: flex;
        "
        v-for="entry in insurance_list"
        key="entry.insurance_id"
      >
        <div
          style="
            width: 45%;
            min-height: 130px;
            color: teal;
            font-size: medium;
            font-weight: bold;
          "
        >
          <div>Provider:</div>
          <div>Insurance Type:</div>
          <div>Date Availed:</div>
          <div>Premium:</div>
          <div>Deductible:</div>
          <div>Co-payment</div>
          <div>Co-insurance:</div>
          <div>Policy Limit:</div>
        </div>
        <div style="width: 55%; min-height: 130px; font-size: medium">
          <div>{{ entry.provider }}</div>
          <div>{{ entry.type }}</div>
          <div>{{ entry.date_availed }}</div>
          <div>{{ entry.premium }}</div>
          <div>{{ entry.deductible }}</div>
          <div>{{ entry.co_payment }}</div>
          <div>{{ entry.co_insurance }}</div>
          <div>{{ entry.policy_limit }}</div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
const insurance_list = ref([
  {
    insurance_id: 1,
    provider: "Shann Scam Inc.",
    type: "hell yeah",
    date_availed: "09-11-2001",
    premium: 1212,
    deductible: 12,
    co_payment: 23,
    co_insurance: 23,
    policy_limit: 233223
  },
  {
    insurance_id: 2,
    provider: "Shann Scam Inc.",
    type: "hell yeah",
    date_availed: "09-11-2001",
    premium: 1212,
    deductible: 12,
    co_payment: 23,
    co_insurance: 23,
    policy_limit: 233223
  },
  {
    insurance_id: 3,
    provider: "Shann Scam Inc.",
    type: "hell yeah",
    date_availed: "09-11-2001",
    premium: 1212,
    deductible: 12,
    co_payment: 23,
    co_insurance: 23,
    policy_limit: 233223
  },
  {
    insurance_id: 4,
    provider: "Shann Scam Inc.",
    type: "hell yeah",
    date_availed: "09-11-2001",
    premium: 1212,
    deductible: 12,
    co_payment: 23,
    co_insurance: 23,
    policy_limit: 233223
  }
]);
</script>
