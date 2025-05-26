import { ClientWrapper } from "./components/client-wrapper";

type EventInstancePayloadDto = {
  logo: string;
  brandColor: string;
  accentColor: string;
  fontColor: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields: Record<string, any>;
  thumbnail: string;
  generatedVideo: string;
  variables: Record<string, string>;
  additionalVideo: string;
  upsells: Array<{
    text: string;
    icon: string;
    link: string;
  }>;
  fallbackVideoUrl: string;
  language: string;
  generatedSubtitles: string;
};

type Params = Promise<{ eventInstanceId: string }>;

export const metadata = {
  title: "Personalized Video",
};

export default async function Page({ params }: { params: Params }) {
  const { eventInstanceId } = await params;

  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || ""
      }/api/event-instance/${eventInstanceId}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = (await response.json()) as EventInstancePayloadDto;

    const {
      logo = "",
      brandColor,
      accentColor,
      fontColor = "#ffffff",
      fields = {},
      thumbnail = "",
      generatedVideo = "",
      upsells = [],
      fallbackVideoUrl = "",
      language = "",
      variables = {},
      generatedSubtitles = "",
    } = data;

    const description = fields.description;

    const title = fields.title;
    const buttonText = fields.buttonText;
    const buttonLink = fields.buttonLink;
    const moreOptions = fields.moreOptions;

    // Create a client boundary by wrapping the ClientWrapper in a div
    return (
      <ClientWrapper
        eventInstanceId={eventInstanceId}
        logo={logo}
        brandColor={brandColor}
        accentColor={accentColor}
        fontColor={fontColor}
        title={title || ""}
        description={description || ""}
        buttonText={buttonText || ""}
        buttonLink={buttonLink || ""}
        moreOptions={moreOptions || ""}
        upsells={upsells}
        generatedVideo={generatedVideo}
        thumbnail={thumbnail}
        fallbackVideoUrl={fallbackVideoUrl}
        name={variables.firstName || variables.name || ""}
        language={language}
        generatedSubtitles={generatedSubtitles}
      />
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // This will trigger the error.tsx component
  }
}
