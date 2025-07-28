import { defineConfig } from "vitepress";

export default defineConfig({
  title: "The Ultimate Handbook of AI",
  description:
    "This website aims to teach every tool within python to do data science and ai training.",
  themeConfig: {
    nav: [
      { text: "Ana Sayfa", link: "/" },
      { text: "Matplotlib", link: "/matplotlib/matplotlib-ders" },
      { text: "Seaborn", link: "/seaborn/seaborn-ders" },
      { text: "Ödevler", link: "/odevler" },
    ],

    sidebar: [
      {
        items: [
          {
            text: "Pandas",
            items: [
              { text: "Pandas Ders Anlatımı", link: "/pandas/pandas-ders" },
              { text: "Pandas Ödevler", link: "/pandas/pandas-odevler" },
            ],
          },
          {
            text: "Numpy",
            items: [
              { text: "Numpy Ders Anlatımı", link: "/numpy/numpy-ders" },
              { text: "Numpy Ödevler", link: "/numpy/numpy-odevler" },
            ],
          },
          {
            text: "Matplotlib",
            items: [
              {
                text: "Matplotlib Ders Anlatımı",
                link: "/matplotlib/matplotlib-ders",
              },
              {
                text: "Matplotlib Ödevler",
                link: "/matplotlib/matplotlib-odevler",
              },
            ],
          },
          {
            text: "Seaborn",
            items: [
              { text: "Seaborn Ders Anlatımı", link: "/seaborn/seaborn-ders" },
              { text: "Seaborn Ödevler", link: "/seaborn/seaborn-odevler" },
            ],
          },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/SalihBulmaz/AI-Handbook" },
    ],

    footer: {
      message: "Released under the SB License.",
      copyright: "Copyright © 2025-present Salih Bulmaz",
    },
  },
});
