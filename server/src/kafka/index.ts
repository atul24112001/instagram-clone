import { initKafkaAdmin } from "./admin";
import { intiKafkaConsumer } from "./consumer";
import { intiKafkaProducer } from "./producer";

export async function initKafka() {
  await initKafkaAdmin();
  await intiKafkaProducer();
  await intiKafkaConsumer();
}

export * from "./producer";
