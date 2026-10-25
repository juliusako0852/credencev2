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
        v-for="entry in investments"
        key="entry.investments_id"
      >
        <div
          style="width: 100%; color: teal; font-size: medium; font-weight: bold"
        >
          <details>
            <summary>
              <div>Name of Investment:</div>
              <div style="font-weight: normal; color: black">{{
                entry.investment_name
              }}</div>
              <div>Type:</div>
              <div style="font-weight: normal; color: black">{{
                entry.type
              }}</div>
              <div>Minimum Capital:</div>
              <div style="font-weight: normal; color: black">{{
                entry.minimum_capital
              }}</div>
              <div>Return:</div>
              <div style="font-weight: normal; color: black">{{
                entry.return
              }}</div></summary
            >
            <div>Month to Date (MTD) Performance:</div>
            <div style="font-weight: normal; color: black">{{ entry.mtd }}</div>
            <div>Year to Date (YTD) Performance:</div>
            <div style="font-weight: normal; color: black">{{ entry.ytd }}</div>
            <div>Net Asset Value (NAV):</div>
            <div style="font-weight: normal; color: black">{{ entry.nav }}</div>
            <div>Net Asset Value per Share (NAVPS):</div>
            <div style="font-weight: normal; color: black">{{
              entry.navps
            }}</div>
            <div>Return since inception:</div>
            <div style="font-weight: normal; color: black">{{ entry.rsi }}</div>
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
  },
  {
    investment_id: 2,
    investment_name: "Shann Scam Inc.",
    type: "Trust Fund",
    minimum_capital: 10000,
    return: 1234,
    mtd: 23323,
    ytd: 23232,
    nav: 1231,
    navps: 2323,
    rsi: 322332
  },
  {
    investment_id: 3,
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
