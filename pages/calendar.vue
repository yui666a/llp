<template>
  <v-row>
    <v-col class="text-center">
      <v-btn @click="onclickTypeButton('month')"> 月 </v-btn>
      <v-btn @click="onclickTypeButton('week')"> 週 </v-btn>
      <v-btn @click="onclickTypeButton('day')"> 日 </v-btn>
      <v-spacer />
      <v-calendar
        ref="calendar"
        :type="type"
        :events="events"
        @change="changeColor"
      />
      <!-- @change="fetchEvents" :event-color="getEventColor" @change="getEvents" -->
    </v-col>
  </v-row>
</template>

<script>
const jsonpAdapter = require('axios-jsonp')

export default {
  name: 'CalendarPage',
  data() {
    return {
      events: [
        {
          name: '打合せ',
          start: '2022-07-29 09:00',
          end: '2022-07-29 12:00',
        },
        {
          name: '打合せ',
          start: '2022-07-29 09:00',
          end: '2022-07-29 12:00',
        },
      ],
      type: 'month',
    }
  },
  mounted() {
    this.getData()
    // this.asyncData()
  },
  methods: {
    async getData() {
      const res = await this.$axios.$get('/basic.ics')
      console.log(res)
    },
    // async asyncData() {
    //   const mockAdapter = function mockAdapter() {
    //     return new Promise(function (resolve) {
    //       const res = {
    //         data: 'HOGE',
    //         status: 200,
    //       }
    //       resolve(res)
    //     })
    //   }

    //   const response = await this.$axios.$get(
    //     'https://calendar.google.com/calendar/ical/nqbvi1bi1gs38of5k1sjj7ijvg%40group.calendar.google.com/private-721ada7985bea7ab3480a4c7d165e2cc/basic.ics',
    //     // 'https://cera-e1.nagaokaut.ac.jp/ilias/calendar.php?client_id=contents1&token=f64945fb5d36d84f2fe5e3ffabb55eff',
    //     {
    //       headers: {
    //         'Content-Type': 'text/calendar',
    //         Accept: 'text/calendar',
    //         'Access-Control-Allow-Origin': '*',
    //       },
    //       responseType: 'text',
    //       adapter: jsonpAdapter,
    //     }
    //   )
    // },
    onclickTypeButton(event) {
      this.type = event
    },
    confirmCondition() {
      // TODO: ここにDB登録処理を書く
      this.$router.push('/')
    },
    changeColor() {
      setTimeout(() => {
        const dayList = Array.from(
          this.$refs.calendar.$vnode.elm.getElementsByClassName(
            'v-calendar-weekly__week'
          )
        )
        dayList.map((el) => {
          el.children[0].classList.add('sunday')
          el.children[6].classList.add('saturday')
          return null
        })

        // 週表示
        const hourList = Array.from(
          this.$refs.calendar.$vnode.elm.getElementsByClassName(
            'v-calendar-daily__day-container'
          )
        )
        hourList.map((el) => {
          el.children[1].classList.add('sunday')
          el.children[7].classList.add('saturday')
          return null
        })
      }, 200)
    },
    // fetchEvents({ start, end }) {
    //   const events = []

    //   const min = new Date(`${start.date}T00:00:00`)
    //   const max = new Date(`${end.date}T23:59:59`)
    //   const days = (max.getTime() - min.getTime()) / 86400000
    //   const eventCount = this.rnd(days, days + 20)

    //   for (let i = 0; i < eventCount; i++) {
    //     const allDay = this.rnd(0, 3) === 0
    //     const firstTimestamp = this.rnd(min.getTime(), max.getTime())
    //     const first = new Date(firstTimestamp - (firstTimestamp % 900000))
    //     const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
    //     const second = new Date(first.getTime() + secondTimestamp)

    //     events.push({
    //       name: this.names[this.rnd(0, this.names.length - 1)],
    //       start: first,
    //       end: second,
    //       color: this.colors[this.rnd(0, this.colors.length - 1)],
    //       timed: !allDay,
    //       category: this.categories[this.rnd(0, this.categories.length - 1)],
    //     })
    //   }

    //   this.events = events
    // },
  },
}
</script>
<style>
.saturday {
  background: rgb(0 0 255 / 10%);
}

.sunday {
  background: rgb(255 0 0 / 10%);
}
</style>
