import { MongoClient } from "mongodb";

const connectionString = "mongodb://127.0.0.1:27017";
const client = new MongoClient(connectionString, {
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    await sortByTotalPrice();
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

run();

//Sort ข้อมูลทั้งหมดด้วย Property total_price จากมากไปน้อย
async function sortByTotalPrice() {
  const db = client.db("practice-mongo");
  const collection = db.collection("pizzaOrders");

  const result = await collection.find().sort({ total_price: -1 }).toArray();

  console.log(result);
}

//Sort ข้อมูลทั้งหมดด้วย Property created_at จากวันที่เก่าที่สุดไปใหม่ที่สุด
async function sortByCreate() {
    const db = client.db("practice-mongo");
    const collection = db.collection("pizzaOrders");
  
    const result = await collection.find().sort({ created_at: 1 }).toArray();
  
    console.log(result);
  }