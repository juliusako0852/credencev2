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
        v-for="entry in current_user_insurance"
        key="entry.id"
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
          <div>{{ entry?.insurance_provider_name }}</div>
          <div>{{ entry?.insurance_type }}</div>
          <div>{{ entry?.date_availed }}</div>
          <div>{{ entry?.premium }}</div>
          <div>{{ entry?.deductible }}</div>
          <div>{{ entry?.co_payment }}</div>
          <div>{{ entry?.con_insurance }}</div>
          <div>{{ entry?.policy_limit }}</div>
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

interface InsuranceRecord {
  id: number;
  insurance_provider_name: string;
  insurance_type: string;
  date_availed: Date;
  premium: number;
  deductible: number;
  co_payment: number;
  con_insurance: number;
  policy_limit: number;
}

const current_user = ref<CurrentUser | null>(null);
const current_user_insurance = ref<InsuranceRecord[]>([]);

async function fetchUser() {
  loading.value = true;
  errorMessage.value = "";

  try {
    const response = await api.get<CurrentUser>("users/me/");

    current_user.value = response.data;

    console.log("Logged-in user ID:", current_user.value.id);

    const response2 = await api.get<InsuranceRecord[]>(
      `api/insuranceinfo/list/${current_user.value.id}/`
    );
    console.log("API Loan Response:", response2.data);
    current_user_insurance.value = response2.data;
    console.log("Assigned Loan Records:", current_user_insurance.value);
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
