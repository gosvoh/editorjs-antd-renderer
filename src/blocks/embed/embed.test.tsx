/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-useless-escape */

import { expect, test } from "bun:test";
// @ts-expect-error TS6133
import Renderer from "../../index";
// @ts-expect-error TS6133
import { screen, render } from "@testing-library/react";
import React from "react";
import Embed from "./embed";

const patterns = {
  vimeo:
    /(?:http[s]?:\/\/)?(?:www.)?(?:player.)?vimeo\.co(?:.+\/([^\/]\d+)(?:#t=[\d]+)?s?$)/,
  youtube:
    /(?:https?:\/\/)?(?:www\.)?(?:(?:youtu\.be\/)|(?:youtube\.com)\/(?:v\/|u\/\w\/|embed\/|watch))(?:(?:\?v=)?([^#&?=]*))?((?:[?&]\w*=\w*)*)/,
  coub: /https?:\/\/coub\.com\/view\/([^\/\?\&]+)/,
  vine: /https?:\/\/vine\.co\/v\/([^\/\?\&]+)/,
  imgur: /https?:\/\/(?:i\.)?imgur\.com.*\/([a-zA-Z0-9]+)(?:\.gifv)?/,
  gfycat: /https?:\/\/gfycat\.com(?:\/detail)?\/([a-zA-Z]+)/,
  "twitch-channel": /https?:\/\/www\.twitch\.tv\/([^\/\?\&]*)\/?$/,
  "twitch-video":
    /https?:\/\/www\.twitch\.tv\/(?:[^\/\?\&]*\/v|videos)\/([0-9]*)/,
  "yandex-music-album": /https?:\/\/music\.yandex\.ru\/album\/([0-9]*)\/?$/,
  "yandex-music-track":
    /https?:\/\/music\.yandex\.ru\/album\/([0-9]*)\/track\/([0-9]*)/,
  "yandex-music-playlist":
    /https?:\/\/music\.yandex\.ru\/users\/([^\/\?\&]*)\/playlists\/([0-9]*)/,
  codepen: /https?:\/\/codepen\.io\/([^\/\?\&]*)\/pen\/([^\/\?\&]*)/,
  instagram: /^https:\/\/(?:www\.)?instagram\.com\/(?:reel|p)\/(.*)/,
  twitter: /^https?:\/\/(www\.)?(?:twitter\.com|x\.com)\/.+\/status\/(\d+)/,
  pinterest: /https?:\/\/([^\/\?\&]*).pinterest.com\/pin\/([^\/\?\&]*)\/?$/,
  facebook: /https?:\/\/www.facebook.com\/([^\/\?\&]*)\/(.*)/,
  aparat: /(?:http[s]?:\/\/)?(?:www.)?aparat\.com\/v\/([^\/\?\&]+)\/?/,
  miro: /https:\/\/miro.com\/\S+(\S{12})\/(\S+)?/,
  github: /https?:\/\/gist.github.com\/([^\/\?\&]*)\/([^\/\?\&]*)/,
};

// @ts-expect-error TS6133
const prepareData = (
  service: string,
  urls: { source: string; embed: string },
) => ({
  blocks: [
    {
      type: "embed",
      data: { service, ...urls } as React.ComponentProps<typeof Embed>["data"],
    },
  ],
});

test("YouTube", async () => {
  const service = "youtube";

  const urls = [
    {
      source: "https://www.youtube.com/watch?v=wZZ7oFKsKzY&t=120",
      embed: "https://www.youtube.com/embed/wZZ7oFKsKzY?start=120",
    },
    {
      source:
        "https://www.youtube.com/embed/_q51LZ2HpbE?list=PLLy6qvPKpdlV3OAw00EuZMoYPz4pYuwuN",
      embed:
        "https://www.youtube.com/embed/_q51LZ2HpbE?list=PLLy6qvPKpdlV3OAw00EuZMoYPz4pYuwuN",
    },
    {
      source: "https://www.youtube.com/watch?time_continue=173&v=Nd9LbCWpHp8",
      embed: "https://www.youtube.com/embed/Nd9LbCWpHp8?start=173",
    },
    {
      source: "https://www.youtube.com/watch?v=efBBjIK3b8I&list=LL&t=1337",
      embed: "https://www.youtube.com/embed/efBBjIK3b8I?start=1337",
    },
    {
      source:
        "https://www.youtube.com/watch?v=yQUeAin7fII&list=RDMMnMXCzscqi_M",
      embed: "https://www.youtube.com/embed/yQUeAin7fII?",
    },
    {
      source:
        "https://www.youtube.com/watch?v=3kw2sttGXMI&list=FLgc4xqIMDoiP4KOTFS21TJA",
      embed: "https://www.youtube.com/embed/3kw2sttGXMI?",
    },
  ];

  urls.forEach((url) => {
    expect(patterns[service].test(url.source)).toBe(true);

    // render(<Renderer data={prepareData(service, url)} />); - TODO: Failed to execute "fetch()" on "Window" with URL
  });
});
