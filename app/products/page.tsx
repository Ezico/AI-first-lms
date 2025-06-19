import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Star, Download, Clock, FileText } from "lucide-react";
import MainNavigation from "@/components/main-navigation";
import MainFooter from "@/components/main-footer";
import { Reveal } from "@/components/reveal";
import {
  getAllProductCourses,
  getFeaturedProductCourses,
} from "@/lib/actions/product-course-actions";

function ProductCard({ product }: { product: any }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-video">
        <Image
          src={product.image || "/placeholder.svg?height=200&width=300"}
          alt={product.title}
          fill
          className="object-cover"
        />
        {product.featured && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-purple-700">Featured</Badge>
          </div>
        )}
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline">
            {product.difficulty_level || "All Levels"}
          </Badge>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            {product.estimated_time || "Self-paced"}
          </div>
        </div>
        <h3 className="font-bold text-lg line-clamp-2">{product.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">
          {product.short_description || product.description}
        </p>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="flex items-center mb-3">
          <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2">
            <Image
              src={product.instructor_image || "/professional-headshot.png"}
              alt={product.instructor || "Instructor"}
              fill
              className="object-cover"
            />
          </div>
          <span className="text-sm text-gray-700">
            {product.instructor || "AI Academy"}
          </span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < 4 ? "text-yellow-400" : "text-gray-300"}`}
                  fill={i < 4 ? "currentColor" : "none"}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-1">4.8</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Download className="h-4 w-4 mr-1" />
            {Math.floor(Math.random() * 500) + 100} downloads
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-600 mb-3">
          <FileText className="h-4 w-4 mr-1" />
          {product.file_format || "PDF"} • {product.file_size || "10MB"}
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-purple-700">
              $
              {typeof product.price === "number"
                ? product.price.toFixed(2)
                : product.price}
            </span>
            {product.original_price && (
              <span className="text-lg text-gray-500 line-through">
                $
                {typeof product.original_price === "number"
                  ? product.original_price.toFixed(2)
                  : product.original_price}
              </span>
            )}
          </div>
          <Link href={`/products/${product.slug}`}>
            <Button className="bg-purple-700 hover:bg-purple-800">
              View Details
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}

function ProductGrid({ products }: { products: any[] }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          No products available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, index) => (
        <Reveal key={product.id} delay={index * 0.1}>
          <ProductCard product={product} />
        </Reveal>
      ))}
    </div>
  );
}

export default async function ProductsPage() {
  const [featuredProducts, allProducts] = await Promise.all([
    getFeaturedProductCourses(),
    getAllProductCourses(),
  ]);

  const regularProducts = allProducts.filter((p) => !p.featured);

  return (
    <div className="flex min-h-screen flex-col">
      <MainNavigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Digital Learning Products
              </h1>
              <p className="text-xl text-purple-100 mb-8">
                Instant access to premium AI and business resources. Download
                immediately after purchase.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center">
                  <Download className="h-5 w-5 mr-2" />
                  Instant Download
                </div>
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Multiple Formats
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 mr-2" />
                  Premium Quality
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <Reveal>
              <h2 className="text-3xl font-bold text-center mb-12">
                Featured Products
              </h2>
            </Reveal>
            <Suspense fallback={<div>Loading featured products...</div>}>
              <ProductGrid products={featuredProducts} />
            </Suspense>
          </div>
        </section>
      )}

      {/* All Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <Reveal>
            <h2 className="text-3xl font-bold text-center mb-12">
              All Products
            </h2>
          </Reveal>
          <Suspense fallback={<div>Loading products...</div>}>
            <ProductGrid products={regularProducts} />
          </Suspense>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
