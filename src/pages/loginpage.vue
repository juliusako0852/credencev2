<template>
  <q-layout
    view="lHh Lpr lFf"
    style="background-image: linear-gradient(to bottom, #1a898b, black)"
  >
    <div class="login-background"> </div>
    <div
      style="
        width: auto;
        min-height: 55vh;
        background-color: white;
        border-top-right-radius: 10%;
        border-top-left-radius: 10%;
        padding: 10%;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
      "
    >
      <div
        style="
          width: auto;
          height: 10%;
          text-align: center;
          justify-content: center;
          align-items: center;
          font-size: 30pt;
          color: #0e494a;
          font-weight: bolder;
        "
        >Log In</div
      >
      <div
        style="
          width: auto;
          margin-bottom: 15pt;
          padding-right: 3pt;
          text-align: center;
          color: grey;
        "
      >
        Don't have an account?
        <q-btn
          flat
          style="color: #0e494a"
          no-caps
          label="Sign Up"
          to="/signuppage"
        />
      </div>

      <div style="width: auto; margin-bottom: 10pt">
        <q-input
          elevated
          rounded
          standout="bg-teal text-white"
          v-model="email"
          label="Email"
          :dense="dense"
        />
      </div>
      <div style="width: auto; margin-bottom: 5pt">
        <q-input
          v-model="password"
          rounded
          elevated
          standout="bg-teal text-white"
          :dense="dense"
          label="Password"
          :type="isPwd ? 'password' : 'text'"
        >
          <template #append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </div>
      <div
        style="
          width: auto;
          margin-bottom: 5pt;
          padding-right: 3pt;
          text-align: end;
        "
      >
        <q-btn flat style="color: #0e494a" no-caps label="Forgot Password?" />
      </div>

      <div
        style="
          width: auto;
          margin-bottom: 10pt;
          height: 50px;
          text-align: center;
          align-items: center;
        "
      >
        <q-btn
          stack
          rounded
          dense
          elevated
          aria-label="login-button"
          size="10pt"
          to="/"
          no-caps
          label="Login"
          style="
            width: 100%;
            height: 100%;
            color: white;
            background-color: #0e494a;
          "
        />
      </div>
    </div>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";

const email = ref("");
const password = ref("");
const isPwd = ref(true);
const ph = ref("");
const dense = ref(false);
</script>
