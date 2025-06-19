import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Download, Mail } from "lucide-react";
import MainNavigation from "@/components/main-navigation";
import MainFooter from "@/components/main-footer";
import { getProductCourseBySlug } from "@/lib/actions/product-course-actions";
import { handleProductPurchaseSuccess } from "@/lib/actions/product-purchase-actions";

interface SuccessPageProps {
  params: { slug: string };
  searchParams: { session_id?: string };
}

export default async function ProductSuccessPage({
  params,
  searchParams,
}: SuccessPageProps) {
  const product = await getProductCourseBySlug(params.slug);

  if (!product) {
    notFound();
  }

  // Handle the purchase success if session_id is provided
  let purchaseResult = null;
  if (searchParams.session_id) {
    purchaseResult = await handleProductPurchaseSuccess(
      searchParams.session_id
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNavigation />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-green-600">
                  Purchase Successful!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-600">
                  Thank you for purchasing <strong>{product.title}</strong>!
                </p>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <Mail className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="font-medium text-blue-800">
                      Check Your Email
                    </span>
                  </div>
                  <p className="text-blue-700 text-sm">
                    We've sent your course materials and download instructions
                    to your email address. If you don't see it in your inbox,
                    please check your spam folder.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Download className="h-4 w-4 mr-1" />
                      {product.download_limit} downloads
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      {product.access_duration} days access
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Link href="/profile">
                      <Button className="w-full bg-purple-700 hover:bg-purple-800">
                        View My Purchases
                      </Button>
                    </Link>
                    <Link href="/products">
                      <Button variant="outline" className="w-full">
                        Browse More Products
                      </Button>
                    </Link>
                  </div>
                </div>

                {purchaseResult && !purchaseResult.success && (
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-red-700 text-sm">
                      There was an issue processing your purchase. Please
                      contact support if you don't receive your materials.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
