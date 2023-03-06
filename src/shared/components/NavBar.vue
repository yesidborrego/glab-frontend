<template>
  <nav
    class="navbar navbar-expand-sm m-0 navbar-dark bg-primary px-sm-3 px-lg-5 font-14 rounded"
  >
    <div class="container-fluid">
      <BrandNavbar />
      <BtnHamburguer />
      <MenuNavbar :links="RouterLinks" :isAuth="isAuth" :logout="logout" />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLinks } from "@/router/links-router";
import { useNavbar } from "../composables/useNavbar";
import BrandNavbar from "./BrandNavbar.vue";
import BtnHamburguer from "./BtnHamburguer.vue";
import MenuNavbar from "./MenuNavbar.vue";
const { isAuth, logout } = useNavbar();
</script>

<style scoped>
.font-14 {
  font-size: 14px;
}
</style>
