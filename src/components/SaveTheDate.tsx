import Image from "next/image";

/*
  The real save-the-date artwork (cropped to just the green card face, with the
  white border removed) so it blends straight into the matching green page.
  Used as the hero until professional Napa photos are taken.
*/

export default function SaveTheDate() {
  return (
    <div className="mx-auto w-full max-w-[430px]">
      <Image
        src="/save-the-date.png"
        alt="Save the date for the wedding of Madeleine and Brian — June 5, 2027, Napa Valley — madeleineandbrian.com"
        width={625}
        height={900}
        priority
        className="h-auto w-full"
      />
    </div>
  );
}
