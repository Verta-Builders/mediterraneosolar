"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Globe, Globe2, Globe2Icon, Languages, LucideLanguages } from "lucide-react";

const localeLabels: Record<string, { short: string; full: string }> = {
  es: { short: "ES", full: "Español" },
  en: { short: "EN", full: "English" },
};

export default function LanguageSwitcher({ isDark }: { isDark?: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function onSelectChange(nextLocale: string) {
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <Select defaultValue={locale} onValueChange={onSelectChange}>
      <SelectTrigger
        aria-label="Select Language"
        className={`w-auto rounded-full h-8 border-none bg-transparent shadow-none transition-colors focus:ring-0 px-2 gap-2 cursor-pointer ${isDark
          ? 'text-white/90 hover:text-white hover:bg-white/10'
          : 'text-neutral-900 hover:text-green-600 hover:bg-neutral-100'
          }`}
      >
        <Globe2 className={`w-4 h-4 ${isDark ? 'text-white/90' : 'text-neutral-500'}`} />
        <span className="text-sm font-medium">{localeLabels[locale]?.short ?? locale.toUpperCase()}</span>
      </SelectTrigger>
      <SelectContent
        align="end"
        position="popper"
        sideOffset={8}
        className={`border-none backdrop-blur-md shadow-lg rounded-xl min-w-[5rem] ${isDark
          ? 'bg-white/10 text-white'
          : 'bg-white/70 text-neutral-900'
          }`}
      >
        <SelectItem
          value="es"
          className={`cursor-pointer rounded-lg ${isDark ? 'focus:bg-white/20 focus:text-white' : 'focus:bg-black/5 focus:text-neutral-900'}`}
        >
          Español
        </SelectItem>
        <SelectItem
          value="en"
          className={`cursor-pointer rounded-lg ${isDark ? 'focus:bg-white/20 focus:text-white' : 'focus:bg-black/5 focus:text-neutral-900'}`}
        >
          English
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
