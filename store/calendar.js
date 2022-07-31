export const state = () => ({
  calendars: [],
})

export const mutations = {
  insert(state, obj) {
    state.calendars.unshift({ ...obj })
  },
}
