"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, Languages } from "lucide-react";

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
        className={`w-auto rounded-full h-8 border-none bg-transparent shadow-none transition-colors focus:ring-0 px-2 gap-2 ${isDark
          ? 'text-white/90 hover:text-white hover:bg-white/10'
          : 'text-neutral-900 hover:text-green-600 hover:bg-neutral-100'
          }`}
      >
        <Languages className={`w-4 h-4 ${isDark ? 'text-white/90' : 'text-neutral-500'}`} />
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent
        align="end"
        position="popper"
        sideOffset={8}
        className={`border-none backdrop-blur-md shadow-lg rounded-xl ${isDark
          ? 'bg-white/10 text-white'
          : 'bg-white/70 text-neutral-900'
          }`}
      >
        <SelectItem
          value="es"
          className={`cursor-pointer rounded-lg ${isDark ? 'focus:bg-white/20 focus:text-white' : 'focus:bg-black/5 focus:text-neutral-900'}`}
        >
          ES
        </SelectItem>
        <SelectItem
          value="en"
          className={`cursor-pointer rounded-lg ${isDark ? 'focus:bg-white/20 focus:text-white' : 'focus:bg-black/5 focus:text-neutral-900'}`}
        >
          EN
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
