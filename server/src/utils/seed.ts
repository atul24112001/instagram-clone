import { produceMessage } from "../kafka/producer";

export const initSeed = () => {
  for (let count = 0; count < 10; count++) {
    setTimeout(async () => {
      await produceMessage({
        from: "Atul",
        to: "Shubhma",
        message: "Hello " + count,
      });
      console.log("Message Produced");
    }, 1000);
  }
};
