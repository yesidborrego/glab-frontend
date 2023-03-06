<template>
  <div
    class="collapse navbar-collapse d-sm-flex justify-content-between"
    id="navbarNav"
  >
    <ul class="navbar-nav">
      <li class="nav-item d-sm-flex">
        <RouterLink
          v-for="link of props.links"
          :key="link.name"
          class="nav-link"
          aria-current="page"
          :to="{ name: link.name }"
        >
          {{ link.title }}
        </RouterLink>
      </li>
    </ul>
    <ul class="navbar-nav" v-if="isAuth">
      <li class="btn btn-outline-light btn-sm btn-logout" @click="logout">
        Logout
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import type { ILinkRoutes } from "@/interfaces/links-routes";
interface Props {
  links: ILinkRoutes[];
  isAuth: boolean;
  logout: () => void;
}
const props = defineProps<Props>();
</script>

<style scoped>
.btn-logout {
  font-size: 12px;
  font-weight: bold;
}

.btn-logout:hover {
  background-color: #dc3545;
  border: 1px solid #dc3545;
  color: #fff;
}
</style>
