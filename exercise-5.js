import { MongoClient } from "mongodb";

const connectionString = "mongodb://127.0.0.1:27017";
const client = new MongoClient(connectionString, {
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const orderId = await insertOneNewOrder();
    console.log("insert new order successfully, Order ID:", orderId);

    const insertedIds = await insertManyNewOrder();
    console.log("Inserted order IDs:", insertedIds);
    
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

run();

//Insert ข้อมูล Document เดียว
async function insertOneNewOrder() {
  const db = client.db("practice-mongo");
  const collection = db.collection("pizzaOrders");

  const result = await collection.insertOne({
    size: "small",
    total_price: 3000,
    quantity: 8,
    customer_name: "John",
    credit_card_type: null,
    created_at: "2021-02-07T10:48:40Z",
  });
  return result.insertedId;
}
//Insert ข้อมูลหลาย Document
async function insertManyNewOrder() {
  const db = client.db("practice-mongo");
  const collection = db.collection("pizzaOrders");

  const result = await collection.insertMany([
    {
      size: "small",
      total_price: 3000,
      quantity: 1,
      customer_name: "James",
      credit_card_type: null,
      created_at: "2021-02-07T10:48:40Z",
    },
    {
      size: "large",
      total_price: 12000,
      quantity: 13,
      customer_name: "K",
      credit_card_type: null,
      created_at: "2022-03-05T10:48:40Z",
    },
    {
      size: "small",
      total_price: 2000,
      quantity: 2,
      customer_name: "Jack",
      credit_card_type: null,
      created_at: "2022-02-14T10:48:40Z",
    },
  ]);

  return result.insertedIds;
}
