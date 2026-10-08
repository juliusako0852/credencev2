<template>
  <q-page>
    <div
      class="q-pt-none"
      style="
        height: 200px;
        width: 100%;
        margin-top: -20px;
        background-color: white;
      "
    >
      <div
        class="top-bar2"
        style="
          height: 75%;
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
            <div class="balance-text" style="font-size: 17pt">Balance</div>
            <div
              class="balance-text-value"
              style="font-size: 19pt; margin-top: 1%"
              >Php. 100,000.00</div
            >
          </q-card-section>
        </q-card>
      </div>
      <div
        class="top-bar3"
        style="
          height: 25%;
          background-color: white;
          display: flex;
          text-align: center;
          justify-content: space-between;
          align-items: center;
          padding-left: 5%;
          padding-right: 5%;
        "
      >
        <q-btn
          style="
            background-color: #37656f;
            height: 80%;
            width: 45%;
            border-radius: 10px;
            font-size: small;
          "
          to="/second"
          label="Withdraw"
        />
        <q-btn
          style="
            background-color: #37656f;
            height: 80%;
            width: 45%;
            border-radius: 10px;
            font-size: small;
          "
          to="/second"
          label="Deposit"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
//
</script>
