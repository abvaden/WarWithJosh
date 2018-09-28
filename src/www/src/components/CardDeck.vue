<template>
    <h1 style="foreground: white;">This is a card deck</h1>
</template>

<script lang="ts">
import { StaticGameState } from "@/logic/models/gamestate"
import { container } from "@/main";
import { ICommandPublisher, ICommandPublisher_IOC_Key } from '@/logic/commanding';

let commandPublisher: ICommandPublisher;

export default {
  beforeCreate: () => {
    commandPublisher = container.get<ICommandPublisher>(ICommandPublisher_IOC_Key);
  },
  data() {
  },
  methods: {
      doNothing: () => {

      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
