"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function onSelectChange(nextLocale: string) {
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <Select defaultValue={locale} onValueChange={onSelectChange}>
      <SelectTrigger className="w-auto h-8 border-none bg-transparent shadow-none hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus:ring-0 px-2 gap-2">
        <Globe className="w-4 h-4 text-neutral-500" />
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent align="end">
        <SelectItem value="es">ES</SelectItem>
        <SelectItem value="en">EN</SelectItem>
      </SelectContent>
    </Select>
  );
}
