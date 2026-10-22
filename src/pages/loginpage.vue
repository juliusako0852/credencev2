<template>
  <q-layout
    view="lHh Lpr lFf"
    style="background-image: linear-gradient(to bottom, #1a898b, black)"
  >
    <div style="width: auto; height: 45vh"> </div>
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
          width: auto;
          height: 10%;
          text-align: center;
          justify-content: center;
          align-items: center;
          font-size: 30pt;
          color: #0e494a;
          font-weight: bolder;
          margin-bottom: 20pt;
        "
        >Log In</div
      >
      <div style="width: auto; margin-bottom: 10pt">
        <q-field standout="bg-teal text-white" label="Email"> </q-field>
      </div>
      <div style="width: auto; margin-bottom: 10pt">
        <q-field standout="bg-teal text-white" label="Password"> </q-field>
      </div>
    </div>
  </q-layout>
</template>
