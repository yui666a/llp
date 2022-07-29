export const state = () => ({
  todoList: [
    // {
    //   content: 'テスト',
    //   created: '2021-06-15 17:00',
    //   category: 'task',
    //   status: '作業前',
    // },
  ],
  option: [
    { id: 0, label: 'OPEN' },
    { id: 1, label: 'IN PROGRESS' },
    { id: 2, label: 'RESOLVED' },
    { id: 3, label: 'COMPLETED' },
  ],
})

export const mutations = {
  insert(state, obj) {
    // Mon Jun 21 2021 11:32:57 GMT+0900 (日本標準時)
    const d = new Date()
    const fmt =
      d.getFullYear() +
      '-' +
      ('00' + (d.getMonth() + 1)).slice(-2) +
      '-' +
      ('00' + d.getDate()).slice(-2) +
      '-' +
      ('00' + d.getHours()).slice(-2) +
      '-' +
      ('00' + d.getMinutes()).slice(-2)
    state.todoList.unshift({
      content: obj.content,
      created: fmt,
      cats: obj.cats,
      status: 'OPEN',
    })
  },
  remove(state, obj) {
    for (let i = 0; i < state.todoList.length; i++) {
      const ob = state.todoList[i]
      if (ob.content === obj.content && ob.created === obj.created) {
        if (confirm('Are you sure to delete "' + ob.content + '" ?')) {
          state.todoList.splice(i, 1)
          return
        }
      }
    }
  },
  changeState(state, obj) {
    // todoListの中から該当のtodoを探して
    for (let i = 0; i < state.todoList.length; i++) {
      const ob = state.todoList[i]
      if (
        ob.content === obj.content &&
        ob.created === obj.created &&
        ob.status === obj.status
      ) {
        // 現在のstatus idを割り振る
        let nowState
        for (let j = 0; j < state.option.length; j++) {
          if (state.option[j].label === ob.status) {
            nowState = state.option[j].id
          }
        }
        // 現在＋1のid statusにチェンジ
        nowState++
        // idの最後でidを振り出し（0）に
        if (nowState >= state.option.length) {
          nowState = 0
        }
        // idのラベルを表示
        obj.status = state.option[nowState].label
        return
      }
    }
  },
}
