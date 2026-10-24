<template>
  <q-page>
    <div class="qr-code-page" style="width: 100%; height: 100%; width: 100%">
      <div
        class="qr-code-text"
        style="
          height: 30px;
          width: auto;
          border-radius: 10px;
          margin: 10pt;
          margin-left: 20pt;
          font-size: 20pt;
          font-weight: bold;
          color: white;
          display: flex;
          text-align: center;
          align-items: center;
        "
      >
        QR Code
      </div>
      <div
        class="basic-info"
        style="
          background-color: white;
          height: 400px;
          width: auto;
          border-radius: 10px;
          margin-top: 10pt;
          margin-left: 20pt;
          margin-right: 20pt;
        "
      >
        <div class="qr-panel"> </div>
        <div class="qr-buttons"> </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
//
</script>
