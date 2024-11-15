import { MongoClient } from "mongodb";

const connectionString = "mongodb://127.0.0.1:27017";
const client = new MongoClient(connectionString, {
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    await findQuantityLessFiveAndMasterCard();
    await findQuantityBetweenOneFive();
    await findQuantityMoreThanTenNotCreditCard();
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

run();

//ให้ Query ข้อมูล Document ทั้งหมดที่มีการสั่งจำนวน Pizza น้อยกว่า 5 ถาด และจ่ายเงินด้วย Credit Card ของ mastercard
async function findQuantityLessFiveAndMasterCard() {
  const db = client.db("practice-mongo");
  const collection = db.collection("pizzaOrders");

  const result = await collection
    .find({ quantity: { $lt: 5 } }, { credit_card_type: "mastercard" })
    .toArray();
  console.log(result);
}
//Query ข้อมูล Document ทั้งหมดที่สั่งซื้อ Pizza ขนาดเล็ก และมีจำนวนถาดอยู่ระหว่าง 1 - 5 ถาด
async function findQuantityBetweenOneFive() {
  const db = client.db("practice-mongo");
  const collection = db.collection("pizzaOrders");

  const result = await collection
    .find({ size: "small" }, { quantity: { $gte: 1, $lte: 5 } })
    .toArray();
  console.log(result);
}

//Query ข้อมูล Document ทั้งหมดที่มีการสั่ง Pizza จำนวนมากกว่า 10 ถาด และไม่ได้จ่ายเงินด้วย Credit Card
async function findQuantityMoreThanTenNotCreditCard() {
  const db = client.db("practice-mongo");
  const collection = db.collection("pizzaOrders");

  const result = await collection
    .find({
      quantity: { $gt: 10 },
      credit_card_type: { $ne: "mastercard" },
    })
    .toArray();

  console.log(result);
}
