/* eslint-disable no-useless-escape */

import { expect, test, beforeAll } from "bun:test";
import { render } from "@testing-library/react";
import Embed from "./embed";

beforeAll(() => {
  // Prevent happy-dom from fetching iframe src URLs
  global.fetch = (() =>
    Promise.resolve(new Response())) as unknown as typeof fetch;
});

const patterns: Record<string, RegExp> = {
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

const youtubeUrls = [
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
];

test("YouTube pattern matches source URLs", () => {
  youtubeUrls.forEach(({ source }) => {
    expect(patterns["youtube"].test(source)).toBe(true);
  });
});

test("YouTube renders iframe with correct src", () => {
  const { source, embed } = youtubeUrls[0];
  render(<Embed data={{ service: "youtube", source, embed }} />);
  const iframe = document.querySelector("iframe");
  expect(iframe?.getAttribute("src")).toBe(embed);
});

test("Unknown service renders nothing", () => {
  const { container } = render(
    <Embed
      data={{
        service: "unknown-service",
        source: "https://example.com",
        embed: "https://example.com/embed",
      }}
    />,
  );
  expect(container.firstChild).toBeNull();
});
