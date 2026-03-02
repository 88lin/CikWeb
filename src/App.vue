<!--
 * @Description: 根组件
 * @Author: Cik
 * @Date: 2026-02-27
-->

<template>
  <div id="app">
    <HeaderNav />
    <main>
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    <Footer />
    <BackToTop />
  </div>
</template>

<script setup lang="ts">
import HeaderNav from './components/HeaderNav.vue'
import Footer from './components/Footer.vue'
import BackToTop from './components/BackToTop.vue'
</script>

<style lang="scss">
@import './styles/main.scss';
</style>
