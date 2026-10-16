ImranX SITE: DEPLOY FOLDER
==========================

FILES
  index.html     homepage. Edit BIRTH, GALLERY and FORM_ENDPOINT in the script at the bottom.
  blog.html      blog list (Bangla + English), with topic filters and search.
  ai-chatbot-brand-sales.html, ai-ecommerce-website-sales.html, why-data-ai-projects-fail.html,
  quran-verify-news-deepfake.html           Bangla articles
  data-science-improve-sales.html, holy-quran-light-over-darkness.html     English articles
  style.css, site.js   shared styles and script. The SITE block at the top of site.js holds your
                       email, phone and social links.
  404.html, favicon and icon files, site.webmanifest, robots.txt, sitemap.xml, llms.txt, _headers
  images/        your photos, og-cover.jpg, and images/blog/ (one feature image per article)

BEFORE YOU PUBLISH (3 things only you can do)
  1. Open site.js and replace the email, phone and phoneLabel in the SITE block at the top.
  2. Make sure your own photos are in the images folder with the exact file names used in index.html.
  3. Read the six articles once and adjust any wording to your own voice. Check the Quran references
     against your trusted translation.

PUBLISH (GitHub + Cloudflare Pages)
  1. Unzip this file. Open the unzipped folder.
  2. On GitHub open your repository, click Add file > Upload files.
  3. Select everything INSIDE the folder (files and the images folder, not the outer folder) and drag it in.
     Files with the same name replace the old ones. Your own photos already in images/ stay.
  4. Click Commit changes.
  5. Delete the two old sample pages: open post.html, click the three dots (top right) > Delete file > Commit.
     Do the same for post-en.html.
  6. Cloudflare Pages redeploys by itself in about a minute (Workers & Pages > your project > Deployments
     should say Success). Hard refresh the site (Ctrl+Shift+R).
  7. In Google Search Console and Bing Webmaster Tools, submit https://imranx.com/sitemap.xml.

ADD A NEW ARTICLE LATER
  1. Copy an existing article (Bangla: ai-ecommerce-website-sales.html, English: data-science-improve-sales.html)
     to a short English file name, e.g. my-topic.html.
  2. In the new file change: the block marked "POST SEO" in the <head> (title, description, canonical, og:*,
     JSON-LD), the header (category, title, lead, date, reading time), the feature image name, the text, tags
     and the previous/next boxes.
  3. Put a 1280x720 feature image at images/blog/my-topic.jpg.
  4. In blog.html copy one <a class="row"> block and edit it (data-c = topic chip, data-l = bn or en).
  5. Add a <url> line in sitemap.xml and a line in llms.txt.
  6. To feature it on the homepage, edit the three cards in the BLOG section of index.html.

OTHER SETTINGS
  Contact form emails: create a free form at Web3Forms or Formspree that delivers to your email, then paste its
  URL into FORM_ENDPOINT in index.html.
  Comments: free via Giscus (giscus.app). Enable GitHub Discussions on a public repo, install the Giscus app,
  and copy repo, repoId, category and categoryId into SITE.giscus in site.js.
  Address: the files assume https://imranx.com. If yours is different, find and replace it in all .html files,
  robots.txt, sitemap.xml and llms.txt.
