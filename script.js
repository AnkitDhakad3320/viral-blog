
const imageList = [
  "https://viralpitch.co/viral_assets/img/home/manage.webp",
  "https://viralpitch.co/viral_assets/img/home/Payment_Agreements_sec1.webp",
  "https://viralpitch.co/viral_assets/img/Fashion_Apparels/Fashion.png",
  "https://viralpitch.co/viral_assets/img/Fashion_Apparels/Fashion_Apparels_Sec1.png",
  "https://viralpitch.co/viral_assets/img/Fashion_Apparels/Fashion_Apparels_Sec2.png"
];

function stripHtml(html) {
  var tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function getImage(index) {
  return imageList[index % imageList.length];
}


function createFirstBlogCard(blog, index) {
  const image = getImage(index);
  const title = blog.content_title || "Untitled";
  const date = formatDate(blog.content_date);
  const description = stripHtml(blog.content_description || "").substring(0, 150) + "...";
  const category = blog.category || "Untitled";
  const url = blog.content_url || "Untitled";


  return `
    <div class="blog-first-card">
      <img src="${image}" alt="Blog Image" class="blog-first-image" ">
      <div class="blog-first-content">
        <h3 class="blog-first-title">${title}</h3>
        <p class="blog-description">${description}</p>
         <div class="blog-meta">
         <div><span class="blog-first-date">By John Doe</span>
          <span class="dot">•</span>
         <span class="blog-date">${date}</span></div>
         <div class="blog-first-category">${category}</div>
         <hr>

        </div>
      </div>
    </div>
  `;
}

function createBlogCard(blog, index) {
  const image = getImage(index);
  const title = blog.content_title || "Untitled";
  const date = formatDate(blog.content_date);
  const description = stripHtml(blog.content_description || "").substring(0, 150) + "...";
  const category = blog.category || "Untitled";
  const url = blog.content_url || "Untitled";


  return `
    <div class="blog-card">
    <div class= "image-container">
    <img src="${image}" alt="Blog Image" class="blog-image" onerror="this.onerror=null;this.src=''">
    <div class="timer">10 min</div>
     </div>
      <div class="blog-content">
        <h3 class="blog-title">${title}</h3>
        <p class="blog-description">${description}</p>
         <div class="blog-meta">
         <div><span class="blog-date">By John Doe</span>
         <span class="dot">•</span>
         <span class="blog-date">${date}</span></div>
         <div class="blog-category">${category}</div>
        </div>
      </div>
    </div>
  `;
}

function createPopularPost(blog, index) {
  
  const title = blog.content_title ? blog.content_title.substring(0, 80) + "..." : "Untitled";
  const date = formatDate(blog.content_date);
  const category = blog.category || "Untitled";

  return `
    <div class="popular-post">
      <div class="popular-content">
        <h4 class="popular-title">${title}</h4>
        <div>
         <span class="popular-date">${category}</span>
          <span class="dot">•</span>
        <span class="popular-date">${date}</span></div>       
      </div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", function() {
  fetch('https://gist.githubusercontent.com/AnkitDhakad3320/4db6d00cd4f86cc5fdc0c65bbcdaea23/raw/mockdata.json')
  .then(response => response.json())
  .then(res => {
    const blogGrid = document.getElementById("blogGrid");
    const popularBlogs = document.getElementById("popularBlogs");
    const blogfirst = document.getElementById("blogfirst");
    console.log(res);

    if (Array.isArray(res) && res.length > 0) {
   
      const blog = res.slice(0, 1);
      const blogfirstHtml = blog.map((blog, index) => createFirstBlogCard(blog, index)).join('');
      blogfirst.innerHTML = blogfirstHtml;



      const blogs = res.slice(1, 9);
      const blogHtml = blogs.map((blog, index) => createBlogCard(blog, index)).join('');
      blogGrid.innerHTML = blogHtml;

     
     
      const popular = res.slice(6,12);
      const popularHtml = popular.map((blog, index) => createPopularPost(blog, index)).join('');
      popularBlogs.innerHTML = popularHtml;
    } else {
      blogGrid.innerHTML = '<div class="error">No blogs available.</div>';
      popularBlogs.innerHTML = '<div class="error">No popular blogs available.</div>';
    }
  })
  .catch(error => {
    console.error(error);
    document.getElementById("blogGrid").innerHTML = '<div class="error">Failed to load blogs. Please try again later.</div>';
    document.getElementById("popularBlogs").innerHTML = '<div class="error">Failed to load popular blogs.</div>';
  });
});
