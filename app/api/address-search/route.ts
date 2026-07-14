import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const q = searchParams.get("q");

    if (!q || q.length < 3) {
      return NextResponse.json([]);
    }

    const response = await fetch(
      `https://photon.komoot.io/api/?${new URLSearchParams({
        q,
        limit: "5",
      })}`,
      {
        cache: "no-store",
      }
    );

    const data = await response.json();

    const results = data.features.map((item: any) => ({
      place_id: `${item.properties.osm_type}-${item.properties.osm_id}-${item.geometry.coordinates[0]}-${item.geometry.coordinates[1]}`,
display_name: [
  item.properties.housenumber,
  item.properties.street,
  item.properties.name,
  item.properties.city,
  item.properties.state,
  item.properties.postcode,
]
  .filter(Boolean)
  .join(", "),
      lat: item.geometry.coordinates[1],
      lon: item.geometry.coordinates[0],
    }));

    return NextResponse.json(results);

  } catch (error) {
    console.error("Photon error:", error);
    return NextResponse.json([]);
  }
}