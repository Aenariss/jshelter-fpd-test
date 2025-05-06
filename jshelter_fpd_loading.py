import time
import os

from selenium import webdriver
import selenium.webdriver.chrome.service as ChromeService
import selenium.webdriver.chrome.options as ChromeOptions
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

opts = {"HEADLESS": False}
HEADLESS = "HEADLESS"

# List of pages where FPD report does not track correctly
ERROR_PAGES = ["https://facebook.com", "https://firmy.cz", "https://zalando.cz", "https://pons.com"]

# List of pages where 0.19 tracks correctly but 0.20 does not
PAGES_WORKING_WITH_PREVIOUS = ["https://novinky.cz", "https://tiktok.com", "https://vut.cz"]

def setup_jshelter_custom_fpd(options: dict, download_path: str) -> webdriver.Chrome:

    # Set up Chrome options
    chrome_options = ChromeOptions.Options()
    chrome_options.add_argument("--enable-javascript")
    chrome_options.add_argument('--enable-extensions')
    chrome_options.add_argument('--ignore-certificate-errors')
    chrome_options.add_argument("--allow-running-insecure-content")

    if options.get(HEADLESS):
        chrome_options.add_argument("--headless=new")

    # Chrome 134
    chrome_options.browser_version = "134"
    chrome_options.add_experimental_option('prefs', {
        'download.default_directory': download_path,
        'download.prompt_for_download': False,
        'download.directory_upgrade': True
    })

    # Set-up JShelter FPD -- custom version, all shields are off, fpd is set on by default
    chrome_options.add_extension("./jshelter_0_20_2_custom_fpd.crx")


    service = ChromeService.Service()
    driver = webdriver.Chrome(service=service, options=chrome_options)

    # Wait at most this time (seconds) for a page to load
    driver.set_page_load_timeout(20)

    return driver

def enable_developer_mode(driver: webdriver.Chrome | webdriver.Firefox) -> None:
    """Function to enable developer mode inside Selenium"""
    driver.get("chrome://extensions")

    # Everything is inside <extensions-manager></>
    WebDriverWait(driver, 20).until(EC.presence_of_element_located(
        (By.TAG_NAME, "extensions-manager")
    ))

    # Everything is inside shadow root inside <extensions-amanger>
    shadow_root = driver.find_element(By.TAG_NAME, "extensions-manager").shadow_root

    # Get toolbar inside shadow root
    toolbar = shadow_root.find_element(By.ID, "toolbar")

    # The button is in <cr-toggle id="devMode"> inside toolbar shadowroot
    toolbar_shadow = toolbar.shadow_root
    dev_mode_button = toolbar_shadow.find_element(By.ID, "devMode")

    # Click the button to enable devmode
    dev_mode_button.click()

    # Now click update to apply the devmode
    # Update button is inside toolbar shadow as <cr-button id="updateNow">
    update_button = toolbar_shadow.find_element(By.ID, "updateNow")

    # Click using JavaScript since normal .click() doesnt work
    driver.execute_script("arguments[0].click();", update_button)

    time.sleep(0.5)


for page in PAGES_WORKING_WITH_PREVIOUS[:1]:
    # Setup custom driver with JShelter FPD on by default
    driver_with_fpd = setup_jshelter_custom_fpd(opts, os.path.abspath("./"))

    time.sleep(2)

    # Enable developer mode
    enable_developer_mode(driver_with_fpd)

    time.sleep(2)

    print(f"Visiting page {page}")
    driver_with_fpd.get(page)
    time.sleep(100)
    driver_with_fpd.quit()
