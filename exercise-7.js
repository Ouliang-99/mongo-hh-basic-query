import { MongoClient } from "mongodb";

const connectionString = "mongodb://127.0.0.1:27017";
const client = new MongoClient(connectionString, {
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    await deleteJackData();
    console.log("deleted jack data successfully");

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

run();

//Delete ข้อมูล Document ของ Customer ที่มีชื่อว่า Jack ออกทั้งหมด
async function deleteJackData() {
    const db = client.db("practice-mongo");
    const collection = db.collection("pizzaOrders");
  
    await collection.deleteMany(
      { customer_name: "Jack" },
    );
  }
