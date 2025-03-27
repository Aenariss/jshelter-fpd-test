# jshelter-fpd-test
Repository for testing the FPD functionality of JShelter.

- ``./jshelter_0_20_custom_fpd/`` is compiled version of JShelter 0.20 for Chrome.
- ``./jshelter_fpd_loading.py`` is the testing script used to reproduce the issue.
- ``./jshelter_0_20_custom.crx`` is the custom version 0.20 in the .crx format.
- ``./jshelter_0_19_custom_fpd/`` is the custom version 0.19 in the .crx format.
- ``./requirements.txt`` are Python requirements for the testing script (pip install -r requirements.txt)

You can launch the testing script as ``python ./jshelter_fpd_loading.py``. After a few seconds, FPD report for each visited page will be downloaded into the folder.

JShelter was modified to have the option for tracking calling script allowed by default. Default shields are disabled by default.
All custom edits are marked by a commentary ``// 2025 custom edit`` or ``// custom 2025 edit``.

Edited files are:
- ``document_start.js`` -> added listener to log FPD report in console
- ``fp_level.js`` -> created new listener for when a new page has been opened. Launches the custom caller tracking function.
- ``fp_report_custom.js`` -> obtains the callers and downloads them as json.
- ``level_cache.js`` -> sets trackCallers to always ``true``. Always assigns FPD wrappers.
- ``levels.js`` -> sets const fpdOn to ``true``. Sets the protection level to 0.
- ``service_worker.js`` -> includes ``fp_report_custom.js``.
- ``manifest.json`` -> added permission for downloads.

Developer Mode is enabled for the extension and the extension is reloaded after enabling it.

The issue is that initial visit to a specified page does not correctly track FPD callers. The downloaded report is empty. However, after clicking track callers, the page reloads and the report downloads automatically and correctly filled.
In version 0.19 (included in the repo), the code worked, only some of the pages (~10%) were affected by the same issue. In 0.20, the automatic tracking (using the same custom edits) no longer works.