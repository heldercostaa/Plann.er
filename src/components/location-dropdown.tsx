import { Dropdown, MenuProps } from "antd";
import { ItemType } from "antd/es/menu/interface";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { locationiqApi } from "../lib/axios";
import { Input } from "./input";

interface LocationDropdownProps {
  setDestination: (destination: string) => void;
  disabled?: boolean;
  destination: string;
  inputVariant: "borderless" | "filled";
  placeholder: string;
}

interface LocationResponse {
  address: {
    name: string;
    country: string;
    city?: string;
    state?: string;
  };
}

export function LocationDropdown({
  setDestination,
  disabled = false,
  destination,
  inputVariant,
  placeholder,
}: LocationDropdownProps) {
  const [locationsMenuItems, setLocationsMenuItems] = useState<ItemType[]>([]);

  useEffect(() => {
    if (!destination) return;

    const delay = 1000;
    const timerId = setTimeout(() => {
      locationiqApi
        .get<LocationResponse[]>("/autocomplete", {
          params: {
            q: destination,
            limit: 3,
          },
        })
        .then((response) => {
          const locations = response.data.map(
            (loc) => `${loc.address.name}, ${loc.address.country}`,
          );
          const noDupes = [...new Set(locations)];
          const menuItems = noDupes.map((loc) => ({
            key: loc,
            label: loc,
            icon: <MapPin />,
          }));
          setLocationsMenuItems(menuItems);
        });
    }, delay);

    return () => clearTimeout(timerId);
  }, [destination]);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    setDestination(e.key);
  };

  return (
    <Dropdown
      menu={{ items: locationsMenuItems, onClick: handleMenuClick }}
      placement="bottomLeft"
      trigger={["click"]}
    >
      <Input
        Icon={MapPin}
        type="text"
        disabled={disabled}
        onChange={(event) => setDestination(event.target.value)}
        placeholder={placeholder}
        value={destination}
        variant={inputVariant}
      />
    </Dropdown>
  );
}
