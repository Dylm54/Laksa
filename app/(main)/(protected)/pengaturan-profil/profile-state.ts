export type ProfileValues = { full_name: string; username: string };

export type ProfileState = {
  status: "idle" | "success" | "error";
  message: string;
  values: ProfileValues;
  errors?: Partial<Record<keyof ProfileValues, string>>;
};
