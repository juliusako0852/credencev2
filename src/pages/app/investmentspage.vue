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
          display: flex;
        "
        v-for="entry in investments"
        key="entry.investments_id"
      >
        <div
          style="width: 100%; color: teal; font-size: medium; font-weight: bold"
        >
          <details>
            <summary>
              <div>Name of Investment:</div>
              <div>{{ entry.investment_name }}</div>
              <div>Type:</div>
              <div>{{ entry.type }}</div>
              <div>Minimum Capital:</div>
              <div>{{ entry.minimum_capital }}</div>
              <div>Return:</div>
              <div>{{ entry.return }}</div></summary
            >
            <div>Month to Date (MTD) Performance:</div>
            <div>{{ entry.mtd }}</div>
            <div>Year to Date (YTD) Performance:</div>
            <div>{{ entry.ytd }}</div>
            <div>Net Asset Value (NAV):</div>
            <div>{{ entry.nav }}</div>
            <div>Net Asset Value per Share (NAVPS):</div>
            <div>{{ entry.navps }}</div>
            <div>Return since inception:</div>
            <div>{{ entry.rsi }}</div>
          </details>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
//
import { ref } from "vue";
import { invalidateTypeCache } from "vue/compiler-sfc";
const investments = ref([
  {
    investment_id: 1,
    investment_name: "Shann Scam Inc.",
    type: "Trust Fund",
    minimum_capital: 10000,
    return: 1234,
    mtd: 23323,
    ytd: 23232,
    nav: 1231,
    navps: 2323,
    rsi: 322332
  }
]);
</script>
