import { kafka } from "../../utils/functions";
import readline from "readline";
import { Producer } from "kafkajs";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export let producer: null | Producer = null;

export async function intiKafkaProducer() {
  const producerInc = kafka.producer();
  await producerInc.connect();
  producer = producerInc;
  console.log("Init kafka producer done.");
}

export async function produceMessage(payload: {
  from: string;
  to: string;
  message: string;
}) {
  if (!producer) {
    await intiKafkaProducer();
  }
  await producer?.send({
    topic: "messages",
    messages: [
      {
        // partition: 1,
        key: "message",
        value: JSON.stringify({
          ...payload,
          createAt: new Date(),
        }),
      },
    ],
  });
}

export async function produceNotification(payload: any) {
  if (!producer) {
    await intiKafkaProducer();
  }
  await producer?.send({
    topic: "notifications",
    messages: [
      {
        // partition: / 1,
        key: "notification",
        value: JSON.stringify({
          message: "",
        }),
      },
    ],
  });
}
