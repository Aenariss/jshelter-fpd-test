/** \file
 * \brief Functions that summarize fingerprints and generate FPD report, edited to automatically download it
 * \ingroup FPD
 *
 *  \author Copyright (C) 2022  Marek Salon
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

let hiddenTraces = {};

var tabId = ""

/**
 * The function that populates FPD report page with data from the latest evaluation and hooks up listeners.
 *
 * \param data Information about latest fingerprinting evaluation consisting of all essential FPD objects.
 */
function createReportCustom(data) {
	var {tabObj, groups, latestEvals, fpDb, exceptionWrappers} = data;
}

// create on-site JSON representation of FPD evaluation data and download it
function exportReportCustom() {
	let obj = {
        fpd_evaluation_statistics: latestEvals.evalStats,
        fpd_access_logs: fpDb
    };

    let jsonData = JSON.stringify(obj);
	let dataUrl = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj))


	// Send the logged data to the content script who will print them
	browser.tabs.sendMessage(fpd_track_callers_tab, {fpd_logs: jsonData});

	const sanitizedFilename = current_page_name.replace(/[^a-z0-9_-]/gi, '_') + '.json';

	browser.downloads.download({
		url: dataUrl,
		filename: sanitizedFilename,
		saveAs: false
	  });
}

function refreshReportCustom() {
	browser.runtime.sendMessage({
		purpose: "fpd-get-report-data",
		tabId: tabId
	}).then((result) => {
		createReportCustom(result);
	});
	browser.runtime.sendMessage({purpose: "fpd-track-callers-stop"});
	exportReportCustom();
}

function trackCallersCustom(id) {
	fpd_track_callers_tab = id
	function onReloaded() {
		setTimeout(refreshReportCustom, 5000);
	}
	onReloaded();
}
