import { MongoClient } from "mongodb";

const connectionString = "mongodb://127.0.0.1:27017";
const client = new MongoClient(connectionString, {
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    await findZoePrice();
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

run();

//ใช้ findOne ในการหาข้อมูล Document ของลูกค้าชื่อ Zoe จากนั้นให้ทำการ Transform
//ข้อมูลให้เหลือแค่ Property total_price และ customer_name

async function findZoePrice() {
  const db = client.db("practice-mongo");
  const collection = db.collection("pizzaOrders");

  const zoePrice = await collection.findOne(
    { customer_name: "Zoe" },
    { projection: { total_price: 1, customer_name: 1 } }
  );
  console.log(zoePrice);
}
