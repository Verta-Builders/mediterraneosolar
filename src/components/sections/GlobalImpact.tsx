"use client";

import { useTranslations } from "next-intl";
import { Globe2 } from "lucide-react";

export default function GlobalImpact() {
    const t = useTranslations("GlobalImpact");

    return (
        <section id="global-impact" className="py-32 bg-neutral-900 text-white relative overflow-hidden">
            {/* Abstract World Map Dots Background */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-3 gap-16 items-center">
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 lg:col-span-2">
                    <span className="text-green-400 font-bold tracking-widest text-xs uppercase mb-2 block">
                        {t("tagline")}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 tracking-tight text-white">
                        {t("title")}
                    </h2>
                    <p className="text-neutral-400 text-lg leading-relaxed mb-8 font-light">
                        {t("description")}
                    </p>

                    <div className="grid md:grid-cols-3 grid-cols-1 gap-8 mb-8">
                        <div>
                            <div className="text-3xl font-bold text-white mb-1">{t("stats.co2Value")}</div>
                            <div className="text-sm text-neutral-500">{t("stats.co2Label")}</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white mb-1">{t("stats.savingsValue")}</div>
                            <div className="text-sm text-neutral-500">{t("stats.savingsLabel")}</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white mb-1">{t("stats.treesValue")}</div>
                            <div className="text-sm text-neutral-500">{t("stats.treesLabel")}</div>
                        </div>
                    </div>
                </div>

                <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 relative">
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-800">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-300"></div>
                        <div className="p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                                    <Globe2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-white">{t("caseStudy.title")}</h4>
                                    <p className="text-xs text-neutral-400">{t("caseStudy.date")}</p>
                                </div>
                            </div>
                            <p className="text-neutral-300 text-sm mb-6 leading-relaxed font-light">
                                {t("caseStudy.description")}
                            </p>
                            <div className="w-full bg-neutral-700 h-2 rounded-full mb-2 overflow-hidden">
                                <div className="bg-green-500 h-full w-[100%]"></div>
                            </div>
                            <div className="flex justify-between text-xs text-neutral-400">
                                <span>{t("caseStudy.targetLabel")}</span>
                                <span className="text-white font-medium">{t("caseStudy.targetAchieved")}</span>
                            </div>
                        </div>
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-green-600 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
                </div>
            </div>
        </section>
    );
}
