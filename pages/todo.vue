<template>
  <div>
    <Header />
    <v-container class="page-title">
      <h2>やることリスト</h2>
      <v-btn icon @click.stop="isDisplayedAddWindow = !isDisplayedAddWindow">
        <v-icon v-if="!isDisplayedAddWindow">mdi-plus-circle-outline</v-icon>
        <v-icon v-else>mdi-close-circle-outline</v-icon>
      </v-btn>
    </v-container>
    <v-container v-if="isDisplayedAddWindow">
      <v-form>
        <v-row align="center">
          <v-col class="d-flex" cols="12" sm="6">
            <v-text-field
              v-model="content"
              label="やること・やりたいこと"
              required
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col class="d-flex" cols="12" sm="6">
            <v-select
              v-model="selectCat"
              :items="category"
              label="カテゴリー"
              style="width: 250px"
              required
            >
            </v-select>
          </v-col>
          <v-col class="d-flex" cols="12" sm="6">
            <v-btn class="primary" @click="insert">追加</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>

    <v-container v-if="isDisplayedFilterWindow">
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
    <!-- <v-container>
      <v-simple-table fixed-header class="todo-table-wrapper" height="200px">
        <h3>やること</h3>
        <div>
          <thead>
            <tr>
              <th class="text-left">項目</th>
              <th class="text-left">REGISTERED</th>
              <th class="text-left">CATEGORY</th>
              <th class="text-left">STATUS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="todo in displayHaveToDos" :key="todo.name">
              <td>{{ todo.content }}</td>
              <td>{{ todo.created }}</td>
              <td>
                <v-btn outlined>{{ todo.category }}</v-btn>
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
    </v-container> -->
    <v-container fixed-header class="todo-table-wrapper">
      <h3>やること</h3>
      <div v-for="todo in displayHaveToDos" :key="todo.name">
        <v-checkbox v-model="checkbox" :label="todo.content"></v-checkbox>
      </div>
    </v-container>

    <v-container fixed-header class="todo-table-wrapper">
      <h3>やりたいこと</h3>
      <div v-for="todo in displayWantToDos" :key="todo.name">
        <v-checkbox v-model="checkbox" :label="todo.content"></v-checkbox>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDisplayedAddWindow: true,
      isDisplayedFilterWindow: false,
      content: '',
      selectCat: '',
      category: ['やること', 'やりたいこと'],
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
    displayWantToDos() {
      const data = this.$store.state.todo.todoList
      console.log(data)
      return data.filter((element) => element.category === 'やりたいこと')
    },
    displayHaveToDos() {
      const data = this.$store.state.todo.todoList
      return data.filter((element) => element.category === 'やること')
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
          category: this.selectCat,
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
.page-title {
  display: flex;
  justify-content: space-between;
}

.todo-table-wrapper {
  margin-bottom: 1rem;
}

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
