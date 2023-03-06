<template>
  <div>
    <header>
      <NavBar />
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from "@/shared/components/NavBar.vue";
</script>

<style scoped></style>
