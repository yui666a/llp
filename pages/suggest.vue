<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat>
          <!-- <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Today
          </v-btn> -->
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small> mdi-chevron-left </v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small> mdi-chevron-right </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </v-sheet>
      <div class="select-button-wrapper">
        <div class="select-button-text">どのプランを選択しますか？</div>
        <v-btn class="select-plan-button" @click="confirmPlan('plan1')">
          提案１
        </v-btn>
        <v-btn class="select-plan-button" @click="confirmPlan('plan2')">
          提案２
        </v-btn>
        <v-btn class="select-plan-button" @click="confirmPlan('plan3')">
          提案３
        </v-btn>
      </div>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          type="category"
          category-show-all
          :categories="categories"
          :events="events"
          :event-color="getEventColor"
        ></v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import moment from 'moment'

export default {
  data: () => ({
    focus: '',
    events: [],
    plan1: [
      {
        name: '部屋の掃除',
        start: '2022-07-30 8:00',
        end: '2022-07-30 9:00',
      },
      {
        name: 'ティッシュの買い出し',
        start: '2022-07-30 12:00',
        end: '2022-07-30 12:30',
      },
      {
        name: '公園に行く',
        start: '2022-07-30 12:30',
        end: '2022-07-30 13:30',
      },
    ],
    plan2: [
      {
        name: '部屋の掃除',
        start: '2022-07-30 8:00',
        end: '2022-07-30 9:00',
      },
      {
        name: '公園に行く',
        start: '2022-07-30 12:00',
        end: '2022-07-30 13:00',
      },
    ],
    plan3: [
      {
        name: '公園に行く',
        start: '2022-07-30 8:00',
        end: '2022-07-30 9:00',
      },
      {
        name: 'ラーメン食べに行きたい',
        start: '2022-07-30 12:00',
        end: '2022-07-30 13:00',
      },
    ],
    colors: [
      'blue',
      'indigo',
      'deep-purple',
      'cyan',
      'green',
      'orange',
      'grey darken-1',
    ],
    names: [
      'Meeting',
      'Holiday',
      'PTO',
      'Travel',
      'Event',
      'Birthday',
      'Conference',
      'Party',
    ],
    categories: ['提案1', '提案2', '提案3'],
  }),
  mounted() {
    this.$refs.calendar.checkChange()
    const environment = process.env.NODE_ENV || 'local'
    const env = require(`../env/${environment}.ts`)
    // this.base = env.BASE_URL

    if (this.$store.state.calendar.calendars.length === 0) {
      // this.$store.dispatch('calendar/fetchCalendars')
      console.log('カレンダーなし')
      this.getData(`${env.BASE_URL}sakai.ics`, 'blue')
      // this.getData(`${env.BASE_URL}ilias.ics`, 'purple', false)
      // this.getData(`${env.BASE_URL}aiso.ics`, 'blue', true)
      // this.getData(`${env.BASE_URL}work.ics`, 'yellow', true)
      // this.getData(`${env.BASE_URL}school.ics`, 'green', true)
    } else {
      this.events = this.$store.state.calendar.calendars
    }

    this.thinkPlan1()
    this.thinkPlan2()
    this.thinkPlan3()
  },
  methods: {
    thinkPlan(category, basePlan) {
      let plan = basePlan
      plan = plan.map((p) => {
        p.category = category
        p.color = 'grey'
        return p
      })
      this.events.push(...plan)
    },
    thinkPlan1() {
      this.thinkPlan('提案1', this.plan1)
    },
    thinkPlan2() {
      this.thinkPlan('提案2', this.plan2)
    },
    thinkPlan3() {
      this.thinkPlan('提案3', this.plan3)
    },
    confirmPlan(plan) {
      // console.log(plan)
      let data = []
      switch (plan) {
        case 'plan1':
          data = this.plan1
          break
        case 'plan2':
          data = this.plan2
          break
        case 'plan3':
          data = this.plan3
          break
      }
      data.forEach((d) => {
        this.$store.commit('calendar/insert', { ...d, color: 'blue' })
      })
      this.$router.push('/calendar')
    },
    getEventColor(event) {
      return event.color
    },
    setToday() {
      this.focus = ''
    },
    prev() {
      this.$refs.calendar.prev()
    },
    next() {
      this.$refs.calendar.next()
    },
    async getData(icsFile, color) {
      // async getData(icsFile, color, needOffset) {
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

          let eventObj = {}
          // if (!needOffset || startStr.includes('TZID=Asia/Tokyo')) {
          //   const start = moment(startStr, 'YYYYMMDDHHmmss')
          //   const end = moment(
          //     event.split('DTEND')[1].split('\n')[0],
          //     'YYYYMMDDHHmmss'
          //   )
          //   eventObj = {
          //     name,
          //     start: start.format('YYYY-MM-DD HH:mm'),
          //     end: end.format('YYYY-MM-DD HH:mm'),
          //     color,
          //   }
          // } else {
          const start = moment(startStr, 'YYYYMMDDHHmmss').add(9, 'hours')
          const end = moment(
            event.split('DTEND')[1].split('\n')[0],
            'YYYYMMDDHHmmss'
          ).add(9, 'hours')
          eventObj = {
            name,
            start: start.format('YYYY-MM-DD HH:mm'),
            end: end.format('YYYY-MM-DD HH:mm'),
            color,
          }
          // }
          this.events.push({ ...eventObj, category: '提案1' })
          this.events.push({ ...eventObj, category: '提案2' })
          this.events.push({ ...eventObj, category: '提案3' })

          // /* オブジェクトをソート済み配列に変換する */
          // const objToSortedArray = (obj) => Object.entries(obj).sort()

          // /* ソート済み配列を文字列に変換して比較する */
          // const isEqualOneDimentionalArray = (obj1, obj2) =>
          //   JSON.stringify(objToSortedArray(obj1)) ===
          //   JSON.stringify(objToSortedArray(obj2))

          // /* 再帰処理を行い、ネストされたオブジェクトまで比較する */
          // const isEqual = (obj1, obj2) =>
          //   isEqualOneDimentionalArray(obj1, obj2) &&
          //   objToSortedArray(obj1).map(([key, val]) =>
          //     typeof val === 'object' ? isEqual(val, obj2[key]) : true
          //   )
          // if (isEqual(initialState, state)){}

          // storeに保存
          this.$store.commit('calendar/insert', { ...eventObj })
        }
      })
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
  },
}
</script>

<style lang="scss">
.v-calendar-category {
  &__columns &__column-header {
    min-width: 85px !important;
  }
  .v-calendar-daily__day {
    min-width: 85px;
  }
  .v-calendar-daily__intervals-body {
    width: 47px !important;
  }
  .v-calendar-daily__intervals-head {
    width: 47px !important;
  }
}
.select-button-text {
  width: 100%;
}
.select-button-wrapper {
  flex-wrap: wrap;
  display: flex;
  justify-content: flex-end;
  .select-plan-button {
    margin: 2px;
  }
}
</style>
