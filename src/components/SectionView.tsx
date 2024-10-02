export interface RatingSection {
  type: "section";
  name: string;
  value: number;
  items: (RatingSection | RatingItem)[];
}

export interface RatingItem {
  type: "item";
  name: string;
  value: number;
}

export const section = (
  name: string,
  value: number,
  items: (RatingSection | RatingItem)[],
): RatingSection => ({
  type: "section",
  name,
  value,
  items: items.filter((i) => i.value),
});

export const item = (name: string, value: number): RatingItem => ({
  type: "item",
  name,
  value,
});

export default function SectionView({
  level = 1,
  section,
}: {
  level?: number;
  section: RatingSection;
}) {
  return (
    <>
      <tr className={`section level-${level}`}>
        <th className="name">{section.name}</th>
        <th className="value">{section.value}</th>
      </tr>
      {section.items.map((thing, i) =>
        thing.type === "section" ? (
          <SectionView key={i} level={level + 1} section={thing} />
        ) : (
          <ItemView key={i} level={level + 1} item={thing} />
        ),
      )}
    </>
  );
}

function ItemView({ level, item }: { level: number; item: RatingItem }) {
  return (
    <tr className={`item level-${level}`}>
      <td className="name">{item.name}</td>
      <td className="value">{item.value}</td>
    </tr>
  );
}
