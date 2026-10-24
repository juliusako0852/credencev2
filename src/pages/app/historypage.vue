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
          height: 550px;
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
              <div style="width: 20%" v-if="entry.entity."></div>
              <div style="width: 45%">
                <div
                  style="
                    width: 100%;
                    font-weight: bold;
                    font-size: large;
                    color: #0e494a;
                  "
                  >{{ entry.entity }}</div
                >
                <div style="width: 100%; font-size: medium"
                  >{{ entry.time }} - {{ entry.date }}</div
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
                  v-if="entry.amount > 0"
                  >{{ entry.amount }}</div
                >
                <div
                  style="
                    width: 100%;
                    text-align: right;
                    color: red;
                    font-weight: bold;
                    font-size: large;
                  "
                  v-if="entry.amount <= 0"
                  >{{ entry.amount }}</div
                >
                <div
                  style="width: 100%; text-align: right; font-size: medium"
                  >{{ entry.purpose }}</div
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
import { ref } from "vue";
const history_entries = ref([
  {
    transaction_id: 1,
    id: 1,
    entity: "Buffer Vault",
    purpose: "Withdrawal",
    date: "9/11/2026",
    time: "9:00 AM",
    amount: -100.0
  }
]);
</script>
