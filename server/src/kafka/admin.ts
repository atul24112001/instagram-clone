import { kafka } from "../utils/functions";

export async function initKafkaAdmin() {
  const admin = kafka.admin();
  await admin.connect();

  await admin.createTopics({
    topics: [
      {
        topic: "messages",
        numPartitions: 2,
      },
      {
        topic: "notifications",
        numPartitions: 2,
      },
    ],
  });
  await admin.disconnect();
  console.log("Init kafka admin done.");
}
