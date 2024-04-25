const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input"); // npm i input

const apiId = 28728509 ;
const apiHash = "04544714c9533cc2bb48879c612ddf90";
const stringSession = new StringSession("1AQAOMTQ5LjE1NC4xNzUuNTIBu4mtXRPbSY7d2JKG7RqQDr8WObFZZNHlu5F0EM76Nk4IzrLXQe+m7dhucaH6ZiU3Cg2oRNtmsMWRmPvJTUSCSWW2U1Etkpa8rCDOYWV3MEWkgXcWZ6+c8n0N4fVYQERGqccd9EYxt++steCJZmwbrzHZ35ykDunFkG2KDEPv20izoCGeJrAG/X11NMvk01MkN4eKcEocIENqcUUvoP7z1dMaIU2ilsJiMNbqXKNo6klRcnFtuTEWHlqYKZV4saDWSwIH6txMwiWQ3NV9hQjoujhu1N6tAqJK/7O8pxxpXlAEzwchRoxMBYLNy8UBSUq4KeBC0Xj72rI2bTG3Jsq9YHY="); // fill this later with the value from session.save()

(async () => {
  console.log("Loading interactive example...");
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  await client.start({
    phoneNumber: async () => await input.text("Please enter your number: "),
    password: async () => await input.text("Please enter your password: "),
    phoneCode: async () =>
      await input.text("Please enter the code you received: "),
    onError: (err) => console.log(err),
  });
  console.log("You should now be connected.");
  console.log(client.session.save()); // Save this string to avoid logging in again
  
  const result = await client.invoke(
    new Api.channels.GetMessages({
      channel: "citycouponmom",
      id: [399285],
    })
  );
const localState = await client.invoke(
    new Api.updates.GetState({})
  );
  console.log(localState);

// const remoteState = await client.invoke(
//     new Api.updates.GetState({})
//   );
  console.log(result);
})();