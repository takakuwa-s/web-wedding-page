export interface Config {
  fileFeatureAvailable: boolean;
  attendanceFeatureAvailable: boolean;
}

export function initConfig(): Config {
  return {
    fileFeatureAvailable: true,
    attendanceFeatureAvailable: true
  };
}