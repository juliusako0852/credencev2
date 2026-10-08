<template>
  <q-layout
    view="lHh Lpr lFf"
    style="
      background-image: linear-gradient(to bottom, #1a898b, #156c6d, white);
    "
  >
    <div class="header1"> </div>
    <q-header style="background-color: white; height: 70px">
      <div
        class="top-bar1"
        style="
          text-align: center;
          height: 100%;
          align-items: center;
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
              style="height: 60px"
            />
          </q-toolbar-title>
        </q-toolbar>
      </div>
    </q-header>

    <q-footer
      elevated
      style="
        background-color: #156c6d;
        height: 60px;
        width: 100%;
        padding-left: 10%;
        padding-right: 10%;
      "
    >
      <q-toolbar
        style="
          align-items: center;
          text-align: center;
          justify-content: space-around;
          display: flex;
        "
      >
        <q-btn
          flat
          dense
          round
          style="color: white"
          icon="home"
          aria-label="home"
          @click="toggleLeftDrawer"
        />

        <q-btn
          flat
          dense
          round
          style="color: white"
          icon="wallet"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-btn
          flat
          dense
          round
          style="color: white"
          icon="report"
          aria-label="Report"
          @click="toggleLeftDrawer"
        />

        <q-btn
          flat
          dense
          round
          style="color: white"
          icon="person"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
      </q-toolbar>
    </q-footer>

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
