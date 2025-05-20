// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { BookOpen, DollarSign, TrendingUp, Users } from "lucide-react";
// import { AdminAnalyticsChart } from "@/components/admin/admin-analytics-chart";
// import { AdminRecentActivity } from "@/components/admin/admin-recent-activity";

// export default async function AdminDashboardPage() {
//   // In a real app, these would come from database queries
//   const stats = {
//     totalUsers: 256,
//     totalCourses: 12,
//     totalRevenue: 45750,
//     activeEnrollments: 389,
//   };

//   // Mock data for the chart
//   const revenueData = [
//     { month: "Jan", revenue: 4200 },
//     { month: "Feb", revenue: 4800 },
//     { month: "Mar", revenue: 5100 },
//     { month: "Apr", revenue: 5400 },
//     { month: "May", revenue: 6200 },
//     { month: "Jun", revenue: 7100 },
//     { month: "Jul", revenue: 8200 },
//     { month: "Aug", revenue: 7600 },
//     { month: "Sep", revenue: 6900 },
//     { month: "Oct", revenue: 6300 },
//     { month: "Nov", revenue: 5900 },
//     { month: "Dec", revenue: 6800 },
//   ];

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-3xl font-bold">Admin Dashboard</h1>
//       </div>

//       {/* Stats Cards */}
//       {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <Card className="bg-white">
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">Total Users</CardTitle>
//             <Users className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.totalUsers}</div>
//             <p className="text-xs text-muted-foreground">
//               +12% from last month
//             </p>
//           </CardContent>
//         </Card>

//         <Card className="bg-white">
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
//             <BookOpen className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.totalCourses}</div>
//             <p className="text-xs text-muted-foreground">+2 new this month</p>
//           </CardContent>
//         </Card>

//         <Card className="bg-white">
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
//             <DollarSign className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               ${stats.totalRevenue.toLocaleString()}
//             </div>
//             <p className="text-xs text-muted-foreground">
//               +18% from last month
//             </p>
//           </CardContent>
//         </Card>

//         <Card className="bg-white">
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">
//               Active Enrollments
//             </CardTitle>
//             <TrendingUp className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.activeEnrollments}</div>
//             <p className="text-xs text-muted-foreground">+24 this week</p>
//           </CardContent>
//         </Card>
//       </div> */}

//       {/* Charts and Recent Activity */}
//       {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <Card className="col-span-2 bg-white">
//           <CardHeader>
//             <CardTitle>Revenue Overview</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <AdminAnalyticsChart data={revenueData} />
//           </CardContent>
//         </Card>

//         <Card className="bg-white">
//           <CardHeader>
//             <CardTitle>Recent Activity</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <AdminRecentActivity />
//           </CardContent>
//         </Card>
//       </div> */}

//     </div>
//   );
// }

"use server";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash2, Eye } from "lucide-react";
import { getAllCoursesAdmin, deleteCourse } from "@/lib/actions/course-actions";
import { formatCurrency } from "@/lib/utils";
import { neon } from "@neondatabase/serverless";

export default async function AdminCoursesPage() {
  const courses = await getAllCoursesAdmin();
  // connect to neon and get data from db
  // const sql = neon(process.env.DATABASE_URL!);
  // console.log(sql, "sql");

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Course Management</h1>
        <Link href="/admin/courses/new">
          <Button className="bg-purple-700 hover:bg-purple-800">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Course
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Course
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Featured
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.length > 0 ? (
                courses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 relative">
                          <Image
                            src={
                              course.image ||
                              "/placeholder.svg?height=40&width=40"
                            }
                            alt={course.title}
                            width={40}
                            height={40}
                            className="rounded-md object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {course.title}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {course.category}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatCurrency(course.price)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          course.published
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {course.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          course.featured
                            ? "bg-purple-100 text-purple-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {course.featured ? "Featured" : "Not Featured"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link href={`/academy/courses/${course.slug}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/admin/courses/${course.id}`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        {/* <form
                          action={async () => {
                            await deleteCourse(course.id);
                          }}
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-800"
                            type="submit"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </form> */}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No courses found. Create your first course!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
