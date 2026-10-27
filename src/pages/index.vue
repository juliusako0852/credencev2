<template>
  <q-layout
    view="lHh Lpr lFf"
    style="background-image: linear-gradient(to bottom, #1a898b, black)"
  >
    <div class="login-background"></div>

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
          text-align: center;
          font-size: 30pt;
          color: #0e494a;
          font-weight: bolder;
        "
      >
        Log In
      </div>

      <div style="margin-bottom: 15pt; text-align: center; color: grey">
        Don't have an account?
        <q-btn
          flat
          style="color: #0e494a"
          no-caps
          label="Sign Up"
          to="/signuppage"
        />
      </div>

      <q-form @submit.prevent="onSubmit">
        <div style="margin-bottom: 10pt">
          <q-input
            v-model.trim="username"
            rounded
            standout="bg-teal text-white"
            label="Username"
            autocomplete="username"
            :disable="loading"
            :rules="[val => !!val || 'Username is required']"
          />
        </div>

        <div style="margin-bottom: 5pt">
          <q-input
            v-model="password"
            rounded
            standout="bg-teal text-white"
            label="Password"
            autocomplete="current-password"
            :type="isPwd ? 'password' : 'text'"
            :disable="loading"
            :rules="[val => !!val || 'Password is required']"
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

        <div style="margin-bottom: 10pt; text-align: end">
          <q-btn flat style="color: #0e494a" no-caps label="Forgot Password?" />
        </div>

        <div style="height: 50px">
          <q-btn
            type="submit"
            rounded
            unelevated
            no-caps
            label="Login"
            :loading="loading"
            :disable="loading"
            style="
              width: 100%;
              height: 100%;
              color: white;
              background-color: #0e494a;
            "
          />
        </div>
      </q-form>
    </div>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const username = ref("");
const password = ref("");
const isPwd = ref(true);
const loading = ref(false);

const authStore = useAuthStore();
const router = useRouter();
const $q = useQuasar();

const onSubmit = async () => {
  if (loading.value) return;

  loading.value = true;

  try {
    const success = await authStore.login(username.value, password.value);

    if (success) {
      $q.notify({
        type: "positive",
        message: "Login successful!"
      });

      await router.push("/app");
    } else {
      $q.notify({
        type: "negative",
        message: "Login failed. Check your credentials."
      });
    }
  } catch (error) {
    console.error("Login error:", error);

    $q.notify({
      type: "negative",
      message: "An unexpected error occurred."
    });
  } finally {
    loading.value = false;
  }
};
</script>
