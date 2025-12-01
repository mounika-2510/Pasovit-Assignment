import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productsAPI } from "../services/api";
import { useCart } from "../context/CartContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useToast } from "../components/ui/use-toast";
import { ArrowLeft } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productsAPI.getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  // Safe fallback arrays (prevents join() errors)
  const sizes = product?.sizes ?? [];
  const images = product?.images ?? [];

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Select size",
        description: "Choose a size before adding to cart",
      });
      return;
    }

    addToCart({
      ...product,
      selectedSize,
      quantity,
    });

    toast({
      title: "Added to cart",
      description: `${product.name} added successfully`,
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
        </CardHeader>

        <CardContent>
          {/* Product Image */}
          {images.length > 0 ? (
            <img
              src={images[0]}
              alt={product.name}
              className="w-full rounded-lg mb-4"
            />
          ) : (
            <p>No images available</p>
          )}

          <p className="text-lg font-semibold mb-2">₹{product.price}</p>

          <p className="text-sm text-gray-700 mb-4">{product.description}</p>

          {/* Size selection */}
          <Label>Select Size</Label>
          <Select onValueChange={(value) => setSelectedSize(value)}>
            <SelectTrigger className="w-40 mb-3">
              <SelectValue placeholder="Choose size" />
            </SelectTrigger>
            <SelectContent>
              {sizes.length > 0 ? (
                sizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))
              ) : (
                <p className="p-2 text-gray-500">No sizes available</p>
              )}
            </SelectContent>
          </Select>

          {/* Quantity */}
          <Label>Quantity</Label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border rounded-md p-2 w-20 mb-4"
          />

          {/* Add to Cart */}
          <Button onClick={handleAddToCart}>Add to Cart</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetail;
