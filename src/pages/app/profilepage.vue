<template>
  <q-page>
    <div class="profile-page" style="width: 100%; height: 100%; width: 100%">
      <div style="width: 100%; display: flex">
        <div class="page-title-text" style="width: 50%"> User Profile </div>
        <div class="page-title-text" style="width: 50%; text-align: right">
          <q-btn
            style="
              background-color: #0e494a;
              color: white;
              font-weight: bold;
              height: 50%;
              width: 90%;
              border-radius: 10px;

              font-size: small;
              text-align: center;
              justify-content: center;
              align-items: center;
              font-size: small;
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
              ><q-icon name="edit" />Edit Profile</div
            >
          </q-card-section>
          <q-card-section>
            <div class="text-h6">Name:</div>
            <q-input
              dense
              v-model="new_name"
              autofocus
              @keyup.enter="prompt = false"
            />
          </q-card-section>

          <q-card-section>
            <div class="text-h6">Email:</div>
            <q-input
              dense
              v-model="new_email"
              autofocus
              @keyup.enter="prompt = false"
            />
          </q-card-section>
          <q-card-section>
            <div class="text-h6">Contact Digits:</div>
            <q-input
              dense
              v-model="new_contact"
              autofocus
              @keyup.enter="prompt = false"
            />
          </q-card-section>
          <q-card-section>
            <div class="text-h6">Region:</div>
            <q-select
              v-model="selectedRegion"
              :options="new_region"
              option-label="name"
              option-value="id"
              label="Select Region"
              outlined
              emit-value
              map-options
              use-input
              input-debounce="0"
              clearable
            />
            <div class="text-h6">Province:</div>
            <q-select
              dense
              v-model="selectedRegion"
              :options="new_region"
              option-label="name"
              option-value="id"
              label="Select Region"
              outlined
              emit-value
              map-options
              use-input
              input-debounce="0"
              clearable
            />
            <div class="text-h6">City:</div>
            <q-select
              dense
              v-model="new_address"
              autofocus
              @keyup.enter="prompt = false"
            />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn flat label="Update " v-close-popup />
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
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
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
            >{{ current_user?.username.charAt(0) }}</q-avatar
          >
        </div>
        <div style="height: 100%; width: 60%; color: #1a898b">
          <div style="font-weight: bold; font-size: large; margin-top: 10pt"
            >Name:</div
          >
          <div
            >{{ current_user?.first_name || "Loading..." }}
            {{ current_user?.last_name || "Loading..." }}</div
          >
          <div style="font-weight: bold; font-size: large">Email:</div>
          <div>{{ current_user?.email || "Loading..." }}</div>
          <div style="font-weight: bold; font-size: large">Contact:</div>
          <div>{{ current_user?.id || "Loading..." }}</div>
          <div style="font-weight: bold; font-size: large">Address:</div>
          <div>{{ current_user?.username || "Loading..." }}</div>
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
          min-height: 30vh;
          height: auto;
          width: auto;
          border-radius: 10px;
          margin: 10pt;
          display: flex;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
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

interface CurrentUser {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

const current_user = ref<CurrentUser | null>(null);
const originalUser = ref<CurrentUser | null>(null);

const loading = ref(true);
const saving = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

//to be edited
const new_name = computed(() => current_user.value?.id);
const new_email = computed(() => current_user.value?.id);
const new_contact = computed(() => current_user.value?.id);
const new_address = computed(() => current_user.value?.id);

// Fetch a specific user from Django

async function fetchUser() {
  loading.value = true;
  errorMessage.value = "";

  try {
    const response = await api.get<CurrentUser>("users/me/");

    current_user.value = response.data;

    console.log("Logged-in user ID:", current_user.value.id);

    //const { data } = await api.get<User>(`api/users/${current_user.value.id}/`);

    //user.value = { ...data };
    //originalUser.value = { ...data };
  } catch (error: any) {
    console.error("Error fetching user:", error.response?.data ?? error);

    errorMessage.value =
      error.response?.data?.detail || "Could not load profile.";
  } finally {
    loading.value = false;
  }
}

/* Update the existing user record
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
*/
interface Region {
  id: number;
  name: string;
  provinces: string[];
}

const new_region: Region[] = [
  {
    id: 1,
    name: "Region I - Ilocos Region",
    provinces: ["Ilocos Norte", "Ilocos Sur", "La Union", "Pangasinan"]
  },
  {
    id: 2,
    name: "Region II - Cagayan Valley",
    provinces: ["Isabela", "Cagayan", "Nueva Vizcaya", "Batanes", "Quirino"]
  },
  {
    id: 3,
    name: "Region III - Central Luzon",
    provinces: [
      "Aurora",
      "Bataan",
      "Bulacan",
      "Nueva Ecija",
      "Pampanga",
      "Tarlac",
      "Zambales"
    ]
  },
  {
    id: 4,
    name: "Cordillera Administrative Region (CAR)",
    provinces: [
      "Abra",
      "Apayao",
      "Benguet",
      "Ifugao",
      "Kalinga",
      "Mountain Province"
    ]
  },
  { id: 5, name: "National Capital Region (NCR)", provinces: [] },
  {
    id: 6,
    name: "Region IV-A - CALABARZON",
    provinces: ["Cavite", "Laguna", "Batangas", "Rizal", "Quezon"]
  },
  {
    id: 7,
    name: "Region IV-B - MIMAROPA",
    provinces: ["Mindoro", "Marinduque", "Romblon", "Palawan"]
  },
  {
    id: 8,
    name: "Region V - Bicol Region",
    provinces: [
      "Albay",
      "Camarines Norte",
      "Camarines Sur",
      "Catanduanes",
      "Masbate",
      "Sorsogon"
    ]
  },
  {
    id: 9,
    name: "Region VI - Western Visayas",
    provinces: ["Aklan", "Antique", "Capiz", "Iloilo", "Guimaras"]
  },
  {
    id: 10,
    name: "Region VII - Central Visayas",
    provinces: ["Cebu", "Bohol"]
  },
  {
    id: 11,
    name: "Region VIII - Eastern Visayas",
    provinces: [
      "Northern Samar",
      "Eastern Samar",
      "Samar",
      "Biliran",
      "Leyte",
      "Southern Leyte"
    ]
  },
  {
    id: 12,
    name: "Negros Island Region (NIR)",
    provinces: ["Negros Occidental", "Negros Oriental", "Siquijor"]
  },
  {
    id: 13,
    name: "Region IX - Zamboanga Peninsula",
    provinces: ["Zamboanga del Norte", "Zamboanga del Sur", "Zamboanga Sibugay"]
  },
  {
    id: 14,
    name: "Region X - Northern Mindanao",
    provinces: [
      "Bukidnon",
      "Camiguin",
      "Lanao del Norte",
      "Misamis Occidental",
      "Misamis Oriental"
    ]
  },
  {
    id: 15,
    name: "Region XI — Davao Region",
    provinces: [
      "Davao de Oro (Compostela Valley)",
      "Davao del Norte",
      "Davao del Sur",
      "Davao Occidental",
      "Davao Oriental"
    ]
  },
  {
    id: 16,
    name: "Region XII — SOCCSKSARGEN",
    provinces: [
      "Cotabato (North Cotabato)",
      "South Cotabato",
      "Sarangani",
      "Sultan Kudarat"
    ]
  },
  {
    id: 17,
    name: "Region XIII — Caraga",
    provinces: [
      "Surigao del Norte",
      "Surigao del Sur",
      "Dinagat Islands",
      "Agusan del Sur",
      "Agusan del Norte"
    ]
  },
  {
    id: 18,
    name: "Bangsamoro Autonomous Region in Muslim Mindanao (BARMM)",
    provinces: [
      "Basilan",
      "Lanao del Sur",
      "Maguindanao del Norte",
      "Maguindanao del Sur",
      "Sulu",
      "Tawi-tawi"
    ]
  }
];

const selectedRegion = ref<number | null>(null);

onMounted(fetchUser);
</script>
