<template>
  <div class="ticket">
    <h2>Ticket</h2>
    <Loading v-if="remoteDataBusy" />
    <div class="empty" v-else-if="!ticket">
      Ticket not found.
    </div>
    <template v-else>
      <!-- General info -->
      <section class="infos">
        <div class="info">
          Created on <strong>{{ ticket.date | date }}</strong>
        </div>
        <div class="info">
          Author <strong>{{ ticket.user.username }}</strong>
        </div>
        <div class="info">
          Status <span class="badge">{{ ticket.status }}</span>
        </div>
      </section>
      <!-- Content -->
      <section class="content">
        <h3>{{ ticket.title }}</h3>
        <p>{{ ticket.description }}</p>
      </section>
    </template>
  </div>
</template>

<script>
import RemoteData from '../minxis/RemoteData'

export default {
  mixins: [
    RemoteData({
      ticket () {
        return `ticket/${this.id}`
      },
    })
  ],
  props: {
    id: { //将从服务器获取工单详情的工单ID,服务器以/ticket/<id＞ 的形式提供动态路由， 其中<id>就是工单的ID
      type: String,
      required: true,
    },
  },
}
</script>
