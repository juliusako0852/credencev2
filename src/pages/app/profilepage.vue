<template>
  <q-page>
    <div class="profile-page" style="width: 100%; height: 100%; width: 100%">
      <div class="page-title-text"> User's Profile </div>
      <div
        class="basic-info"
        style="
          background-color: white;
          height: 220px;
          width: auto;
          border-radius: 10px;
          margin: 10pt;
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

interface User {
  id: number;
  name: string;
  email: string;
  contact: string;
  address: string;
}

// DRF returns a plain array, or { results: [...] } when pagination is enabled
type UsersResponse = User[] | { results: User[] };

const user = ref<User | null>(null);
const loading = ref(true);
const errorMessage = ref("");

const initial = computed(
  () => user.value?.name?.charAt(0).toUpperCase() || "?"
);

onMounted(async () => {
  try {
    // baseURL already ends with /api, so don't repeat it here
    const { data } = await api.get<UsersResponse>("/api/users/");
    const users = Array.isArray(data) ? data : data.results;
    user.value = users.find(u => u.id === 1) ?? null;

    if (!user.value) errorMessage.value = "User not found.";
  } catch (error) {
    console.error("Error fetching users:", error);
    errorMessage.value = "Could not load profile.";
  } finally {
    loading.value = false;
  }
});
</script>
