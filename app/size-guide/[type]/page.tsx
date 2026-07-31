import RingGuide from "@/components/size-guides/RingGuide";
import NecklaceGuide from "@/components/size-guides/NecklaceGuide";
import BraceletGuide from "@/components/size-guides/BraceletGuide";
import EarringGuide from "@/components/size-guides/EarringGuide";

interface Props {
  params: Promise<{
    type: string;
  }>;
}

export default async function SizeGuidePage({ params }: Props) {
  const { type } = await params;

  let GuideComponent;

  switch (type) {
    case "ring":
      GuideComponent = <RingGuide />;
      break;

    case "necklace":
      GuideComponent = <NecklaceGuide />;
      break;

    case "bracelet":
      GuideComponent = <BraceletGuide />;
      break;

    case "earring":
      GuideComponent = <EarringGuide />;
      break;

    default:
      GuideComponent = <div>Guide not found</div>;
  }

  return (
    <>
      {GuideComponent}
    </>
  );
}