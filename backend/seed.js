import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const data = [
  {
    name: "Classic White T-Shirt",
    description: "Soft cotton, regular fit.",
    price: 299,
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    imageUrl: "https://i.postimg.cc/8zzF0R92/white-shirt.jpg",
    images: ["https://i.postimg.cc/8zzF0R92/white-shirt.jpg"],
  },
  {
    name: "Black Cotton T-Shirt",
    description: "Premium cotton black tee.",
    price: 349,
    category: "Men",
    sizes: ["M", "L", "XL"],
    imageUrl: "https://i.postimg.cc/x8J9zHGc/black-tee.jpg",
    images: ["https://i.postimg.cc/x8J9zHGc/black-tee.jpg"],
  },
  {
    name: "Denim Jacket",
    description: "Blue denim jacket with pockets.",
    price: 1599,
    category: "Men",
    sizes: ["M", "L", "XL"],
    imageUrl: "https://i.postimg.cc/4xDjGQhb/denim-jacket.jpg",
    images: ["https://i.postimg.cc/4xDjGQhb/denim-jacket.jpg"],
  },
  {
    name: "Slim Fit Jeans",
    description: "Dark blue slim-fit jeans.",
    price: 1199,
    category: "Men",
    sizes: ["30", "32", "34", "36"],
    imageUrl: "https://i.postimg.cc/Yq5f8G9c/men-jeans.jpg",
    images: ["https://i.postimg.cc/Yq5f8G9c/men-jeans.jpg"],
  },
  {
    name: "Floral Summer Dress",
    description: "Light floral print summer dress.",
    price: 1299,
    category: "Women",
    sizes: ["S", "M", "L"],
    imageUrl: "https://i.postimg.cc/BZRWpt7J/floral-dress.jpg",
    images: ["https://i.postimg.cc/BZRWpt7J/floral-dress.jpg"],
  },
  {
    name: "Grey Hoodie",
    description: "Warm fleece hoodie.",
    price: 999,
    category: "Men",
    sizes: ["M", "L", "XL"],
    imageUrl: "https://i.postimg.cc/YqwPxkBV/grey-hoodie.jpg",
    images: ["https://i.postimg.cc/YqwPxkBV/grey-hoodie.jpg"],
  },
  {
    name: "Red Hoodie",
    description: "Comfort fit, soft cotton.",
    price: 1099,
    category: "Men",
    sizes: ["L", "XL"],
    imageUrl: "https://i.postimg.cc/28b0xZgh/red-hoodie.jpg",
    images: ["https://i.postimg.cc/28b0xZgh/red-hoodie.jpg"],
  },
  {
    name: "Women's Black Jacket",
    description: "Stylish black leather-look jacket.",
    price: 1899,
    category: "Women",
    sizes: ["S", "M"],
    imageUrl: "https://i.postimg.cc/4NRfKdwf/women-black-jacket.jpg",
    images: ["https://i.postimg.cc/4NRfKdwf/women-black-jacket.jpg"],
  },
  {
    name: "Blue Oversized T-Shirt",
    description: "Comfort fit oversized tee.",
    price: 499,
    category: "Men",
    sizes: ["M", "L"],
    imageUrl: "https://i.postimg.cc/mrVgxxLp/blue-oversized.jpg",
    images: ["https://i.postimg.cc/mrVgxxLp/blue-oversized.jpg"],
  },
  {
    name: "Pink Summer Dress",
    description: "Stylish dress for summer.",
    price: 1299,
    category: "Women",
    sizes: ["S", "M"],
    imageUrl: "https://i.postimg.cc/tC2HCYNw/pink-dress.jpg",
    images: ["https://i.postimg.cc/tC2HCYNw/pink-dress.jpg"],
  },
];

// auto duplicate until 20 products
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
