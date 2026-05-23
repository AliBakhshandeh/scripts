// Google Rank Finder
// F12 > Console

(async () => {

  const domain = prompt("Enter domain:") || "";

  const keyword = prompt("Enter search keyword:") || "";

  const maxPages = parseInt(
    prompt("Enter number of pages:")
  ) || 5;

  // Only delay has default value
  const delayTime = parseInt(
    prompt("Delay (ms):", "2000")
  ) || 2000;

  const delay = (ms) => new Promise(r => setTimeout(r, ms));

  console.log("========== START ==========");
  console.log("Domain:", domain);
  console.log("Keyword:", keyword);
  console.log("Pages:", maxPages);
  console.log("Delay:", delayTime, "ms");
  console.log("===========================");

  for (let page = 0; page < maxPages; page++) {

    const start = page * 10;

    const url =
      `https://www.google.com/search?q=${encodeURIComponent(keyword)}&start=${start}`;

    console.log(`🔍 Checking page ${page + 1}...`);

    try {

      const res = await fetch(url, {
        credentials: "include"
      });

      const html = await res.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const links = [...doc.querySelectorAll("a")];

      let found = false;

      for (let i = 0; i < links.length; i++) {

        const href = links[i].href || "";

        if (href.includes(domain)) {

          const rank = start + i + 1;

          console.log("✅ FOUND!");
          console.log("Domain:", domain);
          console.log("Keyword:", keyword);
          console.log("Rank:", rank);
          console.log("Page:", page + 1);
          console.log("Link:", href);

          found = true;
          return;
        }
      }

      if (!found) {
        console.log(`❌ Not found on page ${page + 1}`);
      }

    } catch (err) {
      console.error("⛔ Error:", err);
    }

    await delay(delayTime);
  }

  console.log("🚫 Domain not found");

})();