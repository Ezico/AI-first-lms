import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Star,
  Download,
  Clock,
  FileText,
  CheckCircle,
  Shield,
} from "lucide-react";
import MainNavigation from "@/components/main-navigation";
import MainFooter from "@/components/main-footer";
import { Reveal } from "@/components/reveal";
import { getServerUser } from "@/lib/auth-utils";
import {
  getProductCourseBySlug,
  hasUserPurchasedProduct,
} from "@/lib/actions/product-course-actions";
import ProductPurchaseForm from "@/components/products/product-purchase-form";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const user = getServerUser();
  const product = await getProductCourseBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const hasPurchased = user ? await hasUserPurchasedProduct(product.id) : false;

  return (
    <div className="flex min-h-screen flex-col">
      <MainNavigation />

      {/* Product Hero */}
      <section className="bg-gradient-to-br from-purple-900 to-purple-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <Reveal>
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-purple-800 hover:bg-purple-900">
                    {product.category || "Digital Product"}
                  </Badge>
                  {product.featured && (
                    <Badge className="bg-yellow-600 hover:bg-yellow-700">
                      Featured
                    </Badge>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {product.title}
                </h1>
                <p className="text-lg text-purple-100 mb-6">
                  {product.short_description || product.description}
                </p>

                <div className="flex flex-wrap items-center gap-6 mb-6">
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < 4 ? "text-yellow-400" : "text-gray-300"}`}
                          fill={i < 4 ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    <span className="ml-2">4.8 (127 reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <Download className="h-5 w-5 mr-2" />
                    {Math.floor(Math.random() * 500) + 100} downloads
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    {product.estimated_time || "Self-paced"}
                  </div>
                </div>

                <div className="flex items-center mb-6">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden mr-3">
                    <Image
                      src={
                        product.instructor_image || "/professional-headshot.png"
                      }
                      alt={product.instructor || "Instructor"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Created by</p>
                    <p className="text-purple-200">
                      {product.instructor || "AI Academy Team"},{" "}
                      {product.instructor_title || "Expert Instructor"}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="lg:w-1/3">
              <Reveal delay={0.2}>
                <Card className="bg-white text-gray-900">
                  <CardHeader>
                    <div className="relative aspect-video mb-4">
                      <Image
                        src={
                          product.image ||
                          "/placeholder.svg?height=200&width=300"
                        }
                        alt={product.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-3xl font-bold text-purple-700">
                        $
                        {typeof product.price === "number"
                          ? product.price.toFixed(2)
                          : product.price}
                      </div>
                      {product.original_price && (
                        <div className="text-xl text-gray-500 line-through">
                          $
                          {typeof product.original_price === "number"
                            ? product.original_price.toFixed(2)
                            : product.original_price}
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center text-gray-700">
                      <FileText className="h-5 w-5 mr-3 text-purple-600" />
                      <span>
                        {product.file_format || "PDF"} Format •{" "}
                        {product.file_size || "10MB"}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Download className="h-5 w-5 mr-3 text-purple-600" />
                      <span>{product.download_limit} downloads allowed</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Shield className="h-5 w-5 mr-3 text-purple-600" />
                      <span>{product.access_duration} days access</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <CheckCircle className="h-5 w-5 mr-3 text-purple-600" />
                      <span>Instant download</span>
                    </div>

                    {hasPurchased ? (
                      <div className="space-y-2">
                        <Button
                          className="w-full bg-green-600 hover:bg-green-700"
                          disabled
                        >
                          ✓ Already Purchased
                        </Button>
                        <p className="text-center text-sm text-gray-600">
                          Check your email for download instructions
                        </p>
                      </div>
                    ) : (
                      <ProductPurchaseForm
                        productId={product.id}
                        productSlug={product.slug}
                      />
                    )}

                    <p className="text-center text-sm text-gray-500 mt-4">
                      30-day money-back guarantee
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  What's Included
                </h2>
                <div className="space-y-3">
                  {product.what_included && product.what_included.length > 0 ? (
                    product.what_included.map((item, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Complete course materials and resources</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Key Features
                </h2>
                <div className="space-y-3">
                  {product.features && product.features.length > 0 ? (
                    product.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <Star className="h-5 w-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-start">
                      <Star className="h-5 w-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span>High-quality, professionally designed content</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Description
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>

            {product.requirements && product.requirements.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Requirements
                </h2>
                <ul className="list-disc pl-5 space-y-2">
                  {product.requirements.map((requirement, index) => (
                    <li key={index} className="text-gray-700">
                      {requirement}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                About the Creator
              </h2>
              <div className="flex items-start">
                <div className="relative h-20 w-20 rounded-full overflow-hidden mr-4">
                  <Image
                    src={
                      product.instructor_image || "/professional-headshot.png"
                    }
                    alt={product.instructor || "Instructor"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg">
                    {product.instructor || "AI Academy Team"}
                  </h3>
                  <p className="text-purple-700 mb-2">
                    {product.instructor_title || "Expert Instructor"}
                  </p>
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < 5 ? "text-yellow-400" : "text-gray-300"}`}
                          fill="currentColor"
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      4.9 Creator Rating
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {Math.floor(Math.random() * 50) + 20} Products •{" "}
                    {Math.floor(Math.random() * 10000) + 5000} Students
                  </p>
                  <p className="text-gray-700">
                    Expert in AI and business strategy with years of experience
                    creating high-quality educational content.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
