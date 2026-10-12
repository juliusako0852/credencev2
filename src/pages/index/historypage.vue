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
            <div style="width: 100%">
              <div style="width: 100%">
                <q-item-section>
                  Date: {{ entry.date }} Time: {{ entry.time }}
                </q-item-section>
              </div>
              <div style="width: 100%">
                <q-item-section>
                  {{ entry.price }}
                </q-item-section>
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
    id: 1,
    date: "9/11/2026",
    time: "9:00 AM",
    price: "- Php. 100.00",
    desc: "Added to the vault"
  }
]);
</script>
