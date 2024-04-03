import type { Icon } from '~/schemas/Icon';
import { isLocation, type Location } from '~/types/Location';
import { isLatLng, type LatLng } from '~/types/LatLng';

export class Marker {
  private id: string;
  private username: string;
  private title: string;
  private color?: string;
  private description?: string;
  private icon?: Icon;
  private position: Location;

  constructor(m: {
    id: string;
    username: string;
    title: string;
    color?: string;
    description?: string;
    icon?: Icon;
    position: Location | LatLng | { latitude: string; longitude: string };
  }) {
    this.id = m.id;
    this.color = m.color;
    this.username = m.username;
    this.title = m.title;
    this.description = m.description;
    this.icon = m.icon;
    if (isLatLng(m.position)) {
      this.position = { latitude: m.position.lat, longitude: m.position.lng };
    } else if (isLocation(m.position)) {
      this.position = m.position;
    } else {
      this.position = { latitude: parseFloat(m.position.latitude), longitude: parseFloat(m.position.longitude) };
    }
  }

  getId(): string {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getColor(): string | undefined {
    return this.color;
  }

  getUsername(): string {
    return this.username;
  }

  getDescription(): string | undefined {
    return this.description;
  }

  hasDescription(): boolean {
    return !!this.description;
  }

  getIcon(): Icon | undefined {
    return this.icon;
  }

  getPosition(): Location {
    return this.position;
  }

  getMapPosition(): LatLng {
    if (this.position) return { lat: this.position.latitude, lng: this.position.longitude } as LatLng;
    else return { lat: 0, lng: 0 } as LatLng;
  }

  setTitle(title: string): void {
    this.title = title;
  }

  setDescription(description: string): void {
    this.description = description;
  }

  setIcon(icon: Icon): void {
    this.icon = icon;
  }

  setPosition(position: Location): void {
    this.position = position;
  }

  toJSON() {
    return { ...this }; // POJO's copy of the class instance
  }
}
