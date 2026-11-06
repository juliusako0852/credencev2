<template>
  <q-page>
    <div class="history-page" style="width: 100%; height: 100%; width: 100%">
      <div
        class="history"
        style="
          height: 30px;
          width: auto;
          border-radius: 10px;
          margin: 10pt;
          font-size: 20pt;
          font-weight: bold;
          color: white;
          display: flex;
          text-align: center;
          align-items: center;
        "
      >
        Transaction History
      </div>
      <div
        class="basic-info"
        style="
          background-color: white;
          min-height: 550px;
          height: auto;
          width: auto;
          border-radius: 10px;
          margin: 10pt;
        "
      >
        <q-list bordered separator>
          <q-item
            v-for="entry in history_entries"
            key="entry.id"
            style="width: 100%; height: auto"
          >
            <div style="width: 100%; display: flex">
              <div
                style="width: 15%"
                v-if="
                  entry.transaction_name === 'Buffer Vault - Withdrawal' ||
                  entry.transaction_name === 'Buffer Vault - Deposit'
                "
                ><q-icon name="savings" size="40px" style="color: #0e494a"
              /></div>
              <div style="width: 50%">
                <div
                  style="
                    width: 100%;
                    font-weight: bold;
                    font-size: large;
                    color: #0e494a;
                  "
                  >{{ entry.transaction_name }}</div
                >
                <div style="width: 100%; font-size: medium"
                  >{{ entry.transaction_time }} -
                  {{ entry.transaction_date }}</div
                >
              </div>
              <div style="width: 35%; justify-items: flex-end">
                <div
                  style="
                    width: 100%;
                    text-align: right;
                    color: green;
                    font-weight: bold;
                    font-size: large;
                  "
                  v-if="entry.transaction_name === 'Buffer Vault - Deposit'"
                  >PHP {{ entry.transaction_amount }}</div
                >
                <div
                  style="
                    width: 100%;
                    text-align: right;
                    color: red;
                    font-weight: bold;
                    font-size: large;
                  "
                  v-if="entry.transaction_name === 'Buffer Vault - Withdrawal'"
                  >PHP {{ entry.transaction_amount }}</div
                >
              </div>
            </div>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { api } from "../../boot/axios";
interface CurrentUser {
  id: string;
}

interface TransactionHistory {
  user_account: number;
  transaction_name: string;
  transaction_date: string;
  transaction_time: string;
  transaction_amount: number;
}

const current_user = ref<CurrentUser | null>(null);
const history_entries = ref<TransactionHistory[]>([]);

const loading = ref(true);
const saving = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

async function fetchUser() {
  loading.value = true;
  errorMessage.value = "";

  try {
    const response = await api.get<CurrentUser>("users/me/");

    current_user.value = response.data;
    const response2 = await api.get<TransactionHistory[]>(
      `transactions/list/${current_user.value.id}/`
    );

    console.log("Logged-in user ID:", current_user.value.id);
    history_entries.value = response2.data;
    console.log(history_entries.value);

    //const { data } = await api.get<User>(`api/users/${current_user.value.id}/`);

    //user.value = { ...data };
    //originalUser.value = { ...data };
  } catch (error: any) {
    console.error("Error fetching user:", error.response?.data ?? error);

    errorMessage.value =
      error.response?.data?.detail || "Could not load profile.";
  } finally {
    loading.value = false;
  }
}

let fetchPromise: Promise<void> = Promise.resolve();
onMounted(() => {
  fetchPromise = fetchUser();
});
</script>
