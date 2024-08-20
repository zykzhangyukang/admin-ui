export default {
    namespaced: true, state: {
        messageList: [], noRead: 0,
    }, getters: {}, mutations: {
        addUserMsg(state, msg) {
            state.messageList.unshift(msg);
            state.noRead += 1
            if (state.messageList.length > 10) {
                state.messageList = this.state.messageList.slice(0, 10)
            }
        }
    }, actions: {}
}
