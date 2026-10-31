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
            <div class="text-h6">First Name:</div>
            <q-input
              dense
              v-model="new_fname"
              autofocus
              @keyup.enter="prompt = false"
            />
            <div class="text-h6">Last Name:</div>
            <q-input
              dense
              v-model="new_lname"
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
              v-model="selectedProvince"
              :options="filteredProvinces"
              option-label="name"
              option-value="id"
              label="Select Province"
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
              v-model="selectedCities"
              :options="filteredCities"
              option-label="name"
              option-value="id"
              label="Select City/Municipality"
              outlined
              emit-value
              map-options
              use-input
              input-debounce="0"
              clearable
            />
            <div class="text-h6">Barangay:</div>
            <q-input
              dense
              v-model="new_barangay"
              autofocus
              @keyup.enter="prompt = false"
            />
            <div class="text-h6">Street:</div>
            <q-input
              dense
              v-model="new_street"
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
import { ref, computed, onMounted, watch } from "vue";
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
const new_fname = computed(() => current_user.value?.first_name);
const new_lname = computed(() => current_user.value?.last_name);
const new_email = computed(() => current_user.value?.email);
const new_contact = computed(() => current_user.value?.id);
const new_barangay = computed(() => current_user.value?.id);
const new_street = computed(() => current_user.value?.id);

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

interface UAccount {
  id: number;
  contact_number: number;
}
const current_user_acct_deets = ref<UAccount | null>(null);

//Update the existing user record
async function updateUser() {
  if (!current_user.value || saving.value) return;

  saving.value = true;
  errorMessage.value = "";
  successMessage.value = "";

  try {
    const { data } = await api.patch<UAccount>(
      `/api/users/${current_user.value.id}/`,
      {
        contact_number: current_user_acct_deets.value?.contact_number
      }
    );

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
  { id: 5, name: "National Capital Region (NCR)", provinces: ["Metro Manila"] },
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
const selectedProvince = ref<string | null>(null);

// Filter provinces based on selected region
const filteredProvinces = computed(() => {
  const region = new_region.find(r => r.id === selectedRegion.value);

  return region ? region.provinces : [];
});

interface City {
  province: string;
  cities: string[];
}

const cities: City[] = [
  {
    province: "Abra",
    cities: [
      "Bangued",
      "Boliney",
      "Bucay",
      "Bucloc",
      "Daguioman",
      "Danglas",
      "Dolores",
      "La Paz",
      "Lacub",
      "Lagangilang",
      "Lagayan",
      "Langiden",
      "Licuan-Baay",
      "Luba",
      "Malibcong",
      "Manabo",
      "Peñarrubia",
      "Pidigan",
      "Pilar",
      "Sallapadan",
      "San Isidro",
      "San Juan",
      "San Quintin",
      "Tayum",
      "Tineg",
      "Tubo",
      "Villaviciosa"
    ]
  },
  {
    province: "Agusan del Norte",
    cities: [
      "Buenavista",
      "Butuan",
      "Cabadbaran",
      "Carmen",
      "Jabonga",
      "Kitcharao",
      "Las Nieves",
      "Magallanes",
      "Nasipit",
      "Remedios T. Romualdez",
      "Santiago",
      "Tubay"
    ]
  },
  {
    province: "Agusan del Sur",
    cities: [
      "Bayugan",
      "Bunawan",
      "Esperanza",
      "La Paz",
      "Loreto",
      "Prosperidad",
      "Rosario",
      "San Francisco",
      "San Luis",
      "Santa Josefa",
      "Sibagat",
      "Talacogon",
      "Trento",
      "Veruela"
    ]
  },
  {
    province: "Aklan",
    cities: [
      "Altavas",
      "Balete",
      "Banga",
      "Batan",
      "Buruanga",
      "Ibajay",
      "Kalibo",
      "Lezo",
      "Libacao",
      "Madalag",
      "Makato",
      "Malay",
      "Malinao",
      "Nabas",
      "New Washington",
      "Numancia",
      "Tangalan"
    ]
  },
  {
    province: "Albay",
    cities: [
      "Bacacay",
      "Camalig",
      "Daraga",
      "Guinobatan",
      "Jovellar",
      "Legazpi",
      "Libon",
      "Ligao",
      "Malilipot",
      "Malinao",
      "Manito",
      "Oas",
      "Pio Duran",
      "Polangui",
      "Rapu-Rapu",
      "Santo Domingo",
      "Tabaco",
      "Tiwi"
    ]
  },
  {
    province: "Antique",
    cities: [
      "Anini-y",
      "Barbaza",
      "Belison",
      "Bugasong",
      "Caluya",
      "Culasi",
      "Hamtic",
      "Laua-an",
      "Libertad",
      "Pandan",
      "Patnongon",
      "San Jose de Buenavista",
      "San Remigio",
      "Sebaste",
      "Sibalom",
      "Tibiao",
      "Tobias Fornier",
      "Valderrama"
    ]
  },
  {
    province: "Apayao",
    cities: [
      "Calanasan",
      "Conner",
      "Flora",
      "Kabugao",
      "Luna",
      "Pudtol",
      "Santa Marcela"
    ]
  },
  {
    province: "Aurora",
    cities: [
      "Baler",
      "Casiguran",
      "Dilasag",
      "Dinalungan",
      "Dingalan",
      "Dipaculao",
      "Maria Aurora",
      "San Luis"
    ]
  },
  {
    province: "Basilan",
    cities: [
      "Akbar",
      "Al-Barka",
      "Hadji Mohammad Ajul",
      "Hadji Muhtamad",
      "Isabela City",
      "Lamitan",
      "Lantawan",
      "Maluso",
      "Sumisip",
      "Tabuan-Lasa",
      "Tipo-Tipo",
      "Tuburan",
      "Ungkaya Pukan"
    ]
  },
  {
    province: "Bataan",
    cities: [
      "Abucay",
      "Bagac",
      "Balanga",
      "Dinalupihan",
      "Hermosa",
      "Limay",
      "Mariveles",
      "Morong",
      "Orani",
      "Orion",
      "Pilar",
      "Samal"
    ]
  },
  {
    province: "Batanes",
    cities: ["Basco", "Itbayat", "Ivana", "Mahatao", "Sabtang", "Uyugan"]
  },
  {
    province: "Batangas",
    cities: [
      "Agoncillo",
      "Alitagtag",
      "Balayan",
      "Balete",
      "Batangas City",
      "Bauan",
      "Calaca",
      "Calatagan",
      "Cuenca",
      "Ibaan",
      "Laurel",
      "Lemery",
      "Lian",
      "Lipa",
      "Lobo",
      "Mabini",
      "Malvar",
      "Mataas na kahoy",
      "Nasugbu",
      "Padre Garcia",
      "Rosario",
      "San Jose",
      "San Juan",
      "San Luis",
      "San Nicolas",
      "San Pascual",
      "Santa Teresita",
      "Santo Tomas",
      "Taal",
      "Talisay",
      "Tanauan",
      "Taysan",
      "Tingloy",
      "Tuy"
    ]
  },
  {
    province: "Benguet",
    cities: [
      "Atok",
      "Baguio",
      "Bakun",
      "Bokod",
      "Buguias",
      "Itogon",
      "Kabayan",
      "Kapangan",
      "Kibungan",
      "La Trinidad",
      "Mankayan",
      "Sablan",
      "Tuba",
      "Tublay"
    ]
  },
  {
    province: "Biliran",
    cities: [
      "Almeria",
      "Biliran",
      "Cabucgayan",
      "Caibiran",
      "Culaba",
      "Kawayan",
      "Maripipi",
      "Naval"
    ]
  },
  {
    province: "Bohol",
    cities: [
      "Alicia",
      "Anda",
      "Batuan",
      "Bilar",
      "Candijay",
      "Carmen",
      "Dimiao",
      "Duero",
      "Garcia Hernandez",
      "Guindulman",
      "Jagna",
      "Sevilla",
      "Lila",
      "Loay",
      "Loboc",
      "Mabini",
      "Pilar",
      "Sierra Bullones",
      "Valencia"
    ]
  },
  {
    province: "Bukidnon",
    cities: [
      "Baungon",
      "Cabanglasan",
      "Damulog",
      "Dangcagan",
      "Don Carlos",
      "Impasugong",
      "Kadingilan",
      "Kalilangan",
      "Kibawe",
      "Kitaotao",
      "Lantapan",
      "Libona",
      "Malaybalay",
      "Malitbog",
      "Manolo Fortich",
      "Maramag",
      "Pangantucan",
      "Quezon",
      "San Fernando",
      "Sumilao",
      "Talakag",
      "Valencia"
    ]
  },
  {
    province: "Bulacan",
    cities: [
      "Angat",
      "Balagtas",
      "Baliuag",
      "Bocaue",
      "Bulakan",
      "Bustos",
      "Calumpit",
      "Doña Remedios Trinidad",
      "Guiguinto",
      "Hagonoy",
      "Malolos",
      "Marilao",
      "Meycauayan",
      "Norzagaray",
      "Obando",
      "Pandi",
      "Paombong",
      "Plaridel",
      "Pulilan",
      "San Ildefonso",
      "San Jose del Monte",
      "San Miguel",
      "San Rafael",
      "Santa Maria"
    ]
  },
  {
    province: "Cagayan",
    cities: [
      "Abulug",
      "Alcala",
      "Allacapan",
      "Amulung",
      "Aparri",
      "Baggao",
      "Ballesteros",
      "Buguey",
      "Calayan",
      "Camalaniugan",
      "Claveria",
      "Enrile",
      "Gattaran",
      "Gonzaga",
      "Iguig",
      "Lal-lo",
      "Lasam",
      "Pamplona",
      "Peñablanca",
      "Piat",
      "Rizal",
      "Sanchez-Mira",
      "Santa Ana",
      "Santa Praxedes",
      "Santa Teresita",
      "Santo Niño",
      "Solana",
      "Tuao",
      "Tuguegarao City"
    ]
  },
  {
    province: "Camarines Norte",
    cities: [
      "Basud",
      "Capalonga",
      "Daet",
      "Jose Panganiban",
      "Labo",
      "Mercedes",
      "Paracale",
      "San Lorenzo Ruiz",
      "San Vicente",
      "Santa Elena",
      "Talisay",
      "Vinzons"
    ]
  },
  {
    province: "Camarines Sur",
    cities: [
      "Baao",
      "Balatan",
      "Bato",
      "Bombon",
      "Buhi",
      "Bula",
      "Cabusao",
      "Calabanga",
      "Camaligan",
      "Canaman",
      "Caramoan",
      "Del Gallego",
      "Gainza",
      "Garchitorena",
      "Goa",
      "Iriga",
      "Lagonoy",
      "Libmanan",
      "Lupi",
      "Magarao",
      "Milaor",
      "Minalabac",
      "Nabua",
      "Naga",
      "Ocampo",
      "Pamplona",
      "Pasacao",
      "Pili",
      "Presentacion",
      "Ragay",
      "Sagñay",
      "San Fernando",
      "San Jose",
      "Sipocot",
      "Siruma",
      "Tigaon",
      "Tinambac"
    ]
  },
  {
    province: "Camiguin",
    cities: ["Catarman", "Guinsiliban", "Mahinog", "Mambajao", "Sagay"]
  },
  {
    province: "Capiz",
    cities: [
      "Cuartero",
      "Dao",
      "Dumalag",
      "Dumarao",
      "Ivisan",
      "Jamindan",
      "Maayon",
      "Mambusao",
      "Panay",
      "Panitan",
      "Pilar",
      "Pontevedra",
      "President Roxas",
      "Roxas City",
      "Sapian",
      "Sigma",
      "Tapaz"
    ]
  },
  {
    province: "Catanduanes",
    cities: [
      "Bagamanoc",
      "Baras",
      "Bato",
      "Caramoran",
      "Gigmoto",
      "Pandan",
      "Panganiban",
      "San Andres",
      "San Miguel",
      "Viga",
      "Virac"
    ]
  },
  {
    province: "Cavite",
    cities: [
      "Alfonso",
      "Amadeo",
      "Bacoor",
      "Carmona",
      "Cavite City",
      "Dasmariñas",
      "General Emilio Aguinaldo",
      "General Mariano Alvarez",
      "General Trias",
      "Imus",
      "Indang",
      "Kawit",
      "Magallanes",
      "Maragondon",
      "Mendez",
      "Naic",
      "Noveleta",
      "Rosario",
      "Silang",
      "Tagaytay",
      "Tanza",
      "Ternate",
      "Trece Martires"
    ]
  },
  {
    province: "Cebu",
    cities: [
      "Alcantara",
      "Alcoy",
      "Alegria",
      "Aloguinsan",
      "Argao",
      "Asturias",
      "Badian",
      "Balamban",
      "Bantayan",
      "Barili",
      "Bogo",
      "Boljoon",
      "Borbon",
      "Carcar",
      "Carmen",
      "Catmon",
      "Cebu City",
      "Compostela",
      "Consolacion",
      "Cordova",
      "Daanbantayan",
      "Dalaguete",
      "Danao",
      "Dumanjug",
      "Ginatilan",
      "Lapu-Lapu",
      "Liloan",
      "Madridejos",
      "Malabuyoc",
      "Mandaue",
      "Medellin",
      "Minglanilla",
      "Moalboal",
      "Naga",
      "Oslob",
      "Pilar",
      "Pinamungajan",
      "Poro",
      "Ronda",
      "Samboan",
      "San Fernando",
      "San Francisco",
      "San Remigio",
      "Santa Fe",
      "Santander",
      "Sibonga",
      "Sogod",
      "Tabogon",
      "Tabuelan",
      "Talisay",
      "Toledo",
      "Tuburan",
      "Tudela"
    ]
  },
  {
    province: "Compostela Valley",
    cities: [
      "Compostela",
      "Laak",
      "Mabini",
      "Maco",
      "Maragusan",
      "Mawab",
      "Monkayo",
      "Montevista",
      "Nabunturan",
      "New Bataan",
      "Pantukan"
    ]
  },
  {
    province: "Cotabato",
    cities: [
      "Alamada",
      "Aleosan",
      "Antipas",
      "Arakan",
      "Banisilan",
      "Carmen",
      "Kabacan",
      "Kidapawan",
      "Libungan",
      "M'lang",
      "Magpet",
      "Makilala",
      "Matalam",
      "Midsayap",
      "Pigcawayan",
      "Pikit",
      "President Roxas",
      "Tulunan"
    ]
  },
  {
    province: "Davao del Norte",
    cities: [
      "Asuncion",
      "Braulio E. Dujali",
      "Carmen",
      "Kapalong",
      "New Corella",
      "Panabo",
      "Samal",
      "San Isidro",
      "Santo Tomas",
      "Tagum",
      "Talaingod"
    ]
  },
  {
    province: "Davao del Sur",
    cities: [
      "Bansalan",
      "Davao City",
      "Digos",
      "Hagonoy",
      "Kiblawan",
      "Magsaysay",
      "Malalag",
      "Matanao",
      "Padada",
      "Santa Cruz",
      "Sulop"
    ]
  },
  {
    province: "Davao Oriental",
    cities: [
      "Baganga",
      "Banaybanay",
      "Boston",
      "Caraga",
      "Cateel",
      "Governor Generoso",
      "Lupon",
      "Manay",
      "Mati",
      "San Isidro",
      "Tarragona"
    ]
  },
  {
    province: "Dinagat Islands",
    cities: [
      "Basilisa",
      "Cagdianao",
      "Dinagat",
      "Libjo",
      "Loreto",
      "San Jose",
      "Tubajon"
    ]
  },
  {
    province: "Eastern Samar",
    cities: [
      "Arteche",
      "Balangiga",
      "Balangkayan",
      "Borongan",
      "Can-avid",
      "Dolores",
      "General MacArthur",
      "Giporlos",
      "Guiuan",
      "Hernani",
      "Jipapad",
      "Lawaan",
      "Llorente",
      "Maslog",
      "Maydolong",
      "Mercedes",
      "Oras",
      "Quinapondan",
      "Salcedo",
      "San Julian",
      "San Policarpo",
      "Sulat",
      "Taft"
    ]
  },
  {
    province: "Guimaras",
    cities: ["Buenavista", "Jordan", "Nueva Valencia", "San Lorenzo", "Sibunag"]
  },
  {
    province: "Ifugao",
    cities: [
      "Aguinaldo",
      "Alfonso Lista",
      "Asipulo",
      "Banaue",
      "Hingyon",
      "Hungduan",
      "Kiangan",
      "Lagawe",
      "Lamut",
      "Mayoyao",
      "Tinoc"
    ]
  },
  {
    province: "Ilocos Norte",
    cities: [
      "Adams",
      "Bacarra",
      "Badoc",
      "Bangui",
      "Banna",
      "Batac",
      "Burgos",
      "Carasi",
      "Currimao",
      "Dingras",
      "Dumalneg",
      "Laoag",
      "Marcos",
      "Nueva Era",
      "Pagudpud",
      "Paoay",
      "Pasuquin",
      "Piddig",
      "Pinili",
      "San Nicolas",
      "Sarrat",
      "Solsona",
      "Vintar"
    ]
  },
  {
    province: "Ilocos Sur",
    cities: [
      "Alilem",
      "Banayoyo",
      "Bantay",
      "Burgos",
      "Cabugao",
      "Candon",
      "Caoayan",
      "Cervantes",
      "Galimuyod",
      "Gregorio del Pilar",
      "Lidlidda",
      "Magsingal",
      "Nagbukel",
      "Narvacan",
      "Quirino",
      "Salcedo",
      "San Emilio",
      "San Esteban",
      "San Ildefonso",
      "San Juan",
      "San Vicente",
      "Santa",
      "Santa Catalina",
      "Santa Cruz",
      "Santa Lucia",
      "Santa Maria",
      "Santiago",
      "Santo Domingo",
      "Sigay",
      "Sinait",
      "Sugpon",
      "Suyo",
      "Tagudin",
      "Vigan"
    ]
  },
  {
    province: "Iloilo",
    cities: [
      "Ajuy",
      "Alimodian",
      "Anilao",
      "Badiangan",
      "Balasan",
      "Banate",
      "Barotac Nuevo",
      "Barotac Viejo",
      "Batad",
      "Bingawan",
      "Cabatuan",
      "Calinog",
      "Carles",
      "Concepcion",
      "Dingle",
      "Dueñas",
      "Dumangas",
      "Estancia",
      "Guimbal",
      "Igbaras",
      "Iloilo City",
      "Janiuay",
      "Lambunao",
      "Leganes",
      "Lemery",
      "Leon",
      "Maasin",
      "Miagao",
      "Mina",
      "New Lucena",
      "Oton",
      "Passi",
      "Pavia",
      "Pototan",
      "San Dionisio",
      "San Enrique",
      "San Joaquin",
      "San Miguel",
      "San Rafael",
      "Santa Barbara",
      "Sara",
      "Tigbauan",
      "Tubungan",
      "Zarraga"
    ]
  },
  {
    province: "Isabela",
    cities: [
      "Alicia",
      "Angadanan",
      "Aurora",
      "Benito Soliven",
      "Burgos",
      "Cabagan",
      "Cabatuan",
      "Cauayan",
      "Cordon",
      "Delfin Albano",
      "Dinapigue",
      "Divilacan",
      "Echague",
      "Gamu",
      "Ilagan",
      "Jones",
      "Luna",
      "Maconacon",
      "Mallig",
      "Naguilian",
      "Palanan",
      "Quezon",
      "Quirino",
      "Ramon",
      "Reina Mercedes",
      "Roxas",
      "San Agustin",
      "San Guillermo",
      "San Isidro",
      "San Manuel",
      "San Mariano",
      "San Mateo",
      "San Pablo",
      "Santa Maria",
      "Santiago",
      "Santo Tomas",
      "Tumauini"
    ]
  },
  {
    province: "Kalinga",
    cities: [
      "Balbalan",
      "Lubuagan",
      "Pasil",
      "Pinukpuk",
      "Rizal",
      "Tabuk",
      "Tanudan",
      "Tinglayan"
    ]
  },
  {
    province: "La Union",
    cities: [
      "Agoo",
      "Aringay",
      "Bacnotan",
      "Bagulin",
      "Balaoan",
      "Bangar",
      "Bauang",
      "Burgos",
      "Caba",
      "Luna",
      "Naguilian",
      "Pugo",
      "Rosario",
      "San Fernando",
      "San Gabriel",
      "San Juan",
      "Santo Tomas",
      "Santol",
      "Sudipen",
      "Tubao"
    ]
  },
  {
    province: "Laguna",
    cities: [
      "Alaminos",
      "Bay",
      "Biñan",
      "Cabuyao",
      "Calamba",
      "Calauan",
      "Cavinti",
      "Famy",
      "Kalayaan",
      "Liliw",
      "Los Baños",
      "Luisiana",
      "Lumban",
      "Mabitac",
      "Magdalena",
      "Majayjay",
      "Nagcarlan",
      "Paete",
      "Pagsanjan",
      "Pakil",
      "Pangil",
      "Pila",
      "Rizal",
      "San Pablo",
      "San Pedro",
      "Santa Cruz",
      "Santa Maria",
      "Santa Rosa",
      "Siniloan",
      "Victoria"
    ]
  },
  {
    province: "Lanao del Norte",
    cities: [
      "Bacolod",
      "Baloi",
      "Baroy",
      "Iligan",
      "Kapatagan",
      "Kauswagan",
      "Kolambugan",
      "Lala",
      "Linamon",
      "Magsaysay",
      "Maigo",
      "Matungao",
      "Munai",
      "Nunungan",
      "Pantao Ragat",
      "Pantar",
      "Poona Piagapo",
      "Salvador",
      "Sapad",
      "Sultan Naga Dimaporo",
      "Tagoloan",
      "Tangcal",
      "Tubod"
    ]
  },
  {
    province: "Lanao del Sur",
    cities: [
      "Amai Manabilang",
      "Bacolod-Kalawi",
      "Balabagan",
      "Balindong",
      "Bayang",
      "Binidayan",
      "Buadiposo-Buntong",
      "Bubong",
      "Butig",
      "Calanogas",
      "Ditsaan-Ramain",
      "Ganassi",
      "Kapai",
      "Kapatagan",
      "Lumba-Bayabao",
      "Lumbaca-Unayan",
      "Lumbatan",
      "Lumbayanague",
      "Madalum",
      "Madamba",
      "Maguing",
      "Malabang",
      "Marantao",
      "Marawi",
      "Marogong",
      "Masiu",
      "Mulondo",
      "Pagayawan",
      "Piagapo",
      "Picong",
      "Poona Bayabao",
      "Pualas",
      "Saguiaran",
      "Sultan Dumalondong",
      "Tagoloan II",
      "Tamparan",
      "Taraka",
      "Tubaran",
      "Tugaya",
      "Wao"
    ]
  },
  {
    province: "Leyte",
    cities: [
      "Abuyog",
      "Alangalang",
      "Albuera",
      "Babatngon",
      "Barugo",
      "Bato",
      "Baybay",
      "Burauen",
      "Calubian",
      "Capoocan",
      "Carigara",
      "Dagami",
      "Dulag",
      "Hilongos",
      "Hindang",
      "Inopacan",
      "Isabel",
      "Jaro",
      "Javier",
      "Julita",
      "Kananga",
      "La Paz",
      "Leyte",
      "MacArthur",
      "Mahaplag",
      "Matag-ob",
      "Matalom",
      "Mayorga",
      "Merida",
      "Ormoc",
      "Palo",
      "Palompon",
      "Pastrana",
      "San Isidro",
      "San Miguel",
      "Santa Fe",
      "Tabango",
      "Tabontabon",
      "Tacloban",
      "Tanauan",
      "Tolosa",
      "Tunga",
      "Villaba"
    ]
  },
  {
    province: "Maguindanao",
    cities: [
      "Barira",
      "Buldon",
      "Datu Anggal Midtimbang",
      "Datu Blah T. Sinsuat",
      "Datu Odin Sinsuat",
      "Kabuntalan",
      "Matanog",
      "Northern Kabuntalan",
      "Parang",
      "Sultan Kudarat",
      "Sultan Mastura",
      "Sultan Sumagka",
      "Upi"
    ]
  },
  {
    province: "Marinduque",
    cities: ["Boac", "Buenavista", "Gasan", "Mogpog", "Santa Cruz", "Torrijos"]
  },
  {
    province: "Masbate",
    cities: [
      "Aroroy",
      "Baleno",
      "Balud",
      "Batuan",
      "Cataingan",
      "Cawayan",
      "Claveria",
      "Dimasalang",
      "Esperanza",
      "Mandaon",
      "Masbate City",
      "Milagros",
      "Mobo",
      "Monreal",
      "Palanas",
      "Pio V. Corpuz",
      "Placer",
      "San Fernando",
      "San Jacinto",
      "San Pascual",
      "Uson"
    ]
  },
  {
    province: "Metro Manila",
    cities: [
      "Caloocan",
      "Las Piñas",
      "Makati",
      "Malabon",
      "Mandaluyong",
      "Manila",
      "Marikina",
      "Muntinlupa",
      "Navotas",
      "Parañaque",
      "Pasay",
      "Pasig",
      "Pateros",
      "Quezon City",
      "San Juan",
      "Taguig",
      "Valenzuela"
    ]
  },
  {
    province: "Misamis Occidental",
    cities: [
      "Aloran",
      "Baliangao",
      "Bonifacio",
      "Calamba",
      "Clarin",
      "Concepcion",
      "Don Victoriano Chiongbian",
      "Jimenez",
      "Lopez Jaena",
      "Oroquieta",
      "Ozamiz",
      "Panaon",
      "Plaridel",
      "Sapang Dalaga",
      "Sinacaban",
      "Tangub",
      "Tudela"
    ]
  },
  {
    province: "Misamis Oriental",
    cities: [
      "Alubijid",
      "Balingasag",
      "Balingoan",
      "Binuangan",
      "Cagayan de Oro",
      "Claveria",
      "El Salvador",
      "Gingoog",
      "Gitagum",
      "Initao",
      "Jasaan",
      "Kinoguitan",
      "Lagonglong",
      "Laguindingan",
      "Libertad",
      "Lugait",
      "Magsaysay",
      "Manticao",
      "Medina",
      "Naawan",
      "Opol",
      "Salay",
      "Sugbongcogon",
      "Tagoloan",
      "Talisayan",
      "Villanueva"
    ]
  },
  {
    province: "Mountain Province",
    cities: [
      "Barlig",
      "Bauko",
      "Besao",
      "Bontoc",
      "Natonin",
      "Paracelis",
      "Sabangan",
      "Sadanga",
      "Sagada",
      "Tadian"
    ]
  },
  {
    province: "Negros Occidental",
    cities: [
      "Bacolod",
      "Bago",
      "Binalbagan",
      "Cadiz",
      "Calatrava",
      "Candoni",
      "Cauayan",
      "Enrique B. Magalona",
      "Escalante",
      "Himamaylan",
      "Hinigaran",
      "Hinoba-an",
      "Ilog",
      "Isabela",
      "Kabankalan",
      "La Carlota",
      "La Castellana",
      "Manapla",
      "Moises Padilla",
      "Murcia",
      "Pontevedra",
      "Pulupandan",
      "Sagay",
      "Salvador Benedicto",
      "San Carlos",
      "San Enrique",
      "Silay",
      "Sipalay",
      "Talisay",
      "Toboso",
      "Valladolid",
      "Victorias"
    ]
  },
  {
    province: "Negros Oriental",
    cities: [
      "Amlan",
      "Ayungon",
      "Bacong",
      "Bais",
      "Basay",
      "Bayawan",
      "Bindoy",
      "Canlaon",
      "Dauin",
      "Dumaguete",
      "Guihulngan",
      "Jimalalud",
      "La Libertad",
      "Mabinay",
      "Manjuyod",
      "Pamplona",
      "San Jose",
      "Santa Catalina",
      "Siaton",
      "Sibulan",
      "Tanjay",
      "Tayasan",
      "Valencia",
      "Vallehermoso",
      "Zamboanguita"
    ]
  },
  {
    province: "Northern Samar",
    cities: [
      "Allen",
      "Biri",
      "Bobon",
      "Capul",
      "Catarman",
      "Catubig",
      "Gamay",
      "Laoang",
      "Lapinig",
      "Las Navas",
      "Lavezares",
      "Lope de Vega",
      "Mapanas",
      "Mondragon",
      "Palapag",
      "Pambujan",
      "Rosario",
      "San Antonio",
      "San Isidro",
      "San Jose",
      "San Roque",
      "San Vicente",
      "Silvino Lobos",
      "Victoria"
    ]
  },
  {
    province: "Nueva Ecija",
    cities: [
      "Aliaga",
      "Bongabon",
      "Cabanatuan",
      "Cabiao",
      "Carranglan",
      "Cuyapo",
      "Gabaldon",
      "Gapan",
      "General Mamerto Natividad",
      "General Tinio",
      "Guimba",
      "Jaen",
      "Laur",
      "Licab",
      "Llanera",
      "Lupao",
      "Muñoz",
      "Nampicuan",
      "Palayan",
      "Pantabangan",
      "Peñaranda",
      "Quezon",
      "Rizal",
      "San Antonio",
      "San Isidro",
      "Cabaritan",
      "San Leonardo",
      "Santa Rosa",
      "Santo Domingo",
      "Talavera",
      "Talugtug",
      "Zaragoza"
    ]
  },
  {
    province: "Nueva Vizcaya",
    cities: [
      "Alfonso Castañeda",
      "Ambaguio",
      "Aritao",
      "Bagabag",
      "Bambang",
      "Bayombong",
      "Diadi",
      "Dupax del Norte",
      "Dupax del Sur",
      "Kasibu",
      "Kayapa",
      "Quezon",
      "Santa Fe",
      "Solano",
      "Villaverde"
    ]
  },
  {
    province: "Occidental Mindoro",
    cities: [
      "Abra de Ilog",
      "Calintaan",
      "Looc",
      "Lubang",
      "Magsaysay",
      "Mamburao",
      "Paluan",
      "Rizal",
      "Sablayan",
      "San Jose",
      "Santa Cruz"
    ]
  },
  {
    province: "Oriental Mindoro",
    cities: [
      "Baco",
      "Bansud",
      "Bongabong",
      "Bulalacao",
      "Calapan",
      "Gloria",
      "Mansalay",
      "Naujan",
      "Pinamalayan",
      "Pola",
      "Puerto Galera",
      "Roxas",
      "San Teodoro",
      "Socorro",
      "Victoria"
    ]
  },
  {
    province: "Palawan",
    cities: [
      "Aborlan",
      "Agutaya",
      "Araceli",
      "Balabac",
      "Bataraza",
      "Brooke's Point",
      "Busuanga",
      "Cagayancillo",
      "Coron",
      "Culion",
      "Cuyo",
      "Dumaran",
      "El Nido",
      "Kalayaan",
      "Linapacan",
      "Magsaysay",
      "Narra",
      "Puerto Princesa",
      "Quezon",
      "Rizal",
      "Roxas",
      "San Vicente",
      "Sofronio Española",
      "Taytay"
    ]
  },
  {
    province: "Pampanga",
    cities: [
      "Angeles",
      "Apalit",
      "Arayat",
      "Bacolor",
      "Candaba",
      "Floridablanca",
      "Guagua",
      "Lubao",
      "Mabalacat",
      "Macabebe",
      "Magalang",
      "Masantol",
      "Mexico",
      "Minalin",
      "Porac",
      "San Fernando",
      "San Luis",
      "San Simon",
      "Santa Ana",
      "Santa Rita",
      "Santo Tomas",
      "Sasmuan"
    ]
  },
  {
    province: "Pangasinan",
    cities: [
      "Agno",
      "Aguilar",
      "Alaminos",
      "Alcala",
      "Anda",
      "Asingan",
      "Balungao",
      "Bani",
      "Basista",
      "Bautista",
      "Bayambang",
      "Binalonan",
      "Binmaley",
      "Bolinao",
      "Bugallon",
      "Burgos",
      "Calasiao",
      "Dasol",
      "Dagupan",
      "Dasol",
      "Infanta",
      "Labrador",
      "Laoac",
      "Lingayen",
      "Mabini",
      "Malasiqui",
      "Manaoag",
      "Mangaldan",
      "Mangatarem",
      "Mapandan",
      "Natividad",
      "Pozorrubio",
      "Rosales",
      "San Carlos",
      "San Fabian",
      "San Jacinto",
      "San Manuel",
      "San Nicolas",
      "San Quintin",
      "Santa Barbara",
      "Santa Maria",
      "Santo Tomas",
      "Sison",
      "Sual",
      "Tayug",
      "Umingan",
      "Urbiztondo",
      "Urdaneta",
      "Villasis"
    ]
  },
  {
    province: "Quezon",
    cities: [
      "Agdangan",
      "Alabat",
      "Atimonan",
      "Buenavista",
      "Burdeos",
      "Calauag",
      "Candelaria",
      "Catanauan",
      "Dolores",
      "General Luna",
      "General Nakar",
      "Guinayangan",
      "Gumaca",
      "Infanta",
      "Jomalig",
      "Lopez",
      "Lucban",
      "Lucena",
      "Macalelon",
      "Mauban",
      "Mulanay",
      "Padre Burgos",
      "Pagbilao",
      "Panukulan",
      "Patnanungan",
      "Perez",
      "Pitogo",
      "Plaridel",
      "Polillo",
      "Quezon",
      "Real",
      "Sampaloc",
      "San Andres",
      "San Antonio",
      "San Francisco",
      "San Narciso",
      "Sariaya",
      "Tagkawayan",
      "Tayabas",
      "Tiaong",
      "Unisan"
    ]
  },
  {
    province: "Quirino",
    cities: [
      "Aglipay",
      "Cabarroguis",
      "Diffun",
      "Maddela",
      "Nagtipunan",
      "Saguday"
    ]
  },
  {
    province: "Rizal",
    cities: [
      "Angono",
      "Antipolo",
      "Baras",
      "Binangonan",
      "Cainta",
      "Cardona",
      "Jalajala",
      "Morong",
      "Pililla",
      "Rodriguez",
      "San Mateo",
      "Tanay",
      "Taytay",
      "Teresa"
    ]
  },
  {
    province: "Romblon",
    cities: [
      "Alcantara",
      "Banton",
      "Cajidiocan",
      "Calatrava",
      "Concepcion",
      "Corcuera",
      "Ferrol",
      "Looc",
      "Magdiwang",
      "Odiongan",
      "Romblon",
      "San Agustin",
      "San Andres",
      "San Fernando",
      "San Jose",
      "Santa Fe",
      "Santa Maria"
    ]
  },
  {
    province: "Samar",
    cities: [
      "Almagro",
      "Basey",
      "Calbayog",
      "Calbiga",
      "Catbalogan",
      "Daram",
      "Gandara",
      "Hinabangan",
      "Jiabong",
      "Marabut",
      "Matuguinao",
      "Motiong",
      "Pagsanghan",
      "Paranas",
      "Pinabacdao",
      "San Jorge",
      "San Jose de Buan",
      "San Sebastian",
      "Santa Margarita",
      "Santa Rita",
      "Santo Niño",
      "Tagapul-an",
      "Talalora",
      "Tarangnan",
      "Villareal",
      "Zumarraga"
    ]
  },
  {
    province: "Sarangani",
    cities: [
      "Alabel",
      "Glan",
      "Kiamba",
      "Maasim",
      "Maitum",
      "Malapatan",
      "Malungon"
    ]
  },
  {
    province: "Shariff Kabunsuan",
    cities: [
      "Barira",
      "Buldon",
      "Datu Blah T. Sinsuat",
      "Datu Odin Sinsuat",
      "Kabuntalan",
      "Matanog",
      "Northern Kabuntalan",
      "Parang",
      "Sultan Kudarat",
      "Sultan Mastura",
      "Upi"
    ]
  },
  {
    province: "Siquijor",
    cities: [
      "Enrique Villanueva",
      "Larena",
      "Lazi",
      "Maria",
      "San Juan",
      "Siquijor"
    ]
  },
  {
    province: "Sorsogon",
    cities: [
      "Barcelona",
      "Bulan",
      "Bulusan",
      "Casiguran",
      "Castilla",
      "Donsol",
      "Gubat",
      "Irosin",
      "Juban",
      "Magallanes",
      "Matnog",
      "Pilar",
      "Prieto Diaz",
      "Santa Magdalena",
      "Sorsogon City"
    ]
  },
  {
    province: "South Cotabato",
    cities: [
      "Banga",
      "General Santos",
      "Koronadal",
      "Lake Sebu",
      "Norala",
      "Polomolok",
      "Santo Niño",
      "Surallah",
      "T'Boli",
      "Tampakan",
      "Tantangan",
      "Tupi"
    ]
  },
  {
    province: "Southern Leyte",
    cities: [
      "Anahawan",
      "Bontoc",
      "Hinunangan",
      "Hinundayan",
      "Libagon",
      "Liloan",
      "Limasawa",
      "Maasin",
      "Macrohon",
      "Malitbog",
      "Padre Burgos",
      "Pintuyan",
      "Saint Bernard",
      "San Francisco",
      "San Juan",
      "San Ricardo",
      "Silago",
      "Sogod",
      "Tomas Oppus"
    ]
  },
  {
    province: "Sultan Kudarat",
    cities: [
      "Bagumbayan",
      "Columbio",
      "Esperanza",
      "Isulan",
      "Kalamansig",
      "Lambayong",
      "Lebak",
      "Lutayan",
      "Palimbang",
      "President Quirino",
      "Senator Ninoy Aquino",
      "Tacurong"
    ]
  },
  {
    province: "Sulu",
    cities: [
      "Banguingui",
      "Hadji Panglima Tahil",
      "Indanan",
      "Jolo",
      "Kalingalan Caluang",
      "Lugus",
      "Luuk",
      "Maimbung",
      "Old Panamao",
      "Omar",
      "Pandami",
      "Panglima Estino",
      "Pangutaran",
      "Parang",
      "Pata",
      "Patikul",
      "Siasi",
      "Talipao",
      "Tapul"
    ]
  },
  {
    province: "Surigao del Norte",
    cities: [
      "Alegria",
      "Bacuag",
      "Burgos",
      "Claver",
      "Dapa",
      "Del Carmen",
      "General Luna",
      "Gigaquit",
      "Mainit",
      "Malimono",
      "Pilar",
      "Placer",
      "San Benito",
      "San Francisco",
      "San Isidro",
      "Santa Monica",
      "Sison",
      "Socorro",
      "Surigao City",
      "Tagana-an",
      "Tubod"
    ]
  },
  {
    province: "Surigao del Sur",
    cities: [
      "Barobo",
      "Bayabas",
      "Bislig",
      "Cagwait",
      "Cantilan",
      "Carmen",
      "Carrascal",
      "Cortes",
      "Hinatuan",
      "Lanuza",
      "Lianga",
      "Lingig",
      "Madrid",
      "Marihatag",
      "San Agustin",
      "San Miguel",
      "Tagbina",
      "Tago",
      "Tandag"
    ]
  },
  {
    province: "Tarlac",
    cities: [
      "Anao",
      "Bamban",
      "Camiling",
      "Capas",
      "Concepcion",
      "Gerona",
      "La Paz",
      "Mayantoc",
      "Moncada",
      "Paniqui",
      "Pura",
      "Ramos",
      "San Clemente",
      "San Jose",
      "San Manuel",
      "Santa Ignacia",
      "Tarlac City",
      "Victoria"
    ]
  },
  {
    province: "Tawi-Tawi",
    cities: [
      "Bongao",
      "Languyan",
      "Mapun",
      "Panglima Sugala",
      "Sapa-Sapa",
      "Sibutu",
      "Simunul",
      "Sitangkai",
      "South Ubian",
      "Tandubas",
      "Turtle Islands"
    ]
  },
  {
    province: "Zambales",
    cities: [
      "Botolan",
      "Cabangan",
      "Candelaria",
      "Iba",
      "Masinloc",
      "Olongapo",
      "Palauig",
      "San Antonio",
      "San Felipe",
      "San Marcelino",
      "San Narciso",
      "Santa Cruz",
      "Subic"
    ]
  },
  {
    province: "Zamboanga del Norte",
    cities: [
      "Baliguian",
      "Dapitan",
      "Dipolog",
      "Godod",
      "Gutalac",
      "Jose Dalman",
      "Kalawit",
      "Katipunan",
      "La Libertad",
      "Labason",
      "Leon B. Postigo",
      "Liloy",
      "Manukan",
      "Mutia",
      "Piñan",
      "Polanco",
      "President Manuel A. Roxas",
      "Rizal",
      "Salug",
      "Sergio Osmeña Sr.",
      "Siayan",
      "Sibuco",
      "Sibutad",
      "Sindangan",
      "Siocon",
      "Sirawai",
      "Tampilisan"
    ]
  },
  {
    province: "Zamboanga del Sur",
    cities: [
      "Aurora",
      "Bayog",
      "Dimataling",
      "Dinas",
      "Dumalinao",
      "Dumingag",
      "Guipos",
      "Josefina",
      "Kumalarang",
      "Labangan",
      "Lakewood",
      "Lapuyan",
      "Mahayag",
      "Margosatubig",
      "Midsalip",
      "Molave",
      "Pagadian",
      "Pitogo",
      "Ramon Magsaysay",
      "San Miguel",
      "San Pablo",
      "Sominot",
      "Tabina",
      "Tambulig",
      "Tigbao",
      "Tukuran",
      "Vincenzo A. Sagun",
      "Zamboanga City"
    ]
  },
  {
    province: "Zamboanga Sibugay",
    cities: [
      "Alicia",
      "Buug",
      "Diplahan",
      "Imelda",
      "Ipil",
      "Kabasalan",
      "Mabuhay",
      "Malangas",
      "Naga",
      "Olutanga",
      "Payao",
      "Roseller Lim",
      "Siay",
      "Talusan",
      "Titay",
      "Tungawan"
    ]
  }
];

const selectedCities = ref<string | null>(null);

// Filter cities based on selected province
const filteredCities = computed(() => {
  const province = cities.find(c => c.province === selectedProvince.value);

  return province ? province.cities : [];
});

// Reset selected city when province changes
watch(selectedProvince, () => {
  selectedCities.value = null;
});

// Reset selected province when region changes
watch(selectedRegion, () => {
  selectedProvince.value = null;
  selectedCities.value = null;
});

onMounted(fetchUser);
</script>
