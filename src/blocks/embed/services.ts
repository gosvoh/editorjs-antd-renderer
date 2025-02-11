/* eslint-disable no-useless-escape */

import type { ServicesConfigType } from "./serviceConfig";

const SERVICES: ServicesConfigType = {
  vimeo: {
    html: '<iframe style="width:100%;" height="320" frameborder="0"></iframe>',
  },
  youtube: {
    html: '<iframe style="width:100%;" height="320" frameborder="0" allowfullscreen></iframe>',
  },
  coub: {
    html: '<iframe style="width:100%;" height="320" frameborder="0" allowfullscreen></iframe>',
  },
  vine: {
    html: '<iframe style="width:100%;" height="320" frameborder="0" allowfullscreen></iframe>',
  },
  imgur: {
    html: '<iframe allowfullscreen="true" scrolling="no" class="imgur-embed-iframe-pub" style="height: 500px; width: 100%; border: 1px solid #000"></iframe>',
  },
  gfycat: {
    html: "<iframe frameborder='0' scrolling='no' style=\"width:100%;\" height='436' allowfullscreen ></iframe>",
  },
  "twitch-channel": {
    html: '<iframe frameborder="0" allowfullscreen="true" scrolling="no" height="366" style="width:100%;"></iframe>',
  },
  "twitch-video": {
    html: '<iframe frameborder="0" allowfullscreen="true" scrolling="no" height="366" style="width:100%;"></iframe>',
  },
  "yandex-music-album": {
    html: '<iframe frameborder=\"0\" style=\"border:none;width:540px;height:400px;\" style=\"width:100%;\" height=\"400\"></iframe>',
  },
  "yandex-music-track": {
    html: '<iframe frameborder="0" style="border:none;width:540px;height:100px;" style="width:100%;" height="100"></iframe>',
  },
  "yandex-music-playlist": {
    html: '<iframe frameborder="0" style="border:none;width:540px;height:400px;" width="540" height="400"></iframe>',
  },
  codepen: {
    html: "<iframe height='300' scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>",
  },
  instagram: {
    html: '<iframe width="400" height="505" style="margin: 0 auto;" frameborder="0" scrolling="no" allowtransparency="true"></iframe>',
  },
  twitter: {
    html: '<iframe width="600" height="600" style="margin: 0 auto;" frameborder="0" scrolling="no" allowtransparency="true"></iframe>',
  },
  pinterest: {
    html: "<iframe scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%; min-height: 400px; max-height: 1000px;'></iframe>",
  },
  facebook: {
    html: "<iframe scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%; min-height: 500px; max-height: 1000px;'></iframe>",
  },
  aparat: {
    html: '<iframe width="600" height="300" style="margin: 0 auto;" frameborder="0" scrolling="no" allowtransparency="true"></iframe>',
  },
  miro: {
    html: '<iframe width="700" height="500" style="margin: 0 auto;" allowFullScreen frameBorder="0" scrolling="no"></iframe>',
  },
  github: {
    html: '<iframe width="100%" height="350" frameborder="0" style="margin: 0 auto;"></iframe>',
  },
} as const;

export default SERVICES;
