"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Award, ExternalLink } from "lucide-react";
import { getUserCertificates } from "@/lib/actions/certificate-actions";

interface Certificate {
  id: number;
  certificate_id: string;
  course_title: string;
  course_slug: string;
  completion_date: string;
  issued_date: string;
  verification_hash: string;
}

export default function CertificatesSection() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCertificates = async () => {
      try {
        const userCertificates = await getUserCertificates();
        setCertificates(userCertificates);
      } catch (error) {
        console.error("Failed to load certificates:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCertificates();
  }, []);

  const handleDownload = (certificateId: string) => {
    window.open(`/api/certificates/${certificateId}/download`, "_blank");
  };

  const handleVerify = (certificateId: string) => {
    window.open(`/verify-certificate?id=${certificateId}`, "_blank");
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            My Certificates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
            <p className="text-gray-600 mt-2">Loading certificates...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5" />
          My Certificates
        </CardTitle>
      </CardHeader>
      <CardContent>
        {certificates.length === 0 ? (
          <div className="text-center py-8">
            <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Certificates Yet
            </h3>
            <p className="text-gray-600">
              Complete a course to earn your first certificate!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {certificates.map((certificate) => (
              <div
                key={certificate.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {certificate.course_title}
                    </h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>Certificate ID: {certificate.certificate_id}</p>
                      <p>
                        Completed:{" "}
                        {new Date(
                          certificate.completion_date
                        ).toLocaleDateString()}
                      </p>
                      <p>
                        Issued:{" "}
                        {new Date(certificate.issued_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="mt-2">
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800"
                      >
                        Verified
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <Button
                      size="sm"
                      onClick={() => handleDownload(certificate.certificate_id)}
                      className="flex items-center gap-1"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleVerify(certificate.certificate_id)}
                      className="flex items-center gap-1"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Verify
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
