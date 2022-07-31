<template>
  <v-row>
    <v-col class="text-center">
      <div class="select-button-wrapper">
        <v-btn @click="onclickTypeButton('month')"> 月 </v-btn>
        <v-btn @click="onclickTypeButton('week')"> 週 </v-btn>
        <v-btn @click="onclickTypeButton('4day')"> 4日 </v-btn>
        <v-btn @click="onclickTypeButton('day')"> 日 </v-btn>
      </div>
      <div class="select-button-wrapper">
        <v-btn icon @click="$refs.calendar.prev()">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-btn icon @click="$refs.calendar.next()">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
      <v-calendar
        ref="calendar"
        v-model="value"
        :type="type"
        :events="events"
        :event-color="getEventColor"
      />
      <!--@change="changeColor"
       @change="fetchEvents" :event-color="getEventColor" @change="getEvents" -->
    </v-col>
  </v-row>
</template>

<script>
import moment from 'moment'

export default {
  name: 'CalendarPage',
  data() {
    return {
      value: moment().format('yyyy-MM-DD'), // 現在日時
      events: [
        {
          name: '打合せ',
          start: '2022-07-29',
          end: '2022-07-30',
        },
      ],
      // type: 'month',
      type: '4day',
    }
  },
  computed: {
    title() {
      return moment(this.value).format('yyyy年 M月 D日') // 表示用文字列を返す
    },
  },

  mounted() {
    // this.init()
    const environment = process.env.NODE_ENV || 'local'
    const env = require(`../env/${environment}.ts`)
    // this.base = env.BASE_URL

    this.getData(`${env.BASE_URL}ilias.ics`, 'purple')
    this.getData(`${env.BASE_URL}aiso.ics`, 'blue')
    this.getData(`${env.BASE_URL}work.ics`, 'yellow')
    this.getData(`${env.BASE_URL}school.ics`, 'green')
    // this.asyncData()
  },
  methods: {
    getEventColor(event) {
      return event.color
    },

    async getData(icsFile, color) {
      const res = await this.$axios.$get(icsFile)
      res.split('BEGIN:VEVENT').forEach((item) => {
        if (item.includes('END:VEVENT')) {
          const event = item.split('END:VEVENT')[0]
          const name = event.split('SUMMARY:')[1].split('\n')[0]
          const startStr = event
            .split('DTSTART')[1]
            .split('\n')[0]
            // .replace(/([a-zA-Z])/g, '')
            .replace(/[^0-9]/g, '')

          let year = startStr.substring(0, 4)
          let month = startStr.substring(4, 6)
          let day = startStr.substring(6, 8)
          let start = year + '-' + month + '-' + day
          if (startStr.length !== 8) {
            const hour = startStr.substring(8, 10)
            const min = startStr.substring(10, 12)
            start = year + '-' + month + '-' + day + ' ' + hour + ':' + min
          }

          const endStr = event
            .split('DTEND')[1]
            .split('\n')[0]
            // .replace(/([a-zA-Z])/g, '')
            .replace(/[^0-9]/g, '')
          year = endStr.substring(0, 4)
          month = endStr.substring(4, 6)
          day = endStr.substring(6, 8)
          let end = year + '-' + month + '-' + day
          if (endStr.length !== 8) {
            const hour = endStr.substring(8, 10)
            const min = endStr.substring(10, 12)
            end = year + '-' + month + '-' + day + ' ' + hour + ':' + min
          }

          this.events.push({
            name,
            start,
            end,
            color,
          })
        }
      })
    },
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

.select-button-wrapper {
  margin-bottom: 5px;
  display: flex;
}
</style>
