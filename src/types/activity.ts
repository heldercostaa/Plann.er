export interface Activity {
  date: string;
  activities: {
    id: string;
    title: string;
    occursAt: string;
  }[];
}
