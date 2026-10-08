<template>
  <q-page>
    <div class="home-page" style="height: 100%; width: 100%">
      <div
        class="q-pt-none"
        style="
          height: 240px;
          width: 100%;
          margin-top: -20px;
          background-color: white;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
        "
      >
        <div
          class="top-bar2"
          style="
            height: 100%;
            background-color: white;
            color: white;
            display: flex;
            text-align: center;
            justify-content: center;
            align-items: center;
          "
        >
          <q-card
            style="
              height: 85%;
              width: 95%;
              border-radius: 15px;
              background-image: linear-gradient(
                to right,
                black,
                #156c6d,
                #1a898b
              );
              text-align: left;
            "
          >
            <q-card-section style="margin-left: 5%; margin-top: 1%">
              <div class="balance-text" style="font-size: 13pt">Balance</div>
              <div
                class="balance-text-value"
                style="font-size: 27pt; margin-top: 5pt"
                >Php. 100,000.00
              </div>
              <div
                class="balance-account-number"
                style="font-size: 12pt; margin-top: 5pt"
                >Account Number: xxx-xxx-xxx
              </div>
              <div
                class="top-bar3"
                style="
                  margin-top: 15px;
                  height: 10%;
                  display: flex;
                  color: white;
                  text-align: center;
                  justify-content: flex-end;
                  align-items: center;
                "
              >
                <q-btn
                  style="
                    background-color: #0e494a;
                    color: white;
                    font-weight: bold;
                    height: 80%;
                    width: 30%;
                    border-radius: 10px;
                    font-size: small;
                  "
                  elevated
                  to="/second"
                  label="+ Deposit"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="menu-buttons" style="width: 100%; height: 90%">
        <div
          class="button-panel"
          style="
            height: 200px;
            color: white;
            margin-top: 30px;
            margin-left: 5%;
            margin-right: 5%;

            display: grid;
            grid-template-columns: repeat(3, 1fr);
            text-align: center;
            justify-content: space-evenly;
          "
        >
          <q-btn stack flat dense aria-label="send" size="8pt" to="/">
            <q-icon name="paid" size="50px" />Send</q-btn
          >
          <q-btn stack flat dense aria-label="payments" size="8pt" to="/">
            <q-icon name="payments" size="50px" />Payments</q-btn
          >
          <q-btn stack flat dense aria-label="analytics" size="8pt" to="/">
            <q-icon name="trending_up" size="50px" />Analytics</q-btn
          >
          <q-btn stack flat dense aria-label="buffer_vault" size="8pt" to="/">
            <q-icon name="savings" size="50px" />Buffer Vault</q-btn
          >
          <q-btn
            stack
            flat
            dense
            aria-label="generate_report"
            size="8pt"
            to="/"
          >
            <q-icon name="request_quote" size="50px" />Generate Report</q-btn
          >
          <q-btn stack flat dense aria-label="connect" size="8pt" to="/">
            <q-icon name="smartphone" size="50px" />Connect</q-btn
          >
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
//
</script>
