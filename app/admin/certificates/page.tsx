import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Plus, Settings } from "lucide-react";
import Link from "next/link";
import { getCertificateTemplates } from "@/lib/actions/certificate-actions";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export default async function AdminCertificatesPage() {
  const templates = await getCertificateTemplates();

  // Get certificate statistics
  const stats = await sql`
    SELECT 
      COUNT(*) as total_certificates,
      COUNT(DISTINCT user_id) as unique_recipients,
      COUNT(DISTINCT course_id) as courses_with_certificates
    FROM certificates
  `;

  const certificateStats = stats[0] || {
    total_certificates: 0,
    unique_recipients: 0,
    courses_with_certificates: 0,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Certificate Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage certificate templates and view issued certificates
          </p>
        </div>
        <Link href="/admin/certificates/templates/new">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Template
          </Button>
        </Link>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {certificateStats.total_certificates}
                </p>
                <p className="text-sm text-gray-600">Total Certificates</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Award className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {certificateStats.unique_recipients}
                </p>
                <p className="text-sm text-gray-600">Unique Recipients</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {certificateStats.courses_with_certificates}
                </p>
                <p className="text-sm text-gray-600">
                  Courses with Certificates
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Certificate Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Certificate Templates
          </CardTitle>
        </CardHeader>
        <CardContent>
          {templates.length === 0 ? (
            <div className="text-center py-8">
              <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Templates
              </h3>
              <p className="text-gray-600 mb-4">
                Create your first certificate template
              </p>
              <Link href="/admin/certificates/templates/new">
                <Button>Create Template</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {template.name}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Created{" "}
                        {new Date(template.created_at).toLocaleDateString()}
                      </p>
                      {template.is_default && (
                        <Badge className="mt-2 bg-blue-100 text-blue-800">
                          Default
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/certificates/templates/${template.id}/preview`}
                      >
                        <Button size="sm" variant="outline">
                          Preview
                        </Button>
                      </Link>
                      <Link
                        href={`/admin/certificates/templates/${template.id}/edit`}
                      >
                        <Button size="sm">Edit</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
