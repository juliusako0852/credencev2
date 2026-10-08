<template>
  <q-layout
    view="lHh Lpr lFf"
    style="
      background-image: linear-gradient(to bottom, #1a898b, #156c6d, white);
    "
  >
    <q-header elevated style="background-color: white; height: 250px">
      <div
        class="top-bar1"
        style="
          text-align: center;
          height: 40%;
          align-items: top;
          justify-content: center;
          display: flex;
        "
      >
        <q-toolbar>
          <q-btn
            flat
            dense
            round
            style="color: #37656f"
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer"
          />

          <q-toolbar-title style="color: rgb(55, 101, 111); display: flex">
            <img
              alt="Credence Logo"
              src="~@/assets/credence_logo2.svg"
              style="height: 65px"
            />
          </q-toolbar-title>
        </q-toolbar>
      </div>
      <div
        class="top-bar2"
        style="
          height: 60%;
          background-color: white;
          display: flex;
          text-align: center;
          justify-content: center;
        "
      >
        <q-card
          style="
            margin-top: 5%;
            height: 70%;
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
          <q-card-section style="margin-left: 5%">
            <div class="text-h5">Balance</div>
            <div class="text-h6" style="margin-top: 2%">Php. 100,000.00</div>
          </q-card-section>
        </q-card>
      </div>
    </q-header>

    <

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.label"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import EssentialLink, {
  type EssentialLinkProps
} from "@/components/EssentialLink.vue";

const linksList: EssentialLinkProps[] = [
  {
    label: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev"
  },
  {
    label: "GitHub",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework"
  }
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
