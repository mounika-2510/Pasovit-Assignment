import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const data = [
  {
    name: "Classic White T Shirt",
    description: "Soft cotton regular fit.",
    price: 299,
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    imageUrl:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800",
    images: [
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800",
    ],
  },
  {
    name: "Black Cotton T Shirt",
    description: "Premium cotton black tee.",
    price: 349,
    category: "Men",
    sizes: ["M", "L", "XL"],
    imageUrl:
      "https://images.unsplash.com/photo-1585386959984-a41552231697?w=800",
    images: [
      "https://images.unsplash.com/photo-1585386959984-a41552231697?w=800",
    ],
  },
  {
    name: "Denim Jacket",
    description: "Blue denim jacket with pockets.",
    price: 1599,
    category: "Men",
    sizes: ["M", "L", "XL"],
    imageUrl:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
    ],
  },
  {
    name: "Slim Fit Jeans",
    description: "Dark blue slim-fit jeans.",
    price: 1199,
    category: "Men",
    sizes: ["30", "32", "34", "36"],
    imageUrl:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800",
    ],
  },
  {
    name: "Floral Summer Dress",
    description: "Light floral print summer dress.",
    price: 1299,
    category: "Women",
    sizes: ["S", "M", "L"],
    imageUrl:
      "https://images.unsplash.com/photo-1520975918318-3de3656c8bb3?w=800",
    images: [
      "https://images.unsplash.com/photo-1520975918318-3de3656c8bb3?w=800",
    ],
  },
  {
    name: "Grey Hoodie",
    description: "Warm fleece hoodie.",
    price: 999,
    category: "Men",
    sizes: ["M", "L", "XL"],
    imageUrl:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3c93?w=800",
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3c93?w=800",
    ],
  },
  {
    name: "Red Hoodie",
    description: "Comfort fit cotton hoodie.",
    price: 1099,
    category: "Men",
    sizes: ["L", "XL"],
    imageUrl:
      "https://images.unsplash.com/photo-1603252109360-909f9c61b2f9?w=800",
    images: [
      "https://images.unsplash.com/photo-1603252109360-909f9c61b2f9?w=800",
    ],
  },
  {
    name: "Women Black Jacket",
    description: "Stylish black jacket.",
    price: 1899,
    category: "Women",
    sizes: ["S", "M"],
    imageUrl:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800",
    ],
  },
  {
    name: "Oversized Blue Shirt",
    description: "Comfort fit shirt.",
    price: 499,
    category: "Men",
    sizes: ["M", "L"],
    imageUrl: "https://images.unsplash.com/photo-1542060749-8f2c0e26a41d?w=800",
    images: ["https://images.unsplash.com/photo-1542060749-8f2c0e26a41d?w=800"],
  },
  {
    name: "Pink Summer Dress",
    description: "Casual pink summer dress.",
    price: 1299,
    category: "Women",
    sizes: ["S", "M"],
    imageUrl:
      "https://images.unsplash.com/photo-1525708827920-425861d9b0a4?w=800",
    images: [
      "https://images.unsplash.com/photo-1525708827920-425861d9b0a4?w=800",
    ],
  },
];

// Duplicate to make 20 products
while (data.length < 20) {
  const base = data[data.length % 10];
  data.push({
    ...base,
    name: base.name + " " + (data.length + 1),
  });
}

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected for seeding");

    await Product.deleteMany({});
    await Product.insertMany(data);

    console.log("Seeded products:", data.length);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
