ImranX site: deploy folder
==========================
index.html    homepage (edit BIRTH, GALLERY, GALLERY_ALT, FORM_ENDPOINT in the script at the bottom)
blog.html     blog list, Bangla + English
post.html     Bangla post template (copy it for each new post)
post-en.html  English post template
404.html      "page not found" page
style.css, site.js   shared styles and script. The SITE block at the top of site.js holds your email, phone and social links.
favicon.svg, favicon.ico, favicon-48.png, apple-touch-icon.png, icon-192/512.png, site.webmanifest   tab and phone icons.
              To use your own logo, replace these files with square versions of it (same names).
robots.txt, sitemap.xml, llms.txt, _headers   search engine / AI / hosting files
images/       portrait.jpg, gallery-1..9.jpg, og-cover.jpg (1200x630 share image)
images/blog/  feature images for posts (1280x720)

BEFORE YOU PUBLISH
1. Domain: the files assume https://imranx.com. If your address is different, find and replace
   "https://imranx.com" in index.html, blog.html, post.html, post-en.html, robots.txt, sitemap.xml, llms.txt.
2. Add images/og-cover.jpg (1200x630). It is the picture shown when the homepage or blog is shared.
3. Replace the sample post text, then submit https://yourdomain/sitemap.xml in Google Search Console and Bing Webmaster Tools.

ADD A NEW POST
1. Copy post.html (Bangla) or post-en.html (English) to a short English file name, e.g. ai-ethics.html.
2. Edit the text. Then update the block marked "POST SEO" in the <head>: title, description, canonical,
   og:url, og:title, og:description, og:image, article:published_time and the JSON-LD (headline, description, image, dates, url).
3. In blog.html copy one <a class="row"> block, point href to the new file, and set data-c (topic) and data-l (bn or en).
4. Optional: copy a <a class="post"> card in index.html to show it on the homepage (keep three).
5. Add a <url> line for it in sitemap.xml. Use the address without .html (e.g. /ai-ethics).
6. Update the previous/next boxes at the bottom of the post.

CONTACT FORM EMAILS
Create a free form at Web3Forms or Formspree that delivers to your email, then paste its URL into FORM_ENDPOINT in index.html.

COMMENTS
Free via Giscus (giscus.app): enable GitHub Discussions on a public repo, install the Giscus app, and copy repo, repoId,
category and categoryId into SITE.giscus in site.js.

DEPLOY
Put the folder in a GitHub repository and connect it to Cloudflare Pages (Workers & Pages > Create > Pages > Connect to Git).
Build command: leave empty. Output directory: /
