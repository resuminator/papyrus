/*
    Papyrus, PDF Generation Service for Resuminator
    Copyright (C) 2021 Resuminator Authors

    This file is part of Papyrus.

    Papyrus is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Papyrus is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Papyrus.  If not, see <https://www.gnu.org/licenses/>.
*/

import chromium from "chrome-aws-lambda";
import puppeteer, { Browser } from "puppeteer-core";
import loadFonts from "./fonts";

export const getBrowserInstance = async (): Promise<Browser> => {
  const options = process.env.AWS_REGION
    ? {
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
      }
    : {
        args: chromium.args,
        headless: true,
        ignoreHTTPSErrors: true,
        executablePath:
          process.platform === "win32"
            ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
            : process.platform === "linux"
            ? "/usr/bin/google-chrome"
            : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      };

  //{__dirname} in prod = /var/task/.next/server/pages/api
  await loadFonts(chromium);
  return await puppeteer.launch(options);
};
