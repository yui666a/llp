<template>
  <div>
    <Header />
    <v-container>
      <h2>TO DO List</h2>
    </v-container>
    <v-container>
      <v-form>
        <v-row align="center">
          <v-col class="d-flex" cols="12" sm="6">
            <v-text-field v-model="content" label="the thing to do" required>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col class="d-flex" cols="12" sm="6">
            <v-select
              v-model="selectCat"
              :items="cats"
              label="Category"
              style="width: 250px"
              required
            >
            </v-select>
          </v-col>
          <v-col class="d-flex" cols="12" sm="6">
            <v-btn class="primary" @click="insert">ADD</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>

    <v-container>
      <div class="filter">
        <v-row align="center" class="mb-6">
          <!-- <v-col
            v-for="state in status"
            :key="state.name"
            class="pa-2"
            cols="auto"
          >
            <v-btn text elevation="0">{{ state }}</v-btn>
          </v-col> -->
          <v-col class="pa-2" cols="auto">
            <v-btn text elevation="0" @click="flag_reset">ALL</v-btn>
            <v-btn text elevation="0" @click="find('OPEN')">OPEN</v-btn>
            <v-btn text elevation="0" @click="find('IN PROGRESS')">
              IN PROGRESS
            </v-btn>
            <v-btn text elevation="0" @click="find('RESOLVED')">RESOLVED</v-btn>
            <v-btn text elevation="0" @click="find('COMPLETED')"
              >COMPLETED</v-btn
            >
          </v-col>
        </v-row>
      </div>
    </v-container>
    <v-container>
      <v-simple-table fixed-header height="400px">
        <div>
          <thead>
            <tr>
              <th class="text-left">TO DO</th>
              <!-- <th class="text-left">REGISTERED</th> -->
              <th class="text-left">CATEGORY</th>
              <th class="text-left">STATUS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="todo in display_todos" :key="todo.name">
              <td>{{ todo.content }}</td>
              <!-- <td>{{ todo.created }}</td> -->
              <td>
                <v-btn outlined>{{ todo.cats }}</v-btn>
              </td>
              <td>
                <v-btn
                  outlined
                  :class="{
                    openbtn: todo.status === 'OPEN',
                    progressbtn: todo.status === 'IN PROGRESS',
                    resolvebtn: todo.status === 'RESOLVED',
                    completebtn: todo.status === 'COMPLETED',
                  }"
                  @click="changeState(todo)"
                >
                  {{ todo.status }}
                </v-btn>
              </td>
              <td>
                <v-btn outlined color="error" @click="remove(todo)">
                  DELETE
                </v-btn>
              </td>
            </tr>
          </tbody>
        </div>
      </v-simple-table>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: '',
      selectCat: '',
      cats: ['やりたいこと', 'やること', 'TASK', 'BUG', 'ORDER', 'OTHER'],
      status: ['ALL', 'OPEN', 'IN PROGRESS', 'RESOLVED', 'COMPLETED'],
      find_status: '',
      find_flg: false,
    }
  },
  computed: {
    display_todos() {
      if (this.find_flg) {
        const arr = []
        const data = this.$store.state.todo.todoList
        data.forEach((element) => {
          if (element.status === this.find_status) {
            arr.push(element)
          }
        })
        return arr
      } else {
        return this.$store.state.todo.todoList
      }
    },
    todos() {
      return this.$store.state.todo.todoList
    },
  },
  methods: {
    find(findStatus) {
      this.find_status = findStatus
      this.find_flg = true
    },
    flag_reset() {
      this.find_flg = false
    },

    insert() {
      if (this.content !== '') {
        this.$store.commit('todo/insert', {
          content: this.content,
          cats: this.selectCat,
        })
        this.content = ''
        this.selectCat = ''
      }
    },
    remove(todo) {
      this.$store.commit('todo/remove', todo)
    },
    changeState(todo) {
      this.$store.commit('todo/changeState', todo)
    },
  },
}
</script>

<style scoped>
.openbtn {
  color: #e91e63;
}

.progressbtn {
  color: #2196f3;
}

.resolvebtn {
  color: #3f51b5;
}

.completebtn {
  color: #009688;
}
</style>
