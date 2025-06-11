import { Button } from "@/components/ui/button";

export default function CapstonePreview() {
  return (
    <section className="py-16 bg-white" id="capstone">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-gray-900">
              Capstone Project Preview
            </h2>
            <p className="text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Build a fully functional AI project management assistant that can:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <svg
                  className="mr-2 h-5 w-5 text-primary"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Automate task assignments and follow-ups
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-2 h-5 w-5 text-primary"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Generate project status reports
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-2 h-5 w-5 text-primary"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Predict project risks and suggest mitigation strategies
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-2 h-5 w-5 text-primary"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Optimize resource allocation
              </li>
            </ul>
            <div className="pt-4">
              <Button className="bg-primary hover:bg-primary text-white">
                View Sample Projects
              </Button>
            </div>
          </div>
          <div className="mx-auto lg:ml-auto">
            <img
              alt="Capstone Project Preview"
              className=" overflow-hidden rounded-xl object-cover object-center shadow-lg"
              height="550"
              src="/images/ai-cover.png"
              width="800"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
