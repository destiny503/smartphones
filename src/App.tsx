import { useState, useMemo } from "react";
import s from "./App.module.css";
import data from "./data.json";
import Button from "./Button";
import buttonStyles from "./Button.module.css";

const brands = ["Xiaomi", "Pixel", "OnePlus", "Samsung", "iPhone"];
const years = ["2022", "2023", "2024", "2025", "2026"];

type FilterButton = {
  label: string;
  value: string;
  specialClass?: string;
};

type Divider = {
  isDivider: true;
};

type ButtonItem = FilterButton | Divider;

const filterRules = {
  all: (item: any) => item.brand !== "iPhone",
  ...Object.fromEntries(
    brands.map((b) => [
      b.toLowerCase(),
      b === "iPhone"
        ? (item: any) => item.brand === "iPhone"
        : (item: any) => item.brand === b,
    ]),
  ),
  ...Object.fromEntries(
    years.map((y) => [
      y,
      (item: any) => item.date === y && item.brand !== "iPhone",
    ]),
  ),
};

function App() {
  const [filterType, setFilterType] = useState("all");

  const filteredData = useMemo(() => {
    const rule =
      filterRules[filterType as keyof typeof filterRules] || (() => true);
    return data
      .filter(rule)
      .sort((a, b) => parseInt(a.price) - parseInt(b.price));
  }, [filterType]);

  const allButtons: ButtonItem[] = [
    { label: "Все", value: "all" },
    ...brands.map(
      (b): FilterButton => ({
        label: b,
        value: b.toLowerCase(),
        specialClass: b === "iPhone" ? buttonStyles.iphoneButton : undefined,
      }),
    ),
    { isDivider: true },
    ...years.map((y): FilterButton => ({ label: y, value: y })),
  ];

  return (
    <div className={s.app}>
      <div className={s.filter}>
        {allButtons.map((btn, idx) => {
          if ("isDivider" in btn) {
            return <div key={`divider-${idx}`} className={s.lineV}></div>;
          }
          return (
            <Button
              key={btn.value}
              label={btn.label}
              value={btn.value}
              currentFilter={filterType}
              onClick={setFilterType}
              className={btn.specialClass}
            />
          );
        })}
      </div>

      <div className={s.cards}>
        {filteredData.map((card) => (
          <div
            className={s.card}
            key={`${card.brand}-${card.model}-${card.date}`}
          >
            <div className={s.name}>
              {card.brand} {card.model}
            </div>
            <div className={s.specs}>
              <div className={s.date}>{card.date}</div>
              <div className={s.price}>
                {parseInt(card.price).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
