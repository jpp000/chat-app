import { useThemeStore } from "../../store/useThemeStore";
import Settings from "./Settings";

const SettingsContainer = () => {
  const { theme, setTheme } = useThemeStore();

  return <Settings theme={theme} setTheme={setTheme} />;
};

export default SettingsContainer;
