<template>
  <q-page>
    <div class="vault-page" style="width: 100%; height: 100%; width: 100%">
      <div
        style="
          min-height: 320px;
          width: auto;
          margin: 10pt;
          border-radius: 10px;
          background-color: white;
          color: white;
          text-align: center;
          justify-content: center;
          align-items: center;
        "
      >
        <div
          style="
            color: #0e494a;
            font-size: x-large;
            font-weight: bold;
            height: 40px;
            text-align: center;
            align-items: center;
            align-content: center;
          "
        >
          Vault</div
        >
        <q-card
          style="
            min-height: 130px;
            margin: 5%;
            width: auto;
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
            <div class="balance-text" style="font-size: 12pt; width: 100%"
              >Balance</div
            >
            <div style="display: flex; width: 100%">
              <div
                class="healthscore-text-value"
                style="font-size: 25pt; margin-top: 3pt; width: 100%"
                >Php. 199.000.00
              </div>
            </div>
          </q-card-section>
        </q-card>
        <div style="width: 100%">
          <q-btn
            style="
              background-color: #0e494a;
              color: white;
              font-weight: bold;
              height: 50%;
              width: 60%;
              margin: 5pt;
              border-radius: 10px;

              font-size: small;
              text-align: center;
              justify-content: center;
              align-items: center;
            "
            elevated
            to="/second"
            label="Emergency Withdrawal"
          />
        </div>
        <div style="width: 100%">
          <q-btn
            style="
              background-color: #0e494a;
              color: white;
              font-weight: bold;
              height: 50%;
              width: 60%;
              margin: 5pt;
              border-radius: 10px;
              font-size: small;
              text-align: center;
              justify-content: center;
              align-items: center;
            "
            elevated
            to="/second"
            label="Stash Surplus"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
//
</script>
