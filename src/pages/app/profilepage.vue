<template>
  <q-page>
    <div class="profile-page" style="width: 100%; height: 100%; width: 100%">
      <div style="width: 100%; display: flex">
        <div class="page-title-text" style="width: 50%"> User's Profile </div>
        <div class="page-title-text" style="width: 50%; text-align: right">
          <q-btn
            style="
              background-color: #0e494a;
              color: white;
              font-weight: bold;
              height: 50%;
              width: 80%;
              border-radius: 10px;

              font-size: small;
              text-align: center;
              justify-content: center;
              align-items: center;
            "
            elevated
            @click="prompt = true"
            ><q-icon name="edit" /> Edit Profile</q-btn
          >
        </div>
      </div>
      <q-dialog v-model="prompt" persistent>
        <q-card style="min-width: 350px; border-radius: 10px; color: #0e494a">
          <q-card-section>
            <div class="text-h5" style="font-weight: bold"
              ><q-icon name="edit" /> Edit Profile</div
            >
          </q-card-section>
          <q-card-section>
            <div class="text-h6">Name:</div>
            <q-input
              dense
              v-model="new_name"
              value="{"
              user.name
              }
              autofocus
              @keyup.enter="prompt = false"
            />
          </q-card-section>

          <q-card-section class="q-pt-none"> </q-card-section>

          <q-card-section>
            <div class="text-h6">Email:</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input
              dense
              v-model="new_email"
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
      <div
        style="
          background-color: white;
          min-height: 220px;
          height: auto;
          width: auto;
          border-radius: 10px;
          margin-left: 10pt;
          margin-right: 10pt;
          display: flex;
        "
      >
        <div
          style="
            height: 100%;
            width: 40%;
            justify-content: center;
            text-align: center;
          "
        >
          <q-avatar
            size="100px"
            style="margin-top: 30pt; background-color: #1a898b; color: white"
            >{{ user?.name.charAt(0) }}</q-avatar
          >
        </div>
        <div style="height: 100%; width: 60%; color: #1a898b">
          <div style="font-weight: bold; font-size: large; margin-top: 10pt"
            >Name:</div
          >
          <div>{{ user?.name || "Loading..." }}</div>
          <div style="font-weight: bold; font-size: large">Email:</div>
          <div>{{ user?.email || "Loading..." }}</div>
          <div style="font-weight: bold; font-size: large">Contact:</div>
          <div>{{ user?.contact || "Loading..." }}</div>
          <div style="font-weight: bold; font-size: large">Address:</div>
          <div>{{ user?.address || "Loading..." }}</div>
        </div>
      </div>
      <div
        class="user-profile"
        style="
          height: 30px;
          width: auto;
          border-radius: 10px;
          margin: 10pt;
          font-size: 20pt;
          font-weight: bold;
          color: white;
          display: flex;
          text-align: center;
          align-items: center;
        "
      >
        Bank Accounts
      </div>

      <div
        class="bank-info"
        style="
          background-color: white;
          min-height: 200px;
          height: auto;
          width: auto;
          border-radius: 10px;
          margin: 10pt;
          display: flex;
        "
      >
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { api } from "../../boot/axios";

const prompt = ref(false);

interface User {
  id: number;
  name: string;
  email: string;
  contact: string;
  address: string;
}

const user = ref<User | null>(null);
const originalUser = ref<User | null>(null);

const loading = ref(true);
const saving = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

const initial = computed(
  () => user.value?.name?.charAt(0).toUpperCase() || "?"
);

// Fetch a specific user from Django
async function fetchUser() {
  loading.value = true;
  errorMessage.value = "";
  successMessage.value = "";

  try {
    const { data } = await api.get<User>("/api/users/1/");

    user.value = { ...data };
    originalUser.value = { ...data };
  } catch (error: any) {
    console.error("Error fetching user:", error);

    errorMessage.value =
      error.response?.data?.detail ||
      "Could not load profile. Check your Django API connection.";
  } finally {
    loading.value = false;
  }
}

// Update the existing user record
async function updateUser() {
  if (!user.value || saving.value) return;

  saving.value = true;
  errorMessage.value = "";
  successMessage.value = "";

  try {
    const { data } = await api.patch<User>(`/api/users/${user.value.id}/`, {
      name: user.value.name,
      email: user.value.email,
      contact: user.value.contact,
      address: user.value.address
    });

    user.value = { ...data };
    originalUser.value = { ...data };

    successMessage.value = "Profile updated successfully!";
  } catch (error: any) {
    console.error("Error updating user:", error);

    const responseData = error.response?.data;

    errorMessage.value =
      typeof responseData === "object" && responseData !== null
        ? Object.entries(responseData)
            .map(
              ([field, message]) =>
                `${field}: ${
                  Array.isArray(message) ? message.join(", ") : String(message)
                }`
            )
            .join(" | ")
        : responseData?.detail || "Could not update profile. Please try again.";
  } finally {
    saving.value = false;
  }
}

// Restore the last fetched or successfully saved values
function resetForm() {
  if (originalUser.value) {
    user.value = { ...originalUser.value };
    errorMessage.value = "";
    successMessage.value = "";
  }
}

onMounted(fetchUser);
</script>
