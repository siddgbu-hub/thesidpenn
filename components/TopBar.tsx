import themeConfig from "../theme.config";

export default function TopBar() {
  return (
    <div className="w-full bg-[#1a1a18] text-[#FAF8F5] text-center py-2 px-4 font-ui text-sm font-medium tracking-wide">
      {themeConfig.tagline}
    </div>
  );
}
