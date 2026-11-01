<template>
  <q-page>
    <div class="vault-page" style="width: 100%; height: 100%; width: 100%">
      <div
        style="
          min-height: 40vh;
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
                >PHP {{ current_user_vault?.vault_balance }}
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
            @click="prompt = true"
            label="Emergency Withdrawal"
          />
          <q-dialog v-model="prompt" persistent>
            <q-card
              style="min-width: 350px; border-radius: 10px; color: #0e494a"
            >
              <q-card-section>
                <div class="text-h5" style="font-weight: bold"
                  ><q-icon name="warning" /> Emergency Withdrawal</div
                >
              </q-card-section>
              <q-card-section>
                <div class="text-h6">Enter amount:</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-input
                  dense
                  v-model="emergency_amount"
                  autofocus
                  @keyup.enter="prompt = false"
                />
              </q-card-section>
              <q-card-section>
                <div class="text-h6">Purpose:</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-input
                  dense
                  v-model="emergency_purpose"
                  autofocus
                  @keyup.enter="prompt = false"
                />
              </q-card-section>

              <q-file
                filled
                bottom-slots
                v-model="emergency_file_upload"
                label="Upload Receipt"
                counter
              >
                <template #prepend>
                  <q-icon name="cloud_upload" @click.stop.prevent />
                </template>
                <template #append>
                  <q-icon
                    name="close"
                    @click.stop.prevent="emergency_file_upload = null"
                    class="cursor-pointer"
                  />
                </template>

                <template #hint> PDF, JPEG, and PNG files </template>
              </q-file>

              <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Cancel" v-close-popup />
                <q-btn flat label="Submit " v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
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
      <div
        style="
          min-height: 30vh;
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
          Connected Finance Apps</div
        >
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { api } from "../../boot/axios";

const loading = ref(true);
const saving = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

interface CurrentUser {
  id: number;
}

interface UserVault {
  user_account: number;
  vault_type: string;
  vault_balance: number;
}

const current_user = ref<CurrentUser | null>(null);
const current_user_vault = ref<UserVault>();

async function fetchUser() {
  loading.value = true;
  errorMessage.value = "";

  try {
    const response = await api.get<CurrentUser>("users/me/");

    current_user.value = response.data;

    console.log("Logged-in user ID:", current_user.value.id);

    const response2 = await api.get<UserVault>(
      `api/vault/update/${current_user.value.id}/`
    );
    console.log("API Loan Response:", response2.data);
    current_user_vault.value = response2.data;
    console.log("Assigned Loan Records:", current_user_vault.value);
  } catch (error: any) {
    console.error("Error fetching user:", error.response?.data ?? error);
    console.error("Error fetching user:", error.response2?.data ?? error);
    errorMessage.value =
      error.response?.data?.detail || "Could not load profile.";
  } finally {
    loading.value = false;
  }
}

const alert = ref(false);
const confirm = ref(false);
const prompt = ref(false);

const emergency_file_upload = ref(null);
const emergency_amount = ref("");
const emergency_purpose = ref("");

onMounted(fetchUser);
</script>
