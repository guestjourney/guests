import { Outfit } from "next/font/google";
import { ActionButton } from "./components/action-button";
import { Upsells } from "./components/upsells";
import { Player } from "./components/player";
import { Buttons } from "./components/buttons";
import LoadingAnimation from "./components/loading-animation";

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

  try {
    const response = await fetch(
      `http://localhost:3000/workflows/payload/${eventInstanceId}`
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
      <div
        className={`h-screen w-screen flex flex-col lg:flex-row ${outfit.className}`}
      >
        <LoadingAnimation />
        {/* left */}
        <div
          className="w-full lg:w-3/5 flex items-center p-10 lg:pr-[20%] pb-20 lg:pb-10"
          style={{ backgroundColor: brandColor }}
        >
          <div
            className="bg-blue flex flex-col gap-8 "
            style={{ color: fontColor }}
          >
            <img src={logo} alt="Logo" className="w-40" />
            <h1 className="text-4xl font-bold">{title}</h1>
            <p className="text-2xl">{description}</p>
            <Buttons
              buttonText={buttonText || ""}
              buttonLink={buttonLink || ""}
              moreOptions={moreOptions || ""}
              upsells={upsells || []}
              accentColor={accentColor}
            />
          </div>
          {/* right */}
        </div>
        <div className="w-full lg:w-2/5 relative flex justify-center">
          <div className="relative lg:absolute lg:top-1/2 -top-[20px] lg:-left-1/3 lg:-translate-y-1/2 rounded-2xl overflow-hidden w-[90%] lg:w-full">
            <Player
              videoUrl={generatedVideo || fallbackVideoUrl}
              id="player"
              thumbnailUrl={thumbnail}
            />
          </div>
        </div>

        {/* mobile */}
        <div className="gap-4 flex flex-1 flex-col lg:hidden justify-end items-center">
          <div className="flex gap-4 flex-1">
            <Upsells upsells={upsells} />
          </div>
          <ActionButton
            buttonText={buttonText || ""}
            buttonLink={buttonLink || ""}
            accentColor={accentColor}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // This will trigger the error.tsx component
  }
}
