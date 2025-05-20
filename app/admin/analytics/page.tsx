import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  EnrollmentChart,
  RevenueChart,
  UserActivityChart,
  CourseCompletionChart,
} from "@/components/admin/analytics-charts"

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue for the past year</CardDescription>
              </CardHeader>
              <CardContent>
                <RevenueChart />
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Enrollments</CardTitle>
                <CardDescription>Course enrollments over time</CardDescription>
              </CardHeader>
              <CardContent>
                <EnrollmentChart />
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
                <CardDescription>Daily active users</CardDescription>
              </CardHeader>
              <CardContent>
                <UserActivityChart />
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Course Completion</CardTitle>
                <CardDescription>Completion rates by course</CardDescription>
              </CardHeader>
              <CardContent>
                <CourseCompletionChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue">
          <div className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
                <CardDescription>Revenue by course category</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <RevenueChart />
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Top Performing Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">AI Leadership Fundamentals</p>
                        <p className="text-sm text-gray-500">Leadership</p>
                      </div>
                      <p className="font-bold">$18,750</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">AI Ethics & Governance</p>
                        <p className="text-sm text-gray-500">Ethics</p>
                      </div>
                      <p className="font-bold">$12,400</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">AI Implementation</p>
                        <p className="text-sm text-gray-500">Technical</p>
                      </div>
                      <p className="font-bold">$9,800</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Revenue by Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <p>January 2023</p>
                      <p className="font-bold">$4,200</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p>February 2023</p>
                      <p className="font-bold">$4,800</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p>March 2023</p>
                      <p className="font-bold">$5,100</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p>April 2023</p>
                      <p className="font-bold">$5,400</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p>May 2023</p>
                      <p className="font-bold">$6,200</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <p>Credit Card</p>
                      <p className="font-bold">68%</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p>PayPal</p>
                      <p className="font-bold">22%</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p>Bank Transfer</p>
                      <p className="font-bold">8%</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p>Other</p>
                      <p className="font-bold">2%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <div className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>New user registrations over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <UserActivityChart />
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>User Demographics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Age Distribution</p>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "35%" }}></div>
                        </div>
                        <span className="ml-2 text-sm">18-24 (35%)</span>
                      </div>
                      <div className="flex items-center mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "42%" }}></div>
                        </div>
                        <span className="ml-2 text-sm">25-34 (42%)</span>
                      </div>
                      <div className="flex items-center mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "18%" }}></div>
                        </div>
                        <span className="ml-2 text-sm">35-44 (18%)</span>
                      </div>
                      <div className="flex items-center mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "5%" }}></div>
                        </div>
                        <span className="ml-2 text-sm">45+ (5%)</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-1">Geographic Distribution</p>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "45%" }}></div>
                        </div>
                        <span className="ml-2 text-sm">North America (45%)</span>
                      </div>
                      <div className="flex items-center mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "30%" }}></div>
                        </div>
                        <span className="ml-2 text-sm">Europe (30%)</span>
                      </div>
                      <div className="flex items-center mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "15%" }}></div>
                        </div>
                        <span className="ml-2 text-sm">Asia (15%)</span>
                      </div>
                      <div className="flex items-center mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "10%" }}></div>
                        </div>
                        <span className="ml-2 text-sm">Other (10%)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>User Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Session Duration</p>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "25%" }}></div>
                        </div>
                        <span className="ml-2 text-sm">{"<"} 5 min (25%)</span>
                      </div>
                      <div className="flex items-center mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "40%" }}></div>
                        </div>
                        <span className="ml-2 text-sm">5-15 min (40%)</span>
                      </div>
                      <div className="flex items-center mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "35%" }}></div>
                        </div>
                        <span className="ml-2 text-sm">{">"} 15 min (35%)</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-1">Login Frequency</p>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "20%" }}></div>
                        </div>
                        <span className="ml-2 text-sm">Daily (20%)</span>
                      </div>
                      <div className="flex items-center mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "45%" }}></div>
                        </div>
                        <span className="ml-2 text-sm">Weekly (45%)</span>
                      </div>
                      <div className="flex items-center mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "35%" }}></div>
                        </div>
                        <span className="ml-2 text-sm">Monthly (35%)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="courses">
          <div className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Course Completion Rates</CardTitle>
                <CardDescription>Percentage of students who complete each course</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <CourseCompletionChart />
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Popular Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">AI Leadership Fundamentals</p>
                        <p className="text-sm text-gray-500">124 enrollments</p>
                      </div>
                      <div className="text-sm font-medium">
                        <span className="text-green-600">85%</span> completion
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">AI Ethics & Governance</p>
                        <p className="text-sm text-gray-500">87 enrollments</p>
                      </div>
                      <div className="text-sm font-medium">
                        <span className="text-green-600">78%</span> completion
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">AI Implementation for Executives</p>
                        <p className="text-sm text-gray-500">56 enrollments</p>
                      </div>
                      <div className="text-sm font-medium">
                        <span className="text-green-600">92%</span> completion
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">AI Strategy for Business</p>
                        <p className="text-sm text-gray-500">42 enrollments</p>
                      </div>
                      <div className="text-sm font-medium">
                        <span className="text-yellow-600">65%</span> completion
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Course Ratings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">AI Leadership Fundamentals</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★★★★★</span>
                        <span className="font-medium">4.8</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">AI Ethics & Governance</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★★★★☆</span>
                        <span className="font-medium">4.2</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">AI Implementation for Executives</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★★★★★</span>
                        <span className="font-medium">4.9</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">AI Strategy for Business</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★★★★☆</span>
                        <span className="font-medium">4.0</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
