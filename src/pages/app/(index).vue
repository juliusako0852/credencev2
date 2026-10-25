<template>
  <q-page>
    <div class="home-page" style="height: 100%; width: 100%">
      <div
        class="q-pt-none"
        style="height: 170px; width: 100%; margin-top: -22px"
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
            border-bottom-left-radius: 7%;
            border-bottom-right-radius: 7%;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
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
              box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
              text-align: left;
            "
          >
            <q-card-section style="margin-left: 5%; margin-top: 1%">
              <div class="healthscore-text" style="font-size: 12pt; width: 100%"
                >Health Score</div
              >
              <div style="display: flex; width: 100%">
                <div
                  class="healthscore-text-value"
                  style="font-size: 45pt; margin-top: 2pt; width: 50%"
                  >98
                </div>
                <div
                  style="
                    margin-top: px;
                    height: auto;
                    width: 50%;
                    display: flex;
                    color: white;
                    text-align: center;
                    justify-content: center;
                    align-items: center;
                  "
                >
                  <q-btn
                    style="
                      background-color: #0e494a;
                      color: white;
                      font-weight: bold;
                      height: 50%;
                      width: 100%;
                      border-radius: 10px;
                      font-size: small;
                      text-align: center;
                      justify-content: center;
                      align-items: center;
                    "
                    elevated
                    to="/loginpage"
                    label="Generate Report"
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="menu-buttons" style="width: 100%; height: 90%">
        <div class="main-menu-button-panel">
          <q-btn
            stack
            flat
            dense
            aria-label="send"
            size="8pt"
            to="../signuppage"
          >
            <q-icon name="swap_horiz" size="40px" />Transfer</q-btn
          >
          <q-btn stack flat dense aria-label="bills" size="8pt" to="/">
            <q-icon name="payments" size="40px" />Bills</q-btn
          >
          <q-btn
            stack
            flat
            dense
            aria-label="vault"
            size="8pt"
            to="/app/vaultpage"
          >
            <q-icon name="savings" size="40px" />Vault</q-btn
          >

          <q-btn
            stack
            flat
            dense
            aria-label="credit-passport"
            size="8pt"
            to="/"
          >
            <q-icon name="book" size="40px" />Credit Passport</q-btn
          >
          <q-btn stack flat dense aria-label="connect" size="8pt" to="/">
            <q-icon name="smartphone" size="40px" />Load</q-btn
          >
          <q-btn
            stack
            flat
            dense
            aria-label="loans"
            size="8pt"
            to="/app/loanspage"
          >
            <q-icon name="wallet" size="40px" />Loans</q-btn
          >
          <q-btn
            stack
            flat
            dense
            aria-label="investment"
            size="8pt"
            to="/app/investmentspage"
          >
            <q-icon name="percent" size="40px" />Investments</q-btn
          >
          <q-btn
            stack
            flat
            dense
            aria-label="insurance"
            size="8pt"
            to="/app/insurancespage"
          >
            <q-icon name="shield" size="40px" />Insurances</q-btn
          >
        </div>
      </div>
      <div
        class="forecast-text"
        style="
          margin-left: 5%;
          margin-right: 5%;
          margin-top: 10pt;
          color: white;
          font-weight: bold;
          font-size: x-large;
          width: auto;
          display: flex;
          border-color: white;
        "
        >Financial Forecast</div
      >
      <div
        class="forecast"
        style="
          background-color: white;
          width: auto;
          height: 200px;
          margin-left: 5%;
          margin-right: 5%;
          margin-top: 5pt;
          margin-bottom: 10pt;
          border-radius: 10px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
        "
      >
      </div>

      <div
        class="analytics-text"
        style="
          margin-left: 5%;
          margin-right: 5%;
          margin-top: 10pt;
          color: white;
          font-weight: bold;
          font-size: large;
          width: auto;
          display: flex;
          border-color: white;
          justify-content: space-between;
        "
      >
        <div>Insights</div>
        <div style="width: 30%"
          ><q-btn
            stack
            flat
            dense
            aria-label="insights"
            size="8pt"
            to="/analyticspage"
            style="background-color: #0e494a; width: 100%; border-radius: 10px"
          >
            View Details</q-btn
          ></div
        >
      </div>

      <div
        class="analytics-panel"
        style="
          background-color: white;
          width: auto;
          height: 200px;
          margin-left: 5%;
          margin-right: 5%;
          margin-top: 5pt;
          margin-bottom: 10pt;
          border-radius: 10px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
        "
      >
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
//
</script>
