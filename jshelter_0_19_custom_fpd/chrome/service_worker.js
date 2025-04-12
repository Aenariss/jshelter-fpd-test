/** \file
 * \brief Stub service worker including all the background scripts
 *
 *  \author Copyright (C) 2019  Libor Polcak
 *  \author Copyright (C) 2019  Martin Timko
 *  \author Copyright (C) 2023  Martin Zmitko
 *  \author Copyright (C) 2025  Vojtech Fiala
 *
 *  \license SPDX-License-Identifier: GPL-3.0-or-later
 */
//
//  This program is free software: you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation, either version 3 of the License, or
//  (at your option) any later version.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with this program.  If not, see <https://www.gnu.org/licenses/>.
//
importScripts(
  "nscl/lib/browser-polyfill.js",
  "lib/sha256.js",
  "nscl/common/CachedStorage.js",
  "nscl/common/log.js",
  "nscl/common/uuid.js",
  // "nscl/common/SyncMessage.js",
  "nscl/common/tld.js",
  "nscl/service/DocStartInjection.js",
  "nscl/service/TabCache.js",
  "nscl/service/NavCache.js",
  "helpers.js",
  "session_hash.js",
  "update.js",
  "url.js",
  "settings_tweaks.js",
  "levels.js",
  "fp_report_custom.js",
  "fp_levels.js",
  "fp_detect_background.js",
  "background.js",
  "level_cache.js",
  "wrapping.js","wrappingL-CANVAS.js","wrappingL-SENSOR.js","wrappingS-AJAX.js","wrappingS-BATTERY-CR.js","wrappingS-BE.js","wrappingS-COOP-SCHEDULING.js","wrappingS-DM.js","wrappingS-DOM.js","wrappingS-ECMA-ARRAY.js","wrappingS-ECMA-DATE.js","wrappingS-ECMA-SHARED.js","wrappingS-EME.js","wrappingS-GEO.js","wrappingS-GP.js","wrappingS-H-C.js","wrappingS-HRT.js","wrappingS-HTML-LS.js","wrappingS-HTML.js","wrappingS-HTML5.js","wrappingS-IDLE.js","wrappingS-MCS.js","wrappingS-MEDIA-CAPABILITIES.js","wrappingS-NET.js","wrappingS-NFC.js","wrappingS-NP.js","wrappingS-PT2.js","wrappingS-SENSOR-ACCEL.js","wrappingS-SENSOR-GYRO.js","wrappingS-SENSOR-LIGHT.js","wrappingS-SENSOR-MAGNET.js","wrappingS-SENSOR-ORIENT.js","wrappingS-SENSOR.js","wrappingS-VR.js","wrappingS-WEBA.js","wrappingS-WEBGL.js","wrappingS-XR.js",
  "alea.js",
  "crc16.js",
  "code_builders.js",
  "fp_code_builders.js",
  "nscl/content/patchWindow.js"
  //"http_shield_chrome.js",
  //"http_shield_common.js"
);
