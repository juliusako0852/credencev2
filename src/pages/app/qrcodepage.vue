<template>
  <q-page>
    <div class="qr-code-page">
      <!-- PAGE TITLE -->
      <div class="qr-code-text"> QR Code </div>

      <!-- MAIN CONTAINER -->
      <div class="basic-info">
        <!-- LOADING STATE -->
        <div v-if="loading" class="column items-center q-pa-xl">
          <q-spinner color="primary" size="50px" />

          <div class="text-grey-7 q-mt-md">
            Retrieving user information...
          </div>
        </div>

        <!-- USER INFORMATION AND QR CODE -->
        <div v-else-if="currentUser && qrCode" class="qr-content">
          <!-- USER INFORMATION -->
          <div class="user-info">
            <div class="text-h5 text-weight-bold">
              {{ currentUser.first_name }}
              {{ currentUser.last_name }}
            </div>

            <div class="text-subtitle2 text-grey-7">
              User ID: {{ currentUser.id }}
            </div>
          </div>

          <!-- QR CODE DISPLAY -->
          <div class="qr-image">
            <img :src="qrCode" alt="User QR Code" class="qr-img" />
          </div>

          <div class="text-caption text-grey-7">
            Scan this QR code to identify your Credence account.
          </div>

          <!-- DOWNLOAD BUTTON -->
          <div class="qr-buttons">
            <q-btn
              label="Download QR Code"
              color="teal"
              icon="download"
              unelevated
              @click="downloadQR"
            />
          </div>
        </div>

        <!-- ERROR STATE -->
        <div v-else class="column items-center q-pa-xl">
          <q-icon name="error_outline" color="negative" size="50px" />

          <div class="text-subtitle1 q-mt-md"> Unable to generate QR Code </div>

          <q-btn
            label="Retry"
            color="primary"
            class="q-mt-md"
            @click="fetchCurrentUser"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import QRCode from "qrcode";
import { api } from "../../boot/axios";
import { useQuasar } from "quasar";

// ========================================
// QUASAR
// ========================================

const $q = useQuasar();

// ========================================
// INTERFACES
// ========================================

interface CurrentUser {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
}

// ========================================
// REACTIVE VARIABLES
// ========================================

const currentUser = ref<CurrentUser | null>(null);

const qrCode = ref<string>("");

const loading = ref<boolean>(true);

// ========================================
// GENERATE QR CODE
// ========================================

const generateQR = async () => {
  if (!currentUser.value) return;

  try {
    const userData = {
      user_id: currentUser.value.id,
      first_name: currentUser.value.first_name,
      last_name: currentUser.value.last_name
    };

    const canvas = document.createElement("canvas");

    await QRCode.toCanvas(canvas, JSON.stringify(userData), {
      width: 500,
      margin: 2,
      errorCorrectionLevel: "H"
    });

    canvas.toBlob(blob => {
      if (blob) {
        qrCode.value = URL.createObjectURL(blob);
      }
    }, "image/png");
  } catch (error) {
    console.error("QR generation failed:", error);
  }
};

// ========================================
// FETCH CURRENT AUTHENTICATED USER
// ========================================

const fetchCurrentUser = async () => {
  loading.value = true;
  qrCode.value = "";
  currentUser.value = null;

  try {
    const response = await api.get("users/me/");

    const user: CurrentUser = response.data;

    // Validate user information
    if (!user.id || !user.first_name || !user.last_name) {
      throw new Error("User information is incomplete.");
    }

    // Assign validated user
    currentUser.value = user;

    // Generate QR Code
    const userData = {
      user_id: user.id,
      first_name: user.first_name,
      last_name: user.last_name
    };

    qrCode.value = await QRCode.toDataURL(JSON.stringify(userData), {
      width: 500,
      margin: 2,
      errorCorrectionLevel: "H",
      color: {
        dark: "#000000",
        light: "#FFFFFF"
      }
    });
  } catch (error) {
    console.error("Failed to generate QR Code:", error);

    $q.notify({
      type: "negative",
      message: "Unable to retrieve user information or generate QR Code."
    });
  } finally {
    loading.value = false;
  }
};

// ========================================
// DOWNLOAD QR CODE
// ========================================

const downloadQR = () => {
  if (!qrCode.value || !currentUser.value) {
    return;
  }

  const link = document.createElement("a");

  link.href = qrCode.value;

  link.download = `credence_user_${currentUser.value.id}.png`;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  $q.notify({
    type: "positive",
    message: "QR Code downloaded successfully!",
    position: "top"
  });
};

// ========================================
// LIFECYCLE
// ========================================

onMounted(() => {
  fetchCurrentUser();
});
</script>

<style scoped>
/* ========================================
   PAGE
======================================== */

.qr-code-page {
  width: 100%;
  min-height: 100%;
}

/* ========================================
   PAGE TITLE
======================================== */

.qr-code-text {
  margin: 10pt 20pt;
  font-size: 20pt;
  font-weight: bold;
  color: white;
}

/* ========================================
   MAIN CONTAINER
======================================== */

.basic-info {
  background-color: white;
  min-height: 400px;
  width: auto;
  border-radius: 10px;
  margin: 10pt 20pt;
  padding: 30px 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* ========================================
   QR CONTENT
======================================== */

.qr-content {
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 15px;
}

/* ========================================
   USER INFORMATION
======================================== */

.user-info {
  text-align: center;
  margin-bottom: 5px;
}

/* ========================================
   QR IMAGE CONTAINER
======================================== */

.qr-image {
  width: 280px;
  height: 280px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: white;
  border: 1px solid #eeeeee;
  border-radius: 10px;
  padding: 10px;
}

/* ========================================
   QR IMAGE
======================================== */

.qr-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* ========================================
   BUTTONS
======================================== */

.qr-buttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 10px;
}
</style>
