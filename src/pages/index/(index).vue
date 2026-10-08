<template>
  <q-page>
    <div class="home-page" style="height: 100%; width: 100%">
      <div
        class="q-pt-none"
        style="
          height: 175px;
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
                style="font-size: 19pt; margin-top: 1pt"
                >Php. 100,000.00
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
            background-color: red;
            height: 400px;
            margin-top: 50px;
            margin-left: 5%;
            margin-right: 5%;
          "
        >
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
//
</script>
