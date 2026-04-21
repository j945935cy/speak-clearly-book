document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const titleBlock = document.getElementById("title-block-header");
  const toc = document.getElementById("TOC");

  if (!body || !titleBlock || !toc) return;

  const title = titleBlock.querySelector(".title")?.textContent?.trim() || "";
  const subtitle = titleBlock.querySelector(".subtitle")?.textContent?.trim() || "";
  const author = titleBlock.querySelector(".author")?.textContent?.trim() || "";
  const date = titleBlock.querySelector(".date")?.textContent?.trim() || "";

  const contentNodes = Array.from(body.children).filter((node) => {
    return node !== titleBlock && node !== toc;
  });

  const topLinks = Array.from(toc.querySelectorAll(":scope > ul > li > a"));

  const page = document.createElement("div");
  page.className = "apple-page";

  const ribbon = document.createElement("header");
  ribbon.className = "site-ribbon";
  ribbon.innerHTML = `
    <div class="ribbon-inner">
      <div class="ribbon-brand">${title || "學會講清楚"}</div>
      <div class="ribbon-meta">${author}${author && date ? " · " : ""}${date}</div>
    </div>
  `;

  const hero = document.createElement("section");
  hero.className = "hero-panel";
  hero.innerHTML = `
    <div class="hero-copy">
      <p class="hero-kicker">Speak Clearly Book</p>
      <h1>${title}</h1>
      <p class="hero-subtitle">${subtitle}</p>
      <div class="hero-actions">
        <a class="hero-button primary" href="#${topLinks[0]?.getAttribute("href")?.replace(/^#/, "") || ""}">開始閱讀</a>
        <a class="hero-button secondary" href="book.epub">下載 EPUB</a>
      </div>
    </div>
  `;

  const chapterNav = document.createElement("nav");
  chapterNav.className = "chapter-strip";

  topLinks.forEach((link, index) => {
    const chip = document.createElement("a");
    chip.className = "chapter-chip";
    chip.href = link.getAttribute("href") || "#";
    chip.innerHTML = `<span>${String(index + 1).padStart(2, "0")}</span><strong>${link.textContent.trim()}</strong>`;
    chapterNav.appendChild(chip);
  });

  const main = document.createElement("main");
  main.className = "panel-stack";

  const sections = [];
  let current = null;

  contentNodes.forEach((node) => {
    if (node.tagName === "H1") {
      current = {
        heading: node,
        nodes: []
      };
      sections.push(current);
      return;
    }

    if (current) {
      current.nodes.push(node);
    }
  });

  sections.forEach((section, index) => {
    const article = document.createElement("section");
    article.className = `chapter-panel panel-${index % 4}`;
    const sectionId = section.heading.id || `section-${index + 1}`;
    article.id = sectionId;

    const headingText = section.heading.textContent.trim();
    const match = headingText.match(/^第(\d+)章/);
    const label = match ? `Chapter ${String(match[1]).padStart(2, "0")}` : "Introduction";

    const header = document.createElement("div");
    header.className = "panel-header";
    header.innerHTML = `
      <p class="panel-kicker">${label}</p>
      <h2>${headingText}</h2>
    `;
    article.appendChild(header);

    const bodyWrap = document.createElement("div");
    bodyWrap.className = "panel-body";
    section.nodes.forEach((node) => bodyWrap.appendChild(node));
    article.appendChild(bodyWrap);

    main.appendChild(article);
  });

  const footer = document.createElement("footer");
  footer.className = "page-footer";
  footer.innerHTML = `
    <p>以 Markdown 撰寫，使用 Pandoc 建置為網站與 EPUB。</p>
  `;

  page.append(ribbon, hero, chapterNav, main, footer);
  body.innerHTML = "";
  body.appendChild(page);

  const handleAnchor = (hash, smooth = true) => {
    if (!hash) return;
    const id = decodeURIComponent(hash.replace(/^#/, ""));
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({
      behavior: smooth ? "smooth" : "auto",
      block: "start"
    });
  };

  page.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href) return;
      event.preventDefault();
      history.replaceState(null, "", href);
      handleAnchor(href, true);
    });
  });

  if (location.hash) {
    requestAnimationFrame(() => handleAnchor(location.hash, false));
  }
});
