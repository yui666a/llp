<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
      <!-- <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn> -->
      <!-- <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn> -->
      <!-- <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn> -->
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <div v-if="displayName">{{ displayName }}さん</div>
      <!-- <v-spacer /> -->
      <!-- <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <!-- <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <v-footer fixed app>
      <!-- <span>&copy; {{ new Date().getFullYear() }}</span> -->
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        class="footer-item"
        router
        exact
      >
        <div color="primary" nuxt :to="`${item.to}`">
          <v-icon>{{ item.icon }}</v-icon>
        </div>
      </v-list-item>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      displayName: localStorage.displayName ? localStorage.displayName : '',
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/',
        },
        // {
        //   icon: 'mdi-chart-bubble',
        //   title: 'Inspire',
        //   to: '/inspire',
        // },
        {
          icon: 'mdi-heart',
          title: 'コンディションの入力',
          to: '/input',
        },
        {
          icon: 'mdi-calendar',
          title: 'カレンダー',
          to: '/calendar',
        },
        {
          icon: 'mdi-chart-areaspline',
          title: 'コンディションのグラフ',
          to: '/condition',
        },
        {
          icon: 'mdi-login-variant',
          title: 'ログイン',
          to: '/login',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'ハリンタ',
    }
  },
  mounted() {
    this.ls_event_handle = window.addEventListener('storage', this.eventMethod)
  },
  // destroyed() {
  //   window.removeEventListener(this.ls_event_handle)
  // },
  methods: {
    eventMethod(event) {
      console.log(event)
      const newVal = event.newValue
      const oldVal = event.oldValue
      switch (event.key) {
        case LOCALSTORAGEKEY1:
          console.log(newVal)
          break

        case LOCALSTORAGEKEY2:
          console.log(oldVal)
          break

        default:
          console.log(event.key)
          break
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#app {
  height: 100vh;
}
.footer-item {
  flex: none;
}
</style>
