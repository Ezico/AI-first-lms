"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Search } from "lucide-react";
import MainNavigation from "@/components/main-navigation";
import MainFooter from "@/components/main-footer";
import { verifyCertificate } from "@/lib/actions/certificate-actions";

export default function VerifyCertificatePage() {
  const [certificateId, setCertificateId] = useState("");
  const [verificationHash, setVerificationHash] = useState("");
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async () => {
    if (!certificateId.trim()) return;

    setIsLoading(true);
    try {
      const result = await verifyCertificate(
        certificateId.trim(),
        verificationHash.trim()
      );
      setVerificationResult(result);
    } catch (error) {
      setVerificationResult({
        valid: false,
        message: "Verification failed",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <MainNavigation />

      <div className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Verify Certificate
            </h1>
            <p className="text-lg text-gray-600">
              Enter a certificate ID to verify its authenticity
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Certificate Verification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label
                  htmlFor="certificateId"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Certificate ID *
                </label>
                <Input
                  id="certificateId"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  placeholder="Enter certificate ID (e.g., CERT-ABC123)"
                  className="w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="verificationHash"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Verification Hash (Optional)
                </label>
                <Input
                  id="verificationHash"
                  value={verificationHash}
                  onChange={(e) => setVerificationHash(e.target.value)}
                  placeholder="Enter verification hash for additional security"
                  className="w-full"
                />
              </div>

              <Button
                onClick={handleVerify}
                disabled={!certificateId.trim() || isLoading}
                className="w-full"
              >
                {isLoading ? "Verifying..." : "Verify Certificate"}
              </Button>
            </CardContent>
          </Card>

          {verificationResult && (
            <Card
              className={`border-2 ${verificationResult.valid ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
            >
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  {verificationResult.valid ? (
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  ) : (
                    <XCircle className="h-8 w-8 text-red-600" />
                  )}
                  <div>
                    <h3
                      className={`text-lg font-semibold ${verificationResult.valid ? "text-green-800" : "text-red-800"}`}
                    >
                      {verificationResult.valid
                        ? "Certificate Valid"
                        : "Certificate Invalid"}
                    </h3>
                    <p
                      className={`text-sm ${verificationResult.valid ? "text-green-600" : "text-red-600"}`}
                    >
                      {verificationResult.message}
                    </p>
                  </div>
                </div>

                {verificationResult.valid && verificationResult.certificate && (
                  <div className="space-y-3 pt-4 border-t border-green-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          Student Name
                        </label>
                        <p className="text-gray-900">
                          {verificationResult.certificate.student_name}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          Course Title
                        </label>
                        <p className="text-gray-900">
                          {verificationResult.certificate.course_title}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          Completion Date
                        </label>
                        <p className="text-gray-900">
                          {new Date(
                            verificationResult.certificate.completion_date
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          Issue Date
                        </label>
                        <p className="text-gray-900">
                          {new Date(
                            verificationResult.certificate.issued_date
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="pt-2">
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800"
                      >
                        Verified Authentic
                      </Badge>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <MainFooter />
    </div>
  );
}
