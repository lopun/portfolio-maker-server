from selenium import webdriver
from bs4 import BeautifulSoup
import platform
import os
import sys

if ("Windows" in platform.platform()):
  driver = webdriver.PhantomJS(os.path.dirname(os.path.abspath(__file__)) + "/phantomjs/bin/phantomjs")
else:
  driver = webdriver.PhantomJS()

driver.implicitly_wait(3)

driver.get("https://github.com/" + sys.argv[1] + "?tab=repositories")
html = driver.page_source
soup = BeautifulSoup(html, "html.parser")
lists = soup.find_all(attrs={"data-filterable-for":"your-repos-filter"})[0].select("li")
result = []

for n in lists:
    title = n.select("div > h3 > a")[0].text.strip()
    stack = "None"
    if (n.find_all(attrs={"itemprop": "programmingLanguage"}) != []):
        stack = n.find_all(attrs={"itemprop": "programmingLanguage"})[0].text.strip()
    result.append({"title":title, "stack":stack})
print(result)