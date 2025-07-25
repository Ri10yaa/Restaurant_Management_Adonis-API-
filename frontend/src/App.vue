<script setup lang="ts">
import { RouterView } from 'vue-router'

</script>

<template>
    <notifications position="bottom right" classes="notification"/>
  <RouterView />
</template>

<style>

.notification {
  margin-bottom: 15px;
  margin-right: 10px;
  padding: 10px;
  font-size: 15.5px;
  color: #ffffff;
  border-radius: 4px;
  height: fit-content;
  text-align: center;
  align-content: center;
  background: #00adb5;
  font-weight: bold;

  &.success {
    background: #08b04b;
  }

  &.warn {
    background: #FFC107;
  }

  &.error {
    background: #FF3F33;
  }
}

</style>