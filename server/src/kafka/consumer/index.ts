import { kafka } from "../../utils/functions";

export async function intiKafkaConsumer() {
  const consumer = kafka.consumer({
    groupId: "instagram-clone-1",
  });
  await consumer.connect();
  await consumer.subscribe({
    topics: ["messages", "notifications"],
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async function ({ message, topic, partition }) {
      switch (topic) {
        case "messages":
          console.log("new message", message.value?.toString(), partition);
          break;
        case "notifications":
          console.log("new notifications", message.value, partition);
          break;
        default:
          console.log(topic);
          break;
      }
    },
  });
  console.log("Init kafka consumer done.");
}
