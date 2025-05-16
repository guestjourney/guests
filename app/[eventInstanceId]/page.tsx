import { Outfit } from "next/font/google";
import { ClientWrapper } from "./components/client-wrapper";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "700"] });

type EventInstancePayloadDto = {
  logo: string;
  brandColor: string;
  accentColor: string;
  fontColor: string;
  fields: Array<{
    key: string;
    value: string;
  }>;
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
      fields = [],
      thumbnail = "",
      generatedVideo = "",
      upsells = [],
      fallbackVideoUrl = "",
      language = "",
      variables = {},
    } = data;

    const description = fields.find(
      (field) => field.key === "description"
    )?.value;

    const title = fields.find((field) => field.key === "title")?.value;
    const buttonText = fields.find(
      (field) => field.key === "buttonText"
    )?.value;
    const buttonLink = fields.find(
      (field) => field.key === "buttonLink"
    )?.value;
    const moreOptions = fields.find(
      (field) => field.key === "moreOptions"
    )?.value;

    // Create a client boundary by wrapping the ClientWrapper in a div
    return (
      <div className={outfit.className}>
        <div suppressHydrationWarning>
          <ClientWrapper
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
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // This will trigger the error.tsx component
  }
}
