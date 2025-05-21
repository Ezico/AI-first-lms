import PodcastForm from "@/components/admin/podcast-form";

export default function NewPodcastPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Podcast</h1>
      <PodcastForm />
    </div>
  );
}
