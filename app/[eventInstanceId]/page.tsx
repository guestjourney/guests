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
};

type Params = Promise<{ eventInstanceId: string }>;

// change the name of the tab to be more descriptive
export const metadata = {
  title: "Personalized Video",
};

export default async function Page({ params }: { params: Params }) {
  const { eventInstanceId } = await params;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const response = await fetch(
      `https://api-q1ln.onrender.com/workflows/payload/${eventInstanceId}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = (await response.json()) as EventInstancePayloadDto;
    const {
      logo = "https://www.luxuryhotelawards.com/wp-content/uploads/sites/8/2023/10/logoPBH_DIAP_portrait.png",
      brandColor,
      accentColor,
      fontColor = "#ffffff",
      fields = [],
      thumbnail = "",
      generatedVideo = "",
      upsells = [],
      fallbackVideoUrl = "",
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

    return (
      <div className={outfit.className}>
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
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // This will trigger the error.tsx component
  }
}
