import { MongoClient } from "mongodb";

const connectionString = "mongodb://127.0.0.1:27017";
const client = new MongoClient(connectionString, {
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    await updateJackRole();
    console.log("updated jack role successfully");

    await updateCountryAll();
    console.log("updated country for all documents successfully");

    await updateMDetail();
    console.log("updated data for customer M successfully");
    
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

run();

//Update ข้อมูล Document ทุกอันของ Customer ที่มีชื่อว่า Jack ด้วย updateMany
async function updateJackRole() {
  const db = client.db("practice-mongo");
  const collection = db.collection("pizzaOrders");

  await collection.updateMany(
    { customer_name: "Jack" },
    { $set: { isAdmin: false } }
  );
}
//Update ข้อมูล Document ทุกอันด้วย updateMany
async function updateCountryAll() {
  const db = client.db("practice-mongo");
  const collection = db.collection("pizzaOrders");

  await collection.updateMany(
    {},
    { $set: { country: "Thailand" } },
    {
      upsert: true,
    }
  );
}

//Update ข้อมูล Document ด้วย updateOne โดยมีรายละเอียดดังนี้
//Update ข้อมูล Document ของ Customer ที่มีชื่อว่า M
//แต่ถ้าไม่มี Document ที่มีชื่อ Customer เป็น M ในระบบ ก็ให้สร้างมาเป็น Document ใหม่แทน
async function updateMDetail() {
  const db = client.db("practice-mongo");
  const collection = db.collection("pizzaOrders");

  await collection.updateMany(
    { customer_name: "M" },
    {
      $set: {
        size: "large",
        total_price: 200000,
        quantity: 20,
        customer_name: "M",
        credit_card_type: "mastercard",
        created_at: "2022-01-01T10:48:40Z",
      },
    },
    {
      upsert: true,
    }
  );
}
