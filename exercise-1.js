import { MongoClient } from "mongodb";

const connectionString = "mongodb://127.0.0.1:27017";
const client = new MongoClient(connectionString, {
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    await findMovies();
    await findCreditCard();
    await findPizzaSize();
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

run();

//ใช้ findOne ในการหาข้อมูล Document ของลูกค้าชื่อ Cherlyn
async function findMovies() {
  const db = client.db("practice-mongo");
  const collection = db.collection("pizzaOrders");

  const movie = await collection.findOne({ customer_name: "Cherlyn" });
  console.log(movie);
}

findMovies();

//ใช้ find ในการหาข้อมูล Document ทั้งหมดที่จ่ายเงินด้วย Credit Card ของ mastercard
async function findCreditCard() {
  const db = client.db("practice-mongo");
  const collection = db.collection("pizzaOrders");

  const creditCards = await collection
    .find({ credit_card_type: "mastercard" })
    .toArray();
  console.log(creditCards);
}

//ใช้ find ในการหาข้อมูล Document ทั้งหมดที่สั่ง Pizza ขนาด medium โดย Limit จำนวนข้อมูลแค่ 5 Documents
async function findPizzaSize() {
  const db = client.db("practice-mongo");
  const collection = db.collection("pizzaOrders");

  const creditCards = await collection
    .find({ size: "medium" })
    .limit(5)
    .toArray();
  console.log(creditCards);
}
